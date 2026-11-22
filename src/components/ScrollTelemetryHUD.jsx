import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';

const SECTIONS = [
    { id: 'hero', label: 'SYS_INIT // HERO' },
    { id: 'about', label: 'PROFILE // ABOUT' },
    { id: 'experience', label: 'TIMELINE // OPS' },
    { id: 'skills', label: 'ARSENAL // SKILLS' },
    { id: 'projects', label: 'PROJECTS // DEPLOYED' },
    { id: 'domains', label: 'DOMAINS // SECURITY' },
    { id: 'system-ops', label: 'TERMINAL // LOGS' },
    { id: 'contact', label: 'UPLINK // CONTACT' },
];

export default function ScrollTelemetryHUD() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 35, restDelta: 0.001 });

    const [percent, setPercent] = useState(0);
    const [activeSection, setActiveSection] = useState(SECTIONS[0]);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setPercent(Math.min(100, Math.max(0, Math.round(latest * 100))));
            setIsScrolled(latest > 0.02);
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY + 240;
            for (let i = SECTIONS.length - 1; i >= 0; i--) {
                const el = document.getElementById(SECTIONS[i].id);
                if (el) {
                    const top = el.offsetTop;
                    if (scrollPos >= top) {
                        setActiveSection(SECTIONS[i]);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* ── Top Fixed Laser Scanline ── */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'rgba(9, 9, 15, 0.85)',
                    zIndex: 99998,
                    pointerEvents: 'none',
                }}
            >
                <motion.div
                    style={{
                        height: '100%',
                        scaleX,
                        transformOrigin: '0%',
                        background: 'linear-gradient(90deg, #8a0f2a 0%, #c3173e 50%, #ff6b7a 90%, #ffffff 100%)',
                        boxShadow: '0 0 12px rgba(255, 107, 122, 0.8), 0 0 24px rgba(195, 23, 62, 0.4)',
                    }}
                />
            </div>

            {/* ── Top-Right Cyber Telemetry HUD Badge (Desktop & Tablet) ── */}
            <AnimatePresence>
                {isScrolled && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="hidden lg:flex"
                        style={{
                            position: 'fixed',
                            top: '76px',
                            right: '24px',
                            zIndex: 99990,
                            pointerEvents: 'none',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '6px 14px',
                            background: 'rgba(8, 4, 16, 0.88)',
                            backdropFilter: 'blur(14px)',
                            WebkitBackdropFilter: 'blur(14px)',
                            border: '1px solid rgba(195, 23, 62, 0.4)',
                            borderRadius: '8px',
                            boxShadow: '0 0 20px rgba(195, 23, 62, 0.15), 0 8px 24px rgba(0,0,0,0.7)',
                            fontFamily: 'var(--font-mono)',
                            userSelect: 'none',
                        }}
                    >
                        {/* Radar Pulse Blip */}
                        <div style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
                            <span
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    background: '#ff6b7a',
                                    boxShadow: '0 0 8px #ff6b7a',
                                }}
                            />
                            <span
                                style={{
                                    position: 'absolute',
                                    top: -2,
                                    left: -2,
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    border: '1px solid #ff6b7a',
                                    animation: 'ping 1.6s cubic-bezier(0, 0, 0.2, 1) infinite',
                                    opacity: 0.75,
                                }}
                            />
                        </div>

                        {/* Telemetry Progress Readout */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.68rem', letterSpacing: '0.08em' }}>
                            <span style={{ color: 'var(--color-text-dim)' }}>SCAN:</span>
                            <span style={{ color: '#F8FAFC', fontWeight: 700, minWidth: '32px' }}>
                                {percent}%
                            </span>
                        </div>

                        {/* Cyber Divider */}
                        <span style={{ color: 'rgba(195, 23, 62, 0.5)', fontSize: '0.75rem' }}>//</span>

                        {/* Active Section Tracker */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.65rem', letterSpacing: '0.06em' }}>
                            <span style={{ color: 'var(--color-crimson)', fontWeight: 600 }}>LOC:</span>
                            <motion.span
                                key={activeSection.id}
                                initial={{ opacity: 0, x: -4 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                                style={{ color: '#ff6b7a', fontWeight: 600 }}
                            >
                                {activeSection.label}
                            </motion.span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
