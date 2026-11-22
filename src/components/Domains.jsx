import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../motion/motionVariants';
import SectionReveal from './SectionReveal';
import { FaShieldAlt, FaCode, FaSearch, FaNetworkWired, FaBug, FaCloud } from 'react-icons/fa';

const domains = [
    { 
        id: '01', 
        name: 'Offensive Security', 
        color: '#c3173e', 
        icon: FaBug,
        tagline: 'Simulate. Exploit. Expose.',
        desc: 'Proactively identifying vulnerabilities by simulating advanced cyber attacks before malicious actors can exploit them.',
        tools: ['Burp Suite', 'Metasploit', 'SQLMap', 'Nmap', 'Nuclei'],
        focus: [
            'Web Application Penetration Testing',
            'Vulnerability Scanning & Assessment',
            'Exploit Development',
            'Red Teaming Operations'
        ]
    },
    { 
        id: '02', 
        name: 'Defensive Security', 
        color: '#c3173e', 
        icon: FaCode,
        tagline: 'Detect. Respond. Mitigate.',
        desc: 'Strengthening systems, monitoring threats, and implementing proactive measures to keep infrastructure secure.',
        tools: ['SIEM', 'Suricata', 'Wazuh', 'Splunk', 'ELK Stack', 'Windows Defender', 'pfSense', 'Fail2Ban'],
        focus: [
            'Monitoring & Incident Detection',
            'Log Analysis & Forensics',
            'Threat Hunting',
            'Vulnerability Management'
        ]
    },
    { 
        id: '03', 
        name: 'Threat Intelligence', 
        color: '#c3173e', 
        icon: FaSearch,
        tagline: 'Gather. Analyze. Anticipate.',
        desc: 'Collecting and analyzing open-source intelligence to understand adversary motives, targets, and attack behaviors.',
        tools: ['Maltego', 'Shodan', 'SpiderFoot', 'Google Dorks', 'Wayback Machine'],
        focus: [
            'OSINT Investigations',
            'Dark Web Monitoring',
            'Threat Actor Profiling',
            'Attack Surface Mapping'
        ]
    },
    { 
        id: '04', 
        name: 'Cloud & DevSecOps', 
        color: '#c3173e', 
        icon: FaCloud,
        tagline: 'Build. Automate. Secure.',
        desc: 'Integrating security directly into the CI/CD pipeline and securing cloud architectures from the ground up.',
        tools: ['Docker', 'Kubernetes', 'AWS Security', 'GitLab CI', 'Terraform', 'Trivy'],
        focus: [
            'Container Security',
            'Infrastructure as Code (IaC) Auditing',
            'CI/CD Pipeline Security',
            'Cloud IAM & Policy Review'
        ]
    },
    { 
        id: '05', 
        name: 'Networking & Infra', 
        color: '#c3173e', 
        icon: FaNetworkWired,
        tagline: 'Monitor. Control. Protect.',
        desc: 'Securing the backbone of digital operations by designing robust network perimeters and monitoring traffic.',
        tools: ['Wireshark', 'Zeek', 'Tcpdump', 'Snort', 'OpenVPN', 'IPSec'],
        focus: [
            'Packet Capture & Analysis',
            'Firewall Configuration & Auditing',
            'Zero Trust Architecture',
            'Secure VPN Tunnels'
        ]
    },
    { 
        id: '06', 
        name: 'Programming & Auto', 
        color: '#c3173e', 
        icon: FaShieldAlt,
        tagline: 'Script. Automate. Scale.',
        desc: 'Writing secure code and developing custom scripts to automate complex security operations and testing.',
        tools: ['Python', 'Bash', 'JavaScript', 'Go', 'PowerShell', 'Rust'],
        focus: [
            'Custom Exploit Scripting',
            'Security Automation Workflows',
            'Secure API Development',
            'Code Review & SAST'
        ]
    }
];

