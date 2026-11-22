import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../motion/motionVariants';
import SectionReveal from './SectionReveal';

const commands = {
    help: {
        output: [
            'Available commands:',
            '  whoami          — Who am I?',
            '  zecuron         — About the Zecuron platform',
            '  research        — Published paper',
            '  certifications  — My certifications',
            '  socials         — Social links',
            '  clear           — Clear terminal',
            '  help            — Show this help message',
        ],
    },
    whoami: {
        output: [
            '┌──────────────────────────────────────────────┐',
            '│  GOURAB GHOSH                                │',
            '│  SOC Analyst · Cybersecurity & Full-Stack    │',
            '│  Building Zecuron — Personal Security Platform     │',
            '│  B.Sc. CS — Rizvi College, Mumbai            │',
            '│  CGPA: 8.39 (Graduate / Fresher)             │',
            '└──────────────────────────────────────────────┘',
        ],
    },
    zecuron: {
        output: [
            '[*] Zecuron — Personal Cybersecurity Platform (Mar 2026)',
            '[+] Platform:  CyberGuardian + ReconXplorer unified',
            '[+] Stack:     Flask · FastAPI · React · PostgreSQL · Docker',
            '[+] Live:      https://zecuron.com',
            '[+] Mirror:    https://zecuron.in',
            '[âœ“] Status:    Public beta in progress',
        ],
    },
    research: {
        output: [
            '[*] Behavioral Login Systems: Keystroke & Mouse Auth',
            '[+] Journal:  International Journal of Research (IJR)',
            '[+] ISSN:     2231-6124 | Impact Factor SJIF: 8.88',
            '[+] Volume:   15(1) | Published: Jul-Dec 2025',
            '[+] Link:     internationaljournalofresearch.co.in/journal-issues',
        ],
    },
    certifications: {
        output: [
            '[1] Ethical Hacking — Cisco Networking Academy (May 2025)',
            '[2] Cyber Security Fundamentals — Acmegrade (Jun 2024)',
            '[3] Prompt Design in Vertex AI — Google Cloud (2025)',
            '[4] Python 3.4.3 — IIT Bombay Spoken Tutorial (Mar 2024)',
            '[5] Deloitte Cyber Job Simulation — Forage (Mar 2026)',
            '[6] Mastercard Cybersecurity Simulation — Forage (Mar 2026)',
            '[7] Tata Cybersecurity Analyst Simulation — Forage (Mar 2026)',
        ],
    },
    socials: {
        output: [
            '╔════════════════════════════════════════════════════╗',
            '║  GitHub:    github.com/gourab-0                    ║',
            '║  LinkedIn:  linkedin.com/in/gourabghosh-zecuron    ║',
            '║  Instagram: @gourabghosh25_                        ║',
            '║  Email:     gourabghosh828@gmail.com               ║',
            '╚════════════════════════════════════════════════════╝',
        ],
    },
};

