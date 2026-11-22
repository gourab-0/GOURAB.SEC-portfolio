import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResumeFloatingBtn() {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '2rem',
                left: '2rem',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
            }}
        >
            {/* Red circle FAB — always visible */}
            <motion.a
                href="/Gourab_Ghosh_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                title="Resume"
                aria-label="Download Resume"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.93 }}
                style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: '#c3173e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    textDecoration: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 0 0 3px rgba(195,23,62,0.25), 0 4px 18px rgba(195,23,62,0.4)',
                    transition: 'box-shadow 0.25s ease',
                }}
            >
                {/* Download arrow */}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                        d="M10 3v10M10 13l-3.5-3.5M10 13l3.5-3.5M3 17h14"
                        stroke="#fff"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </motion.a>

            {/* Tooltip — slides out to the RIGHT of the circle */}
            <AnimatePresence>
                {hovered && (
                    <motion.a
                        href="/Gourab_Ghosh_Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -10, scale: 0.92 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -10, scale: 0.92 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            color: '#fff',
                            background: 'rgba(10,4,20,0.94)',
                            border: '1px solid rgba(195,23,62,0.45)',
                            borderRadius: '8px',
                            padding: '0.42rem 0.85rem',
                            whiteSpace: 'nowrap',
                            textDecoration: 'none',
                            backdropFilter: 'blur(14px)',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.45)',
                            pointerEvents: 'auto',
                        }}
                    >
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                            <path
                                d="M6 1v7M6 8l-2.5-2.5M6 8l2.5-2.5M1 10.5h10"
                                stroke="#c3173e"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        DOWNLOAD RESUME
                    </motion.a>
                )}
            </AnimatePresence>
        </div>
    );
}
