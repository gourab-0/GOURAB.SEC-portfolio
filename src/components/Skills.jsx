import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '../motion/motionVariants';
import SectionReveal from './SectionReveal';
import {
    FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt, FaLinux, FaDatabase, FaSearch, FaBug, FaServer, FaExpand, FaTimes, FaExternalLinkAlt, FaJava
} from 'react-icons/fa';
import {
    SiJavascript, SiTypescript, SiPostgresql,
    SiFlask, SiWireshark, SiGnubash, SiKalilinux, SiNextdotjs, SiCplusplus
} from 'react-icons/si';
import { HiShieldCheck, HiGlobeAlt, HiCode } from 'react-icons/hi';
import { BiNetworkChart } from 'react-icons/bi';

const categories = [
    {
        title: 'Development & Languages',
        color: '#c3173e',
        tag: '[DEV]',
        icon: HiCode,
        skills: [
            { name: 'Python', icon: FaPython, level: 92 },
            { name: 'React', icon: FaReact, level: 90 },
            { name: 'Next.js', icon: SiNextdotjs, level: 85 },
            { name: 'FastAPI', icon: HiCode, level: 85 },
            { name: 'Flask', icon: SiFlask, level: 88 },
            { name: 'JavaScript', icon: SiJavascript, level: 88 },
            { name: 'C++', icon: SiCplusplus, level: 80 },
            { name: 'Java', icon: FaJava, level: 78 },
        ],
    },
    {
        title: 'Cyber & Security Tools',
        color: '#c3173e',
        tag: '[TOOLS]',
        icon: HiShieldCheck,
        skills: [
            { name: 'Nmap', icon: BiNetworkChart, level: 90 },
            { name: 'Wireshark', icon: SiWireshark, level: 85 },
            { name: 'OWASP ZAP', icon: HiShieldCheck, level: 88 },
            { name: 'Burp Suite', icon: HiShieldCheck, level: 82 },
            { name: 'SQLMap', icon: FaDatabase, level: 84 },
            { name: 'XSSer', icon: FaBug, level: 80 },
            { name: 'Nuclei', icon: FaSearch, level: 78 },
            { name: 'Subfinder', icon: HiGlobeAlt, level: 85 },
        ],
    },
    {
        title: 'Offensive Security & Recon',
        color: '#c3173e',
        tag: '[OFFENSIVE]',
        icon: FaBug,
        skills: [
            { name: 'Pentesting', icon: HiShieldCheck, level: 85 },
            { name: 'OWASP Top10', icon: HiShieldCheck, level: 90 },
            { name: 'Vuln Assessment', icon: HiShieldCheck, level: 88 },
            { name: 'OSINT Recon', icon: HiGlobeAlt, level: 88 },
            { name: 'Threat Intel', icon: FaSearch, level: 84 },
            { name: 'MalwareBazaar', icon: FaBug, level: 80 },
            { name: 'SQLi & XSS', icon: FaDatabase, level: 88 },
            { name: 'Google Dorking', icon: FaSearch, level: 86 },
        ],
    },
    {
        title: 'SOC & Defense',
        color: '#c3173e',
        tag: '[DEFENSIVE]',
        icon: FaServer,
        skills: [
            { name: 'SIEM Concepts', icon: HiShieldCheck, level: 82 },
            { name: 'NIST CSF', icon: HiShieldCheck, level: 80 },
            { name: 'CIS Controls', icon: HiShieldCheck, level: 80 },
            { name: 'Linux (Kali)', icon: SiKalilinux, level: 90 },
            { name: 'Docker', icon: FaDocker, level: 80 },
            { name: 'PostgreSQL', icon: SiPostgresql, level: 80 },
            { name: 'Bash', icon: SiGnubash, level: 82 },
            { name: 'Git', icon: FaGitAlt, level: 90 },
        ],
    },
];

