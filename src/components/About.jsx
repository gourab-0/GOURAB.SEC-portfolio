import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { fadeUp } from '../motion/motionVariants';
import SectionReveal from './SectionReveal';
import { FaTools, FaProjectDiagram, FaShieldAlt } from 'react-icons/fa';
const formalImg = '/images/profile/gourab-formal.png';

const stats = [
    { icon: FaTools,         label: 'Tools Used',     value: 32, suffix: '+', color: '#c3173e' },
    { icon: FaProjectDiagram,label: 'Projects Built',  value: 4,  suffix: '',  color: '#c3173e' },
    { icon: FaShieldAlt,     label: 'Sec Domains',    value: 6,  suffix: '',  color: '#c3173e' },
];

const timeline = [
    { date: 'Sep 2026 – Present', color: '#c3173e', title: 'Website Development Intern', sub: 'Property Spot Homes (On-site · Mumbai)' },
    { date: 'Mar 2026',           color: '#ff6b7a', title: 'Building Zecuron',            sub: 'Unified security toolkit platform' },
    { date: 'Dec 2025',           color: '#c3173e', title: 'Published Research Paper',    sub: 'Behavioral Login Systems (IJSR · SJIF 8.88)' },
];

function AnimatedCounter({ value, suffix, inView }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const duration = 2000;
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * value));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [inView, value]);
    return <span>{count}{suffix}</span>;
}

