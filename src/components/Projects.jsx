import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '../motion/motionVariants';
import SectionReveal from './SectionReveal';
import { FaGithub, FaExternalLinkAlt, FaBookOpen } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    title: 'Zecuron',
    description: "The platform I'm building to unify the four tools shown next to it (CyberGuardian, ReconXplorer, Secure Login System, and ThreatShieldAI) into a cohesive security management ecosystem.",
    tech: ['Flask', 'FastAPI', 'React', 'PostgreSQL', 'Docker'],
    color: 'var(--color-crimson)',
    image: '/images/projects/zecuron-logo.png',
    github: null,
    live: 'https://zecuron.com',
    live2: 'https://zecuron.in',
    category: 'FULL-STACK',
    status: 'IN DEVELOPMENT',
    featured: true
  },
  {
    id: 2,
    title: 'ThreatShieldAI',
    description: 'Async IOC analysis platform integrating 10+ threat intel providers (VirusTotal, AbuseIPDB, MalwareBazaar). AI orchestrator with Gemini 2.0 Flash + Groq fallback dynamically routes scan requests and unifies a 0–100 risk score.',
    tech: ['Flask', 'React', 'TypeScript', 'Gemini 2.0', 'VirusTotal'],
    color: 'var(--color-crimson)',
    image: '/images/projects/threatshieldai-logo.png',
    github: 'https://github.com/gourab-0/ThreatShield-AI',
    live: 'https://threat-shield-aiphi.vercel.app',
    category: 'FULL-STACK',
    status: 'LIVE',
    featured: false
  },
  {
    id: 3,
    title: 'ReconXplorer',
    description: 'Full-stack OSINT dashboard integrating Nmap, Subfinder, WhatWeb, Nuclei, SQLMap. Real-time scan pipelines with database logging and Docker deployment. Network traffic analysis with CVE pattern mapping.',
    tech: ['FastAPI', 'Next.js', 'Docker', 'Nmap', 'Nuclei'],
    color: 'var(--color-crimson)',
    image: '/images/projects/reconxplorer-logo.png',
    github: 'https://github.com/gourab-0/ReconXplorer',
    live: null,
    category: 'SECURITY',
    status: 'GITHUB',
    featured: false
  },
  {
    id: 4,
    title: 'CyberGuardian',
    description: 'Modular vulnerability scanner detecting SQLi, XSS, and HTTP misconfigurations across OWASP Top 10. 4-component scanning architecture with structured report generation and severity tagging.',
    tech: ['Python', 'Flask', 'SQLite', 'ReportLab'],
    color: 'var(--color-crimson)',
    image: '/images/projects/cyberguardian-logo.png',
    github: 'https://github.com/gourab-0/CYBERGUARDIAN',
    live: null,
    category: 'SECURITY',
    status: 'GITHUB',
    featured: false
  },
  {
    id: 5,
    title: 'Secure Login 2FA',
    description: 'Hardened authentication system with TOTP-based two-factor authentication, bcrypt password hashing, secure session management, and rate-limiting. Built following enterprise-grade IAM engineering standards.',
    tech: ['Python', 'Flask', 'SQLite', 'TOTP', 'bcrypt'],
    color: 'var(--color-crimson)',
    image: '/images/projects/secure-login-system-cover.png',
    github: 'https://github.com/gourab-0/secure-login-system',
    live: null,
    category: 'SECURITY',
    status: 'GITHUB',
    featured: false
  },
];

const categories = ['ALL', 'FULL-STACK', 'SECURITY'];

