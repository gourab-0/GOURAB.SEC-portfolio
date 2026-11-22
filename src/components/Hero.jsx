import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../motion/motionVariants';
import { FaShieldAlt, FaBug, FaNetworkWired, FaCode } from 'react-icons/fa';

// ─────────────────────────────────────────────────────────
// ONE ACCENT. Matches --color-crimson in index.css, which is
// what var(--color-cyber-cyan) already secretly resolves to
// via your legacy alias. Everything below now uses the SAME
// hex instead of the old mix of cyan/orange/magenta hardcoded
// hexes that were fighting your CSS tokens.
// ─────────────────────────────────────────────────────────
const ACCENT = '#c3173e';

function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handler = (e) => setReduced(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);
    return reduced;
}

function useTypewriter(texts, typingSpeed = 80, pauseTime = 2000, enabled = true) {
    const [display, setDisplay] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    useEffect(() => {
        if (!enabled) return undefined;
        const current = texts[textIndex];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setDisplay(current.slice(0, charIndex + 1));
                setCharIndex(c => c + 1);
                if (charIndex + 1 === current.length) setTimeout(() => setIsDeleting(true), pauseTime);
            } else {
                setDisplay(current.slice(0, charIndex - 1));
                setCharIndex(c => c - 1);
                if (charIndex <= 1) { setIsDeleting(false); setTextIndex(t => (t + 1) % texts.length); }
            }
        }, isDeleting ? typingSpeed / 2 : typingSpeed);
        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, textIndex, texts, typingSpeed, pauseTime, enabled]);
    return enabled ? display : texts[0];
}

// Icon row now links somewhere real, with a visible tooltip —
// swap hrefs for your actual section ids.
const ICON_LINKS = [
    { Icon: FaShieldAlt,    href: '#about',    label: 'About / security focus' },
    { Icon: FaBug,          href: '#projects', label: 'Vulnerability research' },
    { Icon: FaNetworkWired, href: '#projects', label: 'Network / infra projects' },
    { Icon: FaCode,         href: '#projects', label: 'Full-stack projects' },
];