function SkillBadge({ name, Icon, level, delay }) {
    return (
        <motion.div
            className="group relative flex flex-col items-center justify-center rounded-lg cursor-default"
            style={{
                padding: '1.25rem 0.75rem',
                background: 'rgba(10, 10, 15, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                transition: 'all 0.3s ease',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.4 }}
            whileHover={{
                background: `rgba(10, 10, 15, 0.85)`,
                borderColor: 'rgba(195, 23, 62, 0.6)',
                boxShadow: '0 0 18px rgba(195, 23, 62, 0.25)',
                transform: 'translateY(-3px)'
            }}
        >
            {/* Icon — off-white at rest, accent on hover via filter */}
            <Icon
                size={26}
                style={{ color: '#c8cdd6', marginBottom: '0.55rem', transition: 'color 0.3s ease' }}
                className="group-hover:scale-110"
            />
            <span
                style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.63rem',
                    color: '#9ca3af',
                    textAlign: 'center',
                    lineHeight: 1.25,
                    letterSpacing: '0.02em',
                }}
            >
                {name}
            </span>

            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 flex flex-col items-center">
                <div style={{
                    background: 'rgba(17, 6, 17, 0.92)',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(195, 23, 62, 0.55)',
                    padding: '4px 9px',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    color: '#ff6b7a',
                    whiteSpace: 'nowrap',
                    boxShadow: `0 4px 12px rgba(0,0,0,0.5)`
                }}>
                    Proficiency: {level}%
                </div>
                <div style={{
                    width: 0, height: 0,
                    borderLeft: '4px solid transparent',
                    borderRight: '4px solid transparent',
                    borderTop: '4px solid rgba(195, 23, 62, 0.55)',
                }} />
            </div>
        </motion.div>
    );
}

const certifications = [
    {
        id: 'cisco-eh',
        name: 'Ethical Hacking',
        issuer: 'Cisco Networking Academy',
        year: '2025',
        category: 'CYBERSECURITY',
        image: '/images/certificates/cisco-ethical-hacking.jpg',
        href: null,
    },
    {
        id: 'thm-pre-sec',
        name: 'Pre Security Learning Path',
        issuer: 'TryHackMe',
        year: '2026',
        category: 'CYBERSECURITY',
        image: '/images/certificates/tryhackme-pre-security.jpg',
        href: 'https://tryhackme.com/p/zecuron',
    },
    {
        id: 'acme-fund',
        name: 'Cyber Security Fundamentals',
        issuer: 'Acmegrade',
        year: '2024',
        category: 'CYBERSECURITY',
        image: '/images/certificates/acmegrade-cybersecurity.jpg',
        href: null,
    },
    {
        id: 'acme-intern',
        name: 'Cybersecurity Training Internship',
        issuer: 'Acmegrade (Remote)',
        year: '2024',
        category: 'INTERNSHIPS',
        image: '/images/certificates/acmegrade-internship.jpg',
        href: null,
    },
    {
        id: 'neofuture-hack',
        name: 'NEOFuture 2026 Hackathon',
        issuer: 'NEOFuture / Team Binary Bro\'s',
        year: '2026',
        category: 'HACKATHONS',
        image: '/images/certificates/hackathon-neofuture.jpg',
        href: 'https://threat-shield-aiphi.vercel.app',
    },
    {
        id: 'gcp-prompt',
        name: 'Prompt Design in Vertex AI',
        issuer: 'Google Cloud (Skill Badge)',
        year: '2026',
        category: 'CLOUD & AI',
        image: '/images/certificates/google-cloud-vertex-ai-badge.png',
        href: null,
    },
    {
        id: 'python-iit',
        name: 'Python 3.4.3 Spoken Tutorial',
        issuer: 'IIT Bombay Spoken Tutorial',
        year: '2024',
        category: 'DEVELOPMENT',
        image: '/images/certificates/python-spoken-tutorial-iit-bombay.jpg',
        href: null,
    },
    {
        id: 'fastapi-crud',
        name: 'Build CRUD API with FastAPI',
        issuer: 'API Development Training',
        year: '2026',
        category: 'DEVELOPMENT',
        image: '/images/certificates/fastapi-crud-api.jpg',
        href: null,
    },
    {
        id: 'weather-api-js',
        name: 'Weather App with API & JavaScript',
        issuer: 'LetsUpgrade',
        year: '2026',
        category: 'DEVELOPMENT',
        image: '/images/certificates/weather-app-javascript.jpg',
        href: null,
    },
    {
        id: 'python-bootcamp',
        name: 'Python Bootcamp',
        issuer: 'LetsUpgrade',
        year: '2026',
        category: 'DEVELOPMENT',
        image: '/images/certificates/python-bootcamp-letsupgrade.jpg',
        href: null,
    },
    {
        id: 'n8n-crash',
        name: 'N8N Workflow Automation',
        issuer: 'Automation Crash Course',
        year: '2026',
        category: 'DEVELOPMENT',
        image: '/images/certificates/n8n-crash-course.jpg',
        href: null,
    },
    {
        id: 'canva-design',
        name: 'Canva Design Course',
        issuer: 'LetsUpgrade',
        year: '2026',
        category: 'DEVELOPMENT',
        image: '/images/certificates/canva-design-letsupgrade.jpg',
        href: null,
    },
    {
        id: 'deloitte-sim',
        name: 'Cyber Job Simulation',
        issuer: 'Deloitte (via Forage)',
        year: '2026',
        category: 'SIMULATION',
        image: '/images/certificates/deloitte-cybersecurity-simulation.jpg',
        href: null,
    },
    {
        id: 'mastercard-sim',
        name: 'Cybersecurity Job Simulation',
        issuer: 'Mastercard (via Forage)',
        year: '2026',
        category: 'SIMULATION',
        image: '/images/certificates/mastercard-cybersecurity-simulation.jpg',
        href: null,
    },
    {
        id: 'tata-sim',
        name: 'Cybersecurity Analyst Job Simulation',
        issuer: 'Tata / TCS (via Forage)',
        year: '2026',
        category: 'SIMULATION',
        image: '/images/certificates/tata-cybersecurity-simulation.jpg',
        href: null,
    },
];

