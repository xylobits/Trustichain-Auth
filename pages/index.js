import Head from 'next/head'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // Wire form submission to the Next.js API
    window.__trustichain_submit = async (answers) => {
      try {
        const res = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...answers, submittedAt: new Date().toISOString() })
        })
        return res.ok
      } catch { return false }
    }
  }, [])

  return (
    <>
      <Head>
        <title>TrustiChain — Pharmaceutical Pitch</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>
      <style jsx global>{`
        :root {
          --ink: #0a0f1a; --paper: #f5f0e8; --teal: #00b4a0;
          --teal-dark: #007a6e; --gold: #c9a84c; --red: #d64045; --muted: #6b7280;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: var(--ink); color: var(--paper); font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
        .slide { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 6vw 8vw; position: relative; overflow: hidden; }
        .slide::before { content: ''; position: absolute; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); pointer-events: none; opacity: 0.4; z-index: 0; }
        .slide > * { position: relative; z-index: 1; }
        #s1 { background: var(--ink); justify-content: space-between; padding-top: 10vh; padding-bottom: 8vh; }
        .eyebrow { font-family: 'DM Sans', sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: var(--teal); margin-bottom: 2rem; opacity: 0; animation: fadeUp 0.8s 0.2s forwards; }
        .hero-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(5rem, 14vw, 13rem); line-height: 0.9; letter-spacing: -0.01em; color: var(--paper); opacity: 0; animation: fadeUp 0.9s 0.4s forwards; }
        .hero-title span { color: var(--teal); display: block; }
        .hero-sub { font-family: 'DM Serif Display', serif; font-style: italic; font-size: clamp(1.1rem, 2.2vw, 1.6rem); color: var(--gold); margin-top: 2rem; max-width: 600px; opacity: 0; animation: fadeUp 0.9s 0.6s forwards; }
        .hero-stat-row { display: flex; gap: 4rem; margin-top: 6vh; opacity: 0; animation: fadeUp 0.9s 0.8s forwards; flex-wrap: wrap; }
        .hero-stat .num { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.5rem, 5vw, 4rem); color: var(--teal); line-height: 1; }
        .hero-stat .label { font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); margin-top: 0.3rem; }
        .hero-line { position: absolute; right: 8vw; top: 50%; transform: translateY(-50%); width: 1px; height: 60vh; background: linear-gradient(to bottom, transparent, var(--teal), transparent); opacity: 0; animation: fadeIn 1.5s 1s forwards; }
        .hero-chain { position: absolute; right: 6vw; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 1.5rem; opacity: 0; animation: fadeIn 1s 1.2s forwards; }
        .chain-node { width: 12px; height: 12px; border-radius: 50%; background: var(--teal); box-shadow: 0 0 12px var(--teal); animation: glow 2.5s ease-in-out infinite; }
        .chain-node:nth-child(odd) { background: var(--gold); box-shadow: 0 0 12px var(--gold); }
        #s2 { background: #0e0a06; }
        .slide-label { font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted); margin-bottom: 3rem; }
        .big-number { font-family: 'Bebas Neue', sans-serif; font-size: clamp(6rem, 18vw, 16rem); line-height: 0.85; color: var(--red); opacity: 0.15; position: absolute; right: 5vw; top: 50%; transform: translateY(-50%); pointer-events: none; letter-spacing: -0.02em; }
        .section-title { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 5vw, 4rem); line-height: 1.15; margin-bottom: 3rem; max-width: 700px; }
        .problem-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; max-width: 900px; }
        .prob-card { border: 1px solid rgba(255,255,255,0.08); border-left: 3px solid var(--red); padding: 1.5rem; background: rgba(255,255,255,0.02); backdrop-filter: blur(6px); transition: border-color 0.3s, background 0.3s; }
        .prob-card:hover { border-left-color: var(--teal); background: rgba(0,180,160,0.05); }
        .prob-card .stat { font-family: 'Bebas Neue', sans-serif; font-size: 2.2rem; color: var(--red); line-height: 1; }
        .prob-card p { font-size: 0.85rem; color: var(--muted); margin-top: 0.5rem; line-height: 1.6; }
        #s3 { background: #050f0e; }
        .solution-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 5vw; align-items: center; max-width: 1100px; }
        .solution-desc { font-size: 1rem; line-height: 1.8; color: #a0a8b0; max-width: 480px; }
        .step { display: flex; gap: 1.5rem; padding: 1.8rem 0; border-bottom: 1px solid rgba(255,255,255,0.06); align-items: flex-start; transition: background 0.3s; }
        .step:last-child { border-bottom: none; }
        .step-num { font-family: 'Bebas Neue', sans-serif; font-size: 2.5rem; color: var(--teal); opacity: 0.3; line-height: 1; min-width: 2.5rem; transition: opacity 0.3s; }
        .step:hover .step-num { opacity: 1; }
        .step-body h4 { font-family: 'DM Serif Display', serif; font-size: 1.1rem; margin-bottom: 0.4rem; color: var(--paper); }
        .step-body p { font-size: 0.82rem; color: var(--muted); line-height: 1.6; }
        #s4 { background: var(--ink); }
        .flow-row { display: flex; align-items: center; flex-wrap: wrap; margin-top: 4rem; max-width: 1000px; }
        .flow-node { flex: 1; min-width: 140px; text-align: center; padding: 2rem 1rem; }
        .flow-icon { width: 60px; height: 60px; border-radius: 50%; background: rgba(0,180,160,0.1); border: 1px solid var(--teal); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 1.4rem; transition: background 0.3s, box-shadow 0.3s; }
        .flow-node:hover .flow-icon { background: rgba(0,180,160,0.25); box-shadow: 0 0 20px rgba(0,180,160,0.3); }
        .flow-node h4 { font-family: 'DM Serif Display', serif; font-size: 0.95rem; margin-bottom: 0.4rem; }
        .flow-node p { font-size: 0.72rem; color: var(--muted); line-height: 1.5; }
        .flow-arrow { font-size: 1.2rem; color: var(--teal); opacity: 0.4; flex-shrink: 0; }
        #s5 { background: #04120f; }
        .impact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin-top: 3rem; max-width: 950px; }
        .impact-card { padding: 2.5rem 2rem; border: 1px solid rgba(0,180,160,0.15); background: rgba(0,180,160,0.04); text-align: center; transition: transform 0.3s, border-color 0.3s; cursor: default; }
        .impact-card:hover { transform: translateY(-6px); border-color: rgba(0,180,160,0.5); }
        .impact-card .icon { font-size: 2rem; margin-bottom: 1rem; }
        .impact-card h3 { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: var(--teal); margin-bottom: 0.5rem; }
        .impact-card p { font-size: 0.8rem; color: var(--muted); line-height: 1.6; }
        #s6 { background: var(--ink); justify-content: center; text-align: center; align-items: center; }
        .cta-pre { font-size: 0.75rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--teal); margin-bottom: 2rem; }
        .cta-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(3.5rem, 10vw, 9rem); line-height: 0.9; color: var(--paper); }
        .cta-title em { font-style: normal; color: var(--teal); }
        .cta-sub { font-family: 'DM Serif Display', serif; font-style: italic; font-size: clamp(1rem, 2vw, 1.4rem); color: var(--gold); margin-top: 2rem; max-width: 500px; }
        .cta-btn { display: inline-block; margin-top: 3rem; padding: 1rem 3rem; border: 1px solid var(--teal); color: var(--teal); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; background: transparent; font-family: 'DM Sans', sans-serif; transition: background 0.3s, color 0.3s; }
        .cta-btn:hover { background: var(--teal); color: var(--ink); }
        .divider { width: 60px; height: 2px; background: var(--teal); margin-bottom: 2rem; }
        .nav { position: fixed; right: 2rem; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 0.7rem; z-index: 100; }
        .nav a { width: 7px; height: 7px; border-radius: 50%; background: rgba(255,255,255,0.2); transition: background 0.3s, transform 0.3s; display: block; }
        .nav a:hover { background: var(--teal); transform: scale(1.4); }
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.visible { opacity: 1; transform: none; }
        .reveal-stagger > * { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .reveal-stagger.visible > *:nth-child(1) { opacity:1; transform:none; transition-delay:0.05s; }
        .reveal-stagger.visible > *:nth-child(2) { opacity:1; transform:none; transition-delay:0.15s; }
        .reveal-stagger.visible > *:nth-child(3) { opacity:1; transform:none; transition-delay:0.25s; }
        .reveal-stagger.visible > *:nth-child(4) { opacity:1; transform:none; transition-delay:0.35s; }
        .reveal-stagger.visible > *:nth-child(5) { opacity:1; transform:none; transition-delay:0.45s; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes glow { 0%,100%{box-shadow:0 0 6px rgba(0,180,160,0.3)} 50%{box-shadow:0 0 20px rgba(0,180,160,0.7)} }

        /* ── MODAL ── */
        #modal-overlay { display:none; position:fixed; inset:0; background:rgba(5,10,18,0.92); backdrop-filter:blur(10px); z-index:1000; align-items:center; justify-content:center; padding:1rem; }
        #modal-overlay.open { display:flex; }
        #modal { background:#0d1520; border:1px solid rgba(0,180,160,0.2); width:100%; max-width:580px; max-height:90vh; overflow-y:auto; position:relative; padding:3rem 2.8rem 2.5rem; box-shadow:0 0 60px rgba(0,180,160,0.12),0 40px 80px rgba(0,0,0,0.6); animation:modalIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards; }
        @keyframes modalIn { from{opacity:0;transform:translateY(30px) scale(0.97)} to{opacity:1;transform:none} }
        #prog-track { position:absolute; top:0; left:0; right:0; height:3px; background:rgba(255,255,255,0.06); }
        #prog-bar { height:100%; background:linear-gradient(90deg,var(--teal),var(--gold)); width:0%; transition:width 0.5s cubic-bezier(0.4,0,0.2,1); }
        #modal-close { position:absolute; top:1.2rem; right:1.5rem; background:none; border:none; color:var(--muted); font-size:1rem; cursor:pointer; padding:0.3rem 0.5rem; transition:color 0.2s; }
        #modal-close:hover { color:var(--paper); }
        #step-counter { font-size:0.65rem; letter-spacing:0.25em; text-transform:uppercase; color:var(--teal); margin-bottom:0.5rem; min-height:1rem; }
        .q-slide { display:none; }
        .q-slide.active { display:block; animation:slideIn 0.35s cubic-bezier(0.16,1,0.3,1) forwards; }
        @keyframes slideIn { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:none} }
        .q-icon { font-size:2.8rem; margin-bottom:1.2rem; }
        .success-pulse { animation:pulse 1.5s ease infinite; }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.12)} }
        .q-eyebrow { font-size:0.65rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--teal); margin-bottom:1rem; }
        .q-title { font-family:'DM Serif Display',serif; font-size:clamp(1.4rem,3.5vw,2rem); line-height:1.2; color:var(--paper); margin-bottom:0.8rem; }
        .q-title span { color:var(--teal); }
        .q-desc { font-size:0.88rem; color:#7a8591; line-height:1.7; margin-bottom:1.8rem; }
        .q-options { display:flex; flex-direction:column; gap:0.6rem; margin-bottom:1.8rem; }
        .q-opt { display:flex; align-items:center; gap:0.8rem; padding:0.9rem 1.2rem; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); cursor:pointer; transition:all 0.2s; font-size:0.9rem; color:#b0bbc5; user-select:none; }
        .q-opt:hover { border-color:rgba(0,180,160,0.4); background:rgba(0,180,160,0.06); color:var(--paper); }
        .q-opt.selected { border-color:var(--teal); background:rgba(0,180,160,0.12); color:var(--paper); }
        .q-opt span { flex:1; }
        .q-fields { display:flex; flex-direction:column; gap:1rem; margin-bottom:1.8rem; }
        .q-field label { display:block; font-size:0.7rem; letter-spacing:0.12em; text-transform:uppercase; color:var(--muted); margin-bottom:0.4rem; }
        .q-field input { width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); color:var(--paper); padding:0.75rem 1rem; font-size:0.9rem; font-family:'DM Sans',sans-serif; outline:none; transition:border-color 0.2s; }
        .q-field input:focus { border-color:var(--teal); background:rgba(0,180,160,0.05); }
        .q-field input::placeholder { color:#3d4d5a; }
        .q-next-btn { background:transparent; border:1px solid var(--teal); color:var(--teal); padding:0.85rem 2.2rem; font-family:'DM Sans',sans-serif; font-size:0.8rem; letter-spacing:0.18em; text-transform:uppercase; cursor:pointer; transition:all 0.25s; width:100%; }
        .q-next-btn:hover:not(:disabled) { background:var(--teal); color:var(--ink); }
        .q-next-btn:disabled { opacity:0.3; cursor:not-allowed; }
        #summary-box { margin-top:1.5rem; border:1px solid rgba(0,180,160,0.2); padding:1.2rem 1.5rem; background:rgba(0,180,160,0.04); }
        #summary-box p { font-size:0.78rem; color:#7a8591; line-height:1.9; }
        #summary-box strong { color:var(--teal); font-weight:500; }
        #modal::-webkit-scrollbar { width:4px; }
        #modal::-webkit-scrollbar-thumb { background:rgba(0,180,160,0.3); }
        @media(max-width:768px) { .solution-wrap{grid-template-columns:1fr} .hero-stat-row{gap:2rem} }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        {['s1','s2','s3','s4','s5','s6'].map(id => <a key={id} href={`#${id}`} />)}
      </nav>

      {/* SLIDE 1 */}
      <section className="slide" id="s1">
        <div className="hero-title">Trusti<span>Chain</span></div>
        <div className="hero-sub">Blockchain-verified pharmaceuticals — every pill authenticated, every life protected.</div>
        <div className="hero-stat-row">
          <div className="hero-stat"><div className="num">500K</div><div className="label">Deaths / Year from Counterfeit Drugs</div></div>
          <div className="hero-stat"><div className="num">$200B</div><div className="label">Global Counterfeit Drug Market</div></div>
          <div className="hero-stat"><div className="num">10%</div><div className="label">Of Global Medicines Are Fake</div></div>
        </div>
        <div className="hero-line" />
        <div className="hero-chain">{[1,2,3,4,5].map(i=><div key={i} className="chain-node"/>)}</div>
      </section>

      {/* SLIDE 2 */}
      <section className="slide" id="s2">
        <div className="slide-label">01 — The Problem</div>
        <div className="big-number">10%</div>
        <div className="section-title reveal">The pharmaceutical supply chain is <em style={{fontStyle:'italic',color:'var(--red)'}}>broken</em> — and people are dying for it.</div>
        <div className="problem-grid reveal-stagger">
          {[['500K+','People die annually from counterfeit medications — more than malaria kills in many regions.'],['1 in 10','Medical products in low- and middle-income countries are substandard or falsified.'],['$200B','Lost annually by the pharmaceutical industry to counterfeits — eroding brand trust.'],['Zero','Reliable, real-time verification tools available to pharmacists or patients at point of dispensing.']].map(([s,p])=>(
            <div key={s} className="prob-card"><div className="stat">{s}</div><p>{p}</p></div>
          ))}
        </div>
      </section>

      {/* SLIDE 3 */}
      <section className="slide" id="s3">
        <div className="slide-label">02 — Our Solution</div>
        <div className="solution-wrap">
          <div className="solution-left reveal">
            <div className="divider"/>
            <div className="section-title">A tamper-proof digital identity for every drug that exists.</div>
            <p className="solution-desc">TrustiChain assigns a unique, blockchain-registered identity to every pharmaceutical batch at the point of manufacture. That identity travels with the product — immutably — through every hand it passes through, until it reaches the patient.</p>
          </div>
          <div className="solution-right reveal-stagger">
            {[['01','Digital Birth Certificate','Each batch receives a QR/NFC token written to the blockchain at manufacturing. Unforgeable from day one.'],['02','Chain-of-Custody Logging','Every transfer — manufacturer, distributor, wholesaler, pharmacy — is recorded as an immutable on-chain event.'],['03','Last-Mile Verification','Pharmacists and patients scan to instantly verify authenticity before any drug is dispensed or ingested.'],['04','Counterfeit Flagging','Any product that fails verification is flagged system-wide in real time — stopping spread before harm occurs.']].map(([n,h,p])=>(
              <div key={n} className="step"><div className="step-num">{n}</div><div className="step-body"><h4>{h}</h4><p>{p}</p></div></div>
            ))}
          </div>
        </div>
      </section>

      {/* SLIDE 4 */}
      <section className="slide" id="s4">
        <div className="slide-label">03 — How It Works</div>
        <div className="section-title reveal" style={{maxWidth:'600px'}}>From factory floor to the patient's hand — every step verified.</div>
        <div className="flow-row reveal-stagger">
          {[['🏭','Manufacturer','Batch minted on blockchain with unique cryptographic ID'],['🚚','Distributor','Transfer recorded; chain of custody begins'],['🏪','Pharmacy','Scans product; blockchain confirms authentic pathway'],['📱','Patient','Scans QR code; receives real-time ✅ or ❌ alert'],['🛡️','Protected','Counterfeit blocked at last mile — life saved']].map(([icon,h,p],i,arr)=>(
            <span key={h} style={{display:'contents'}}>
              <div className="flow-node"><div className="flow-icon">{icon}</div><h4>{h}</h4><p>{p}</p></div>
              {i<arr.length-1&&<div className="flow-arrow">→</div>}
            </span>
          ))}
        </div>
      </section>

      {/* SLIDE 5 */}
      <section className="slide" id="s5">
        <div className="slide-label">04 — The Impact</div>
        <div className="section-title reveal" style={{maxWidth:'700px'}}>When every pill tells the truth, people stop dying from lies.</div>
        <div className="impact-grid reveal-stagger">
          {[['❤️‍🩹','Lives Saved','Eliminate the counterfeit pathway at the last mile — the moment it matters most.'],['🔗','Full Traceability','Every product traceable from source to patient — in seconds, not weeks.'],['⚡','Real-Time Alerts','Counterfeit detected → flagged system-wide instantly, stopping spread across regions.'],['🌍','Global Scale','Deployable across emerging markets where counterfeit risk is highest.'],['💊','Brand Trust','Manufacturers reclaim $200B in losses and rebuild consumer confidence.']].map(([icon,h,p])=>(
            <div key={h} className="impact-card"><div className="icon">{icon}</div><h3>{h}</h3><p>{p}</p></div>
          ))}
        </div>
      </section>

      {/* SLIDE 6 */}
      <section className="slide" id="s6">
        <div className="cta-pre">The Ask</div>
        <div className="cta-title">Every Pill.<br/><em>Every Person.</em><br/>Protected.</div>
        <div className="cta-sub">Join us in building the infrastructure that makes counterfeit pharmaceuticals impossible — not just illegal.</div>
        <button className="cta-btn" onClick={()=>document.getElementById('modal-overlay').classList.add('open')}>Partner With TrustiChain →</button>
      </section>

      {/* MODAL */}
      <div id="modal-overlay" onClick={e=>e.target===e.currentTarget&&closeModal()}>
        <div id="modal">
          <div id="prog-track"><div id="prog-bar"/></div>
          <button id="modal-close" onClick={()=>typeof closeModal!=='undefined'&&closeModal()}>✕</button>
          <div id="step-counter"/>
          <div id="slides-wrap">
            <div className="q-slide active" data-step="0">
              <div className="q-icon">🔗</div>
              <h2 className="q-title">Let&apos;s build your <span>TrustiChain solution.</span></h2>
              <p className="q-desc">Answer 7 quick questions so we can design the right product for your organisation. Takes under 2 minutes.</p>
              <button className="q-next-btn" id="start-btn">Start →</button>
            </div>
            {[{step:1,q:"What best describes your organisation?",key:'q1',opts:[['manufacturer','🏭','Pharmaceutical Manufacturer'],['distributor','🚚','Distributor / Wholesaler'],['pharmacy','🏪','Pharmacy / Hospital Chain'],['regulator','🏛️','Regulatory Body / Government'],['other','🌐','Other Healthcare Org']]},{step:2,q:"How large is your operation?",key:'q2',opts:[['small','🌱','Small — Under 50 staff'],['mid','🏢','Mid-size — 50–500 staff'],['large','🏙️','Large — 500–5,000 staff'],['enterprise','🌍','Enterprise — 5,000+ / Multinational']]},{step:4,q:"Where do you primarily operate?",key:'q4',opts:[['africa','🌍','Africa'],['asia','🌏','Asia / Southeast Asia'],['europe','🇪🇺','Europe'],['americas','🌎','Americas'],['global','🌐','Global / Multi-region']]},{step:5,q:"Which feature matters most to you?",key:'q5',opts:[['verification','✅','Real-time product verification'],['dashboard','📊','Chain-of-custody dashboard'],['alerts','🚨','Counterfeit alert system'],['analytics','📈','Supply chain analytics & reporting'],['patient','📱','Patient-facing mobile verification']]},{step:6,q:"When are you looking to deploy?",key:'q6',opts:[['asap','⚡','As soon as possible'],['3months','📅','Within 3 months'],['6months','🗓️','Within 6 months'],['exploring','🔭','Still exploring / no set date']]}].map(({step,q,key,opts})=>(
              <div key={step} className="q-slide" data-step={step}>
                <div className="q-eyebrow">Question {step===4?4:step===5?5:step===6?6:step} of 7</div>
                <h2 className="q-title">{q}</h2>
                <div className="q-options" id={key}>
                  {opts.map(([val,icon,label])=>(
                    <div key={val} className="q-opt" data-val={val}>{icon} <span>{label}</span></div>
                  ))}
                </div>
                <button className="q-next-btn" disabled>Continue →</button>
              </div>
            ))}
            <div className="q-slide" data-step="3">
              <div className="q-eyebrow">Question 3 of 7</div>
              <h2 className="q-title">What&apos;s your biggest challenge right now?</h2>
              <p className="q-desc">Select all that apply.</p>
              <div className="q-options multi" id="q3">
                {[['counterfeits','⚠️','Counterfeit products in supply chain'],['traceability','🔍','Lack of end-to-end traceability'],['recalls','📋','Slow or inefficient product recalls'],['compliance','📜','Regulatory compliance gaps'],['brand','💊','Brand / reputation damage from fakes']].map(([val,icon,label])=>(
                  <div key={val} className="q-opt multi" data-val={val}>{icon} <span>{label}</span></div>
                ))}
              </div>
              <button className="q-next-btn">Continue →</button>
            </div>
            <div className="q-slide" data-step="7">
              <div className="q-eyebrow">Question 7 of 7</div>
              <h2 className="q-title">Where should we send your tailored proposal?</h2>
              <div className="q-fields">
                {[['f-name','Full Name','text','Dr. Jane Osei'],['f-company','Company','text','PharmaCorp Ltd.'],['f-email','Email','email','jane@pharmacorp.com'],['f-phone','Phone (optional)','tel','+1 555 000 0000']].map(([id,label,type,ph])=>(
                  <div key={id} className="q-field"><label>{label}</label><input type={type} id={id} placeholder={ph}/></div>
                ))}
              </div>
              <button className="q-next-btn" id="submit-btn">Get My Custom Proposal →</button>
            </div>
            <div className="q-slide" data-step="8">
              <div className="q-icon success-pulse">✅</div>
              <h2 className="q-title">You&apos;re on the chain.</h2>
              <p className="q-desc">We&apos;ve captured your requirements. A TrustiChain specialist will send your custom proposal within <strong>24 hours</strong>.</p>
              <div id="summary-box"/>
              <button className="q-next-btn" id="close-btn" style={{marginTop:'2rem'}}>Close →</button>
            </div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{__html:`
        const TOTAL=7; let cur=0; const ans={};
        function goTo(s){
          cur=s;
          document.querySelectorAll('.q-slide').forEach(el=>el.classList.remove('active'));
          const slide=document.querySelector('.q-slide[data-step="'+s+'"]');
          if(slide)slide.classList.add('active');
          const pct=s===0?0:Math.round((s/TOTAL)*100);
          document.getElementById('prog-bar').style.width=pct+'%';
          const ctr=document.getElementById('step-counter');
          ctr.textContent=(s>0&&s<=TOTAL)?'Step '+s+' of '+TOTAL:'';
          document.getElementById('modal').scrollTop=0;
        }
        function closeModal(){
          document.getElementById('modal-overlay').classList.remove('open');
        }
        document.getElementById('start-btn').onclick=()=>goTo(1);
        document.getElementById('close-btn').onclick=closeModal;
        document.getElementById('modal-close').onclick=closeModal;
        document.querySelectorAll('#q1 .q-opt,#q2 .q-opt,#q4 .q-opt,#q5 .q-opt,#q6 .q-opt').forEach(opt=>{
          opt.onclick=function(){
            const grp=this.closest('.q-options');
            grp.querySelectorAll('.q-opt').forEach(o=>o.classList.remove('selected'));
            this.classList.add('selected');
            ans[grp.id]=this.dataset.val;
            const btn=this.closest('.q-slide').querySelector('.q-next-btn');
            if(btn)btn.disabled=false;
          };
        });
        document.querySelectorAll('#q3 .q-opt').forEach(opt=>{
          opt.onclick=function(){this.classList.toggle('selected');};
        });
        document.querySelectorAll('[data-step="1"] .q-next-btn,[data-step="2"] .q-next-btn,[data-step="4"] .q-next-btn,[data-step="5"] .q-next-btn,[data-step="6"] .q-next-btn').forEach((btn,i)=>{
          const steps=[1,2,4,5,6];
          btn.onclick=()=>goTo([2,3,5,6,7][i]);
        });
        document.querySelector('[data-step="3"] .q-next-btn').onclick=()=>goTo(4);
        document.getElementById('submit-btn').onclick=async function(){
          const name=document.getElementById('f-name').value.trim();
          const email=document.getElementById('f-email').value.trim();
          if(!name||!email){
            if(!name)document.getElementById('f-name').style.borderColor='#d64045';
            if(!email)document.getElementById('f-email').style.borderColor='#d64045';
            return;
          }
          ans.name=name; ans.company=document.getElementById('f-company').value.trim();
          ans.email=email; ans.phone=document.getElementById('f-phone').value.trim();
          ans.challenges=[...document.querySelectorAll('#q3 .q-opt.selected')].map(o=>o.dataset.val);
          try{
            await fetch('/api/submit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...ans,submittedAt:new Date().toISOString()})});
          }catch(e){}
          const rMap={manufacturer:'Pharmaceutical Manufacturer',distributor:'Distributor / Wholesaler',pharmacy:'Pharmacy / Hospital Chain',regulator:'Regulatory Body',other:'Other'};
          const sMap={small:'Small (<50)',mid:'Mid-size (50–500)',large:'Large (500–5k)',enterprise:'Enterprise (5k+)'};
          const gMap={africa:'Africa',asia:'Asia / SE Asia',europe:'Europe',americas:'Americas',global:'Global'};
          const fMap={verification:'Real-time verification',dashboard:'Chain-of-custody dashboard',alerts:'Counterfeit alerts',analytics:'Analytics & reporting',patient:'Patient mobile app'};
          const tMap={asap:'As soon as possible','3months':'Within 3 months','6months':'Within 6 months',exploring:'Still exploring'};
          document.getElementById('summary-box').innerHTML='<p><strong>Name:</strong> '+name+'<br><strong>Company:</strong> '+(ans.company||'—')+'<br><strong>Email:</strong> '+email+'<br><strong>Organisation:</strong> '+(rMap[ans.q1]||'—')+'<br><strong>Size:</strong> '+(sMap[ans.q2]||'—')+'<br><strong>Challenges:</strong> '+(ans.challenges.join(', ')||'—')+'<br><strong>Region:</strong> '+(gMap[ans.q4]||'—')+'<br><strong>Priority:</strong> '+(fMap[ans.q5]||'—')+'<br><strong>Timeline:</strong> '+(tMap[ans.q6]||'—')+'</p>';
          document.getElementById('prog-bar').style.width='100%';
          goTo(8);
        };
        const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:0.15});
        document.querySelectorAll('.reveal,.reveal-stagger').forEach(el=>observer.observe(el));
      `}}/>
    </>
  )
}