function ProjectCard({ project }) {
    return (
        <motion.div
            className="project-carousel-item project-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.35 }}
            style={{
                width: '100%',
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(8, 4, 16, 0.85)',
                border: `1px solid ${project.color}28`,
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'border-color 0.3s, box-shadow 0.3s',
                backdropFilter: 'blur(12px)',
                position: 'relative',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${project.color}55`;
                e.currentTarget.style.boxShadow = `0 0 32px ${project.color}18, 0 16px 48px rgba(0,0,0,0.4)`;
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = `${project.color}28`;
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            {/* Top accent bar */}
            <div style={{ height: '3px', background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

            {/* Visual area */}
            <div style={{
                height: '160px',
                background: `radial-gradient(ellipse at 30% 50%, ${project.color}22 0%, rgba(8,4,16,0) 70%)`,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}>
                {/* Grid pattern */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `linear-gradient(${project.color}0d 1px, transparent 1px), linear-gradient(90deg, ${project.color}0d 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                }} />

                {/* Project logo or cover image */}
                {project.image ? (
                    <div style={{
                        position: 'relative',
                        zIndex: 1,
                        width: '100%',
                        height: '100%',
                        padding: '1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <img
                            src={project.image}
                            alt={`${project.title} asset`}
                            style={{
                                maxWidth: '82%',
                                maxHeight: '105px',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.6))',
                            }}
                        />
                    </div>
                ) : (
                    <div style={{
                        position: 'relative',
                        zIndex: 1,
                        width: '72px',
                        height: '72px',
                        borderRadius: '16px',
                        background: `${project.color}15`,
                        border: `1px solid ${project.color}35`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.8rem',
                        fontWeight: 800,
                        color: project.color,
                        letterSpacing: '-0.02em',
                    }}>
                        {project.title.charAt(0)}
                    </div>
                )}

                {/* Status badge */}
                <span style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.1em',
                    color: project.status === 'LIVE' ? '#10B981' : project.status === 'IN DEVELOPMENT' ? '#ff6b7a' : '#94a3b8',
                    background: project.status === 'LIVE' ? 'rgba(16,185,129,0.1)' : project.status === 'IN DEVELOPMENT' ? 'rgba(195,23,62,0.14)' : 'rgba(148,163,184,0.08)',
                    border: `1px solid ${project.status === 'LIVE' ? 'rgba(16,185,129,0.3)' : project.status === 'IN DEVELOPMENT' ? 'rgba(195,23,62,0.35)' : 'rgba(148,163,184,0.2)'}`,
                    borderRadius: '4px',
                    padding: '3px 8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                }}>
                    {project.status === 'LIVE' && (
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                    )}
                    {project.status === 'IN DEVELOPMENT' && (
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#ff6b7a', display: 'inline-block' }} />
                    )}
                    {project.status}
                </span>

                {/* Category badge */}
                <span style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.58rem',
                    letterSpacing: '0.08em',
                    color: project.color,
                    background: `${project.color}12`,
                    border: `1px solid ${project.color}30`,
                    borderRadius: '4px',
                    padding: '3px 8px',
                }}>
                    {project.category}
                </span>
            </div>

            {/* Content */}
            <div className="project-card-content" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                {/* Title + links */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
                    <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: '#F8FAFC',
                        lineHeight: 1.2,
                        margin: 0,
                    }}>
                        {project.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on GitHub`}
                                style={{ color: '#64748b', transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#F8FAFC'}
                                onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
                            >
                                <FaGithub size={17} />
                            </a>
                        )}
                        {project.live && (
                            <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} live site`}
                                style={{ color: '#64748b', transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = project.color}
                                onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
                            >
                                <FaExternalLinkAlt size={15} />
                            </a>
                        )}
                        {project.live2 && (
                            <a href={project.live2} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} alternate site`}
                                style={{ color: '#64748b', transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = project.color}
                                onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
                            >
                                <FaExternalLinkAlt size={15} />
                            </a>
                        )}
                    </div>
                </div>

                {/* Description */}
                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    lineHeight: 1.65,
                    color: '#cbd5e1',
                    margin: 0,
                    flex: 1,
                }}>
                    {project.description}
                </p>

                {/* Tech tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto' }}>
                    {project.tech.map((t, i) => (
                        <span key={i} style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            color: project.color,
                            padding: '3px 9px',
                            background: `${project.color}0f`,
                            border: `1px solid ${project.color}28`,
                            borderRadius: '4px',
                            letterSpacing: '0.04em',
                        }}>
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const [activeTab, setActiveTab] = useState('ALL');

    const filteredProjects = projects.filter(p =>
        activeTab === 'ALL' ? true : p.category === activeTab
    );

    return (
        <SectionReveal id="projects" className="section-padding relative">
            {/* Constrained header + tabs */}
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
                        {'// PORTFOLIO'}
                    </motion.p>
                    <motion.h2
                        variants={fadeUp}
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                            fontWeight: 700,
                        }}
                    >
                        <span style={{ color: '#F8FAFC' }}>Featured </span>
                        <span style={{ color: 'var(--color-crimson)', textShadow: '0 0 20px rgba(195, 23, 62, 0.4)' }}>Work</span>
                    </motion.h2>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    role="group"
                    aria-label="Filter projects"
                    className="flex justify-center flex-wrap gap-3"
                    style={{ marginBottom: '2.5rem' }}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            aria-pressed={activeTab === cat}
                            className="btn-kali"
                            style={{
                                color: activeTab === cat ? 'var(--color-bg)' : 'var(--color-text)',
                                background: activeTab === cat ? 'var(--color-crimson)' : 'rgba(0,0,0,0.6)',
                                outline: activeTab === cat ? 'none' : '1px solid rgba(195,23,62,0.3)',
                                padding: '0.4rem 1rem',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <span style={{ opacity: activeTab === cat ? 1 : 0.5 }}>[</span>
                            <span style={{ margin: '0 4px', letterSpacing: activeTab === cat ? '0.05em' : 'normal' }}>{cat}</span>
                            <span style={{ opacity: activeTab === cat ? 1 : 0.5 }}>]</span>
                        </button>
                    ))}
                </motion.div>

                {/* Horizontal project carousel, aligned with the section content. */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    style={{ marginBottom: '3rem' }}
                >
                    <div className="project-carousel" role="region" aria-label="Featured projects" tabIndex={0}>
                        <AnimatePresence>
                            {filteredProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </AnimatePresence>
                    </div>
                    <p className="carousel-hint">Swipe or scroll to browse projects →</p>
                </motion.div>

                {/* Research Paper Standalone Card */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    style={{
                        background: 'rgba(8, 4, 16, 0.75)',
                        border: '1px solid rgba(195,23,62,0.15)',
                        borderLeft: '3px solid var(--color-crimson)',
                        borderRadius: '12px',
                        padding: 'clamp(1.25rem, 3vw, 2rem)',
                        backdropFilter: 'blur(12px)',
                    }}
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <FaBookOpen size={18} style={{ color: 'var(--color-crimson)' }} />
                                <span style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.65rem',
                                    letterSpacing: '0.12em',
                                    color: 'var(--color-crimson)',
                                    background: 'rgba(195,23,62,0.08)',
                                    border: '1px solid rgba(195,23,62,0.25)',
                                    borderRadius: '4px',
                                    padding: '2px 8px',
                                }}>
                                    PUBLISHED RESEARCH
                                </span>
                            </div>
                            <p style={{ color: '#F8FAFC', fontWeight: 600, marginBottom: '0.5rem', fontSize: '1.05rem', fontFamily: 'var(--font-display)' }}>
                                Behavioral Login Systems: Keystroke &amp; Mouse Authentication
                            </p>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#64748b', lineHeight: 1.6 }}>
                                International Journal of Research (IJR) · Volume 15(1) · Jul-Dec 2025<br/>
                                ISSN: 2231-6124 | Impact Factor SJIF: 8.88
                            </p>
                        </div>
                        <a
                            href="https://internationaljournalofresearch.co.in/journal-issues"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-kali btn-kali-crimson whitespace-nowrap self-start md:self-auto"
                        >
                            <span className="btn-kali-bracket">[</span>
                            <span className="btn-kali-prompt">~/</span>
                            <span className="btn-kali-cmd">view-paper</span>
                            <span className="btn-kali-bracket">]</span>
                        </a>
                    </div>
                </motion.div>

            </div>
        </SectionReveal>
    );
}