// ─────────────────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────────────────
export default function Hero() {
    const reduced = usePrefersReducedMotion();
    const typed = useTypewriter(
        ['SOC Analyst', 'Cybersecurity Engineer', 'Full-Stack Developer', 'Penetration Tester', 'Security Researcher'],
        70, 2000, !reduced
    );
    return (
        <section id="hero" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '5rem' }}>

            {/* 3-COLUMN LAYOUT */}
            <div className="hero-grid grid grid-cols-1 gap-8 max-w-7xl mx-auto w-full relative z-10 items-center min-h-[calc(100vh-5rem)] px-6">

                {/* LEFT COLUMN */}
                <motion.div variants={staggerContainer} initial="hidden" animate="visible"
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>

                    {/* Status badge — green kept as the one sanctioned exception:
                        it's a functional "online/available" signal, not brand color */}
                    <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '100px', border: '1px solid rgba(0,255,136,0.35)', background: 'rgba(0,255,136,0.06)' }}>
                        <span className="animate-pulse-glow" style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--color-cyber-green)', display: 'block', flexShrink: 0 }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-cyber-green)', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>AVAILABLE FOR PROJECTS</span>
                    </motion.div>

                    <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-cyber-text-dim)', letterSpacing: '0.05em', margin: 0 }}>Hello, I'm</motion.p>

                    {/* Name — solid accent now, not a crimson-to-orange gradient
                        (the old .gradient-text-cyan class blended two hues) */}
                    <motion.h1 className="hero-name" variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,2.6vw,2.4rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '0.04em', margin: 0 }}>
                        <span style={{ color: 'var(--color-cyber-text)' }}>GOURAB </span>
                        <span style={{ color: ACCENT }}>GHOSH</span>
                    </motion.h1>

                    {/* Typing role — swapped glow-cyan (hardcoded cyan text-shadow)
                        for glow-crimson, which already exists in your CSS */}
                    <motion.div variants={fadeUp} style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.75rem,1.4vw,1rem)', color: 'var(--color-cyber-cyan)', minHeight: '1.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span className="glow-crimson">&gt; {typed}</span>
                        <span className="animate-pulse-glow" style={{ color: ACCENT }}>█</span>
                    </motion.div>

                    {/* Icon row — real links with visible tooltips now */}
                    <motion.div variants={fadeUp} style={{ display: 'flex', gap: '14px', marginTop: '0.5rem' }}>
                        {ICON_LINKS.map(({ Icon, href, label }, i) => (
                            <a key={i} href={href} title={label} aria-label={label}
                               style={{ display: 'inline-flex', color: 'rgba(195,23,62,0.55)', transition: 'color 0.2s ease' }}
                               onMouseEnter={e => e.currentTarget.style.color = ACCENT}
                               onMouseLeave={e => e.currentTarget.style.color = 'rgba(195,23,62,0.55)'}>
                                <Icon size={18} />
                            </a>
                        ))}
                    </motion.div>
                </motion.div>

                {/* CENTER COLUMN — PORTRAIT */}
                <motion.div className="hero-portrait" initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.6, ease: 'easeOut', delay: 0.1 }}
                    style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', width: 'clamp(380px,44vw,580px)', height: 'clamp(560px,88vh,820px)' }}>
                    {/* Transparent portrait, shown directly over the page canvas. */}
                    <motion.img
                        src="/images/profile/gourab-hero-cutout.png"
                        alt="Gourab Ghosh"
                        whileHover={{ filter: 'grayscale(0%) brightness(1.06)', scale: 1.015 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            position: 'relative', zIndex: 2,
                            height: '100%', width: 'auto', maxWidth: '100%',
                            objectFit: 'contain', objectPosition: 'bottom center',
                            filter: 'grayscale(18%) brightness(0.92) contrast(1.06)',
                            maskImage: 'linear-gradient(to top, transparent 0%, black 12%, black 92%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 12%, black 92%, transparent 100%)',
                            display: 'block',
                        }}
                    />

                </motion.div>

                {/* RIGHT COLUMN — skill badges removed, they repeated the tagline */}
                <motion.div variants={staggerContainer} initial="hidden" animate="visible"
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1.2rem', textAlign: 'right' }}>

                    <motion.p variants={fadeUp} style={{ fontSize: 'clamp(0.85rem,1.3vw,1rem)', color: 'var(--color-cyber-text-dim)', maxWidth: '320px', lineHeight: 1.75, margin: 0 }}>
                        Securing digital landscapes.<br />Building resilient systems.<br />Breaking things to make them stronger.
                    </motion.p>

                    <motion.div variants={fadeUp} style={{ width: '120px', height: '1px', background: 'linear-gradient(to left, var(--color-crimson), transparent)', opacity: 0.4 }} />

                    <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', alignItems: 'flex-end' }}>
                        {/* Primary — filled. Add .btn-kali-crimson-filled to index.css (snippet below). */}
                        <a href="#projects" className="btn-kali btn-kali-crimson-filled">
                            <span className="btn-kali-bracket">[</span><span className="btn-kali-prompt">~/</span><span className="btn-kali-cmd">view-projects</span><span className="btn-kali-bracket">]</span>
                        </a>
                        {/* Secondary — reuses your EXISTING .btn-kali-crimson outline class,
                            just swapped from .btn-kali-magenta so both buttons share one hue */}
                        <a href="#contact" className="btn-kali btn-kali-crimson">
                            <span className="btn-kali-bracket">[</span><span className="btn-kali-prompt">~/</span><span className="btn-kali-cmd">contact-me</span><span className="btn-kali-bracket">]</span>
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* SCROLL INDICATOR — same accent, was cyan */}
            <motion.div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }} animate={reduced ? undefined : { y: [0,12,0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <div style={{ width: 24, height: 40, borderRadius: 12, border: '2px solid rgba(195,23,62,0.35)', display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
                    <motion.div style={{ width: 3, height: 8, borderRadius: 2, background: 'var(--color-crimson)' }} animate={reduced ? undefined : { opacity: [1,0] }} transition={{ duration: 1.5, repeat: Infinity }} />
                </div>
            </motion.div>
        </section>
    );
}