// SVG Hexagon component
const Hexagon = ({ size, color, children, isActive, onClick, onMouseEnter, onFocus, name }) => (
    <button
        type="button"
        aria-label={`Show ${name} domain`}
        aria-pressed={isActive}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
        style={{
            width: size,
            height: size,
            zIndex: isActive ? 10 : 5,
            filter: isActive ? `drop-shadow(0 0 15px ${color})` : 'none',
            transform: `translate(-50%, -50%) scale(${isActive ? 1.15 : 1})`,
            background: 'transparent',
            border: 0,
            padding: 0,
            color: 'inherit',
            font: 'inherit',
        }}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onFocus={onFocus}
    >
        <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
            <polygon 
                points="50 1, 95 25, 95 75, 50 99, 5 75, 5 25" 
                fill={isActive ? 'rgba(10,10,15,0.95)' : 'rgba(10,10,15,0.6)'} 
                stroke={color} 
                strokeWidth={isActive ? "2" : "1"} 
                className="transition-all duration-300"
                style={{
                    filter: isActive ? `drop-shadow(0 0 8px ${color})` : 'none'
                }}
            />
            {/* Inner hexagon ring */}
            {isActive && (
                <polygon 
                    points="50 8, 88 30, 88 70, 50 92, 12 70, 12 30" 
                    fill="none" 
                    stroke={color} 
                    strokeWidth="0.5" 
                    opacity="0.5"
                />
            )}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4 pointer-events-none">
            {children}
        </div>
    </button>
);

