import Nav from '@/components/Nav'
import styles from './page.module.css'

const CG_URL = process.env.NEXT_PUBLIC_CYBERGUARD_URL || 'https://cyberguard.visull.com'
const RM_URL = process.env.NEXT_PUBLIC_REPORTMIND_URL || 'https://reportmind.visull.com'

export default function HomePage() {
  return (
    <>
      <Nav cgUrl={CG_URL} rmUrl={RM_URL} />
      <main>

        {/* ── Hero ────────────────────────────────────────────── */}
        <section className={styles.hero}>
          <div className="container">
            <p className={styles.eyebrow}>Business software that stays focused</p>
            <h1 className={styles.heroTitle}>
              One problem.<br />
              <em className="serif">One tool.</em><br />
              Done right.
            </h1>
            <p className={styles.heroSub}>
              Visull builds focused software for small businesses.
              Each tool does one thing exceptionally well —
              no bloat, no feature creep, no learning curve.
            </p>
          </div>
          <div className={styles.heroOrb} aria-hidden="true" />
        </section>

        {/* ── Tools ───────────────────────────────────────────── */}
        <section className={styles.tools} id="tools">
          <div className="container">
            <div className={styles.toolsGrid}>

              {/* CyberGuard */}
              <article className={styles.toolCard}>
                <div className={styles.toolHeader}>
                  <div className={styles.toolIconWrap} style={{'--c':'#0d9488'}}>🛡️</div>
                  <div>
                    <span className={styles.toolLive} style={{'--c':'#0d9488'}}>Live</span>
                    <h2 className={styles.toolName}>CyberGuard</h2>
                    <p className={styles.toolTagline}>Domain security in 90 seconds</p>
                  </div>
                </div>

                <p className={styles.toolDesc}>
                  Most small businesses have no idea if their domain is exposed.
                  CyberGuard runs 9 security checks — DNS, SSL, email authentication,
                  credential breaches, open ports — and gives you a plain-English
                  score with exactly what to fix.
                </p>

                <div className={styles.toolStats}>
                  <div className={styles.stat}>
                    <span className={styles.statN}>9</span>
                    <span className={styles.statL}>security checks</span>
                  </div>
                  <div className={styles.statDiv} />
                  <div className={styles.stat}>
                    <span className={styles.statN}>90s</span>
                    <span className={styles.statL}>to your score</span>
                  </div>
                  <div className={styles.statDiv} />
                  <div className={styles.stat}>
                    <span className={styles.statN}>free</span>
                    <span className={styles.statL}>1 domain, no card</span>
                  </div>
                </div>

                <ul className={styles.feats}>
                  {[
                    'DNS, SSL & email auth (SPF/DKIM/DMARC)',
                    'Credential breach detection via HIBP',
                    'Open port & vulnerability scanning',
                    'Cloud integrations: AWS, M365, GitHub',
                    'Employee phishing simulations',
                    'Weekly email digest & Slack alerts',
                    'SOC 2 / ISO 27001 compliance mapping',
                  ].map(f => (
                    <li key={f}><span style={{color:'#0d9488'}}>✓</span>{f}</li>
                  ))}
                </ul>

                <div className={styles.toolFooter}>
                  <a href={CG_URL} className={styles.ctaPrimary} style={{'--c':'#0d9488','--ch':'#0f766e'}}>
                    Start free — no card needed →
                  </a>
                  <span className={styles.toolPrice}>Free for 1 domain · Pro from $49/mo</span>
                </div>
              </article>

              {/* ReportMind */}
              <article className={styles.toolCard}>
                <div className={styles.toolHeader}>
                  <div className={styles.toolIconWrap} style={{'--c':'#7c3aed'}}>📊</div>
                  <div>
                    <span className={styles.toolLive} style={{'--c':'#7c3aed'}}>Live</span>
                    <h2 className={styles.toolName}>ReportMind</h2>
                    <p className={styles.toolTagline}>Client reports in 45 seconds</p>
                  </div>
                </div>

                <p className={styles.toolDesc}>
                  Marketing agencies spend 4–8 hours per client every month
                  pulling data and writing reports. ReportMind connects to
                  Google Ads, GA4 and Search Console, pulls the numbers,
                  then uses AI to write the client email narrative.
                </p>

                <div className={styles.toolStats}>
                  <div className={styles.stat}>
                    <span className={styles.statN}>45s</span>
                    <span className={styles.statL}>per report</span>
                  </div>
                  <div className={styles.statDiv} />
                  <div className={styles.stat}>
                    <span className={styles.statN}>−97%</span>
                    <span className={styles.statL}>time saved</span>
                  </div>
                  <div className={styles.statDiv} />
                  <div className={styles.stat}>
                    <span className={styles.statN}>3</span>
                    <span className={styles.statL}>data sources</span>
                  </div>
                </div>

                <ul className={styles.feats}>
                  {[
                    'Live Google Ads, GA4 & Search Console sync',
                    'AI-written client email narrative',
                    'White-label PDF exports',
                    'Multi-client workspace management',
                    'Automated monthly scheduling',
                    'Custom branding & logo support',
                  ].map(f => (
                    <li key={f}><span style={{color:'#7c3aed'}}>✓</span>{f}</li>
                  ))}
                </ul>

                <div className={styles.toolFooter}>
                  <a href={RM_URL} className={styles.ctaPrimary} style={{'--c':'#7c3aed','--ch':'#6d28d9'}}>
                    Start free trial →
                  </a>
                  <span className={styles.toolPrice}>From $49/mo · 14-day free trial</span>
                </div>
              </article>

            </div>
          </div>
        </section>

        {/* ── Why Visull ──────────────────────────────────────── */}
        <section className={styles.why} id="why">
          <div className="container">
            <div className={styles.whyInner}>
              <div className={styles.whyText}>
                <p className={styles.sectionEyebrow}>Why Visull</p>
                <h2 className={styles.sectionTitle}>
                  We build tools,<br /><em className="serif">not platforms.</em>
                </h2>
                <p className={styles.whyBody}>
                  Most business software tries to do everything and ends up doing
                  nothing well. We pick one problem, build the best possible
                  solution for it, and ship it. Each Visull tool is a complete
                  product — its own signup, its own focus, its own excellence.
                </p>
                <p className={styles.whyBody}>
                  Small businesses deserve software as good as what enterprises use,
                  without the enterprise complexity, price tag, or onboarding consultant.
                </p>
              </div>
              <div className={styles.whyCards}>
                {[
                  { icon:'🎯', title:'One job, done well', body:'Each tool solves exactly one problem. No feature bloat, no unused tabs, no six-month implementation.' },
                  { icon:'⚡', title:'Fast to value', body:'CyberGuard gives you a security score in 90 seconds. ReportMind generates a client report in 45. You see results before you finish your coffee.' },
                  { icon:'💰', title:'SMB pricing', body:'Free tiers that are actually useful. Paid plans that don\'t require a procurement process. No per-seat pricing surprises.' },
                ].map(c => (
                  <div key={c.title} className={styles.whyCard}>
                    <span className={styles.whyIcon}>{c.icon}</span>
                    <h3 className={styles.whyCardTitle}>{c.title}</h3>
                    <p className={styles.whyCardBody}>{c.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────── */}
        <section className={styles.faq} id="faq">
          <div className="container">
            <div className={styles.faqInner}>
              <div>
                <p className={styles.sectionEyebrow}>FAQ</p>
                <h2 className={styles.sectionTitle}>
                  Common<br /><em className="serif">questions</em>
                </h2>
              </div>
              <div className={styles.faqList}>
                {[
                  { q:'Do I need one account for all tools?', a:'No — each tool has its own account. Sign up for the tool you need. If you later use a second tool, it\'s a separate account. We keep things focused.' },
                  { q:'Is CyberGuard really free?', a:'Yes. CyberGuard is free for 1 domain, no credit card required. You get all 9 security checks, DNS/SSL/email auth monitoring, and breach detection — free forever.' },
                  { q:'Who is ReportMind for?', a:'Marketing agencies and freelancers who produce monthly reports for clients. If you spend hours every month pulling Google Ads, GA4 and Search Console data and writing it up — ReportMind is for you.' },
                  { q:'Are the tools connected?', a:'They\'re built by the same team and share the same quality bar, but they\'re separate products for separate needs. There\'s no bundle or combined login — each tool stands on its own.' },
                  { q:'What\'s coming next?', a:'We\'re working on more focused tools for small businesses. Follow us or check back here.' },
                ].map(item => (
                  <details key={item.q} className={styles.faqItem}>
                    <summary className={styles.faqQ}>{item.q}</summary>
                    <p className={styles.faqA}>{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────── */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaGrid}>
              <div className={styles.ctaCard} style={{'--c':'#0d9488'}}>
                <span className={styles.ctaIcon}>🛡️</span>
                <h3 className={styles.ctaTitle}>Secure your domain</h3>
                <p className={styles.ctaSub}>Get your security score in 90 seconds. Free for 1 domain.</p>
                <a href={CG_URL} className={styles.ctaBtn} style={{'--c':'#0d9488','--ch':'#0f766e'}}>
                  Try CyberGuard free →
                </a>
              </div>
              <div className={styles.ctaCard} style={{'--c':'#7c3aed'}}>
                <span className={styles.ctaIcon}>📊</span>
                <h3 className={styles.ctaTitle}>Fix your reporting</h3>
                <p className={styles.ctaSub}>Turn 4–8 hours of client reporting into 45 seconds.</p>
                <a href={RM_URL} className={styles.ctaBtn} style={{'--c':'#7c3aed','--ch':'#6d28d9'}}>
                  Try ReportMind free →
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerInner}>
            <div>
              <p className={styles.footerLogo}>
                <span className="serif">visull</span><span style={{color:'var(--v-teal)'}}>.</span>
              </p>
              <p className={styles.footerTag}>Focused software for growing businesses.</p>
              <p className={styles.footerCopy}>© {new Date().getFullYear()} Visull. All rights reserved.</p>
            </div>
            <nav className={styles.footerNav}>
              <div>
                <p className={styles.footerColHead}>Tools</p>
                <ul>
                  <li><a href={CG_URL}>CyberGuard</a></li>
                  <li><a href={RM_URL}>ReportMind</a></li>
                </ul>
              </div>
              <div>
                <p className={styles.footerColHead}>Company</p>
                <ul>
                  <li><a href="#why">About</a></li>
                  <li><a href="#faq">FAQ</a></li>
                  <li><a href="mailto:hello@visull.com">Contact</a></li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </footer>
    </>
  )
}