const certFilterTabs = ['ALL', 'CYBERSECURITY', 'DEVELOPMENT', 'CLOUD & AI', 'INTERNSHIPS & HACKATHONS'];

function CertModal({ cert, onClose }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    if (!cert || typeof document === 'undefined') return null;

    const modalContent = (
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 1000000,
                background: 'rgba(5, 5, 8, 0.94)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.25rem',
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: 'relative',
                    maxWidth: '960px',
                    width: '100%',
                    maxHeight: '92vh',
                    background: '#0B0A0D',
                    border: '1px solid rgba(195, 23, 62, 0.45)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    boxShadow: '0 0 60px rgba(195, 23, 62, 0.3), 0 25px 50px rgba(0,0,0,0.9)',
                    overflow: 'hidden',
                }}
            >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                    <div>
                        <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            color: 'var(--color-crimson)',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            fontWeight: 600,
                        }}>
                            [{cert.category}] · {cert.year}
                        </span>
                        <h3 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                            fontWeight: 700,
                            color: '#F8FAFC',
                            margin: '0.25rem 0',
                        }}>
                            {cert.name}
                        </h3>
                        <p style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.78rem',
                            color: '#94a3b8',
                            margin: 0,
                        }}>
                            {cert.issuer}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        aria-label="Close modal"
                        className="btn-kali btn-kali-crimson"
                        style={{
                            padding: '0.45rem 0.9rem',
                            fontSize: '0.78rem',
                            cursor: 'pointer',
                            flexShrink: 0,
                        }}
                    >
                        <span className="btn-kali-bracket">[</span>
                        <span className="btn-kali-cmd">ESC / ✕ CLOSE</span>
                        <span className="btn-kali-bracket">]</span>
                    </button>
                </div>

                {/* High-res Image Preview */}
                <div style={{
                    flex: 1,
                    minHeight: '280px',
                    maxHeight: '64vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(5, 5, 8, 0.95)',
                    borderRadius: '10px',
                    overflow: 'auto',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '0.75rem',
                    position: 'relative',
                }}>
                    {cert.image ? (
                        <img
                            src={cert.image}
                            alt={`${cert.name} certificate`}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '60vh',
                                objectFit: 'contain',
                                display: 'block',
                                borderRadius: '6px',
                                boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
                            }}
                        />
                    ) : (
                        <div style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
                            <FaShieldCheck size={42} style={{ color: 'var(--color-crimson)', margin: '0 auto 1rem' }} />
                            <p style={{ fontFamily: 'var(--font-display)', color: '#F8FAFC', fontSize: '1.1rem', fontWeight: 600 }}>
                                Verified Job Simulation
                            </p>
                            <p style={{ fontFamily: 'var(--font-mono)', color: '#94a3b8', fontSize: '0.8rem', maxWidth: '420px', margin: '0.5rem auto 0' }}>
                                Cybersecurity simulations completed via Forage across Deloitte (SOC Incident Response), Mastercard (Phishing Analysis), and Tata / TCS (IAM Architecture).
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.85rem', flexWrap: 'wrap' }}>
                    {cert.image && (
                        <a
                            href={cert.image}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-kali"
                            style={{
                                padding: '0.45rem 1rem',
                                fontSize: '0.75rem',
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                background: 'rgba(255, 255, 255, 0.06)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                color: '#F8FAFC',
                            }}
                        >
                            <span className="btn-kali-bracket">[</span>
                            <span className="btn-kali-cmd">Open Full Image ↗</span>
                            <span className="btn-kali-bracket">]</span>
                        </a>
                    )}
                    {cert.href && (
                        <a
                            href={cert.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-kali btn-kali-crimson"
                            style={{
                                padding: '0.45rem 1rem',
                                fontSize: '0.75rem',
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                            }}
                        >
                            <span className="btn-kali-bracket">[</span>
                            <span className="btn-kali-cmd">Verify Credential ↗</span>
                            <span className="btn-kali-bracket">]</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}

function CertCard({ cert, onInspect }) {
    return (
        <div
            role="button"
            tabIndex={0}
            aria-label={`Inspect ${cert.name} credential`}
            onClick={() => onInspect(cert)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onInspect(cert); } }}
            style={{
                background: 'rgba(8, 4, 16, 0.85)',
                border: '1px solid rgba(195, 23, 62, 0.22)',
                borderRadius: '14px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                height: '100%',
                position: 'relative',
                userSelect: 'none',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(195, 23, 62, 0.65)';
                e.currentTarget.style.boxShadow = '0 0 28px rgba(195, 23, 62, 0.16)';
                e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(195, 23, 62, 0.22)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'none';
            }}
        >
            {/* Certificate image display */}
            <div style={{
                width: '100%',
                height: '165px',
                background: 'radial-gradient(ellipse at center, rgba(195,23,62,0.1) 0%, rgba(8,4,16,0.96) 75%)',
                borderBottom: '1px solid rgba(195, 23, 62, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
                padding: '0.6rem',
            }}>
                {cert.image ? (
                    <img
                        src={cert.image}
                        alt={`${cert.name} certificate`}
                        loading="lazy"
                        style={{
                            maxWidth: '94%',
                            maxHeight: '94%',
                            objectFit: 'contain',
                            borderRadius: '4px',
                            filter: 'drop-shadow(0 3px 10px rgba(0,0,0,0.7))',
                        }}
                    />
                ) : (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem',
                        opacity: 0.55,
                    }}>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#c3173e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                            <line x1="9" y1="13" x2="15" y2="13"/>
                            <line x1="9" y1="17" x2="13" y2="17"/>
                        </svg>
                        <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.62rem',
                            color: '#c3173e',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                        }}>Simulation Verified</span>
                    </div>
                )}

                {/* Action Badge - clickable VIEW button */}
                <div
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        background: 'rgba(10, 6, 18, 0.92)',
                        border: '1px solid rgba(195, 23, 62, 0.45)',
                        borderRadius: 5,
                        padding: '4px 9px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        fontWeight: 700,
                        color: '#F8FAFC',
                        letterSpacing: '0.08em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
                        pointerEvents: 'none',
                    }}
                >
                    <FaExpand size={10} style={{ color: 'var(--color-crimson)' }} />
                    VIEW
                </div>
            </div>

            {/* Details */}
            <div style={{ padding: '1rem 1.15rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        color: 'var(--color-crimson)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                    }}>
                        {cert.year}
                    </span>
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.55rem',
                        color: '#64748b',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '3px',
                        padding: '1px 6px',
                    }}>
                        {cert.category}
                    </span>
                </div>
                <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.94rem',
                    fontWeight: 700,
                    color: '#F8FAFC',
                    lineHeight: 1.3,
                }}>
                    {cert.name}
                </div>
                <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '14px',
                    color: '#cbd5e1',
                    marginTop: 'auto',
                }}>
                    {cert.issuer}
                </div>
            </div>
        </div>
    );
}