export default function About() {
    const reduceMotion = useReducedMotion();
    const [inView, setInView] = useState(false);
    const [barReady, setBarReady] = useState(false);
    const [portraitHovered, setPortraitHovered] = useState(false);
    const ref = useRef(null);
    const sectionRef = useRef(null);

    // Scroll-driven morph: triggers when section scrolls into view
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'start 0.4'],
    });
    const morphScale   = useTransform(scrollYProgress, [0, 1], [3.2, 1]);
    const morphOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.7, 1]);
    const ring3Scale   = useTransform(scrollYProgress, [0, 1], [2.0, 1]);
    const ring3Opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 0.5]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) { setInView(true); setBarReady(true); }
            },
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const CARD = {
        background: 'rgba(10,6,18,0.85)',
        border: '1px solid rgba(195,23,62,0.35)',
        borderRadius: '10px',
        backdropFilter: 'blur(12px)',
    };

    const MONO = { fontFamily: 'var(--font-mono)' };
    const DISP = { fontFamily: 'var(--font-display)' };
    const CRIMSON = '#c3173e';

    return (
        <SectionReveal id="about" className="section-padding relative">
            <div ref={sectionRef}>
            <div ref={ref} className="content-wrap--wide">

                {/* ═══════════════════════════════════════
                    ZONE 1 — HEADER
                ═══════════════════════════════════════ */}
                <div style={{ position: 'relative', textAlign: 'center', marginBottom: '2.5rem' }}>

                    {/* Top-left corner labels */}
                    <div className="about-header-notes" style={{ position: 'absolute', top: 0, left: 0, textAlign: 'left' }}>
                        {['HUMAN // SECURITY RESEARCHER', 'FULL-STACK DEVELOPER', 'PROBLEM SOLVER'].map((t, i) => (
                            <div key={i} style={{ ...MONO, fontSize: '0.6rem', color: 'rgba(195,23,62,0.55)', letterSpacing: '0.08em', lineHeight: 1.9 }}>{t}</div>
                        ))}
                    </div>

                    {/* Top-right corner labels */}
                    <div className="about-header-notes" style={{ position: 'absolute', top: 0, right: 0, textAlign: 'right' }}>
                        {['BUILD', 'DREAM', 'LEARN', 'REPEAT'].map((t, i) => (
                            <div key={i} style={{ ...MONO, fontSize: '0.6rem', color: 'rgba(195,23,62,0.45)', letterSpacing: '0.15em', lineHeight: 2.0 }}>{t}</div>
                        ))}
                    </div>

                    {/* Center title block */}
                    <div style={{ display: 'inline-block' }}>
                        <div style={{ ...MONO, fontSize: '0.72rem', color: CRIMSON, letterSpacing: '0.25em', marginBottom: '0.6rem', opacity: 0.8 }}>
                            &mdash;&mdash; // ABOUT ME &mdash;&mdash;
                        </div>
                        <h2 style={{ ...DISP, fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', fontWeight: 800, lineHeight: 1, margin: '0 0 0.8rem' }}>
                            <span style={{ color: '#f0f0ff' }}>Who </span>
                            <span style={{ color: CRIMSON }}>I Am</span>
                        </h2>
                        <div style={{ ...MONO, fontSize: '0.68rem', color: 'rgba(240,240,255,0.4)', letterSpacing: '0.12em' }}>
                            MORE THAN A DEVELOPER&nbsp;/&nbsp;A CURIOUS MIND&nbsp;/&nbsp;A SAFER DIGITAL TOMORROW
                        </div>
                    </div>
                </div>

                {/* ═══════════════════════════════════════
                    ZONES 2-4 — 3-COLUMN MAIN GRID
                ═══════════════════════════════════════ */}
                <div className="about-main-grid">

                    {/* ═══ ZONE 2 — LEFT: PORTRAIT COLUMN ═══ */}
                    <motion.div
                        className="about-portrait-column"
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}
                    >
                        {/* Portrait + Morph rings + Floating labels */}
                        <div 
                            style={{ position: 'relative', width: '240px', height: '240px', flexShrink: 0, marginLeft: '0.5rem', overflow: 'visible' }}
                            onMouseEnter={() => setPortraitHovered(true)}
                            onMouseLeave={() => setPortraitHovered(false)}
                        >

                            {/* ── MORPH RING 1 — scroll-driven, contracts from hero scale → portrait size */}
                            <motion.div style={{
                                position: 'absolute', top: '50%', left: '50%',
                                width: '240px', height: '240px',
                                x: '-50%', y: '-50%',
                                borderRadius: '50%',
                                border: '2px solid rgba(195,23,62,0.65)',
                                boxShadow: '0 0 24px rgba(195,23,62,0.3), inset 0 0 16px rgba(195,23,62,0.08)',
                                scale: reduceMotion ? 1 : morphScale,
                                opacity: reduceMotion ? 0.65 : morphOpacity,
                                pointerEvents: 'none',
                            }} />

                            {/* ── MORPH RING 2 — ROTATING dashed ring */}
                            <div
                                style={{
                                    position: 'absolute', top: '50%', left: '50%',
                                    width: '268px', height: '268px',
                                    transform: 'translate(-50%, -50%)',
                                    borderRadius: '50%',
                                    border: '1.5px dashed rgba(195,23,62,0.45)',
                                    opacity: 0.55,
                                    pointerEvents: 'none',
                                }}
                            />

                            {/* ── MORPH RING 3 — accent color */}
                            <motion.div style={{
                                position: 'absolute', top: '50%', left: '50%',
                                width: '296px', height: '296px',
                                x: '-50%', y: '-50%',
                                borderRadius: '50%',
                                border: '1px solid rgba(195,23,62,0.2)',
                                scale: reduceMotion ? 1 : ring3Scale,
                                opacity: reduceMotion ? 0.5 : ring3Opacity,
                                pointerEvents: 'none',
                            }} />

                            {/* Portrait image — floating bob + pulsing glow */}
                            <div
                                style={{
                                    position: 'absolute', top: '50%', left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '220px', height: '220px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    border: '3px solid ' + CRIMSON,
                                    flexShrink: 0,
                                }}
                            >
                                <img
                                    src={formalImg}
                                    alt="Gourab Ghosh"
                                    style={{
                                        width: '100%', height: '100%',
                                        objectFit: 'cover', objectPosition: 'top center',
                                        filter: 'grayscale(15%) contrast(1.1) brightness(0.9)',
                                    }}
                                />
                            </div>

                            {/* Floating labels — spread wide around the circle */}
                            <span className="about-floating-label" style={{ ...MONO, position: 'absolute', left: '-70px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.6rem', color: CRIMSON, letterSpacing: '0.12em', opacity: 0.9, whiteSpace: 'nowrap' }}>LEARN</span>
                            <span className="about-floating-label" style={{ ...MONO, position: 'absolute', right: '-78px', top: '26%', fontSize: '0.6rem', color: CRIMSON, letterSpacing: '0.12em', opacity: 0.9, whiteSpace: 'nowrap' }}>DEVELOP</span>
                            <span className="about-floating-label" style={{ ...MONO, position: 'absolute', right: '-86px', top: '47%', fontSize: '0.6rem', color: CRIMSON, letterSpacing: '0.12em', opacity: 0.9, whiteSpace: 'nowrap' }}>RESEARCH</span>
                            <span className="about-floating-label" style={{ ...MONO, position: 'absolute', right: '-80px', top: '68%', fontSize: '0.6rem', color: CRIMSON, letterSpacing: '0.12em', opacity: 0.9, whiteSpace: 'nowrap' }}>INNOVATE</span>

                            {/* Corner decorative dots */}
                            <div style={{ position: 'absolute', top: '8px', left: '10px', width: '5px', height: '5px', borderRadius: '50%', background: CRIMSON, opacity: 0.7, boxShadow: '0 0 6px ' + CRIMSON }} />
                            <div style={{ position: 'absolute', bottom: '8px', right: '10px', width: '4px', height: '4px', borderRadius: '50%', background: CRIMSON, opacity: 0.5 }} />
                        
                            <AnimatePresence>
                                {portraitHovered && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.92 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.92 }}
                                        transition={{ duration: 0.25, ease: 'easeOut' }}
                                        style={{
                                            position: 'absolute', bottom: '110%', left: '50%', x: '-50%',
                                            zIndex: 20, pointerEvents: 'none',
                                            background: 'rgba(10,6,18,0.95)', border: '1px solid rgba(195,23,62,0.45)', borderRadius: '10px', padding: '0.85rem 1rem', minWidth: '160px', backdropFilter: 'blur(12px)'
                                        }}
                                    >
                                        <div style={{ fontSize: '1.4rem', color: CRIMSON, lineHeight: 1, marginBottom: '0.4rem', opacity: 0.7 }}>"</div>
                                        <p style={{ ...MONO, fontSize: '0.65rem', color: 'rgba(240,240,255,0.55)', lineHeight: 1.7, margin: 0 }}>
                                            Curiosity today,<br />safer tomorrow.
                                        </p>
                                        <div style={{
                                            position: 'absolute', bottom: '-6px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid rgba(195,23,62,0.45)'
                                        }} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* ONLINE badge */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', ...MONO, fontSize: '0.65rem', color: '#00ff88', marginTop: '1.5rem' }}>
                            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#00ff88', display: 'inline-block', boxShadow: '0 0 8px #00ff88', animation: 'pulse 2s infinite' }} />
                            ONLINE
                        </div>
                    </motion.div>

                    {/* ═══ ZONE 3 — CENTER: PERSONAL INFO CARD ═══ */}
                    <motion.div
                        className="about-info-card"
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        style={{ ...CARD, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}
                    >
                        {/* Card header bar */}
                        <div style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '0.65rem 1rem',
                            borderBottom: '1px solid rgba(195,23,62,0.25)',
                            background: 'rgba(195,23,62,0.06)',
                        }}>
                            <div style={{ ...MONO, fontSize: '0.8rem', color: '#f0f0ff' }}>
                                <span style={{ color: CRIMSON, marginRight: '6px' }}>&gt;</span>
                                Personal Information <span style={{ color: CRIMSON }}>_</span>
                            </div>
                            <div className="about-card-meta" style={{ ...MONO, fontSize: '0.55rem', color: 'rgba(195,23,62,0.45)', letterSpacing: '0.1em' }}>PROFILE // VERIFIED</div>
                        </div>

                        {/* Data rows */}
                        <div style={{ padding: '1rem 1.1rem', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.52rem' }}>
                            {[
                                { label: 'Name',      value: 'Gourab Ghosh',                                  highlight: false },
                                { label: 'Role',      value: 'SOC Analyst · Cybersecurity & Full-Stack',      highlight: true },
                                { label: 'Location',  value: 'Virar, Mumbai, India',                          highlight: false },
                                { label: 'Education', value: 'B.Sc. CS — Rizvi College, Mumbai',             highlight: false },
                                { label: 'CGPA',      value: '8.39 (Graduate)',                               highlight: false },
                                { label: 'Platform',  value: 'Creator @ Zecuron',                             highlight: true },
                                { label: 'Focus',     value: 'Threat Detection · Vulnerability Assessment · AppSec', highlight: false },
                                { label: 'Status',    value: 'Fresher · Open to SOC / AppSec / Security roles', highlight: false },
                            ].map(({ label, value, highlight }) => (
                                <div key={label} className="about-data-row" style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                                    <span style={{ ...MONO, color: CRIMSON, fontSize: '0.8rem', flexShrink: 0, lineHeight: 1.6 }}>&gt;</span>
                                    <span style={{ ...MONO, fontSize: '0.75rem', color: 'rgba(240,240,255,0.45)', minWidth: '82px', flexShrink: 0, lineHeight: 1.6 }}>{label}:</span>
                                    <span style={{ ...MONO, fontSize: '0.75rem', color: highlight ? CRIMSON : 'rgba(240,240,255,0.85)', fontWeight: highlight ? 600 : 400, lineHeight: 1.6 }}>{value}</span>
                                </div>
                            ))}

                            {/* Terminal System Status Strip */}
                            <div style={{
                                marginTop: 'auto',
                                paddingTop: '0.65rem',
                                borderTop: '1px dashed rgba(195,23,62,0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 6px #00ff88', display: 'inline-block' }} />
                                    <span style={{ ...MONO, fontSize: '0.62rem', color: '#00ff88', letterSpacing: '0.06em' }}>SYS_INTEGRITY: 100%</span>
                                </div>
                                <span style={{ ...MONO, fontSize: '0.6rem', color: 'rgba(240,240,255,0.35)', letterSpacing: '0.06em' }}>ACTIVE // ENCRYPTED</span>
                            </div>
                        </div>

                        {/* Card footer */}
                        <div style={{
                            padding: '0.5rem 1rem',
                            borderTop: '1px solid rgba(195,23,62,0.15)',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        }}>
                            <span style={{ ...MONO, fontSize: '0.55rem', color: 'rgba(195,23,62,0.4)', letterSpacing: '0.08em' }}>// BUILDING A SAFER DIGITAL WORLD</span>
                            <span style={{ ...MONO, fontSize: '0.55rem', color: 'rgba(195,23,62,0.4)' }}>v1.2.0</span>
                        </div>

                        {/* Animated red progress bar */}
                        <div style={{ height: '2px', background: 'rgba(195,23,62,0.12)', position: 'relative', overflow: 'hidden' }}>
                            <motion.div
                                initial={{ width: '0%' }}
                                animate={{ width: barReady ? '72%' : '0%' }}
                                transition={{ duration: 1.8, ease: 'easeOut', delay: 0.4 }}
                                style={{ height: '100%', background: `linear-gradient(to right, ${CRIMSON}, #ff6b7a)`, boxShadow: `0 0 8px ${CRIMSON}` }}
                            />
                        </div>
                    </motion.div>

                    {/* ═══ ZONE 4 — RIGHT: STATS + TIMELINE ═══ */}
                    <div className="about-journey-column" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>

                        {/* 3 Stat Cards in a single row */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                                    whileHover={reduceMotion ? undefined : { scale: 1.03, boxShadow: `0 0 18px ${stat.color}30` }}
                                    transition={{ type: 'spring', stiffness: 400 }}
                                    style={{ ...CARD, padding: '0.9rem 0.5rem', textAlign: 'center', borderColor: `${stat.color}30` }}
                                >
                                    <stat.icon size={20} style={{ color: stat.color, margin: '0 auto 0.4rem' }} />
                                    <div style={{ ...DISP, fontSize: '1.3rem', fontWeight: 800, color: stat.color, lineHeight: 1 }}>
                                        <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
                                    </div>
                                    <div style={{ ...MONO, fontSize: '0.58rem', color: 'rgba(240,240,255,0.4)', letterSpacing: '0.06em', marginTop: '0.3rem' }}>
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* My Journey Timeline card */}
                        <motion.div
                            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                            style={{ ...CARD, flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                        >
                            {/* Timeline header */}
                            <div style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '0.6rem 1rem',
                                borderBottom: '1px solid rgba(195,23,62,0.2)',
                                background: 'rgba(195,23,62,0.05)',
                            }}>
                                <div style={{ ...MONO, fontSize: '0.8rem', color: '#f0f0ff' }}>
                                    <span style={{ color: CRIMSON, marginRight: '6px' }}>&gt;</span>
                                    My Journey <span style={{ color: CRIMSON }}>_</span>
                                </div>
                                <div style={{ ...MONO, fontSize: '0.55rem', color: 'rgba(240,240,255,0.25)', letterSpacing: '0.1em' }}>// TIMELINE</div>
                            </div>

                            {/* Timeline entries */}
                            <div style={{ padding: '1.1rem 1rem 1.1rem 1.4rem', flexGrow: 1, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                {/* Vertical line */}
                                <div style={{
                                    position: 'absolute', left: '1.4rem', top: '1.4rem', bottom: '1.6rem',
                                    width: '1px',
                                    background: 'linear-gradient(to bottom, rgba(195,23,62,0.6), rgba(255,107,122,0.3))',
                                }} />

                                {timeline.map((item, i) => (
                                    <div key={i} style={{ position: 'relative', paddingLeft: '1.2rem' }}>
                                        {/* Dot */}
                                        <div style={{
                                            position: 'absolute', left: '-4px', top: '5px',
                                            width: '9px', height: '9px', borderRadius: '50%',
                                            background: item.color,
                                            boxShadow: `0 0 8px ${item.color}`,
                                            border: `1px solid ${item.color}`,
                                        }} />
                                        {/* Date */}
                                        <div style={{ ...MONO, fontSize: '0.6rem', color: item.color, marginBottom: '0.15rem', letterSpacing: '0.05em' }}>{item.date}</div>
                                        {/* Title */}
                                        <div style={{ ...MONO, fontSize: '0.72rem', color: 'rgba(240,240,255,0.9)', fontWeight: 600, marginBottom: '0.1rem' }}>{item.title}</div>
                                        {/* Sub description */}
                                        <div style={{ ...MONO, fontSize: '0.6rem', color: 'rgba(240,240,255,0.35)' }}>{item.sub}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* ═══════════════════════════════════════
                    ZONE 5 — BOTTOM TERMINAL BAR
                ═══════════════════════════════════════ */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    marginTop: '1.5rem',
                    padding: '0.55rem 0',
                    borderTop: '1px solid rgba(195,23,62,0.2)',
                }}>
                    <div style={{ ...MONO, fontSize: '0.62rem', color: 'rgba(240,240,255,0.4)' }}>
                        <span style={{ color: CRIMSON }}>root@about</span>
                        <span style={{ color: 'rgba(240,240,255,0.3)' }}>:~$</span>
                        <span style={{ marginLeft: '8px', letterSpacing: '0.06em' }}>PASSION DRIVES PROGRESS...</span>
                    </div>
                    <div style={{ ...MONO, fontSize: '0.6rem', color: 'rgba(240,240,255,0.25)', letterSpacing: '0.08em' }}>
                        I&nbsp;CYBERSECURITY&nbsp;|&nbsp;DEVELOPMENT&nbsp;|&nbsp;IMPACT&nbsp;|
                    </div>
                </div>

            </div>
            </div>
        </SectionReveal>
    );
}
