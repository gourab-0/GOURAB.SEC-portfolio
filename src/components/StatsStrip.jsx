import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../motion/motionVariants';

const ACCENT = '#c3173e';

const stats = [
    {
        value: '1',
        label: 'Hackathon',
        sub: 'NEOFuture 2026',
    },
    {
        value: '4',
        label: 'Tools Built',
        sub: 'CyberGuardian · ReconXplorer · ThreatShieldAI · Secure Login System (2FA)',
    },
    {
        value: 'Top 20%',
        label: 'TryHackMe',
        sub: '37 rooms · 5 badges',
    },
    {
        value: 'Mar 2026',
        label: 'Building Zecuron',
        sub: 'Making security more accessible',
    },
];

export default function StatsStrip() {
    return (
        <div style={{
            position: 'relative',
            zIndex: 20,
            marginTop: '0',
            marginBottom: '0',
            background: 'rgba(8, 4, 16, 0.7)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(195,23,62,0.2)',
            borderBottom: '1px solid rgba(195,23,62,0.2)',
            boxShadow: '0 0 20px rgba(195,23,62,0.05)',
            overflow: 'hidden',
        }}>
            {/* Ambient line */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, transparent, rgba(195,23,62,0.04) 30%, rgba(195,23,62,0.04) 70%, transparent)',
                pointerEvents: 'none',
            }} />

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{
                    width: 'min(calc(100% - clamp(2rem, 8vw, 8rem)), 78rem)',
                    margin: '0 auto',
                }}
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        variants={fadeUp}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            padding: '1rem 0.5rem',
                            position: 'relative',
                        }}
                    >
                        {/* Divider between items (desktop) */}
                        {i < stats.length - 1 && (
                            <div style={{
                                position: 'absolute',
                                right: 0,
                                top: '30%',
                                bottom: '30%',
                                width: 1,
                                background: 'rgba(195,23,62,0.15)',
                            }} className={i === 1 ? 'hidden md:block' : ''} />
                        )}

                        {/* Value */}
                        <div style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                            fontWeight: 800,
                            color: ACCENT,
                            textShadow: '0 0 15px rgba(195,23,62,0.4)',
                            letterSpacing: '0.02em',
                            lineHeight: 1,
                            marginBottom: '0.2rem',
                        }}>
                            {stat.value}
                        </div>

                        {/* Label */}
                        <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            color: 'var(--color-text)',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            marginBottom: '0.15rem',
                        }}>
                            {stat.label}
                        </div>

                        {/* Sub */}
                        <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.68rem',
                            color: 'var(--color-text-dim)',
                            opacity: 0.8,
                            maxWidth: '190px',
                            lineHeight: 1.45,
                        }}>
                            {stat.sub}
                        </div>
                    </motion.div>
                ))}
                </div>
            </motion.div>
        </div>
    );
}
