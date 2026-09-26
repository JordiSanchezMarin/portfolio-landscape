import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import {
  profile,
  sections,
  type CvSection,
  type SectionId,
} from './data/cv'

const hotspotPositions: Record<SectionId, { x: string; y: string }> = {
  about: { x: '14%', y: '79%' },
  experience: { x: '58%', y: '63%' },
  education: { x: '52%', y: '36%' },
  skills: { x: '70%', y: '54%' },
  contact: { x: '86%', y: '65%' },
}

const lunarStars = [
  { x: 300, y: 90, size: 0.8 },
  { x: 740, y: 82, size: 0.7 },
  { x: 960, y: 205, size: 0.48 },
  { x: 1500, y: 94, size: 0.62 },
  { x: 270, y: 312, size: 0.48 },
  { x: 735, y: 290, size: 0.46 },
  { x: 975, y: 350, size: 0.7 },
  { x: 1485, y: 315, size: 0.5 },
  { x: 185, y: 440, size: 0.55 },
  { x: 420, y: 430, size: 0.42 },
  { x: 660, y: 442, size: 0.56 },
  { x: 900, y: 424, size: 0.44 },
  { x: 1125, y: 430, size: 0.62 },
  { x: 1450, y: 440, size: 0.45 },
] as const

const profileInitials = profile.name
  .split(' ')
  .filter(Boolean)
  .map((part) => part[0])
  .join('')
  .slice(0, 3)
  .toUpperCase()

function SectionIcon({ id }: { id: SectionId }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  if (id === 'about') {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="3.25" />
        <path d="M5.75 20a6.25 6.25 0 0 1 12.5 0" />
      </svg>
    )
  }
  if (id === 'experience') {
    return (
      <svg {...common}>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M3 12h18M10 12v2h4v-2" />
      </svg>
    )
  }
  if (id === 'education') {
    return (
      <svg {...common}>
        <path d="m3 9 9-5 9 5-9 5-9-5Z" />
        <path d="M7 12v4.2c2.8 2.4 7.2 2.4 10 0V12M21 9v6" />
      </svg>
    )
  }
  if (id === 'skills') {
    return (
      <svg {...common}>
        <path d="m12 3 2.2 5 5.3.5-4 3.6 1.2 5.2L12 14.6l-4.7 2.7 1.2-5.2-4-3.6 5.3-.5L12 3Z" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M4 5h16v12H7l-3 3V5Z" />
      <path d="m7 8 5 4 5-4" />
    </svg>
  )
}

function ResumeDownload({
  className,
  label = 'Download Resume/CV',
}: {
  className: string
  label?: string
}) {
  return (
    <a
      className={`resume-download ${className}`}
      href="/Jordi-Sanchez-Marin-Resume.pdf"
      download="Jordi-Sanchez-Marin-Resume.pdf"
      aria-label="Download Jordi Sanchez Marin's Resume/CV as a PDF"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3v12m-5-5 5 5 5-5M5 20h14" />
      </svg>
      <span>{label}</span>
    </a>
  )
}

