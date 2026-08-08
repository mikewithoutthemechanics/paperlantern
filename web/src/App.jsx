import { useLayoutEffect, useRef, useState, lazy, Suspense } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LanternScene = lazy(() => import('./three/LanternScene.jsx'))

// TODO: replace with your real Cal.com scheduling link
const BOOKING_URL = 'https://cal.com/michaelkidd/exposure-audit'

const metrics = [
  { value: 22, suffix: '%', label: 'increase in conversion' },
  { value: 95, suffix: '%', label: 'faster first response' },
  { value: 290, suffix: '+', label: 'jobs booked' },
]

const pillars = [
  { n: '01', title: 'Positioning', desc: "Who you are, why it matters, and why a competitor can't say the same thing." },
  { n: '02', title: 'Content', desc: 'The raw material of attention — built to be found and redistributed, not just posted.' },
  { n: '03', title: 'Distribution', desc: 'Getting the work in front of the right people, on the channels where they already are.' },
  { n: '04', title: 'AI Amplification', desc: 'Systems that scale everything above without scaling headcount.' },
]

const steps = [
  { n: '01', title: 'Diagnose', desc: 'We map where visibility is actually breaking down before proposing anything.' },
  { n: '02', title: 'Build', desc: 'We design and ship the system itself — not a recommendations document.' },
  { n: '03', title: 'Compound', desc: 'We stay in the system as it runs, refining instead of resetting every quarter.' },
]

const noList = [
  'One-off campaigns',
  'Vanity metrics',
  'Decks-as-deliverables',
  'Content calendars that reset every quarter',
]

const auditIncludes = [
  'Mini visibility audit — positioning, content, distribution, operations',
  'Visibility breakdown — where you\u2019re invisible, what\u2019s losing you jobs',
  'Priority fixes list — what to do first, what can wait',
  '30–45 min walkthrough call — we go through it together',
]

function Counter({ to, suffix = '', duration = 1.8 }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)

  useLayoutEffect(() => {
    const obj = { v: 0 }
    const tween = gsap.to(obj, {
      v: to,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 88%',
        once: true,
      },
      onUpdate: () => setVal(Math.round(obj.v)),
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [to, duration])

  return (
    <div ref={ref}>
      <div className="value">{val}{suffix}</div>
    </div>
  )
}

function UseLanternLockup() {
  const markRef = useRef(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(markRef.current, {
        y: 4,
        repeat: -1,
        yoyo: true,
        duration: 2.2,
        ease: 'sine.inOut',
      })
    }, markRef)
    return () => ctx.revert()
  }, [])

  return (
    <span className="logo">
      <span ref={markRef} className="logo-mark">◐</span>
      PaperLantern
    </span>
  )
}

