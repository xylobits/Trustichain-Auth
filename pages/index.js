import Head from 'next/head'
import { useState } from 'react'
import QuestionnaireModal from '../components/QuestionnaireModal'

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Head>
        <title>TrustiChain — Pharmaceutical Supply Chain Security</title>
        <meta name="description" content="Blockchain-verified pharmaceuticals — every pill authenticated, every life protected." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        :root {
          --ink: #0a0f1a;
          --paper: #f5f0e8;
          --teal: #00b4a0;
          --teal-dark: #007a6e;
          --gold: #c9a84c;
          --red: #d64045;
          --muted: #6b7280;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: var(--ink); color: var(--paper); font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
        .slide { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 6vw 8vw; position: relative; overflow: hidden; }
        .slide::before { content: ''; position: absolute; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); pointer-events: none; opacity: 0.4; z-index: 0; }
        .slide > * { position: relative; z-index: 1; }
        #s1 { background: var(--ink); justify-content: space-between; padding-top: 10vh; padding-bottom: 8vh; }
        .hero-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(5rem, 14vw, 13rem); line-height: 0.9; letter-spacing: -0.01em; color: var(--paper); animation: fadeUp 0.9s 0.4s both; }
        .hero-title span { color: var(--teal); display: block; }
        .hero-sub { font-family: 'DM Serif Display', serif; font-style: italic; font-size: clamp(1.1rem, 2.2vw, 1.6rem); color: var(--gold); margin-top: 2rem; max-width: 600px; animation: fadeUp 0.9s 0.6s both; }
        .hero-stat-row { display: flex; gap: 4rem; margin-top: 6vh; animation: fadeUp 0.9s 0.8s both; flex-wrap: wrap; }
        .hero-stat .num { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.5rem, 5vw, 4rem); color: var(--teal); line-height: 1; }
        .hero-stat .label { font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); margin-top: 0.3rem; }
        .hero-line { position: absolute; right: 8vw; top: 50%; transform: translateY(-50%); width: 1px; height: 60vh; background: linear-gradient(to bottom, transparent, var(--teal), transparent); animation: fadeIn 1.5s 1s both; }
        .hero-chain { position: absolute; right: 6vw; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 1.5rem; animation: fadeIn 1s 1.2s both; }
        .chain-node { width: 12px; height: 12px; border-radius: 50%; background: var(--teal); box-shadow: 0 0 12px var(--teal); animation: glow 2.5s ease-in-out infinite; }
        .chain-node:nth-child(odd) { background: var(--gold); box-shadow: 0 0 12px var(--gold); }
        #s2 { background: #0e0a06; }
        .slide-label { font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted); margin-bottom: 3rem; }
        .big-number { font-family: 'Bebas Neue', sans-serif; font-size: clamp(6rem, 18vw, 16rem); line-height: 0.85; color: var(--red); opacity: 0.15; position: absolute; right: 5vw; top: 50%; transform: translateY(-50%); pointer-events: none; letter-spacing: -0.02em; }
        .section-title { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 5vw, 4rem); line-height: 1.15; margin-bottom: 3rem; max-width: 700px; }
        .problem-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; max-width: 900px; }
        .prob-card { border: 1px solid rgba(255,255,255,0.08); border-left: 3px solid var(--red); padding: 1.5rem; background: rgba(255,255,255,0.02); transition: border-color 0.3s, background 0.3s; }
        .prob-card:hover { border-left-color: var(--teal); background: rgba(0,180,160,0.05); }
        .prob-card .stat { font-family: 'Bebas Neue', sans-serif; font-size: 2.2rem; color: var(--red); line-height: 1; }
        .prob-card p { font-size: 0.85rem; color: var(--muted); margin-top: 0.5rem; line-height: 1.6; }
        #s3 { background: #050f0e; }
        .solution-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 5vw; align-items: center; max-width: 1100px; }
        .solution-desc { font-size: 1rem; line-height: 1.8; color: #a0a8b0; max-width: 480px; }
        .step { display: flex; gap: 1.5rem; padding: 1.8rem 0; border-bottom: 1px solid rgba(255,255,255,0.06); align-items: flex-start; }
        .step:last-child { border-bottom: none; }
        .step-num { font-family: 'Bebas Neue', sans-serif; font-size: 2.5rem; color: var(--teal); opacity: 0.3; line-height: 1; min-width: 2.5rem; transition: opacity 0.3s; }
        .step:hover .step-num { opacity: 1; }
        .step-body h4 { font-family: 'DM Serif Display', serif; font-size: 1.1rem; margin-bottom: 0.4rem; }
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
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 6px rgba(0,180,160,0.3); } 50% { box-shadow: 0 0 20px rgba(0,180,160,0.7); } }
        @media (max-width: 768px) { .solution-wrap { grid-template-columns: 1fr; } .hero-stat-row { gap: 2rem; } }
      `}</style>

      <nav className="nav">
        <a href="#s1" />
        <a href="#s2" />
        <a href="#s3" />
        <a href="#s4" />
        <a href="#s5" />
        <a href="#s6" />
      </nav>

      {/* SLIDE 1 */}
      <section className="slide" id="s1">
        <div className="hero-title">Trusti<span>Chain</span></div>
        <div className="hero-sub">Blockchain-verified pharmaceuticals — every pill authenticated, every life protected.</div>
        <div className="hero-stat-row">
          <div className="hero-stat"><div className="num">500K</div><div className="label">Deaths / Year from Counterfeits</div></div>
          <div className="hero-stat"><div className="num">$200B</div><div className="label">Global Counterfeit Drug Market</div></div>
          <div className="hero-stat"><div className="num">10%</div><div className="label">Of Global Medicines Are Fake</div></div>
        </div>
        <div className="hero-line" />
        <div className="hero-chain">
          {[1,2,3,4,5].map(i => <div key={i} className="chain-node" />)}
        </div>
      </section>

      {/* SLIDE 2 */}
      <section className="slide" id="s2">
        <div className="slide-label">01 — The Problem</div>
        <div className="big-number">10%</div>
        <div className="section-title">The pharmaceutical supply chain is <em style={{fontStyle:'italic',color:'var(--red)'}}>broken</em> — and people are dying for it.</div>
        <div className="problem-grid">
          {[['500K+','People die annually from counterfeit medications.'],['1 in 10','Medical products in LMICs are substandard or falsified.'],['$200B','Lost annually to counterfeits — eroding brand trust.'],['Zero','Reliable real-time verification at point of dispensing.']].map(([s,p]) => (
            <div key={s} className="prob-card"><div className="stat">{s}</div><p>{p}</p></div>
          ))}
        </div>
      </section>

      {/* SLIDE 3 */}
      <section className="slide" id="s3">
        <div className="slide-label">02 — Our Solution</div>
        <div className="solution-wrap">
          <div className="solution-left">
            <div className="divider" />
            <div className="section-title">A tamper-proof digital identity for every drug that exists.</div>
            <p className="solution-desc">TrustiChain assigns a unique, blockchain-registered identity to every pharmaceutical batch at the point of manufacture. That identity travels with the product — immutably — through every hand it passes through, until it reaches the patient.</p>
          </div>
          <div className="solution-right">
            {[['01','Digital Birth Certificate','Each batch receives a QR/NFC token written to the blockchain at manufacturing.'],['02','Chain-of-Custody Logging','Every transfer is recorded as an immutable on-chain event.'],['03','Last-Mile Verification','Pharmacists and patients scan to instantly verify authenticity.'],['04','Counterfeit Flagging','Any product that fails verification is flagged system-wide in real time.']].map(([n,h,p]) => (
              <div key={n} className="step"><div className="step-num">{n}</div><div className="step-body"><h4>{h}</h4><p>{p}</p></div></div>
            ))}
          </div>
        </div>
      </section>

      {/* SLIDE 4 */}
      <section className="slide" id="s4">
        <div className="slide-label">03 — How It Works</div>
        <div className="section-title" style={{maxWidth:'600px'}}>From factory floor to the patient's hand — every step verified.</div>
        <div className="flow-row">
          {[['🏭','Manufacturer','Batch minted on blockchain'],['🚚','Distributor','Transfer recorded on-chain'],['🏪','Pharmacy','Blockchain confirms pathway'],['📱','Patient','Scans QR for instant result'],['🛡️','Protected','Counterfeit blocked — life saved']].map(([icon,h,p], i, arr) => (
            <>
              <div key={h} className="flow-node"><div className="flow-icon">{icon}</div><h4>{h}</h4><p>{p}</p></div>
              {i < arr.length-1 && <div className="flow-arrow">→</div>}
            </>
          ))}
        </div>
      </section>

      {/* SLIDE 5 */}
      <section className="slide" id="s5">
        <div className="slide-label">04 — The Impact</div>
        <div className="section-title" style={{maxWidth:'700px'}}>When every pill tells the truth, people stop dying from lies.</div>
        <div className="impact-grid">
          {[['❤️‍🩹','Lives Saved','Eliminate the counterfeit pathway at the last mile.'],['🔗','Full Traceability','Every product traceable from source to patient in seconds.'],['⚡','Real-Time Alerts','Counterfeit detected → flagged system-wide instantly.'],['🌍','Global Scale','Deployable across emerging markets where risk is highest.'],['💊','Brand Trust','Manufacturers reclaim $200B in losses.']].map(([icon,h,p]) => (
            <div key={h} className="impact-card"><div className="icon">{icon}</div><h3>{h}</h3><p>{p}</p></div>
          ))}
        </div>
      </section>

      {/* SLIDE 6 */}
      <section className="slide" id="s6">
        <div className="cta-pre">The Ask</div>
        <div className="cta-title">Every Pill.<br /><em>Every Person.</em><br />Protected.</div>
        <div className="cta-sub">Join us in building the infrastructure that makes counterfeit pharmaceuticals impossible — not just illegal.</div>
        <button className="cta-btn" onClick={() => setModalOpen(true)}>Partner With TrustiChain →</button>
      </section>

      <QuestionnaireModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