function Landscape() {
  return (
    <svg
      className="landscape"
      viewBox="-550 0 2700 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="space" x1="0" y1="0" x2=".9" y2="1">
          <stop offset="0%" stopColor="#020711" />
          <stop offset="52%" stopColor="#09192d" />
          <stop offset="100%" stopColor="#17324a" />
        </linearGradient>
        <radialGradient id="earth" cx=".34" cy=".32" r=".72">
          <stop offset="0%" stopColor="#d9f5ff" />
          <stop offset="18%" stopColor="#79c8e4" />
          <stop offset="52%" stopColor="#2879a6" />
          <stop offset="82%" stopColor="#12385e" />
          <stop offset="100%" stopColor="#061126" />
        </radialGradient>
        <radialGradient id="earthCloud" cx=".3" cy=".22" r=".78">
          <stop offset="0%" stopColor="#fff" stopOpacity=".9" />
          <stop offset="36%" stopColor="#d9f4fb" stopOpacity=".44" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="moonGround" x1=".2" y1="0" x2=".8" y2="1">
          <stop offset="0%" stopColor="#e7e6df" />
          <stop offset="46%" stopColor="#aaa9ab" />
          <stop offset="100%" stopColor="#555865" />
        </linearGradient>
        <radialGradient id="crater" cx=".42" cy=".35" r=".72">
          <stop offset="0%" stopColor="#343743" />
          <stop offset="58%" stopColor="#686b74" />
          <stop offset="78%" stopColor="#c8c7c1" />
          <stop offset="100%" stopColor="#777982" />
        </radialGradient>
        <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eef3f2" />
          <stop offset="33%" stopColor="#778690" />
          <stop offset="62%" stopColor="#d8e2e3" />
          <stop offset="100%" stopColor="#43515c" />
        </linearGradient>
        <linearGradient id="darkMetal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#344b5c" />
          <stop offset="100%" stopColor="#111d29" />
        </linearGradient>
        <radialGradient id="dome" cx=".42" cy=".25" r=".75">
          <stop offset="0%" stopColor="#c9eef3" stopOpacity=".9" />
          <stop offset="42%" stopColor="#4a9bb0" stopOpacity=".75" />
          <stop offset="100%" stopColor="#102c3d" stopOpacity=".95" />
        </radialGradient>
        <radialGradient id="starGold" cx=".34" cy=".22" r=".86">
          <stop offset="0%" stopColor="#fffde8" />
          <stop offset="28%" stopColor="#fff45f" />
          <stop offset="72%" stopColor="#f4bf22" />
          <stop offset="100%" stopColor="#c67b0c" />
        </radialGradient>
        <clipPath id="earthClip">
          <circle cx="1278" cy="202" r="116" />
        </clipPath>
        <filter id="smokeBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <rect x="-550" width="2700" height="900" fill="url(#space)" />
      <g className="hero-stars">
        {lunarStars.map((star) => (
          <g
            key={`${star.x}-${star.y}`}
            transform={`translate(${star.x} ${star.y}) scale(${star.size})`}
          >
            <path
              d="M0-16 4.4-5.6 15.6-4.8 7 2.4 9.8 13.8 0 7.7-9.8 13.8-7 2.4-15.6-4.8-4.4-5.6Z"
              fill="url(#starGold)"
              stroke="#ffe978"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </g>
        ))}
      </g>

      <g className="earth">
        <g transform="translate(900 310) scale(3.45) translate(-1278 -202)">
          <circle cx="1278" cy="202" r="121" fill="none" stroke="#66e6ff" strokeWidth="3" opacity=".9" />
          <circle cx="1278" cy="202" r="116" fill="url(#earth)" />
          <g clipPath="url(#earthClip)">
            <path
              d="M1170 159c33-24 53-14 76-34 24-20 53-10 63 8 9 17-8 29-1 47 10 23 43 20 53 43 8 20-16 26-31 17-24-14-34 13-58 11-24-2-26-27-47-31-23-4-41-11-55-27Z"
              fill="#80a66d"
              opacity=".78"
            />
            <path
              d="M1295 242c27-21 66-12 90 8 4 25-9 57-31 72-29 8-41-10-33-31 7-18-28-24-26-49Z"
              fill="#668f67"
              opacity=".65"
            />
            <path
              d="M1154 116c67 17 87 39 134 33 45-7 78 12 112 46M1168 223c47-16 70 5 105 8 48 4 72-18 110-4M1220 292c39-13 67-1 94 17"
              fill="none"
              stroke="#f2fbff"
              strokeLinecap="round"
              strokeWidth="12"
              opacity=".5"
            />
            <ellipse cx="1248" cy="174" rx="92" ry="83" fill="url(#earthCloud)" />
            <path d="M1350 99c-48 31-79 101-53 207 77-15 112-81 97-144-7-29-22-50-44-63Z" fill="#020713" opacity=".38" />
          </g>
        </g>
      </g>

      <path
        d="M-550 584H0c231-36 392 20 590-3 241-28 423-3 584-20 184-20 288-4 426 34h550v305H-550Z"
        fill="url(#moonGround)"
      />
      <path d="M0 596c267-32 409 31 616-2 180-28 359 3 521-17 180-23 305-8 463 28" fill="none" stroke="#a4a8ad" strokeWidth="5" opacity=".25" />

      <g className="craters">
        <g transform="translate(137 675) rotate(-5)">
          <ellipse rx="112" ry="31" fill="#111722" opacity=".52" />
          <ellipse cy="-8" rx="104" ry="28" fill="url(#crater)" />
          <path d="M-93-12c34-18 142-23 187 5" fill="none" stroke="#92979e" strokeWidth="8" opacity=".35" />
        </g>
        <g transform="translate(672 776) rotate(4)">
          <ellipse rx="146" ry="39" fill="#101620" opacity=".62" />
          <ellipse cy="-11" rx="135" ry="37" fill="url(#crater)" />
          <path d="M-119-17c55-24 180-23 237 7" fill="none" stroke="#8e949c" strokeWidth="9" opacity=".3" />
        </g>
        <g transform="translate(1210 705) rotate(-3)">
          <ellipse rx="82" ry="24" fill="#101620" opacity=".55" />
          <ellipse cy="-6" rx="76" ry="22" fill="url(#crater)" />
          <path d="M-65-11c35-16 91-15 131 4" fill="none" stroke="#92979e" strokeWidth="7" opacity=".3" />
        </g>
        <g transform="translate(1470 836)">
          <ellipse rx="122" ry="32" fill="url(#crater)" />
          <path d="M-105-7c55-22 156-19 207 5" fill="none" stroke="#888f98" strokeWidth="8" opacity=".26" />
        </g>
        <ellipse cx="394" cy="844" rx="41" ry="12" fill="#171e28" opacity=".68" />
        <ellipse cx="1005" cy="833" rx="31" ry="10" fill="#171e28" opacity=".64" />
      </g>

      <g className="galactic-port">
        <g transform="translate(500 230) scale(.66)">
          <ellipse cx="635" cy="610" rx="330" ry="45" fill="#060b12" opacity=".58" />
          <path d="M338 566h559l79 62H279Z" fill="#202b37" />
          <path d="M318 585h615" stroke="#8fd9eb" strokeWidth="3" opacity=".4" />
          <g>
            <path d="M365 565v-81h150v81" fill="url(#darkMetal)" />
            <path d="M372 490h136" stroke="#96a4ad" strokeWidth="5" />
            <path d="M388 513h104M388 538h104" stroke="#ffbd61" strokeWidth="5" opacity=".72" />
            <path d="M350 565h180v23H350Z" fill="#121a24" />
          </g>
          <g>
            <path d="M548 565v-42c0-65 53-118 118-118s118 53 118 118v42Z" fill="url(#dome)" stroke="#7b919d" strokeWidth="5" />
            <path d="M574 514h184M666 407v157M600 437l129 127M732 438 602 564" fill="none" stroke="#a7c4ce" strokeWidth="2" opacity=".32" />
            <path d="M527 563h279v27H527Z" fill="url(#darkMetal)" />
            <g fill="#ffd477">
              <circle cx="570" cy="576" r="4" />
              <circle cx="618" cy="576" r="4" />
              <circle cx="666" cy="576" r="4" />
              <circle cx="714" cy="576" r="4" />
              <circle cx="762" cy="576" r="4" />
            </g>
          </g>
          <g>
            <path d="M816 565V444h74v121" fill="url(#metal)" />
            <path d="M831 460h44v52h-44Z" fill="#11293b" />
            <path d="M853 443V382" stroke="#afb9be" strokeWidth="6" />
            <path d="m854 395 54-31" stroke="#afb9be" strokeWidth="5" />
            <ellipse cx="919" cy="357" rx="44" ry="15" fill="#8e9ca5" transform="rotate(-28 919 357)" />
            <circle className="beacon" cx="853" cy="382" r="6" fill="#ff855d" />
          </g>
          <g className="port-lights" fill="#82dff4">
            <circle cx="365" cy="576" r="4" />
            <circle cx="410" cy="576" r="4" />
            <circle cx="455" cy="576" r="4" />
            <circle cx="810" cy="576" r="4" />
            <circle cx="850" cy="576" r="4" />
            <circle cx="890" cy="576" r="4" />
          </g>
        </g>
      </g>

      <g className="rover-smoke" filter="url(#smokeBlur)" aria-hidden="true">
        <circle className="smoke-puff smoke-puff-1" cx="151" cy="684" r="12" />
        <circle className="smoke-puff smoke-puff-2" cx="129" cy="677" r="17" />
        <circle className="smoke-puff smoke-puff-3" cx="103" cy="665" r="22" />
      </g>

      <g className="lunar-rover" transform="translate(0 92)">
        <ellipse cx="226" cy="647" rx="87" ry="19" fill="#111721" opacity=".6" />
        <circle cx="175" cy="625" r="25" fill="#1c2530" stroke="#8d969c" strokeWidth="8" />
        <circle cx="270" cy="625" r="25" fill="#1c2530" stroke="#8d969c" strokeWidth="8" />
        <path d="M160 585h123l-18 39h-87Z" fill="url(#metal)" />
        <path d="M190 584v-34h52v34M242 550l28-25M270 525l9 1" fill="none" stroke="#b7bec1" strokeWidth="5" />
        <path d="M198 557h36v22h-36Z" fill="#274b60" />
        <circle cx="165" cy="584" r="7" fill="#ffcb72" />
      </g>

      <g className="rocket-smoke" filter="url(#smokeBlur)" aria-hidden="true">
        <circle className="smoke-puff smoke-puff-1" cx="1342" cy="706" r="17" />
        <circle className="smoke-puff smoke-puff-2" cx="1324" cy="724" r="24" />
        <circle className="smoke-puff smoke-puff-3" cx="1362" cy="736" r="29" />
        <circle className="smoke-puff smoke-puff-4" cx="1338" cy="756" r="35" />
      </g>

      <g className="starship">
        <g transform="translate(1342 675) scale(.82) translate(-1350 -674)">
          <ellipse cx="1350" cy="674" rx="155" ry="34" fill="#0b111b" opacity=".65" />
          <path d="m1264 608-55 76h49l57-51Z" fill="#303b48" />
          <path d="m1436 608 55 76h-49l-57-51Z" fill="#303b48" />
          <path d="m1262 610-32 45 58-17 28-35Z" fill="#51606c" opacity=".72" />
          <path d="m1438 610 32 45-58-17-28-35Z" fill="#51606c" opacity=".72" />
          <path d="M1281 614c0-102 28-190 69-256 42 66 70 154 70 256l-38 48h-64Z" fill="url(#metal)" />
          <path d="M1317 446c9-35 20-65 33-88 14 23 26 53 35 88Z" fill="#eef0ec" />
          <path d="M1315 497c21-26 49-26 70 0l9 50h-88Z" fill="#17344a" />
          <ellipse cx="1350" cy="515" rx="27" ry="24" fill="#1e5b75" stroke="#a8e4ef" strokeWidth="4" />
          <ellipse cx="1342" cy="507" rx="10" ry="7" fill="#c9f5fb" opacity=".62" />
          <path d="M1331 515h39" stroke="#84d6ee" strokeWidth="4" opacity=".8" />
          <path d="M1304 557h92M1300 602h100M1320 454c18 9 42 9 60 0" fill="none" stroke="#526570" strokeWidth="3" opacity=".72" />
          <path d="M1307 564v30M1393 564v30" stroke="#e4ecec" strokeWidth="3" opacity=".55" />
          <rect x="1324" y="559" width="52" height="27" rx="4" fill="#263e4d" stroke="#81949e" strokeWidth="3" />
          <path d="M1334 568h32M1334 577h20" stroke="#8ed8e8" strokeWidth="3" opacity=".78" />
          <g fill="#526570">
            <circle cx="1309" cy="470" r="3" />
            <circle cx="1391" cy="470" r="3" />
            <circle cx="1298" cy="580" r="3" />
            <circle cx="1402" cy="580" r="3" />
            <circle cx="1313" cy="625" r="3" />
            <circle cx="1387" cy="625" r="3" />
          </g>
          <path d="M1318 661h64l-11 28h-42Z" fill="#101720" />
          <path d="M1301 587h98" stroke="#d1684f" strokeWidth="8" />
          <g fill="#ffd377">
            <circle cx="1303" cy="571" r="4" />
            <circle cx="1397" cy="571" r="4" />
          </g>
          <path d="M1240 682v58M1460 682v58" stroke="#69737d" strokeWidth="8" />
          <path d="M1218 740h44M1438 740h44" stroke="#9ca8ae" strokeWidth="10" strokeLinecap="round" />
        </g>
      </g>

      <image
        className="lunar-explorer"
        href="/jordi-astronaut.png?v=4"
        x="710"
        y="500"
        width="220"
        height="304"
        preserveAspectRatio="xMidYMid meet"
      />

      <path d="M-550 851H0c204-49 379-31 551 4 186 38 358 31 541-1 172-30 329-22 508 17h550v29H-550Z" fill="#101721" opacity=".7" />
    </svg>
  )
}

function ContentPanel({
  section,
  onClose,
}: {
  section: CvSection
  onClose: () => void
}) {
  const panelRef = useRef<HTMLElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
  }, [section.id])

  const trapFocus = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Tab') return
    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
      'button, a[href], [tabindex]:not([tabindex="-1"])',
    )
    if (!focusable?.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <div className="panel-layer" role="presentation" onMouseDown={onClose}>
      <aside
        className="content-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${section.id}-title`}
        onMouseDown={(event) => event.stopPropagation()}
        onKeyDown={trapFocus}
      >
        <div className="panel-topline">
          <span className="panel-kicker">{section.kicker}</span>
          <button
            ref={closeRef}
            className="close-button"
            type="button"
            onClick={onClose}
          >
            <span>Close</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="panel-heading">
          <span className="large-icon">
            <SectionIcon id={section.id} />
          </span>
          <h2 id={`${section.id}-title`}>{section.title}</h2>
        </div>
        <p className="panel-intro">{section.intro}</p>

        {section.highlights && (
          <ul className="highlight-list">
            {section.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        )}

        {section.timeline && (
          <ol className="timeline">
            {section.timeline.map((item) => (
              <li key={`${item.period}-${item.title}`}>
                <span className="timeline-period">{item.period}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p className="organization">{item.organization}</p>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        )}

        {section.skillGroups && (
          <div className="skill-groups">
            {section.skillGroups.map((group) => (
              <section key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}

        {section.links && (
          <>
            <ul className="contact-list">
              {section.links.map((link) => (
                <li key={link.label}>
                  <span>{link.label}</span>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    {link.value}
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
            <ResumeDownload className="panel-resume-download" />
          </>
        )}
      </aside>
    </div>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState<CvSection | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const openSection = (
    section: CvSection,
    trigger: HTMLElement | null = document.activeElement as HTMLElement | null,
  ) => {
    triggerRef.current = trigger
    setActiveSection(section)
  }

  const closeSection = () => {
    setActiveSection(null)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }

  useEffect(() => {
    const page = document.getElementById('scene-content')
    if (activeSection) {
      page?.setAttribute('inert', '')
      document.body.classList.add('panel-open')
    } else {
      page?.removeAttribute('inert')
      document.body.classList.remove('panel-open')
    }
    return () => {
      page?.removeAttribute('inert')
      document.body.classList.remove('panel-open')
    }
  }, [activeSection])

  useEffect(() => {
    if (!activeSection) return
    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') closeSection()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [activeSection])

  return (
    <>
      <div id="scene-content" className="app-shell">
        <a className="skip-link" href="#primary-navigation">
          Skip to navigation
        </a>

        <header className="site-header">
          <div className="identity">
            <span className="identity-mark">{profileInitials}</span>
            <span>
              <strong>{profile.name}</strong>
              <small>{profile.role}</small>
            </span>
          </div>
          <div className="header-meta">
            <span className="location">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              {profile.location}
            </span>
            <span className="availability">
              <i aria-hidden="true" />
              {profile.availability}
            </span>
          </div>
          <ResumeDownload className="mobile-resume-download" label="CV" />
        </header>

        <main className="scene" aria-labelledby="hero-title">
          <Landscape />

          <p className="astronaut-welcome">
            <strong>Hello!</strong>
            Welcome to my portfolio. Choose a section to explore my journey.
          </p>

          <section className="hero-copy">
            <h1 id="hero-title">
              Exploring new frontiers
              <em>in frontend development.</em>
            </h1>
            <p>{profile.shortBio}</p>
          </section>

          <div className="hotspots" aria-label="Explore CV sections">
            {sections.map((section, index) => (
              <button
                className={`hotspot hotspot-${section.id}`}
                style={{
                  '--hotspot-x': hotspotPositions[section.id].x,
                  '--hotspot-y': hotspotPositions[section.id].y,
                  '--delay': `${index * 120}ms`,
                } as React.CSSProperties}
                type="button"
                key={section.id}
                onClick={(event) => openSection(section, event.currentTarget)}
                aria-haspopup="dialog"
              >
                <span className="hotspot-pulse" aria-hidden="true" />
                <span className="hotspot-icon">
                  <SectionIcon id={section.id} />
                </span>
                <span className="hotspot-label">
                  {section.label}
                </span>
              </button>
            ))}
          </div>
        </main>

        <nav
          id="primary-navigation"
          className="mobile-nav"
          aria-label="CV sections"
        >
          {sections.map((section) => (
            <button
              type="button"
              key={section.id}
              onClick={(event) => openSection(section, event.currentTarget)}
              aria-haspopup="dialog"
            >
              <SectionIcon id={section.id} />
              <span>{section.label}</span>
            </button>
          ))}
        </nav>

        <footer className="site-footer">
          <ResumeDownload className="footer-resume-download" />
        </footer>
      </div>

      {activeSection && (
        <ContentPanel section={activeSection} onClose={closeSection} />
      )}
    </>
  )
}

export default App
