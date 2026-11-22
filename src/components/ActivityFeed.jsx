import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp } from '../motion/motionVariants';
import SectionReveal from './SectionReveal';

const logTemplates = [
    { type: 'SCAN', msg: 'Port 443/tcp OPEN — HTTPS' },
    { type: 'SCAN', msg: 'Port 80/tcp OPEN — HTTP' },
    { type: 'SCAN', msg: 'Port 22/tcp FILTERED — SSH' },
    { type: 'OSINT', msg: 'Subdomain found: api.target.com' },
    { type: 'OSINT', msg: 'DNS record: A 192.168.1.100' },
    { type: 'AUTH', msg: 'Login attempt from 10.0.0.15 — SUCCESS' },
    { type: 'AUTH', msg: 'MFA verified for user admin' },
    { type: 'VULN', msg: 'CVE-2024-1234 patched successfully' },
    { type: 'VULN', msg: 'XSS vector neutralized in /api/search' },
    { type: 'ALERT', msg: 'DDoS mitigation active — 1.2Gbps' },
    { type: 'ALERT', msg: 'Suspicious payload blocked at WAF' },
    { type: 'NET', msg: 'SSL handshake completed — TLS 1.3' },
    { type: 'NET', msg: 'Packet analysis: 0 anomalies detected' },
    { type: 'RECON', msg: 'Whois lookup: registrar verified' },
    { type: 'RECON', msg: 'Certificate transparency log checked' },
    { type: 'SYSTEM', msg: 'Firewall rules updated — 42 rules active' },
    { type: 'SYSTEM', msg: 'IDS signature database updated' },
];

const typeColors = {
    SCAN: '#00f0ff',
    OSINT: '#00ff88',
    AUTH: '#7b2fff',
    VULN: '#ff3355',
    ALERT: '#ffb800',
    NET: '#ff00e5',
    RECON: '#00f0ff',
    SYSTEM: '#00ff88',
};

export default function ActivityFeed() {
    const reduceMotion = useReducedMotion();
    const [logs, setLogs] = useState([]);
    const feedRef = useRef(null);

    useEffect(() => {
        // Initial batch
        const initial = [];
        for (let i = 0; i < 8; i++) {
            const t = logTemplates[Math.floor(Math.random() * logTemplates.length)];
            initial.push({
                id: i,
                time: new Date(Date.now() - (8 - i) * 3000).toLocaleTimeString('en-US', { hour12: false }),
                ...t,
            });
        }
        setLogs(initial);

        // Add new logs periodically
        let counter = 8;
        if (reduceMotion) return () => {};

        const interval = setInterval(() => {
            const t = logTemplates[Math.floor(Math.random() * logTemplates.length)];
            setLogs((prev) => [
                ...prev.slice(-20),
                {
                    id: counter++,
                    time: new Date().toLocaleTimeString('en-US', { hour12: false }),
                    ...t,
                },
            ]);
        }, 2500);

        return () => clearInterval(interval);
    }, [reduceMotion]);

    useEffect(() => {
        if (feedRef.current) {
            feedRef.current.scrollTop = feedRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <motion.div
            variants={fadeUp}
            className="rounded-xl overflow-hidden glass h-full"
            style={{
                border: '1px solid rgba(195, 23, 62, 0.25)',
                boxShadow: '0 0 40px rgba(195, 23, 62, 0.1)',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Header */}
            <div
                className="flex items-center justify-between px-5 py-3"
                style={{
                    background: 'rgba(17, 6, 17, 0.9)',
                    borderBottom: '1px solid rgba(195, 23, 62, 0.15)',
                }}
            >
                <div className="flex items-center gap-2">
                    <span
                        className="w-2 h-2 rounded-full animate-pulse-glow"
                        style={{ background: '#c3173e', boxShadow: '0 0 8px #c3173e' }}
                    />
                    <span
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            color: '#ff6b7a',
                            letterSpacing: '0.1em',
                            fontWeight: 600,
                        }}
                    >
                        SIMULATED ACTIVITY // DEMO
                    </span>
                </div>
                <span
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: 'var(--color-text-dim)',
                    }}
                >
                    {logs.length} events
                </span>
            </div>

                    {/* Feed */}
                    <div
                        ref={feedRef}
                        style={{
                            background: 'rgba(10, 10, 15, 0.95)',
                            height: '320px',
                            overflowY: 'auto',
                            padding: '0.5rem 1rem',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            lineHeight: 1.8,
                        }}
                    >
                        {logs.map((log) => (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex gap-3"
                            >
                                <span style={{ color: 'var(--color-cyber-text-dim)', flexShrink: 0 }}>
                                    {log.time}
                                </span>
                                <span
                                    style={{
                                        color: typeColors[log.type],
                                        flexShrink: 0,
                                        minWidth: '60px',
                                    }}
                                >
                                    [{log.type}]
                                </span>
                                <span style={{ color: 'var(--color-cyber-text)' }}>{log.msg}</span>
                            </motion.div>
                        ))}
                    </div>
        </motion.div>
    );
}
