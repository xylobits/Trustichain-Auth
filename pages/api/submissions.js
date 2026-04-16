// pages/api/submissions.js
// Returns all submissions from Vercel KV — protected by admin password

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  // Basic auth check
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (token !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    // List all keys with prefix "submission:"
    const listRes = await fetch(
      `${process.env.KV_REST_API_URL}/keys/submission:*`,
      {
        headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
      }
    )
    const listData = await listRes.json()
    const keys = listData.result || []

    if (keys.length === 0) return res.status(200).json({ submissions: [] })

    // Fetch all values using MGET
    const mgetRes = await fetch(`${process.env.KV_REST_API_URL}/mget/${keys.join('/')}`, {
      headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
    })
    const mgetData = await mgetRes.json()
    const submissions = (mgetData.result || [])
      .filter(Boolean)
      .map(item => (typeof item === 'string' ? JSON.parse(item) : item))
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))

    return res.status(200).json({ submissions, total: submissions.length })
  } catch (e) {
    console.error('Submissions fetch error:', e)
    return res.status(500).json({ error: 'Failed to fetch submissions' })
  }
}
