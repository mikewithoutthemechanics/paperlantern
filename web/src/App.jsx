import { useEffect, useLayoutEffect, useRef, lazy, Suspense } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const LanternScene = lazy(() => import('./three/LanternScene.jsx'))

const BOOKING_URL = 'https://cal.com/michaelkidd/exposure-audit'

const metrics = [
  { value: 22, suffix: '%', label: 'increase in conversion' },
  { value: 95, suffix: '%', label: 'faster first response' },
  { value: 290, suffix: '+', label: 'jobs booked' },
]

function Counter({ to, suffix = '', duration = 2.4, label }) {
  const ref = useRef(null)
  const numRef = useRef(null)

  useLayoutEffect(() => {
    const obj = { v: 0 }
    const tween = gsap.to(obj, {
      v: to,
      duration,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 82%',
        once: true,
      },
      onUpdate: () => {
        if (numRef.current) numRef.current.textContent = Math.round(obj.v) + suffix
      },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [to, suffix, duration])

  return (
    <div ref={ref} className="metric">
      <div className="metric-num" ref={numRef}>0{suffix}</div>
      <div className="metric-label">{label}</div>
    </div>
  )
}

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])
}

export default function App() {
  const root = useRef(null)

  useLenis()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ---------- hero entrance ----------
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-line', { yPercent: 110, duration: 1.3, stagger: 0.09 })
        .from('.hero-meta', { opacity: 0, y: 22, duration: 0.8, stagger: 0.08 }, '-=0.6')
        .from('.hero-cta-row', { opacity: 0, y: 30, duration: 0.7 }, '-=0.4')

      // ---------- pinned "position" section ----------
      gsap.utils.toArray('.pin-scene').forEach((scene) => {
        const tweenTarget = scene.querySelector('[data-scene-tween]')
        gsap.to(tweenTarget, {
          scale: 1.2,
          opacity: 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: scene,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      // word scramble effect
      gsap.utils.toArray('.scramble').forEach((el) => {
        const original = el.textContent
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        })
        let progress = 0
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*+/'
        tl.to(el, {
          duration: 1.6,
          ease: 'none',
          onUpdate: function () {
            progress = this.progress()
            const shown = Math.floor(progress * original.length)
            let out = original.slice(0, shown)
            for (let i = shown; i < original.length; i++) {
              out += chars[Math.floor(Math.random() * chars.length)]
            }
            el.textContent = out
          },
          onComplete: () => { el.textContent = original }
        })
      })

      // ---------- content dispersion ----------
      gsap.to('.content-fragments .frag', {
        x: () => gsap.utils.random(-180, 180),
        y: () => gsap.utils.random(-80, 80),
        opacity: 0.25,
        duration: 1.1,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.content-scene',
          start: 'top 55%',
          once: true,
        },
      })

      // ---------- amplification repeated rows ----------
      gsap.to('.amp-row', {
        xPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.amp-scene',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // ---------- metrics ----------
      gsap.from('.metric', {
        opacity: 0,
        y: 26,
        duration: 0.8,
        stagger: 0.14,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.compound-scene', start: 'top 70%', once: true },
      })

      // ---------- generic reveal ----------
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.fromTo(el,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          }
        )
      })

      // ---------- final cta pulses ----------
      gsap.to('.cta-pulse', {
        scale: 1.08,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="exp">
      {/* ---------- top bar ---------- */}
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#top">
            <span className="brand-mark">◐</span>
            <span className="brand-name">PaperLantern</span>
            <span className="brand-note">.xyz</span>
          </a>
          <nav className="nav-links">
            <a href="#position">Position</a>
            <a href="#content">Content</a>
            <a href="#distribute">Distribute</a>
            <a href="#amplify">Amplify</a>
            <a href="#compound">Compound</a>
          </nav>
          <a className="cta-mini" href={BOOKING_URL}>Book audit</a>
        </div>
      </header>

      {/* ---------- 01: POSITION ---------- */}
      <section className="pin-scene scene-position" id="position">
        <div className="bg-canvas" data-scene-tween>
          <Suspense fallback={null}><LanternScene /></Suspense>
        </div>
        <div className="scene-ink" data-scene-tween />
        <div className="container hero-stack">
          <p className="eyebrow rev">An Exposure Systems Firm / 001</p>
          <div className="hero-lines">
            <h1 className="headline">
              <span className="hero-line">Visibility isn't</span>
              <span className="hero-line amber">luck.</span>
              <span className="hero-line outline">It's engineered.</span>
            </h1>
          </div>
          <p className="hero-meta">
            Most agencies sell tactics. We build the infrastructure that makes attention compound.
          </p>
          <div className="hero-cta-row">
            <a className="cta-big" href={BOOKING_URL}>Start with an Exposure Audit →</a>
            <span className="hero-meta mono">SA · UAE · UK · AU</span>
          </div>
          <div className="corner-meta tl">31.2577° S</div>
          <div className="corner-meta br">28.0473° E</div>
        </div>
      </section>

      {/* ---------- 02: CONTENT / THE FUTURE ---------- */}
      <section className="scene-future" id="content">
        <div className="container">
          <div className="section-tag reveal"><span>02 / Content</span></div>
          <h2 className="reason-line reveal">The future of visibility is not<br /><span className="scramble">louder. It's systemic.</span></h2>
          <div className="content-scene">
            <div className="source-line reveal">
              <span className="mono">source.md</span>
              <p className="big-statement">
                Positioning that's actually differentiated.<br />
                Content built to be redistributed.<br />
                Distribution wired into how you already operate.
              </p>
            </div>
            <div className="content-fragments">
              {['position', 'redistribute', 'system', 'attention', 'engine', 'export', 'repeat', 'amplify'].map((w) => (
                <span className="frag mono" key={w}>{w}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 03: DISTRIBUTE ---------- */}
      <section className="scene-distribute" id="distribute">
        <div className="container">
          <div className="section-tag reveal"><span>03 / Distribution</span></div>
          <h2 className="reveal">It's not about reaching everyone.<br /><span className="amber">It's about reaching the right ones.</span></h2>
          <div className="dist-grid">
            <div className="frame reveal">
              <div className="frame-head">GOOGLE / LOCAL</div>
              <div className="frame-body">
                <span className="block amber-block"></span>
                <span className="block line-block"></span>
                <span className="block gray-block"></span>
              </div>
              <div className="frame-status mono">wired → booking</div>
            </div>
            <div className="frame reveal">
              <div className="frame-head">LINKEDIN / OWNER</div>
              <div className="frame-body">
                <span className="block amber-block"></span>
                <span className="block line-block"></span>
                <span className="block line-block"></span>
              </div>
              <div className="frame-status mono">wired → pipeline</div>
            </div>
            <div className="frame reveal">
              <div className="frame-head">ANSWER ENGINE</div>
              <div className="frame-body">
                <span className="block amber-block"></span>
                <span className="block amber-block"></span>
                <span className="block line-block"></span>
              </div>
              <div className="frame-status mono">wired → search</div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 04: AMPLIFY ---------- */}
      <section className="scene-amp amplify" id="amplify">
        <div className="container">
          <div className="section-tag reveal"><span>04 / AI Amplification</span></div>
          <h2 className="reveal">One system.</h2>
          <p className="reveal muted-big">Infinite output. Same headcount.</p>
        </div>
        <div className="amp-marquee">
          {[1,2,3].map((i) => (
            <div className="amp-row" key={i}>
              {Array.from({length: 6}).map((_, j) => (
                <span key={j} className="amp-word mono">{i}.{j} exposure powered redistributed ×{i}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ---------- 05: COMPOUND ---------- */}
      <section className="scene-compounds" id="compound">
        <div className="container">
          <div className="section-tag reveal"><span>05 / Proof</span></div>
          <h2 className="reveal">Compounding, not resetting.</h2>
          <div className="proof-log">
            <div className="log-row reveal">
              <div className="log-week mono">WEEK 01</div>
              <div className="log-txt"><strong>Positioning</strong><span>From "local plumber" to the only trades brand running a real booking system.</span></div>
            </div>
            <div className="log-row reveal">
              <div className="log-week mono">WEEK 02–03</div>
              <div className="log-txt"><strong>Build</strong><span>Site, job management, booking flow. Infrastructure, not a brochure.</span></div>
            </div>
            <div className="log-row reveal">
              <div className="log-week mono">WEEK 04</div>
              <div className="log-txt"><strong>Distribution</strong><span>Local SEO + answer-engine visibility wired directly into booking.</span></div>
            </div>
          </div>
          <div className="metrics-row">
            {metrics.map((m) => <Counter key={m.label} to={m.value} suffix={m.suffix} label={m.label} />)}
          </div>
        </div>
      </section>

      {/* ---------- 06: FENCE ---------- */}
      <section className="scene-fence">
        <div className="container">
          <div className="section-tag reveal"><span>06 / The fence</span></div>
          <ul className="no-list">
            <li className="reveal"><span className="x">✕</span> One-off campaigns</li>
            <li className="reveal"><span className="x">✕</span> Vanity metrics</li>
            <li className="reveal"><span className="x">✕</span> Decks-as-deliverables</li>
            <li className="reveal"><span className="x">✕</span> Quarterly resets</li>
          </ul>
        </div>
      </section>

      {/* ---------- final CTA ---------- */}
      <section className="final-cta">
        <div className="container">
          <p className="eyebrow reveal">Get seen. Get booked.</p>
          <h2 className="reveal">Let's engineer your visibility.</h2>
          <div className="cta-pulse-wrap reveal">
            <a className="cta-big" href={BOOKING_URL}>Book an Exposure Audit →</a>
          </div>
          <p className="mono muted-sm">The future of visibility is a system. Start with a map.</p>
        </div>
      </section>

      {/* ---------- footer ---------- */}
      <footer className="footer">
        <div className="container footer-inner">
          <span>PaperLantern — Exposure Systems Firm</span>
          <span className="mono">South Africa · UAE · UK · Australia</span>
          <span className="mono">paperlantern.xyz</span>
        </div>
      </footer>
    </div>
  )
}