export default function Terminal() {
    const [history, setHistory] = useState([
        { type: 'system', text: '╔════════════════════════════════════════════════════╗' },
        { type: 'system', text: '║  GOURAB SECURE TERMINAL v3.0                       ║' },
        { type: 'system', text: '║  Type "help" for available commands                ║' },
        { type: 'system', text: '╚════════════════════════════════════════════════════╝' },
        { type: 'output', text: '' },
    ]);
    const [cmdHistory, setCmdHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [input, setInput] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const termRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        if (termRef.current) {
            termRef.current.scrollTop = termRef.current.scrollHeight;
        }
    };

    useEffect(scrollToBottom, [history]);

    const handleCommand = async (cmd) => {
        const trimmed = cmd.trim().toLowerCase();
        setHistory((h) => [...h, { type: 'input', text: `gourab@zecuron:~$ ${cmd}` }]);
        
        if (trimmed) {
            setCmdHistory(prev => [...prev, cmd]);
        }
        setHistoryIndex(-1);

        if (trimmed === 'clear') {
            setHistory([]);
            return;
        }

        const found = commands[trimmed];
        if (!found) {
            if (trimmed !== '') {
                setHistory((h) => [
                    ...h,
                    { type: 'error', text: `bash: ${trimmed}: command not found` },
                    { type: 'output', text: 'Type "help" for available commands.' },
                ]);
            }
            return;
        }

        if (found.animated) {
            setIsAnimating(true);
            for (const frame of found.frames) {
                await new Promise((r) => setTimeout(r, 300));
                setHistory((h) => [...h, { type: 'output', text: frame }]);
            }
            setIsAnimating(false);
        } else {
            found.output.forEach((line) => {
                setHistory((h) => [...h, { type: 'output', text: line }]);
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isAnimating) return;
        handleCommand(input);
        setInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (cmdHistory.length > 0) {
                const nextIndex = historyIndex + 1 < cmdHistory.length ? historyIndex + 1 : historyIndex;
                setHistoryIndex(nextIndex);
                setInput(cmdHistory[cmdHistory.length - 1 - nextIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const prevIndex = historyIndex - 1;
                setHistoryIndex(prevIndex);
                setInput(cmdHistory[cmdHistory.length - 1 - prevIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput('');
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            if (!input) return;
            const match = Object.keys(commands).find(c => c.startsWith(input.toLowerCase()));
            if (match) setInput(match);
        }
    };

    const getLineColor = (type) => {
        switch (type) {
            case 'system':
                return 'var(--color-ghost)';
            case 'input':
                return 'var(--color-crimson)';
            case 'error':
                return 'var(--color-red)';
            default:
                return 'var(--color-data)'; // Output text is data blue
        }
    };

    return (
        <motion.div
            variants={fadeUp}
            className="rounded-xl overflow-hidden glass h-full flex flex-col"
            style={{
                border: '1px solid rgba(195, 23, 62, 0.2)',
                boxShadow: '0 0 40px rgba(195, 23, 62, 0.1)',
            }}
        >
            {/* Title bar */}
            <div
                className="flex items-center gap-2 px-4 py-3"
                style={{
                    background: 'rgba(17, 6, 17, 0.9)',
                    borderBottom: '1px solid rgba(195, 23, 62, 0.15)',
                }}
            >
                        <div className="w-3 h-3 rounded-full" style={{ background: '#ff3355' }} />
                        <div className="w-3 h-3 rounded-full" style={{ background: '#ffb800' }} />
                        <div className="w-3 h-3 rounded-full" style={{ background: '#00ff88' }} />
                        <span
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.7rem',
                                color: 'var(--color-text-dim)',
                                marginLeft: '0.5rem',
                            }}
                        >
                            gourab@zecuron:~$
                        </span>
                    </div>

                    {/* Terminal body */}
                    <div
                        ref={termRef}
                        onClick={() => inputRef.current?.focus()}
                        style={{
                            background: 'rgba(10, 10, 15, 0.95)',
                            padding: '1.2rem',
                            height: '320px',
                            overflowY: 'auto',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.85rem',
                            lineHeight: 1.6,
                            cursor: 'text',
                        }}
                    >
                        {history.map((line, i) => (
                            <div key={i} style={{ color: getLineColor(line.type), whiteSpace: 'pre-wrap', wordBreak: 'break-word', marginBottom: '0.2rem' }}>
                                {line.text}
                            </div>
                        ))}

                        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
                            <span style={{ color: 'var(--color-crimson)' }}>gourab@zecuron:~$</span>
                            <div className="relative flex-1 flex items-center">
                                <span className="animate-pulse-glow" style={{ color: 'var(--color-text)', position: 'absolute', left: `${input.length}ch`, zIndex: 0, opacity: 0.8, transition: 'left 0.05s' }}>█</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    disabled={isAnimating}
                                    autoComplete="off"
                                    spellCheck={false}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        outline: 'none',
                                        color: 'var(--color-text)',
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.85rem',
                                        width: '100%',
                                        zIndex: 1,
                                        position: 'relative'
                                    }}
                                />
                            </div>
                        </form>
                    </div>
        </motion.div>
    );
}
