import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FaShieldAlt } from 'react-icons/fa';

const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Domains', href: '#domains' },
    { label: 'Terminal', href: '#system-ops' },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [active, setActive] = useState('#hero');

    useEffect(() => {
        const handleScroll = () => {
            const sections = navLinks.map((l) => l.href.slice(1));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && el.getBoundingClientRect().top <= 200) {
                    setActive('#' + sections[i]);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = (href) => {
        setMobileOpen(false);
        setActive(href);
    };

    const expanded = true;

    return (
        <>
            {/* Dynamic Island Navbar */}
            <div className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
                <motion.nav
                    className="portfolio-nav"
                    aria-label="Main navigation"
                    style={{
                        background: 'rgba(10, 10, 18, 0.85)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(195, 23, 62, 0.2)',
                        boxShadow: '0 0 30px rgba(195, 23, 62, 0.1), 0 8px 32px rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        overflow: 'visible',
                        pointerEvents: 'all',
                        width: 'min(900px, calc(100vw - 2rem))',
                        maxWidth: '900px',
                        minWidth: 'min(180px, calc(100vw - 2rem))',
                        borderRadius: '999px',
                        padding: '10px 20px',
                    }}
                >
                    {/* Logo — always visible */}
                    <a
                        href="#hero"
                        onClick={() => handleClick('#hero')}
                        style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}
                    >
                        <FaShieldAlt size={18} style={{ color: 'var(--color-cyber-cyan)' }} />
                        <motion.span
                            animate={{ opacity: 1 }}
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '0.95rem',
                                fontWeight: 800,
                                letterSpacing: '0.08em',
                                color: 'var(--color-cyber-text)',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            GOURAB
                            <span style={{ color: 'var(--color-cyber-cyan)', fontWeight: 400 }}>.SEC</span>
                        </motion.span>
                    </a>

                    {/* Desktop nav links — appear when expanded */}
                    <AnimatePresence>
                        {expanded && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.2 }}
                                className="hidden xl:flex items-center gap-1"
                                style={{ flexShrink: 0 }}
                            >
                                {navLinks.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => handleClick(link.href)}
                                        style={{
                                            position: 'relative',
                                            padding: '5px 10px',
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.75rem',
                                            letterSpacing: '0.06em',
                                            color: active === link.href ? 'var(--color-cyber-cyan)' : 'var(--color-cyber-text-dim)',
                                            textDecoration: 'none',
                                            borderRadius: '8px',
                                            transition: 'color 0.2s',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {active === link.href && (
                                            <motion.div
                                                layoutId="di-active"
                                                style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    borderRadius: '8px',
                                                    background: 'rgba(195, 23, 62, 0.15)',
                                                    border: '1px solid rgba(195, 23, 62, 0.35)',
                                                }}
                                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                        <span style={{ position: 'relative', zIndex: 1 }}>{link.label}</span>
                                    </a>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Right side: HIRE ME (expanded only) + mobile toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                        <AnimatePresence>
                            {expanded && (
                                <motion.div
                                    className="hidden xl:flex items-center gap-2"
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.85 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {/* HIRE ME — visible only when expanded */}
                                    <a
                                        href="#contact"
                                        onClick={() => handleClick('#contact')}
                                        style={{
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.7rem',
                                            fontWeight: 700,
                                            letterSpacing: '0.1em',
                                            color: '#fff',
                                            background: 'var(--color-crimson)',
                                            border: 'none',
                                            borderRadius: '6px',
                                            padding: '0.4rem 1rem',
                                            whiteSpace: 'nowrap',
                                            textDecoration: 'none',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            boxShadow: '0 0 14px rgba(195,23,62,0.35)',
                                            transition: 'box-shadow 0.2s',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 22px rgba(195,23,62,0.6)'}
                                        onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 14px rgba(195,23,62,0.35)'}
                                    >
                                        HIRE ME
                                    </a>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Mobile toggle */}
                        <button
                            className="xl:hidden"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-navigation"
                            style={{ color: 'var(--color-cyber-cyan)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                        >
                            {mobileOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
                        </button>
                    </div>
                </motion.nav>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        id="mobile-navigation"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25 }}
                        style={{
                            position: 'fixed',
                            top: '70px',
                            left: 'max(16px, env(safe-area-inset-left))',
                            right: 'max(16px, env(safe-area-inset-right))',
                            width: 'auto',
                            maxWidth: '360px',
                            marginInline: 'auto',
                            boxSizing: 'border-box',
                            zIndex: 49,
                            background: 'rgba(10, 10, 18, 0.95)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(195, 23, 62, 0.2)',
                            borderRadius: '20px',
                            padding: '1.5rem',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => handleClick(link.href)}
                                    style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: '0.9rem',
                                        color: active === link.href ? 'var(--color-cyber-cyan)' : 'var(--color-cyber-text-dim)',
                                        textDecoration: 'none',
                                        letterSpacing: '0.1em',
                                        padding: '0.5rem 1.5rem',
                                        borderRadius: '10px',
                                        background: active === link.href ? 'rgba(195,23,62,0.14)' : 'transparent',
                                        width: '100%',
                                        textAlign: 'center',
                                    }}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                className="btn-neon"
                                onClick={() => setMobileOpen(false)}
                                style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}
                            >
                                HIRE ME
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