export default function App() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // hero entrance
      gsap.from('.hero .hero-left > *', {
        y: 44,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.15,
      })
      gsap.from('.terminal', {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        delay: 0.55,
      })

      // reveal sections
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.fromTo(el,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          }
        )
      })

      // card stagger for grids
      document.querySelectorAll('[data-stagger]').forEach((wrap) => {
        const targets = wrap.querySelectorAll('.card, .pillar, .step')
        gsap.fromTo(targets,
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: { trigger: wrap, start: 'top 82%', once: true },
          }
        )
      })

      // log timeline stagger
      gsap.fromTo('.log-item',
        { autoAlpha: 0, x: -36 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.16,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.log-timeline', start: 'top 80%', once: true },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref}>
      {/* NAV */}
      <nav className="nav">
        <div className="container nav-inner">
          <a href="#top"><UseLanternLockup /></a>
          <div className="nav-links">
            <a href="#audit">Exposure Audit</a>
            <a href="#system">System</a>
            <a href="#outcomes">Outcomes</a>
            <a href="#work">How we work</a>
            <a href="#proof">Proof</a>
          </div>
          <a className="cta" href={BOOKING_URL}>Book an Exposure Audit</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="canvas-wrap">
          <Suspense fallback={null}>
            <LanternScene />
          </Suspense>
        </div>
        <div className="hero-overlay" />
        <div className="hero-inner">
          <div className="hero-left">
            <span className="eyebrow">An Exposure Systems Firm</span>
            <h1>
              Visibility isn't <span className="accent">luck.</span><br />
              <span className="grad">It's engineered.</span>
            </h1>
            <p className="sub">
              You're invisible online and losing jobs to competitors who aren't better — just more visible.
              PaperLantern builds the positioning, content, and distribution infrastructure most agencies only strategize about.
            </p>
            <div className="hero-actions">
              <a className="cta" href={BOOKING_URL}>Book an Exposure Audit</a>
              <a className="cta ghost" href="#proof">See how we ship</a>
            </div>
            <div className="hero-log">
              <span className="term-key">$ exposure-system.log</span><br />
              <span className="term-dim">// punctual-plumbers.co.za</span><br />
              <span className="term-dim">status:</span> <span className="term-bright">compounding</span><br />
              <span className="term-dim">conversion:</span> <span className="term-bright term-key">+22%</span> <span className="term-dim">response:</span> <span className="term-bright term-key">-95%</span> <span className="term-dim">booked:</span> <span className="term-bright term-key">290+</span>
            </div>
          </div>
          <div className="hero-right">
            <div className="terminal">
              <div className="terminal-title">
                <span className="dot red" />
                <span className="dot amber" />
                <span className="dot" />
                <span style={{ marginLeft: 6 }}>exposure-system.sh</span>
              </div>
              <div className="term-line"><span className="term-key">$</span> paperlantern --diagnose</div>
              <div className="term-line"><span className="term-dim"># mapping visibility leaks…</span></div>
              <div className="term-line"><span className="term-key">positioning:</span> <span className="term-bright">breaking</span></div>
              <div className="term-line"><span className="term-key">content:</span> <span className="term-bright">not redistributable</span></div>
              <div className="term-line"><span className="term-key">distribution:</span> <span className="term-bright">not wired</span></div>
              <div className="term-line"><span className="term-key">recommendation:</span> <span className="term-bright term-key">build the system</span></div>
              <div className="term-line"><span className="term-key">$</span> <span className="blink" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPOSURE AUDIT PRODUCT */}
      <section className="section" id="audit">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Start here</span>
            <h2>The Exposure Audit</h2>
            <p className="muted">A focused visibility audit that shows exactly where your business is losing leads to competitors — before you spend another rand, pound, or dollar on tactics.</p>
          </div>
          <div className="audit-grid" data-stagger>
            <div className="card audit-price">
              <span className="tag">Productized audit</span>
              <div className="audit-amount">$495</div>
              <div className="muted">~R8,900 · ~£390 · ~$AUD750</div>
              <ul className="check-list">
                {auditIncludes.map((item) => (
                  <li key={item}>✓ {item}</li>
                ))}
              </ul>
              <a className="cta" href={BOOKING_URL} style={{ marginTop: 18, width: '100%' }}>
                Book the audit →{'\u00A0'}{'\u2192'}
              </a>
            </div>
            <div className="card audit-note">
              <span className="tag">How it works</span>
              <h3>Five business days.</h3>
              <p>Complete a short intake form, we run the audit, you get a visibility breakdown + priority fixes list, and we walk through it together on a 30–45 min call.</p>
              <p style={{ marginTop: 14 }}>If the fit is clear, we can scope a full <strong>Build</strong> or <strong>Compound</strong> engagement after. If not, you get an honest DIY roadmap.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section" id="system">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">The Problem</span>
            <h2>You're not invisible because you're bad. You're invisible because you don't have a system.</h2>
            <p className="muted">Competitors are winning jobs they don't deserve because they're visible when the customer is looking. PaperLantern doesn't sell tactics. We build the infrastructure that makes visibility compound.</p>
          </div>
          <div className="problem-grid" data-stagger>
            <div className="card">
              <span className="tag">01</span>
              <h3>Positioning</h3>
              <p>If a competitor can say the same sentence about themselves, you don't have a position. You have a placeholder.</p>
            </div>
            <div className="card">
              <span className="tag">02</span>
              <h3>Content</h3>
              <p>Most content is publish-and-forget. Real content is built to be found and redistributed — forever.</p>
            </div>
            <div className="card">
              <span className="tag">03</span>
              <h3>Distribution</h3>
              <p>Great work means nothing if it never reaches the people who need it. Distribution is the difference between noise and revenue.</p>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="section" id="outcomes">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">What's in the system</span>
            <h2>Outcomes, not deliverables</h2>
            <p className="muted">We don't hand you a deck. We ship the system — and show our work.</p>
          </div>
          <div className="pillars" data-stagger>
            {pillars.map((p) => (
              <div className="pillar" key={p.n}>
                <div className="num">{p.n}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="section" id="work">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">How we work</span>
            <h2>Diagnose. Build. Compound.</h2>
            <p className="muted">Not a recommendations document. Not a deck. A system that ships results.</p>
          </div>
          <div className="steps" data-stagger>
            {steps.map((s) => (
              <div className="step" key={s.n}>
                <div className="step-index">0{s.n} / 03</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section className="section" id="proof">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">exposure-system.log — punctual-plumbers.co.za</span>
            <h2>Proof, not promises.</h2>
            <p className="muted">This is what a shipped system looks like — infrastructure, not a brochure page.</p>
          </div>

          <div className="log-timeline">
            {[
              { week: 'WEEK 01', strong: 'POSITIONING', desc: 'Repositioned from "local plumber" to the only trades brand in the region running a real booking system.' },
              { week: 'WEEK 02-03', strong: 'BUILD', desc: 'Shipped the site, job management system, and booking flow — infrastructure, not a brochure page.' },
              { week: 'WEEK 04', strong: 'DISTRIBUTION', desc: 'Wired local SEO and answer-engine visibility directly into the booking flow.' },
            ].map((row) => (
              <div className="log-item" key={row.week}>
                <div className="log-week">{row.week}</div>
                <div className="log-action">
                  <strong>{row.strong}</strong>
                  <span>{row.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="metrics">
            {metrics.map((m) => (
              <div className="metric reveal" key={m.label}>
                <Counter to={m.value} suffix={m.suffix} />
                <div className="label">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DON'T DO */}
      <section className="section" id="fence">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">The fence</span>
            <h2>What we don't do</h2>
          </div>
          <ul className="no-list">
            {noList.map((item) => (
              <li className="reveal" key={item}><span className="x">✕</span>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section final">
        <div className="container reveal">
          <span className="eyebrow">Get seen. Get booked.</span>
          <h2>Ready to engineer your visibility?</h2>
          <p>
            Book an Exposure Audit and we'll show exactly where your visibility is breaking —
            before you spend another rand, pound, or dollar on tactics.
          </p>
          <a className="cta" href={BOOKING_URL}>Book an Exposure Audit</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <strong style={{ color: 'var(--text)' }}>PaperLantern</strong> · An Exposure Systems Firm
          </div>
          <div>South Africa · UAE · UK · Australia</div>
          <div>paperlantern.xyz</div>
        </div>
      </footer>
    </div>
  )
}