export default function Domains() {
    const [activeDomain, setActiveDomain] = useState(domains[1]); // Default to Defensive Security (02)

    const [radius, setRadius] = useState(() => window.innerWidth < 420 ? 100 : window.innerWidth < 1024 ? 120 : 170);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const updateRadius = () => setRadius(window.innerWidth < 420 ? 100 : window.innerWidth < 1024 ? 120 : 170);
        window.addEventListener('resize', updateRadius);
        return () => window.removeEventListener('resize', updateRadius);
    }, []);

    return (
        <SectionReveal id="domains" className="section-padding relative" style={{ background: '#050308', borderTop: '1px solid rgba(195,23,62,0.15)', borderBottom: '1px solid rgba(195,23,62,0.15)' }}>
            <div className="content-wrap">
                {/* Header Section */}
                <motion.div
                    className="text-center section-heading"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div variants={fadeUp} className="hidden md:flex items-center justify-between text-[0.65rem] tracking-[0.2em] uppercase text-gray-500 font-mono mb-4">
                        <div className="text-left leading-relaxed">Ethical Hacker · Cisco Networking Academy<br/><span style={{ color: 'var(--color-crimson)' }}>Top 20% TryHackMe</span></div>
                        <div className="text-center text-[0.75rem]" style={{ color: 'var(--color-crimson)' }}>{'// EXPERTISE DOMAINS'}</div>
                        <div className="text-right leading-relaxed"></div>
                    </motion.div>
                    
                    <motion.h2
                        variants={fadeUp}
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}
                    >
                        <span style={{ color: '#F8FAFC' }}>Security </span>
                        <span style={{ color: 'var(--color-crimson)', textShadow: '0 0 20px rgba(195, 23, 62, 0.4)' }}>Command Center</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-gray-400 font-mono mt-2 mb-12 text-sm tracking-wide">
                        Six core domains. One safer digital world.
                    </motion.p>
                </motion.div>

                {/* Main 3-Column Layout */}
                <div className="grid grid-cols-1 xl:grid-cols-[120px_minmax(0,1fr)_420px] gap-8 xl:gap-16 items-center">
                    
                    {/* LEFT PANEL: Honest Stats (to be provided) */}
                    <motion.div 
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="hidden xl:flex flex-col gap-10 font-mono text-sm"
                    >
                        {/* 
                          Awaiting real data from user (e.g. Zecuron products shipped, 
                          hackathons, certs, GitHub commits, etc.)
                        */}
                    </motion.div>

                    {/* CENTER HUD: Orbital Radar */}
                    <div className="relative h-[450px] xl:h-[550px] w-full flex items-center justify-center">
                        
                        {/* Radar Rings & Center Globe */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {/* Outer dashed ring */}
                            <motion.div 
                                className="domain-radar-ring--outer absolute rounded-full border border-dashed border-gray-700/50"
                                style={{ width: '380px', height: '380px', opacity: 0.7 }}
                                animate={reduceMotion ? undefined : { rotate: 360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                            />
                            {/* Inner solid ring */}
                            <div className="domain-radar-ring--inner absolute rounded-full border border-gray-800" style={{ width: '250px', height: '250px' }} />
                            
                            {/* Center glowing element (representing globe/core) */}
                            <div className="domain-radar-core absolute rounded-full" style={{ 
                                width: '150px', height: '150px', 
                                background: 'radial-gradient(circle, rgba(195,23,62,0.15) 0%, rgba(0,0,0,0) 70%)',
                                border: '1px solid rgba(195,23,62,0.3)',
                                boxShadow: '0 0 40px rgba(195,23,62,0.1) inset'
                            }}>
                                {/* Grid lines inside globe */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(195,23,62,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(195,23,62,0.2)_1px,transparent_1px)] bg-[size:10px_10px] rounded-full overflow-hidden opacity-50" />
                                
                                <div className="absolute inset-0 flex flex-col items-center justify-center font-mono text-[0.65rem] tracking-[0.2em] text-red-500/80 leading-loose">
                                    <span>SECURE</span>
                                    <span className="text-white">ANALYZE</span>
                                    <span>PREVENT</span>
                                </div>
                            </div>
                        </div>

                        {/* Orbiting Hexagons */}
                        <div className="absolute top-1/2 left-1/2 w-0 h-0">
                            {domains.map((domain, index) => {
                                // 6 domains -> 60 degrees each, offset by -90 to start top
                                const angle = (index * 60 - 90) * (Math.PI / 180);
                                const x = Math.cos(angle) * radius;
                                const y = Math.sin(angle) * radius;
                                const isActive = activeDomain.id === domain.id;
                                const Icon = domain.icon;

                                return (
                                    <motion.div 
                                        key={domain.id} 
                                        style={{ position: 'absolute', left: x, top: y }}
                                        animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
                                        transition={{ duration: 4 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                                    >
                                        {/* Connector line from center (purely visual) */}
                                        <div 
                                            className="absolute top-1/2 left-1/2 bg-gray-800 origin-left -z-10"
                                            style={{ 
                                                width: radius - 75, 
                                                height: '1px', 
                                                transform: `rotate(${angle + Math.PI}rad) translateX(75px)`,
                                                opacity: 0.5
                                            }}
                                        />

                                        <Hexagon 
                                            size={isActive ? 120 : 100} 
                                            color={isActive ? domain.color : '#2d3748'} 
                                            isActive={isActive}
                                            onClick={() => setActiveDomain(domain)}
                                            onMouseEnter={() => setActiveDomain(domain)}
                                            onFocus={() => setActiveDomain(domain)}
                                            name={domain.name}
                                        >
                                            <div className="font-mono text-[0.7rem] text-[#ff6b7a] mb-1 opacity-80">{domain.id}</div>
                                            <Icon size={isActive ? 22 : 18} className="mb-1.5" style={{ color: isActive ? '#fff' : '#a0aec0', filter: isActive ? 'drop-shadow(0 0 5px rgba(255,255,255,0.5))' : 'none', transition: 'all 0.3s' }} />
                                            <div className="font-sans text-[0.6rem] font-bold tracking-wide uppercase leading-tight" style={{ color: isActive ? '#fff' : '#cbd5e0' }}>
                                                {domain.name.split(' ').map((word, i) => <div key={i}>{word}</div>)}
                                            </div>
                                        </Hexagon>

                                        {/* Connector line to right panel if active */}
                                        {isActive && (
                                            <svg className="absolute hidden xl:block overflow-visible pointer-events-none -z-10" style={{ left: '0px', top: '0px', width: '400px', height: '100px' }}>
                                                <path 
                                                    d={`M 60 0 L 150 ${y < 0 ? 50 : -50} L 360 ${y < 0 ? 50 : -50}`} 
                                                    fill="none" 
                                                    stroke={domain.color} 
                                                    strokeWidth="1.5" 
                                                    strokeDasharray="4 4" 
                                                    className="animate-pulse" 
                                                    style={{ opacity: 0.6 }}
                                                />
                                            </svg>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                    </div>

                    {/* RIGHT PANEL: Domain Details */}
                    <div className="relative xl:ml-8">
                        {/* Decorative bounding box */}
                        <div 
                            className="absolute -inset-8 border rounded-xl pointer-events-none transition-colors duration-500 hidden xl:block"
                            style={{ 
                                borderColor: `${activeDomain.color}30`,
                                background: `linear-gradient(90deg, ${activeDomain.color}05, transparent)`
                            }} 
                        />
                        <div 
                            className="absolute -inset-8 border rounded-xl pointer-events-none transition-colors duration-500 hidden xl:block"
                            style={{ 
                                clipPath: 'polygon(0 0, 15% 0, 15% 100%, 0 100%)',
                                borderColor: `${activeDomain.color}80` 
                            }} 
                        />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeDomain.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col gap-6 relative z-10"
                            >
                                {/* Header */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="text-4xl font-mono font-bold" style={{ color: activeDomain.color }}>
                                            {activeDomain.id}
                                        </div>
                                        <div className="text-[0.6rem] font-mono tracking-widest text-gray-500 uppercase flex items-center gap-2">
                                            Domain Details 
                                            <div className="w-4 h-4 border border-gray-600 flex items-center justify-center text-[0.5rem]">X</div>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-display font-bold uppercase tracking-wider text-white mb-2">
                                        {activeDomain.name}
                                    </h3>
                                    <div className="font-mono text-sm text-gray-300 mb-3 tracking-wide">
                                        {activeDomain.tagline}
                                    </div>
                                    <p className="text-[0.8rem] text-gray-400 leading-relaxed font-mono">
                                        {activeDomain.desc}
                                    </p>
                                </div>

                                {/* Tools & Technologies */}
                                <div>
                                    <div className="flex items-center gap-2 font-mono text-[0.65rem] tracking-widest text-[#ff6b7a] uppercase mb-4">
                                        Tools & Technologies <span className="flex-1 h-[1px] bg-gradient-to-r from-[#c3173e]/50 to-transparent"></span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {activeDomain.tools.map((tool, i) => (
                                            <div 
                                                key={i} 
                                                className="px-3 py-1.5 text-[0.7rem] font-mono rounded transition-colors"
                                                style={{ 
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    color: '#e2e8f0',
                                                    background: 'rgba(255,255,255,0.03)'
                                                }}
                                            >
                                                {tool}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Key Focus Areas */}
                                <div>
                                    <div className="flex items-center gap-2 font-mono text-[0.65rem] tracking-widest text-[#ff6b7a] uppercase mb-4">
                                        Key Focus Areas <span className="flex-1 h-[1px] bg-gradient-to-r from-[#c3173e]/50 to-transparent"></span>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {activeDomain.focus.map((item, i) => {
                                            const ItemIcon = activeDomain.icon;
                                            return (
                                                <div key={i} className="flex items-center gap-3">
                                                    <ItemIcon size={12} style={{ color: activeDomain.color }} />
                                                    <span className="text-[0.75rem] font-mono text-gray-300">{item}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>

                {/* Footer bar */}
                <div className="hidden xl:flex mt-16 items-center justify-between font-mono text-[0.65rem] tracking-[0.2em] text-gray-500 uppercase">
                    <div>ZECURON<br/><span className="text-[0.55rem] text-gray-600 tracking-widest">Where Security Meets Intelligence</span></div>
                    <div className="flex items-center gap-4">
                        <div>Building A Safer Tomorrow</div>
                        <div className="w-12 h-[1px] bg-red-500/50"></div>
                    </div>
                </div>
            </div>
        </SectionReveal>
    );
}
