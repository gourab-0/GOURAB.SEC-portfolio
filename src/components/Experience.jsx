import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUp, staggerContainer } from '../motion/motionVariants';
import SectionReveal from './SectionReveal';
import { FaGraduationCap, FaBriefcase, FaFlask, FaFileAlt, FaTrophy, FaShieldAlt, FaCertificate, FaCode } from 'react-icons/fa';

const ACCENT = '#c3173e';
const ACCENT_BRIGHT = '#ff6b7a';

const timeline = [
    {
        date: 'Sep 2026 – Present',
        type: 'INTERNSHIP',
        icon: FaBriefcase,
        title: 'Website Development Intern',
        org: 'Property Spot Homes Pvt Ltd (On-site · Mumbai)',
        desc: "Designing and developing the company's real-estate website end to end: responsive, user-friendly pages, feature implementation, testing and bug fixing, and technical documentation. Working on-site with the company's management team.",
        tags: ['Next.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'GCS', 'Full-Stack'],
        link: null,
        color: ACCENT,
    },
    {
        date: 'Jun 2026',
        type: 'FREELANCE',
        icon: FaCode,
        title: 'Freelance — Portfolio Website',
        org: 'Client Project',
        desc: 'Designed and built a responsive personal portfolio website for a graphic designer/VFX artist end-to-end with HTML, CSS, and JavaScript, deployed on Vercel (repo: github.com/gourab-0/subham-portfolio).',
        tags: ['HTML/CSS/JS', 'Vercel', 'GitHub Repo', 'Client Project'],
        link: 'https://subham-portfolio-kappa.vercel.app/',
        color: ACCENT,
    },
    {
        date: 'April 2026',
        type: 'HACKATHON',
        icon: FaTrophy,
        title: 'NEOFuture Hackathon',
        org: 'Team Binary Bro\'s',
        desc: 'Owned backend architecture and led integration/testing to build ThreatShieldAI in 24 hours with a team of 3. Async Flask backend with an AI orchestrator (Gemini 2.0 Flash + Groq fallback) routing IOC lookups across 10+ providers (VirusTotal, AbuseIPDB, MalwareBazaar) into a unified 0–100 risk score.',
        tags: ['Flask', 'Gemini 2.0', 'Groq', 'VirusTotal', 'Threat Intel', 'AI'],
        link: 'https://threat-shield-aiphi.vercel.app',
        color: ACCENT_BRIGHT,
    },
    {
        date: 'March 2026',
        type: 'SIMULATION',
        icon: FaShieldAlt,
        title: 'Cybersecurity Analyst Simulations',
        org: 'Forage — Deloitte, Mastercard & TCS',
        desc: 'Completed virtual analyst work across three programs: SOC incident investigation (Deloitte), phishing analysis & security awareness (Mastercard), and IAM strategy design (TCS).',
        tags: ['SOC', 'Incident Response', 'Phishing Analysis', 'IAM'],
        color: ACCENT,
    },
    {
        date: 'March 2026',
        type: 'PROJECT',
        icon: FaCode,
        title: 'Building Zecuron',
        org: 'Personal Security Platform',
        desc: 'Merging four tools I\'m building into one unified platform — CyberGuardian, ReconXplorer, Secure Login System, and ThreatShieldAI — designed to make security more accessible, including for other security professionals.',
        tags: ['CyberGuardian', 'ReconXplorer', 'Secure Login System', 'ThreatShieldAI', 'Platform'],
        color: ACCENT,
    },
    {
        date: '2023 – 2026',
        type: 'EDUCATION',
        icon: FaGraduationCap,
        title: 'B.Sc. Computer Science',
        org: 'Rizvi College of Arts, Science & Commerce, Mumbai — Mumbai University',
        desc: 'CGPA: 8.39. Convocation: February 2027.',
        tags: ['Computer Science', 'Mumbai University', 'CGPA 8.39'],
        color: ACCENT,
    },
    {
        date: 'Jul – Dec 2025 (published Dec 2025)',
        type: 'RESEARCH',
        icon: FaFileAlt,
        title: 'Co-authored Peer-Reviewed Research Paper',
        org: 'International Journal of Research (SJIF 8.88)',
        desc: '"Behavioral Login Systems: Keystroke & Mouse Authentication" — Vol. 15(1). Research on continuous passive authentication using behavioral biometrics.',
        tags: ['Research', 'Behavioral Biometrics', 'Authentication', 'IJSR'],
        color: ACCENT,
    },
    {
        date: 'May – Jul 2024',
        type: 'INTERNSHIP',
        icon: FaBriefcase,
        title: 'Cybersecurity Intern',
        org: 'Acmegrade (Remote)',
        desc: 'Full vulnerability assessment on a production-simulated target: 12 documented findings including DOM-based XSS, missing CSP, anti-CSRF, and anti-clickjacking headers. Tools: OWASP ZAP, XSSer, SQLMap, Wireshark.',
        tags: ['OWASP ZAP', 'XSSer', 'SQLMap', 'Wireshark', 'XSS', 'CSRF'],
        color: ACCENT,
    },
    {
        date: '2024',
        type: 'PROJECT',
        icon: FaShieldAlt,
        title: 'Independent OSINT & Reconnaissance',
        org: 'Attack Surface Assessment',
        desc: 'Solo footprinting and passive reconnaissance exercise. Mapped external attack surfaces using Google Dorking, Shodan, Censys, Netcraft, Qualys SSL Labs, and Wayback Machine. Documented exposed headers, DNS records, and subdomains.',
        tags: ['OSINT', 'Reconnaissance', 'Shodan', 'Google Dorking', 'Censys'],
        color: ACCENT_BRIGHT,
    },
    {
        date: 'Ongoing',
        type: 'PLATFORM',
        icon: FaTrophy,
        title: 'TryHackMe Security Training',
        org: 'Top 20% Rank Milestone',
        desc: 'Completed 37+ rooms. Hands-on offensive and defensive labs covering Linux/Windows privilege escalation, network scanning (Nmap), Burp Suite, Web Fundamentals, and OWASP Top 10.',
        tags: ['TryHackMe', 'Privilege Escalation', 'Nmap', 'Burp Suite', 'Offensive Security'],
        link: 'https://tryhackme.com/p/zecuron',
        color: ACCENT,
    },
];

const TYPE_COLORS = {
    HACKATHON: '#ff6b7a',
    SIMULATION: '#c3173e',
    PROJECT: '#c3173e',
    EDUCATION: '#c3173e',
    RESEARCH: '#c3173e',
    CERTIFICATION: '#c3173e',
    INTERNSHIP: '#c3173e',
    FREELANCE: '#c3173e',
    PLATFORM: '#c3173e',
};

function TimelineCard({ item, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const isLeft = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
            style={{ position: 'relative', marginBottom: '2rem' }}
        >
            {/* ── DESKTOP ZIGZAG ── */}
            <div className="hidden lg:flex" style={{ width: '100%', alignItems: 'flex-start' }}>

                {/* Left half — card shows here if isLeft */}
                <div style={{ width: '50%', paddingRight: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                    {isLeft && (
                        <div style={{ width: '100%', minWidth: 0, maxWidth: '560px' }}>
                            <CardContent item={item} align="right" />
                        </div>
                    )}
                </div>

                {/* Center dot pinned exactly at 50% of the container */}
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '1.4rem',
                    transform: 'translateX(-50%)',
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    background: item.color,
                    boxShadow: `0 0 14px ${item.color}99`,
                    border: '2px solid rgba(255,255,255,0.18)',
                    zIndex: 2,
                    flexShrink: 0,
                }} />

                {/* Right half — card shows here if !isLeft */}
                <div style={{ width: '50%', paddingLeft: '2.5rem', display: 'flex', justifyContent: 'flex-start' }}>
                    {!isLeft && (
                        <div style={{ width: '100%', minWidth: 0, maxWidth: '560px' }}>
                            <CardContent item={item} align="left" />
                        </div>
                    )}
                </div>
            </div>

            {/* ── MOBILE: left line + card ── */}
            <div className="flex lg:hidden" style={{ gap: '1rem', alignItems: 'flex-start', width: '100%' }}>
                <div style={{ paddingTop: 4, flexShrink: 0 }}>
                    <div style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: item.color,
                        boxShadow: `0 0 10px ${item.color}88`,
                        border: '2px solid rgba(255,255,255,0.15)',
                    }} />
                </div>
                <CardContent item={item} align="left" mobile />
            </div>
        </motion.div>
    );
}