export default function Skills() {
    const [activeCertTab, setActiveCertTab] = useState('ALL');
    const [modalCert, setModalCert] = useState(null);

    const filteredCertifications = certifications.filter((cert) => {
        if (activeCertTab === 'ALL') return true;
        if (activeCertTab === 'INTERNSHIPS & HACKATHONS') {
            return cert.category === 'INTERNSHIPS' || cert.category === 'HACKATHONS' || cert.category === 'SIMULATION';
        }
        if (activeCertTab === 'CYBERSECURITY') {
            return cert.category === 'CYBERSECURITY' || cert.category === 'SIMULATION';
        }
        return cert.category === activeCertTab;
    });

    return (
        <SectionReveal id="skills" className="section-padding relative">
            <div className="content-wrap">
                {/* Title */}
                <motion.div
                    className="text-center section-heading"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.p
                        variants={fadeUp}
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.8rem',
                            color: 'var(--color-crimson)',
                            letterSpacing: '0.15em',
                            marginBottom: '0.5rem',
                        }}
                    >
                        {'// SKILL SET'}
                    </motion.p>
                    <motion.h2
                        variants={fadeUp}
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                            fontWeight: 700,
                        }}
                    >
                        <span style={{ color: '#F8FAFC' }}>Technical </span>
                        <span style={{ color: 'var(--color-crimson)', textShadow: '0 0 20px rgba(195, 23, 62, 0.4)' }}>Arsenal</span>
                    </motion.h2>
                </motion.div>

                {/* Skills Grid — 2 columns on desktop */}
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                    {categories.map((cat, ci) => (
                        <motion.div
                            key={ci}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ delay: ci * 0.1 }}
                            className="glass rounded-xl flex flex-col"
                            style={{
                                padding: '1.75rem',
                                borderTop: `2px solid ${cat.color}`,
                            }}
                            whileHover={{
                                boxShadow: `0 0 30px ${cat.color}15`,
                                borderColor: `${cat.color}33`,
                            }}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <cat.icon size={22} style={{ color: cat.color }} />
                                    <h3
                                        style={{
                                            fontFamily: 'var(--font-display)',
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            color: cat.color,
                                            letterSpacing: '0.05em',
                                        }}
                                    >
                                        {cat.title}
                                    </h3>
                                </div>
                                <span
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.65rem',
                                        color: cat.color,
                                        padding: '2px 8px',
                                        background: `${cat.color}15`,
                                        border: `1px solid ${cat.color}33`,
                                        letterSpacing: '0.05em',
                                    }}
                                >
                                    {cat.tag}
                                </span>
                            </div>

                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                                {cat.skills.map((skill, si) => (
                                    <SkillBadge
                                        key={si}
                                        name={skill.name}
                                        Icon={skill.icon}
                                        level={skill.level}
                                        delay={si * 0.05}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Certifications Section */}
                <motion.div
                    style={{ marginTop: '5rem' }}
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
                        <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            letterSpacing: '0.15em',
                            color: '#c3173e',
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap',
                            fontWeight: 700,
                        }}>{'// CREDENTIALS & CERTIFICATIONS'}</div>
                        <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(195,23,62,0.4), transparent)' }} />
                    </motion.div>

                    {/* Filter Tabs */}
                    <motion.div
                        role="group"
                        aria-label="Filter credentials"
                        className="flex justify-center flex-wrap gap-2.5 mb-8"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {certFilterTabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveCertTab(tab)}
                                aria-pressed={activeCertTab === tab}
                                className="btn-kali"
                                style={{
                                    color: activeCertTab === tab ? '#fff' : 'var(--color-text)',
                                    background: activeCertTab === tab ? 'var(--color-crimson)' : 'rgba(8, 4, 16, 0.7)',
                                    outline: activeCertTab === tab ? 'none' : '1px solid rgba(195, 23, 62, 0.3)',
                                    padding: '0.35rem 0.85rem',
                                    fontSize: '0.7rem',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    transition: 'all 0.25s ease',
                                }}
                            >
                                <span style={{ opacity: activeCertTab === tab ? 1 : 0.5 }}>[</span>
                                <span style={{ margin: '0 4px', letterSpacing: activeCertTab === tab ? '0.04em' : 'normal' }}>{tab}</span>
                                <span style={{ opacity: activeCertTab === tab ? 1 : 0.5 }}>]</span>
                            </button>
                        ))}
                    </motion.div>

                    {/* Horizontal credentials carousel */}
                    <motion.div variants={fadeUp}>
                        <div className="certificate-carousel" role="region" aria-label="Credentials and certifications" tabIndex={0}>
                            <AnimatePresence>
                                {filteredCertifications.map((cert) => (
                                    <motion.div
                                        className="certificate-carousel-item"
                                        key={cert.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <CertCard
                                            cert={cert}
                                            onInspect={(c) => setModalCert(c)}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        <p className="carousel-hint">Swipe or scroll to browse credentials ({filteredCertifications.length}) · Select a card to inspect</p>
                    </motion.div>
                </motion.div>
            </div>

            {/* Modal Lightbox */}
            {modalCert && (
                <CertModal
                    cert={modalCert}
                    onClose={() => setModalCert(null)}
                />
            )}
        </SectionReveal>
    );
}
