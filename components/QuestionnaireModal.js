import { useState } from 'react'

const TOTAL_STEPS = 7

const roleMap = { manufacturer:'Pharmaceutical Manufacturer', distributor:'Distributor / Wholesaler', pharmacy:'Pharmacy / Hospital Chain', regulator:'Regulatory Body / Government', other:'Other Healthcare Org' }
const sizeMap = { small:'Small (<50 staff)', mid:'Mid-size (50–500)', large:'Large (500–5k)', enterprise:'Enterprise / Multinational' }
const geoMap  = { africa:'Africa', asia:'Asia / Southeast Asia', europe:'Europe', americas:'Americas', global:'Global / Multi-region' }
const featMap = { verification:'Real-time verification', dashboard:'Chain-of-custody dashboard', alerts:'Counterfeit alerts', analytics:'Analytics & reporting', patient:'Patient mobile app' }
const timeMap = { asap:'As soon as possible', '3months':'Within 3 months', '6months':'Within 6 months', exploring:'Still exploring' }

export default function QuestionnaireModal({ open, onClose }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({ challenges: [] })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const goTo = (s) => setStep(s)
  const next = () => setStep(s => s + 1)

  const select = (key, val) => setAnswers(a => ({ ...a, [key]: val }))
  const toggleChallenge = (val) => setAnswers(a => ({
    ...a,
    challenges: a.challenges.includes(val)
      ? a.challenges.filter(v => v !== val)
      : [...a.challenges, val]
  }))

  const handleSubmit = async () => {
    if (!answers.name || !answers.email) {
      setError('Please fill in your name and email.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...answers, submittedAt: new Date().toISOString() })
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
      setStep(8)
    } catch (e) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => { setStep(0); setAnswers({ challenges: [] }); setSubmitted(false); setError('') }, 300)
  }

  const progress = step === 0 ? 0 : Math.round((step / TOTAL_STEPS) * 100)

  if (!open) return null

  return (
    <>
      <div className="overlay" onClick={e => e.target === e.currentTarget && handleClose()}>
        <div className="modal">
          <div className="prog-track"><div className="prog-bar" style={{ width: `${progress}%` }} /></div>
          <button className="modal-close" onClick={handleClose}>✕</button>
          {step > 0 && step <= TOTAL_STEPS && <div className="step-counter">Step {step} of {TOTAL_STEPS}</div>}

          {/* STEP 0: Welcome */}
          {step === 0 && (
            <div className="q-slide">
              <div className="q-icon">🔗</div>
              <h2 className="q-title">Let&apos;s build your <span>TrustiChain solution.</span></h2>
              <p className="q-desc">Answer 7 quick questions so we can design the right product for your organisation. Takes under 2 minutes.</p>
              <button className="q-btn" onClick={() => goTo(1)}>Start →</button>
            </div>
          )}

          {/* STEP 1: Role */}
          {step === 1 && (
            <div className="q-slide">
              <div className="q-eyebrow">Question 1 of 7</div>
              <h2 className="q-title">What best describes your organisation?</h2>
              <div className="q-options">
                {[['manufacturer','🏭','Pharmaceutical Manufacturer'],['distributor','🚚','Distributor / Wholesaler'],['pharmacy','🏪','Pharmacy / Hospital Chain'],['regulator','🏛️','Regulatory Body / Government'],['other','🌐','Other Healthcare Org']].map(([val,icon,label]) => (
                  <div key={val} className={`q-opt ${answers.role===val?'selected':''}`} onClick={() => select('role',val)}>{icon} <span>{label}</span></div>
                ))}
              </div>
              <button className="q-btn" onClick={next} disabled={!answers.role}>Continue →</button>
            </div>
          )}

          {/* STEP 2: Size */}
          {step === 2 && (
            <div className="q-slide">
              <div className="q-eyebrow">Question 2 of 7</div>
              <h2 className="q-title">How large is your operation?</h2>
              <div className="q-options">
                {[['small','🌱','Small — Under 50 staff'],['mid','🏢','Mid-size — 50–500 staff'],['large','🏙️','Large — 500–5,000 staff'],['enterprise','🌍','Enterprise — 5,000+ / Multinational']].map(([val,icon,label]) => (
                  <div key={val} className={`q-opt ${answers.size===val?'selected':''}`} onClick={() => select('size',val)}>{icon} <span>{label}</span></div>
                ))}
              </div>
              <button className="q-btn" onClick={next} disabled={!answers.size}>Continue →</button>
            </div>
          )}

          {/* STEP 3: Challenges */}
          {step === 3 && (
            <div className="q-slide">
              <div className="q-eyebrow">Question 3 of 7</div>
              <h2 className="q-title">What&apos;s your biggest challenge right now?</h2>
              <p className="q-desc">Select all that apply.</p>
              <div className="q-options">
                {[['counterfeits','⚠️','Counterfeit products in supply chain'],['traceability','🔍','Lack of end-to-end traceability'],['recalls','📋','Slow or inefficient product recalls'],['compliance','📜','Regulatory compliance gaps'],['brand','💊','Brand / reputation damage from fakes']].map(([val,icon,label]) => (
                  <div key={val} className={`q-opt ${answers.challenges.includes(val)?'selected':''}`} onClick={() => toggleChallenge(val)}>{icon} <span>{label}</span></div>
                ))}
              </div>
              <button className="q-btn" onClick={next}>Continue →</button>
            </div>
          )}

          {/* STEP 4: Geography */}
          {step === 4 && (
            <div className="q-slide">
              <div className="q-eyebrow">Question 4 of 7</div>
              <h2 className="q-title">Where do you primarily operate?</h2>
              <div className="q-options">
                {[['africa','🌍','Africa'],['asia','🌏','Asia / Southeast Asia'],['europe','🇪🇺','Europe'],['americas','🌎','Americas'],['global','🌐','Global / Multi-region']].map(([val,icon,label]) => (
                  <div key={val} className={`q-opt ${answers.region===val?'selected':''}`} onClick={() => select('region',val)}>{icon} <span>{label}</span></div>
                ))}
              </div>
              <button className="q-btn" onClick={next} disabled={!answers.region}>Continue →</button>
            </div>
          )}

          {/* STEP 5: Feature */}
          {step === 5 && (
            <div className="q-slide">
              <div className="q-eyebrow">Question 5 of 7</div>
              <h2 className="q-title">Which feature matters most to you?</h2>
              <div className="q-options">
                {[['verification','✅','Real-time product verification'],['dashboard','📊','Chain-of-custody dashboard'],['alerts','🚨','Counterfeit alert system'],['analytics','📈','Supply chain analytics & reporting'],['patient','📱','Patient-facing mobile verification']].map(([val,icon,label]) => (
                  <div key={val} className={`q-opt ${answers.feature===val?'selected':''}`} onClick={() => select('feature',val)}>{icon} <span>{label}</span></div>
                ))}
              </div>
              <button className="q-btn" onClick={next} disabled={!answers.feature}>Continue →</button>
            </div>
          )}

          {/* STEP 6: Timeline */}
          {step === 6 && (
            <div className="q-slide">
              <div className="q-eyebrow">Question 6 of 7</div>
              <h2 className="q-title">When are you looking to deploy?</h2>
              <div className="q-options">
                {[['asap','⚡','As soon as possible'],['3months','📅','Within 3 months'],['6months','🗓️','Within 6 months'],['exploring','🔭','Still exploring / no set date']].map(([val,icon,label]) => (
                  <div key={val} className={`q-opt ${answers.timeline===val?'selected':''}`} onClick={() => select('timeline',val)}>{icon} <span>{label}</span></div>
                ))}
              </div>
              <button className="q-btn" onClick={next} disabled={!answers.timeline}>Continue →</button>
            </div>
          )}

          {/* STEP 7: Contact */}
          {step === 7 && (
            <div className="q-slide">
              <div className="q-eyebrow">Question 7 of 7</div>
              <h2 className="q-title">Where should we send your tailored proposal?</h2>
              <div className="q-fields">
                {[['name','Full Name','text','Dr. Jane Osei'],['company','Company','text','PharmaCorp Ltd.'],['email','Email','email','jane@pharmacorp.com'],['phone','Phone (optional)','tel','+1 555 000 0000']].map(([key,label,type,ph]) => (
                  <div key={key} className="q-field">
                    <label>{label}</label>
                    <input type={type} placeholder={ph} value={answers[key]||''} onChange={e => select(key, e.target.value)} />
                  </div>
                ))}
              </div>
              {error && <p className="q-error">{error}</p>}
              <button className="q-btn" onClick={handleSubmit} disabled={loading}>{loading ? 'Sending…' : 'Get My Custom Proposal →'}</button>
            </div>
          )}

          {/* STEP 8: Thank you */}
          {step === 8 && (
            <div className="q-slide">
              <div className="q-icon" style={{animation:'pulse 1.5s ease infinite'}}>✅</div>
              <h2 className="q-title">You&apos;re on the chain.</h2>
              <p className="q-desc">We&apos;ve captured your requirements. A TrustiChain specialist will send your custom proposal within <strong>24 hours</strong>.</p>
              <div className="summary-box">
                <p><strong>Name:</strong> {answers.name}</p>
                <p><strong>Company:</strong> {answers.company || '—'}</p>
                <p><strong>Email:</strong> {answers.email}</p>
                <p><strong>Organisation:</strong> {roleMap[answers.role] || '—'}</p>
                <p><strong>Size:</strong> {sizeMap[answers.size] || '—'}</p>
                <p><strong>Challenges:</strong> {answers.challenges.length ? answers.challenges.join(', ') : '—'}</p>
                <p><strong>Region:</strong> {geoMap[answers.region] || '—'}</p>
                <p><strong>Priority:</strong> {featMap[answers.feature] || '—'}</p>
                <p><strong>Timeline:</strong> {timeMap[answers.timeline] || '—'}</p>
              </div>
              <button className="q-btn" onClick={handleClose} style={{marginTop:'1.5rem'}}>Close →</button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .overlay { position: fixed; inset: 0; background: rgba(5,10,18,0.92); backdrop-filter: blur(10px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 1rem; animation: fadeIn 0.2s ease; }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        .modal { background: #0d1520; border: 1px solid rgba(0,180,160,0.2); width: 100%; max-width: 580px; max-height: 90vh; overflow-y: auto; position: relative; padding: 3rem 2.8rem 2.5rem; box-shadow: 0 0 60px rgba(0,180,160,0.12), 0 40px 80px rgba(0,0,0,0.6); animation: modalIn 0.4s cubic-bezier(0.16,1,0.3,1); }
        @keyframes modalIn { from { opacity:0; transform: translateY(30px) scale(0.97); } to { opacity:1; transform:none; } }
        .prog-track { position: absolute; top:0; left:0; right:0; height:3px; background: rgba(255,255,255,0.06); }
        .prog-bar { height:100%; background: linear-gradient(90deg, #00b4a0, #c9a84c); transition: width 0.5s cubic-bezier(0.4,0,0.2,1); }
        .modal-close { position: absolute; top:1.2rem; right:1.5rem; background:none; border:none; color:#6b7280; font-size:1rem; cursor:pointer; padding:0.3rem 0.5rem; }
        .modal-close:hover { color: #f5f0e8; }
        .step-counter { font-size:0.65rem; letter-spacing:0.25em; text-transform:uppercase; color:#00b4a0; margin-bottom:0.5rem; }
        .q-slide { animation: slideIn 0.35s cubic-bezier(0.16,1,0.3,1); }
        @keyframes slideIn { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:none; } }
        .q-icon { font-size:2.8rem; margin-bottom:1.2rem; }
        .q-eyebrow { font-size:0.65rem; letter-spacing:0.2em; text-transform:uppercase; color:#00b4a0; margin-bottom:1rem; }
        .q-title { font-family:'DM Serif Display',serif; font-size:clamp(1.4rem,3.5vw,2rem); line-height:1.2; color:#f5f0e8; margin-bottom:0.8rem; }
        .q-title span { color:#00b4a0; }
        .q-desc { font-size:0.88rem; color:#7a8591; line-height:1.7; margin-bottom:1.8rem; }
        .q-options { display:flex; flex-direction:column; gap:0.6rem; margin-bottom:1.8rem; }
        .q-opt { display:flex; align-items:center; gap:0.8rem; padding:0.9rem 1.2rem; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); cursor:pointer; transition:all 0.2s; font-size:0.9rem; color:#b0bbc5; user-select:none; }
        .q-opt:hover { border-color:rgba(0,180,160,0.4); background:rgba(0,180,160,0.06); color:#f5f0e8; }
        .q-opt.selected { border-color:#00b4a0; background:rgba(0,180,160,0.12); color:#f5f0e8; }
        .q-opt span { flex:1; }
        .q-fields { display:flex; flex-direction:column; gap:1rem; margin-bottom:1.8rem; }
        .q-field label { display:block; font-size:0.7rem; letter-spacing:0.12em; text-transform:uppercase; color:#6b7280; margin-bottom:0.4rem; }
        .q-field input { width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); color:#f5f0e8; padding:0.75rem 1rem; font-size:0.9rem; font-family:'DM Sans',sans-serif; outline:none; transition:border-color 0.2s; }
        .q-field input:focus { border-color:#00b4a0; background:rgba(0,180,160,0.05); }
        .q-field input::placeholder { color:#3d4d5a; }
        .q-btn { background:transparent; border:1px solid #00b4a0; color:#00b4a0; padding:0.85rem 2.2rem; font-family:'DM Sans',sans-serif; font-size:0.8rem; letter-spacing:0.18em; text-transform:uppercase; cursor:pointer; transition:all 0.25s; width:100%; }
        .q-btn:hover:not(:disabled) { background:#00b4a0; color:#0a0f1a; }
        .q-btn:disabled { opacity:0.35; cursor:not-allowed; }
        .q-error { color:#d64045; font-size:0.8rem; margin-bottom:1rem; }
        .summary-box { margin-top:1.5rem; border:1px solid rgba(0,180,160,0.2); padding:1.2rem 1.5rem; background:rgba(0,180,160,0.04); display:flex; flex-direction:column; gap:0.3rem; }
        .summary-box p { font-size:0.78rem; color:#7a8591; line-height:1.9; }
        .summary-box strong { color:#00b4a0; font-weight:500; }
        .modal::-webkit-scrollbar { width:4px; }
        .modal::-webkit-scrollbar-thumb { background:rgba(0,180,160,0.3); }
        @keyframes pulse { 0%,100%{transform:scale(1);} 50%{transform:scale(1.12);} }
      `}</style>
    </>
  )
}