function CardContent({ item, align, mobile }) {
    const Icon = item.icon;
    return (
        <div style={{ textAlign: mobile ? 'left' : align === 'right' ? 'right' : 'left', paddingBottom: '0.5rem' }}>
            {/* Date + type badge */}
            <div
                className="flex items-center gap-2 mb-3"
                style={{ justifyContent: mobile ? 'flex-start' : align === 'right' ? 'flex-end' : 'flex-start' }}
            >
                <span
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.12em',
                        color: TYPE_COLORS[item.type] || ACCENT,
                        background: `${TYPE_COLORS[item.type] || ACCENT}18`,
                        border: `1px solid ${TYPE_COLORS[item.type] || ACCENT}40`,
                        padding: '3px 10px',
                        borderRadius: 6,
                    }}
                >
                    {item.type}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-dim)' }}>
                    {item.date}
                </span>
            </div>

            {/* Glass card */}
            <div
                className="glass rounded-xl relative overflow-hidden transition-all duration-300"
                style={{
                    padding: mobile ? '1.5rem 1.75rem' : '1.75rem 2rem', // Fallproof padding (approx py-6 px-7 / py-7 px-8)
                    border: `1px solid ${item.color}28`,
                    background: 'rgba(8,4,16,0.75)',
                    backdropFilter: 'blur(12px)',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${item.color}60`}
                onMouseLeave={e => e.currentTarget.style.borderColor = `${item.color}28`}
            >
                {/* Glow corner */}
                <div style={{
                    position: 'absolute', top: 0,
                    [align === 'right' ? 'right' : 'left']: 0,
                    width: 80, height: 80,
                    background: `radial-gradient(circle at ${align === 'right' ? '100% 0%' : '0% 0%'}, ${item.color}18, transparent 70%)`,
                    pointerEvents: 'none',
                }} />

                {/* Title row */}
                <div
                    className="flex items-start gap-4"
                    style={{ 
                        flexDirection: align === 'right' && !mobile ? 'row-reverse' : 'row',
                        marginBottom: '1.25rem' // mb-5 gap between header and description
                    }}
                >
                    <div style={{
                        width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                        background: `${item.color}18`,
                        border: `1px solid ${item.color}40`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <Icon size={20} style={{ color: item.color }} />
                    </div>
                    <div style={{ textAlign: align === 'right' && !mobile ? 'right' : 'left' }}>
                        <div style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.15rem',
                            fontWeight: 700,
                            color: 'var(--color-text)',
                            lineHeight: 1.3,
                        }}>
                            {item.title}
                        </div>
                        <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.82rem',
                            color: item.color,
                            marginTop: 6,
                            opacity: 0.85,
                        }}>
                            {item.org}
                        </div>
                    </div>
                </div>

                {/* Description */}
                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: '#cbd5e1',
                    lineHeight: 1.75, // leading-7
                    margin: '0 0 1.5rem', // mb-6 gap before tags
                    textAlign: align === 'right' && !mobile ? 'right' : 'left',
                }}>
                    {item.desc}
                </p>

                {/* Tags */}
                <div
                    className="flex flex-wrap gap-2"
                    style={{ justifyContent: align === 'right' && !mobile ? 'flex-end' : 'flex-start' }}
                >
                    {item.tags.map((tag, i) => (
                        <span key={i} style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            color: 'var(--color-text-dim)',
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            padding: '6px 12px',
                            borderRadius: 6,
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Experience() {
    return (
        <SectionReveal id="experience" className="section-padding relative">
            <div className="content-wrap--wide">

                {/* Header */}
                <motion.div
                    className="text-center section-heading"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.p variants={fadeUp} style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        color: ACCENT,
                        letterSpacing: '0.15em',
                        marginBottom: '0.5rem',
                    }}>
                        {'// CAREER TIMELINE'}
                    </motion.p>
                    <motion.h2 variants={fadeUp} style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                    }}>
                        <span style={{ color: '#fff' }}>My </span>
                        <span style={{ color: ACCENT, textShadow: `0 0 20px ${ACCENT}66` }}>Experience</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.82rem',
                        color: 'var(--color-text-dim)',
                        marginTop: '0.5rem',
                    }}>
                        Education, projects, internships, and research — most recent first.
                    </motion.p>
                </motion.div>

                {/* Timeline */}
                <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>

                    {/* Vertical center line — desktop only */}
                    <div className="hidden lg:block" style={{
                        position: 'absolute',
                        left: '50%',
                        top: 0,
                        bottom: 0,
                        width: 1,
                        background: 'linear-gradient(to bottom, transparent, rgba(195,23,62,0.35) 10%, rgba(195,23,62,0.35) 90%, transparent)',
                        transform: 'translateX(-50%)',
                        pointerEvents: 'none',
                    }} />

                    {/* Mobile left line */}
                    <div className="lg:hidden" style={{
                        position: 'absolute',
                        left: 5,
                        top: 0,
                        bottom: 0,
                        width: 1,
                        background: 'linear-gradient(to bottom, transparent, rgba(195,23,62,0.3) 10%, rgba(195,23,62,0.3) 90%, transparent)',
                        pointerEvents: 'none',
                    }} />

                    {timeline.map((item, i) => (
                        <TimelineCard key={i} item={item} index={i} />
                    ))}
                </div>
            </div>
        </SectionReveal>
    );
}
