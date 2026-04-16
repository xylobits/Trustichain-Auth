// pages/api/submit.js
// Saves submission to Vercel KV (admin) + Google Sheets (contacts)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const data = req.body
  if (!data.name || !data.email) return res.status(400).json({ error: 'Missing required fields' })

  const submission = {
    id: `sub_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,
    ...data,
    submittedAt: data.submittedAt || new Date().toISOString(),
  }

  const results = { kv: false, sheets: false }

  // ── 1. Save to Vercel KV ──
  try {
    const kvUrl = `${process.env.KV_REST_API_URL}/set/submission:${submission.id}`
    const kvRes = await fetch(kvUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission),
    })
    if (kvRes.ok) results.kv = true
  } catch (e) {
    console.error('KV error:', e.message)
  }

  // ── 2. Append to Google Sheets ──
  try {
    const SHEET_ID = process.env.GOOGLE_SHEET_ID
    const SERVICE_ACCOUNT = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)

    // Build JWT for Google API
    const { GoogleAuth } = await import('google-auth-library')
    const auth = new GoogleAuth({
      credentials: SERVICE_ACCOUNT,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })
    const client = await auth.getClient()
    const token = await client.getAccessToken()

    const row = [
      submission.submittedAt,
      submission.name,
      submission.company || '',
      submission.email,
      submission.phone || '',
      submission.role || '',
      submission.size || '',
      Array.isArray(submission.challenges) ? submission.challenges.join(', ') : '',
      submission.region || '',
      submission.feature || '',
      submission.timeline || '',
      submission.id,
    ]

    const sheetsRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Contacts!A:L:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: [row] }),
      }
    )
    if (sheetsRes.ok) results.sheets = true
  } catch (e) {
    console.error('Sheets error:', e.message)
  }

  return res.status(200).json({ success: true, id: submission.id, results })
}
