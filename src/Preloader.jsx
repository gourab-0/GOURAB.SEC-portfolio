import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────
   CONSTANTS  — portfolio-safe terminal lines
───────────────────────────────────────────── */
const TERMINAL_LINES = [
  "> [  0.001] kernel: Linux 6.1.42-pentest x86_64               [OK]",
  "> [  0.128] net: eth0 up — 10.0.0.1/24 — 1Gbps detected      [OK]",
  "> [  0.441] nmap: scanning 192.168.0.0/24 for vulnerabilities  [OK]",
  "> [  0.891] vuln: CVE-2024-3094 confirmed — xz-utils        [FAIL]",
  "> [  0.912] vuln: CVE-2024-6387 — openssh-server RCE        [FAIL]",
  "> [  1.155] shell: escalating privileges via kernel exploit...",
  "> [  1.299] root@target:~# whoami",
  "> root",
  "> [  1.455] root@target:~# ./breach.sh --silent --persist",
];

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;':\",./<>?ΨΦΩωΣπ≈∆∇∞§±×÷¿¡АБВ";

const PROGRESS_TASKS = [
  { label: "Scanning /etc/shadow → credentials", speed: 2.8 },
  { label: "Exfiltrating ~/.ssh/id_rsa keys",    speed: 3.2 },
  { label: "Dumping browser session cookies",    speed: 2.5 },
  { label: "Encrypting & uploading to C2",       speed: 2.6 },
];

// Pre-generated so blips don't re-randomize on every render
const RADAR_BLIPS = [
  { x: 58, y: 44 },
  { x: 143, y: 68 },
  { x: 72, y: 138 },
  { x: 158, y: 152 },
  { x: 44, y: 92 },
  { x: 122, y: 38 },
  { x: 168, y: 112 },
  { x: 90, y: 160 },
];

/* ─────────────────────────────────────────────
   GLOBAL CSS KEYFRAMES (injected once)
───────────────────────────────────────────── */
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=VT323&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes blink {
    0%,100% { opacity: 1; } 50% { opacity: 0; }
  }
  @keyframes blink-fast {
    0%,49% { opacity: 1; } 50%,100% { opacity: 0; }
  }
  @keyframes crt-flicker {
    0%  { opacity: 1; }   2%  { opacity: 0.3; } 4%  { opacity: 1; }
    6%  { opacity: 0.8; } 7%  { opacity: 0.1; } 9%  { opacity: 1; }
    50% { opacity: 0.95;} 52% { opacity: 0.2; } 54% { opacity: 1; }
  }
  @keyframes snap-in {
    0%   { opacity: 0; transform: scaleY(0.02) skewX(-2deg); filter: brightness(6); }
    8%   { opacity: 1; transform: scaleY(1.04) skewX(1deg);  filter: brightness(2.5); }
    12%  { transform: scaleY(0.97) skewX(-0.5deg); filter: brightness(1.2); }
    16%  { transform: scaleY(1);   filter: brightness(1); }
    100% { opacity: 1;  transform: scaleY(1);   filter: brightness(1); }
  }
  @keyframes pulse-red {
    0%,100% { text-shadow: 0 0 8px #ff0000, 0 0 20px #ff0000, 0 0 40px #cc0000; }
    50%     { text-shadow: 0 0 4px #ff2222, 0 0 10px #dd0000; }
  }
  @keyframes glitch-skew {
    0%,100% { transform: skewX(0deg); }
    10% { transform: skewX(-3deg); } 20% { transform: skewX(2deg); }
    30% { transform: skewX(0deg);  } 70% { transform: skewX(1deg); }
    80% { transform: skewX(-1.5deg); }
  }
  @keyframes glitch-clip-1 {
    0%,100% { clip-path: inset(0 0 100% 0); }
    5%  { clip-path: inset(15% 0 60% 0); } 15% { clip-path: inset(65% 0 10% 0); }
    25% { clip-path: inset(40% 0 45% 0); } 35% { clip-path: inset(80% 0  5% 0); }
    45% { clip-path: inset( 5% 0 80% 0); } 55% { clip-path: inset(50% 0 30% 0); }
    65% { clip-path: inset(20% 0 65% 0); } 75% { clip-path: inset(70% 0 15% 0); }
    85% { clip-path: inset(30% 0 55% 0); }
  }
  @keyframes glitch-clip-2 {
    0%,100% { clip-path: inset(0 0 100% 0); }
    8%  { clip-path: inset(55% 0 20% 0); } 18% { clip-path: inset(10% 0 75% 0); }
    28% { clip-path: inset(75% 0  8% 0); } 38% { clip-path: inset(25% 0 60% 0); }
    48% { clip-path: inset(60% 0 25% 0); } 58% { clip-path: inset( 8% 0 80% 0); }
    68% { clip-path: inset(45% 0 35% 0); } 78% { clip-path: inset(85% 0  3% 0); }
    88% { clip-path: inset(35% 0 50% 0); }
  }
  @keyframes bar-glow {
    0%,100% { box-shadow: 0 0 4px #ff0000, 0 0 8px #cc0000; }
    50%     { box-shadow: 0 0 2px #ff2222; }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes terminal-glow-pulse {
    0%,100% { text-shadow: 0 0 6px #00ff00, 0 0 12px #00cc00; }
    50%     { text-shadow: 0 0 2px #00dd00; }
  }
  @keyframes btn-pulse {
    0%,100% { box-shadow: 0 0 6px #00ff00, 0 0 14px #00aa00, inset 0 0 6px rgba(0,255,0,0.08); }
    50%     { box-shadow: 0 0 12px #00ff00, 0 0 28px #00cc00, inset 0 0 12px rgba(0,255,0,0.15); }
  }
  @keyframes noise {
    0%  { background-position: 0% 0%;    } 10% { background-position: -5% -10%; }
    20% { background-position: -15% 5%;  } 30% { background-position: 7% -25%; }
    40% { background-position: 20% 25%;  } 50% { background-position: -25% 10%;}
    60% { background-position: 15% 5%;   } 70% { background-position: 0% 15%;  }
    80% { background-position: 25% 35%;  } 90% { background-position: -10% 10%;}
    100%{ background-position: 0% 0%;    }
  }
  @keyframes corner-blink {
    0%,100% { opacity: 1; } 45%,55% { opacity: 0.3; }
  }
  @keyframes jitter {
    0%,100% { transform: translate(0,0); }
    20% { transform: translate(-2px,1px); } 40% { transform: translate(2px,-1px); }
    60% { transform: translate(-1px,2px); } 80% { transform: translate(1px,-2px); }
  }

  /* ── NEW keyframes ── */
  @keyframes radar-sweep {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes hacked-slam {
    0%   { transform: scale(2.2) skewX(-5deg); opacity: 0;  filter: brightness(14) blur(6px); }
    12%  { transform: scale(0.92) skewX(2deg); opacity: 1;  filter: brightness(4); }
    30%  { transform: scale(1.06);             filter: brightness(2); }
    50%  { transform: scale(0.98);             filter: brightness(1.2); }
    100% { transform: scale(1)   skewX(0deg); filter: brightness(1); }
  }
  @keyframes border-alarm {
    0%,100% {
      box-shadow: 0 0 32px #ff0000, 0 0 90px rgba(255,0,0,0.25), inset 0 0 30px rgba(255,0,0,0.07);
      border-color: #ff0000;
    }
    50% {
      box-shadow: 0 0 8px #770000, 0 0 24px rgba(120,0,0,0.12), inset 0 0 8px rgba(100,0,0,0.04);
      border-color: #550000;
    }
  }
  @keyframes hacked-text-pulse {
    0%,100% { text-shadow: 0 0 24px #ff0000, 0 0 60px #cc0000, 0 0 120px #990000; }
    50%     { text-shadow: 0 0  8px #ff2222, 0 0 20px  #aa0000; }
  }
  @keyframes stat-appear {
    from { opacity: 0; transform: translateX(-8px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes modal-overlay-flash {
    0%  { background: rgba(255,0,0,0.18); }
    8%  { background: rgba(0,0,0,0.88);   }
    12% { background: rgba(255,0,0,0.08); }
    20% { background: rgba(0,0,0,0.88);   }
    100%{ background: rgba(0,0,0,0.88);   }
  }
  @keyframes pkt-tick {
    from { opacity: 0.5; } to { opacity: 1; }
  }
  @keyframes welcome-resolve {
    0%   { letter-spacing: 0.6em; opacity: 0.4; }
    100% { letter-spacing: 0.12em; opacity: 1; }
  }

  @media (max-width: 600px) {
    .preloader-terminal-screen { padding: 32px 16px !important; }
    .preloader-terminal-content { width: 100% !important; max-width: 100% !important; }
    .preloader-terminal-heading {
      max-width: 100%;
      font-size: 8.5px !important;
      line-height: 1.5;
      letter-spacing: 0.08em !important;
      overflow-wrap: anywhere;
    }
    .preloader-terminal-line {
      font-size: clamp(8px, 2.35vw, 11px) !important;
      line-height: 1.65 !important;
      white-space: pre-wrap !important;
      overflow-wrap: anywhere;
    }
  }
`;

/* ─────────────────────────────────────────────
   HELPER: Scramble text hook
───────────────────────────────────────────── */
function useScramble(target, active, duration = 1400) {
  const [display, setDisplay] = useState("");
  const raf = useRef(null);

  useEffect(() => {
    if (!active) return undefined;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const resolved = Math.floor(progress * target.length);
      let out = "";
      for (let i = 0; i < target.length; i++) {
        if (i < resolved) out += target[i];
        else if (target[i] === " ") out += " ";
        else out += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      }
      setDisplay(out);
      if (progress < 1) raf.current = requestAnimationFrame(tick);
      else setDisplay(target);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [active, target, duration]);

  return active ? display : "";
}

/* ─────────────────────────────────────────────
   PHASE 1: Terminal 
───────────────────────────────────────────── */
function Phase1Terminal({ onDone, onLineComplete }) {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (currentLine >= TERMINAL_LINES.length) return;
    const line = TERMINAL_LINES[currentLine];
    const isSpecial = line.includes("[FAIL]") || line.includes("whoami") || line.includes("breach");
    if (currentChar < line.length) {
      const t = setTimeout(() => setCurrentChar(c => c + 1), isSpecial ? 10 : 6);
      return () => clearTimeout(t);
    } else {
      const pause = line.includes("[FAIL]") ? 200 : line.includes("root@") ? 120 : 60;
      const t = setTimeout(() => {
        onLineComplete?.(line, currentLine);
        setLines(l => [...l, line]);
        setCurrentLine(n => n + 1);
        setCurrentChar(0);
      }, pause);
      return () => clearTimeout(t);
    }
  }, [currentLine, currentChar, onLineComplete]);

  useEffect(() => {
    if (currentLine >= TERMINAL_LINES.length) {
      const t = setTimeout(onDone, 300);
      return () => clearTimeout(t);
    }
  }, [currentLine, onDone]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, currentChar]);

  const partialLine = currentLine < TERMINAL_LINES.length
    ? TERMINAL_LINES[currentLine].slice(0, currentChar) : null;

  const getColor = (l) => {
    if (l.includes("[FAIL]")) return "#ff3333";
    if (l.includes("[OK]")) return "#00ff00";
    if (l === "> root") return "#ffff00";
    return "#00ff00";
  };

  return (
    <div className="preloader-terminal-screen" style={{
      position: "absolute", inset: 0, background: "#000",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: "60px 80px",
      fontFamily: "'Share Tech Mono', monospace", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "repeating-linear-gradient(0deg, rgba(0,255,0,0.015) 0px, transparent 1px, transparent 3px)",
        zIndex: 10,
      }} />

      <div className="preloader-terminal-content" style={{ maxWidth: 860, width: "100%" }}>
        {/* ── Portfolio-safe header, no personal brand ── */}
        <div className="preloader-terminal-heading" style={{
          color: "#00ff00", fontSize: 11, marginBottom: 24,
          opacity: 0.5, letterSpacing: "0.3em",
        }}>
          PENTEST-FRAMEWORK v3.1 — NETWORK RECON TERMINAL
        </div>

        {lines.map((l, i) => (
          <div key={i} className="preloader-terminal-line" style={{
            color: getColor(l), fontSize: 15, lineHeight: "1.9",
            fontFamily: "'Share Tech Mono', monospace", whiteSpace: "pre",
            textShadow: getColor(l) === "#ff3333" ? "0 0 6px #ff0000" : "0 0 4px #00aa00",
          }}>{l}</div>
        ))}

        {partialLine !== null && (
          <div className="preloader-terminal-line" style={{
            color: getColor(TERMINAL_LINES[currentLine]),
            fontSize: 15, lineHeight: "1.9",
            fontFamily: "'Share Tech Mono', monospace", whiteSpace: "pre",
          }}>
            {partialLine}
            <span style={{
              display: "inline-block", width: 8, height: 16,
              background: "#00ff00", marginLeft: 1, verticalAlign: "middle",
              animation: "blink 0.7s step-end infinite",
            }} />
          </div>
        )}
      </div>
      <div ref={bottomRef} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   PHASE 2: WELCOME scramble 
───────────────────────────────────────────── */
function Phase2Welcome({ onDone }) {
  const [active, setActive] = useState(false);
  const display = useScramble("WELCOME", active, 1600);

  useEffect(() => {
    const t1 = setTimeout(() => setActive(true), 200);
    const t2 = setTimeout(onDone, 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  const isResolved = display === "WELCOME";

  return (
    <div style={{
      position: "absolute", inset: 0, background: "#000",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", gap: 24,
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "repeating-linear-gradient(0deg, rgba(0,255,0,0.012) 0px, transparent 2px)",
      }} />

      {/* Corner brackets */}
      {[
        { top: 24, left: 24, borderTop: "2px solid #003300", borderLeft: "2px solid #003300", width: 32, height: 32 },
        { top: 24, right: 24, borderTop: "2px solid #003300", borderRight: "2px solid #003300", width: 32, height: 32 },
        { bottom: 24, left: 24, borderBottom: "2px solid #003300", borderLeft: "2px solid #003300", width: 32, height: 32 },
        { bottom: 24, right: 24, borderBottom: "2px solid #003300", borderRight: "2px solid #003300", width: 32, height: 32 },
      ].map((s, i) => (
        <div key={i} style={{ position: "absolute", ...s, animation: "corner-blink 1.5s infinite", animationDelay: `${i * 0.3}s` }} />
      ))}

      <div style={{
        fontFamily: "'VT323', monospace",
        fontSize: "clamp(72px, 14vw, 130px)",
        color: "#00ff00",
        letterSpacing: isResolved ? "0.12em" : "0.05em",
        textShadow: "0 0 10px #00ff00, 0 0 30px #00aa00",
        transition: "letter-spacing 0.8s ease, text-shadow 0.8s ease",
        animation: isResolved ? "terminal-glow-pulse 2s infinite" : "none",
        userSelect: "none",
      }}>
        {display || "█"}
      </div>

      <div style={{
        fontFamily: "'Share Tech Mono', monospace",
        color: "#00aa00", fontSize: 12, letterSpacing: "0.4em",
        opacity: isResolved ? 1 : 0,
        transition: "opacity 0.6s ease 0.4s",
      }}>
        ▸ SYSTEM ACCESS INITIALIZED ◂
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   RADAR SCAN  (NEW — SVG with rotating sweep)
───────────────────────────────────────────── */
function RadarScan() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{
        fontFamily: "'Share Tech Mono', monospace",
        color: "#ff2222", fontSize: 9, letterSpacing: "0.3em",
        marginBottom: 6, textAlign: "center", opacity: 0.75,
      }}>// NETWORK SCAN — 192.168.0.0/24</div>

      <svg
        viewBox="0 0 200 200"
        style={{ flex: 1, display: "block", width: "100%", height: "auto", overflow: "visible" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="sweepGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff0000" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ff0000" stopOpacity="0" />
          </radialGradient>
          <filter id="blipGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* BG circle */}
        <circle cx="100" cy="100" r="95" fill="rgba(25,0,0,0.55)"
          stroke="rgba(255,0,0,0.22)" strokeWidth="1" />

        {/* Concentric rings */}
        {[76, 57, 38, 19].map(r => (
          <circle key={r} cx="100" cy="100" r={r} fill="none"
            stroke="rgba(255,0,0,0.18)" strokeWidth="0.6" strokeDasharray="4,4" />
        ))}

        {/* Crosshairs */}
        <line x1="5" y1="100" x2="195" y2="100" stroke="rgba(255,0,0,0.12)" strokeWidth="0.5" />
        <line x1="100" y1="5" x2="100" y2="195" stroke="rgba(255,0,0,0.12)" strokeWidth="0.5" />
        <line x1="33" y1="33" x2="167" y2="167" stroke="rgba(255,0,0,0.07)" strokeWidth="0.5" />
        <line x1="167" y1="33" x2="33" y2="167" stroke="rgba(255,0,0,0.07)" strokeWidth="0.5" />

        {/* Rotating sweep group */}
        <g style={{ transformOrigin: "100px 100px", animation: "radar-sweep 3s linear infinite" }}>
          <path d="M100,100 L100,5 A95,95 0 0,1 190,100 Z"
            fill="url(#sweepGrad)" opacity="0.5" />
          <line x1="100" y1="100" x2="100" y2="5"
            stroke="#ff3333" strokeWidth="2" opacity="0.95"
            filter="url(#lineGlow)" />
          <circle cx="100" cy="7" r="2.5" fill="#ff5555" />
        </g>

        {/* Blips */}
        {RADAR_BLIPS.map((b, i) => (
          <circle key={i} cx={b.x} cy={b.y} r="3" fill="#ff2020"
            filter="url(#blipGlow)"
            style={{
              animation: `blink ${0.75 + (i % 4) * 0.35}s infinite`,
              animationDelay: `${i * 0.27}s`,
            }}
          />
        ))}

        {/* Centre */}
        <circle cx="100" cy="100" r="3.5" fill="#ff0000" />
        <circle cx="100" cy="100" r="8" fill="none"
          stroke="rgba(255,0,0,0.45)" strokeWidth="1"
          style={{ animation: "blink 1.2s infinite" }} />

        {/* Corner brackets */}
        <path d="M8,22  L8,8   L22,8" fill="none" stroke="#ff2222" strokeWidth="1.8" />
        <path d="M178,8  L192,8  L192,22" fill="none" stroke="#ff2222" strokeWidth="1.8" />
        <path d="M8,178  L8,192  L22,192" fill="none" stroke="#ff2222" strokeWidth="1.8" />
        <path d="M192,178 L192,192 L178,192" fill="none" stroke="#ff2222" strokeWidth="1.8" />

        {/* Cardinal labels */}
        <text x="97" y="18" fill="rgba(255,0,0,0.35)" fontSize="7" fontFamily="monospace">N</text>
        <text x="97" y="189" fill="rgba(255,0,0,0.35)" fontSize="7" fontFamily="monospace">S</text>
        <text x="9" y="104" fill="rgba(255,0,0,0.35)" fontSize="7" fontFamily="monospace">W</text>
        <text x="183" y="104" fill="rgba(255,0,0,0.35)" fontSize="7" fontFamily="monospace">E</text>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   NETWORK WAVEFORM  (NEW — canvas ECG)
───────────────────────────────────────────── */
function WaveformGraph() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      tRef.current += 0.05;
      const t = tRef.current;

      // Grid
      ctx.strokeStyle = "rgba(160,0,0,0.14)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 44) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += 20) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Centre axis
      ctx.strokeStyle = "rgba(255,0,0,0.07)";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke();

      // === ECG spike waveform ===
      ctx.save();
      ctx.strokeStyle = "#ff1818";
      ctx.lineWidth = 1.8;
      ctx.shadowColor = "#ff0000";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      for (let x = 0; x < W; x++) {
        const phase = ((x / W) * 10 + t) % 10;
        let y;
        if (phase < 0.35) {
          y = H / 2;
        } else if (phase < 0.50) {
          // small P-wave bump
          const p = (phase - 0.35) / 0.15;
          y = H / 2 - Math.sin(p * Math.PI) * H * 0.08;
        } else if (phase < 0.58) {
          y = H / 2;
        } else if (phase < 0.63) {
          // QRS dip
          const p = (phase - 0.58) / 0.05;
          y = H / 2 + p * H * 0.14;
        } else if (phase < 0.70) {
          // QRS sharp spike up
          const p = (phase - 0.63) / 0.07;
          y = H / 2 + H * 0.14 - Math.sin(p * Math.PI) * H * 0.55;
        } else if (phase < 0.76) {
          // S dip
          const p = (phase - 0.70) / 0.06;
          y = H / 2 + p * H * 0.12;
        } else if (phase < 0.85) {
          // return to baseline
          const p = (phase - 0.76) / 0.09;
          y = H / 2 + H * 0.12 * (1 - p);
        } else if (phase < 1.00) {
          // T-wave
          const p = (phase - 0.85) / 0.15;
          y = H / 2 - Math.sin(p * Math.PI) * H * 0.10;
        } else {
          y = H / 2;
        }
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      // Noise underlay
      ctx.save();
      ctx.strokeStyle = "rgba(255,60,60,0.13)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let x = 0; x < W; x += 2) {
        const y = H / 2 + (Math.random() - 0.5) * 9;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{
        fontFamily: "'Share Tech Mono', monospace",
        color: "#ff2222", fontSize: 9, letterSpacing: "0.3em",
        marginBottom: 4, textAlign: "center", opacity: 0.75,
      }}>// NETWORK TRAFFIC — ANOMALY DETECTED</div>
      <canvas
        ref={canvasRef}
        width={360} height={110}
        style={{ flex: 1, display: "block", width: "100%", height: "auto" }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   HEX MEMORY DUMP TICKER  (NEW)
───────────────────────────────────────────── */
function generateHexTickerLine() {
  const addr = (Math.random() * 0xffff | 0).toString(16).padStart(4, "0").toUpperCase();
  const bytes = Array.from({ length: 12 }, () =>
    (Math.random() * 0xff | 0).toString(16).padStart(2, "0").toUpperCase()
  ).join(" ");
  const tags = ["EXFIL", "SCAN ", "DUMP ", "CRYPT", "C2-TX"];
  return `0x${addr}  ${bytes}  [${tags[Math.random() * tags.length | 0]}]`;
}

function HexTicker() {
  const [lines, setLines] = useState(() => Array.from({ length: 9 }, generateHexTickerLine));

  useEffect(() => {
    const id = setInterval(() => {
      setLines(prev => [...prev.slice(-11), generateHexTickerLine()]);
    }, 130);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      fontFamily: "'Share Tech Mono', monospace",
    }}>
      <div style={{
        color: "#ff2222", fontSize: 9, letterSpacing: "0.3em",
        marginBottom: 5, textAlign: "center", opacity: 0.75,
      }}>// MEMORY DUMP — LIVE EXFILTRATION</div>
      <div style={{ flex: 1, overflow: "hidden" }}>
        {lines.map((l, i) => (
          <div key={i} style={{
            fontSize: 8.5,
            lineHeight: "1.55",
            color: i === lines.length - 1 ? "#ff0000" : "#ff4444",
            opacity: 0.15 + (i / lines.length) * 0.85,
            textShadow: i === lines.length - 1 ? "0 0 8px #ff0000" : "none",
            whiteSpace: "nowrap", overflow: "hidden",
          }}>{l}</div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROGRESS BAR  (enhanced)
───────────────────────────────────────────── */
function ProgressBar({ label, speed, onDone }) {
  const [pct, setPct] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPct(p => {
        const next = Math.min(p + speed * (0.5 + Math.random()), 100);
        if (next >= 100 && !done.current) {
          done.current = true;
          onDone?.();
        }
        return next;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [speed, onDone]);

  return (
    <div style={{ marginBottom: 13 }}>
      <div style={{
        display: "flex", justifyContent: "space-between",
        fontFamily: "'Share Tech Mono', monospace",
        color: pct >= 100 ? "#ff0000" : "#ff4444",
        fontSize: 11, marginBottom: 5, letterSpacing: "0.05em",
      }}>
        <span>▸ {label}</span>
        <span style={{ minWidth: 50, textAlign: "right", color: pct >= 100 ? "#ff2222" : "#ff6666" }}>
          {pct >= 100 ? "✓ DONE" : `${Math.floor(pct)}%`}
        </span>
      </div>
      <div style={{
        height: 5, background: "rgba(255,0,0,0.10)",
        border: "1px solid rgba(255,0,0,0.25)",
        borderRadius: 2, overflow: "hidden",
      }}>
        <div style={{
          height: "100%", width: `${pct}%`,
          background: pct >= 100
            ? "linear-gradient(90deg, #ff0000, #ff5555)"
            : "linear-gradient(90deg, #550000, #ff2222)",
          transition: "width 0.06s linear",
          animation: "bar-glow 1.5s infinite",
        }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   YOU ARE HACKED — dramatic modal overlay (NEW)
───────────────────────────────────────────── */
function HackedModal({ onDone }) {
  const [step, setStep] = useState(0);
  const scramble = useScramble("YOU ARE HACKED", step >= 1, 700);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 80);
    const t2 = setTimeout(() => setStatsVisible(true), 900);
    const t3 = setTimeout(onDone, 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  const stats = [
    { label: "SYSTEM INTEGRITY", value: "COMPROMISED" },
    { label: "FIREWALL STATUS", value: "DOWN" },
    { label: "DATA EXFILTRATED", value: "100%" },
    { label: "ROOT ACCESS", value: "GRANTED" },
    { label: "TRACE ROUTE", value: "DISABLED" },
    { label: "INCIDENT LOGGED", value: "FALSE" },
  ];

  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "center",
      animation: "modal-overlay-flash 0.5s ease forwards",
      background: "rgba(0,0,0,0.88)",
    }}>
      {/* Red scanlines on overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "repeating-linear-gradient(0deg, rgba(255,0,0,0.03) 0px, transparent 2px, transparent 5px)",
      }} />

      {/* The modal card */}
      <div style={{
        border: "2px solid #ff0000",
        padding: "36px 52px 32px",
        textAlign: "center",
        position: "relative",
        animation: "hacked-slam 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards, border-alarm 0.85s ease-in-out infinite",
        background: "rgba(6,0,0,0.97)",
        maxWidth: 660, width: "92%",
        overflow: "hidden",
      }}>
        {/* Inner scanlines */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "repeating-linear-gradient(0deg, rgba(255,0,0,0.025) 0px, transparent 2px, transparent 4px)",
          zIndex: 1,
        }} />

        {/* Corner accent bars */}
        <div style={{ position: "absolute", top: 0, left: 0, width: 48, height: 3, background: "#ff0000" }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: 48, background: "#ff0000" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: 48, height: 3, background: "#ff0000" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: 3, height: 48, background: "#ff0000" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: 48, height: 3, background: "#ff0000" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: 3, height: 48, background: "#ff0000" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 48, height: 3, background: "#ff0000" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 3, height: 48, background: "#ff0000" }} />

        {/* ⚠ Header */}
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          color: "#ff0000", fontSize: 11, letterSpacing: "0.55em",
          marginBottom: 18, zIndex: 2, position: "relative",
          animation: "blink-fast 0.6s infinite",
        }}>
          ⚠ ⚠  CRITICAL SYSTEM ALERT  ⚠ ⚠
        </div>

        {/* YOU ARE HACKED — glitch layers */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{
            position: "absolute", inset: 0,
            fontFamily: "'VT323', monospace",
            fontSize: "clamp(50px, 9.5vw, 92px)",
            color: "#ff0000", letterSpacing: "0.05em",
            left: 5, top: 2,
            animation: "glitch-clip-1 2.1s steps(1) infinite",
            opacity: 0.65,
          }}>YOU ARE HACKED</div>

          <div style={{
            position: "absolute", inset: 0,
            fontFamily: "'VT323', monospace",
            fontSize: "clamp(50px, 9.5vw, 92px)",
            color: "#ff5555", letterSpacing: "0.05em",
            left: -5, top: -2,
            animation: "glitch-clip-2 2.9s steps(1) infinite",
            opacity: 0.55,
          }}>YOU ARE HACKED</div>

          <div style={{
            fontFamily: "'VT323', monospace",
            fontSize: "clamp(50px, 9.5vw, 92px)",
            color: "#ff1111", letterSpacing: "0.05em",
            animation: "hacked-text-pulse 1.6s infinite, glitch-skew 3.2s infinite",
            position: "relative", zIndex: 2,
          }}>
            {scramble || "██████████████"}
          </div>
        </div>

        {/* Stats grid */}
        {statsVisible && (
          <div style={{
            marginTop: 22,
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "7px 28px",
            zIndex: 2, position: "relative",
            borderTop: "1px solid rgba(255,0,0,0.22)",
            paddingTop: 18,
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between",
                fontFamily: "'Share Tech Mono', monospace", fontSize: 10,
                borderBottom: "1px solid rgba(255,0,0,0.15)",
                paddingBottom: 5,
                animation: "stat-appear 0.3s ease forwards",
                animationDelay: `${i * 0.08}s`,
                opacity: 0,
              }}>
                <span style={{ color: "#882222", letterSpacing: "0.04em" }}>{s.label}</span>
                <span style={{
                  color: "#ff2222", letterSpacing: "0.04em",
                  animation: "blink 0.9s infinite",
                  animationDelay: `${i * 0.15}s`,
                }}>{s.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Warning bar */}
        <div style={{
          marginTop: 20, fontFamily: "'Share Tech Mono', monospace",
          color: "#550000", fontSize: 10, letterSpacing: "0.3em",
          zIndex: 2, position: "relative",
          animation: "blink 0.5s infinite",
        }}>
          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PHASE 3: Red Breach Dashboard  (OVERHAULED)
───────────────────────────────────────────── */
function Phase3RedBreach({ onDone }) {
  const [entered, setEntered] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [packetCount, setPacketCount] = useState(0);
  const doneRef = useRef(0);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Live packet counter
  useEffect(() => {
    const id = setInterval(() => {
      setPacketCount(p => p + (Math.random() * 52 | 0) + 11);
    }, 90);
    return () => clearInterval(id);
  }, []);

  const handleBarDone = useCallback(() => {
    doneRef.current += 1;
    if (doneRef.current >= PROGRESS_TASKS.length) {
      setAllDone(true);
      setTimeout(() => setShowModal(true), 700);
    }
  }, []);

  const handleModalDone = useCallback(() => {
    setTimeout(onDone, 300);
  }, [onDone]);

  return (
    <div style={{
      position: "absolute", inset: 0, background: "#050000",
      display: "flex", flexDirection: "column",
      overflow: "hidden",
      animation: entered ? "snap-in 0.5s ease-out forwards" : "none",
    }}>
      {/* Noise texture */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
        backgroundSize: "200px", opacity: 0.35, mixBlendMode: "overlay",
        animation: "noise 0.3s steps(1) infinite",
      }} />

      {/* Red scanlines */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        background: "repeating-linear-gradient(0deg, rgba(255,0,0,0.022) 0px, transparent 2px, transparent 4px)",
      }} />

      {/* Corner decorations */}
      {[
        { top: 16, left: 20, text: "// FIREWALL: DOWN" },
        { top: 16, right: 20, text: "// ACCESS: GRANTED" },
        { bottom: 16, left: 20, text: "// INTEGRITY: COMPROMISED" },
        { bottom: 16, right: 20, text: "// TRACE: DISABLED" },
      ].map((c, i) => (
        <div key={i} style={{
          position: "absolute",
          top: c.top, bottom: c.bottom, left: c.left, right: c.right,
          fontFamily: "'Share Tech Mono', monospace",
          color: "#660000", fontSize: 10, letterSpacing: "0.1em",
          animation: "corner-blink 2s infinite",
          animationDelay: `${i * 0.35}s`, zIndex: 5,
        }}>{c.text}</div>
      ))}

      {/* ──────────────────── MAIN CONTENT ──────────────────── */}
      <div style={{
        position: "relative", zIndex: 10,
        flex: 1, display: "flex", flexDirection: "column",
        padding: "44px 36px 22px", gap: 18,
      }}>

        {/* Top status bar */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          borderBottom: "1px solid rgba(255,0,0,0.2)", paddingBottom: 10,
        }}>
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            color: "#cc0000", fontSize: 12, letterSpacing: "0.35em",
            animation: "corner-blink 1s infinite",
          }}>
            ▸▸ SYSTEM BREACH IN PROGRESS ◂◂
          </div>
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            color: "#660000", fontSize: 10, letterSpacing: "0.18em",
          }}>
            PKTS INTERCEPTED:&nbsp;
            <span style={{ color: "#ff3333", animation: "blink 0.08s infinite" }}>
              {packetCount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* ──── Visualization row ──── */}
        <div style={{ display: "flex", gap: 16, flex: "1 1 0", minHeight: 0 }}>

          {/* Radar panel */}
          <div style={{
            flex: "0 0 210px",
            border: "1px solid rgba(255,0,0,0.2)",
            borderRadius: 3, padding: "12px 10px",
            background: "rgba(255,0,0,0.025)",
          }}>
            <RadarScan />
          </div>

          {/* Right column: waveform + hex dump */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, minWidth: 0 }}>

            {/* Waveform */}
            <div style={{
              flex: "0 0 130px",
              border: "1px solid rgba(255,0,0,0.2)",
              borderRadius: 3, padding: "10px 12px",
              background: "rgba(255,0,0,0.025)",
            }}>
              <WaveformGraph />
            </div>

            {/* Hex ticker */}
            <div style={{
              flex: 1,
              border: "1px solid rgba(255,0,0,0.2)",
              borderRadius: 3, padding: "8px 12px",
              background: "rgba(255,0,0,0.025)",
              overflow: "hidden",
            }}>
              <HexTicker />
            </div>
          </div>
        </div>

        {/* ──── Progress bars ──── */}
        <div style={{
          background: "rgba(160,0,0,0.055)",
          border: "1px solid rgba(200,0,0,0.22)",
          borderRadius: 4, padding: "20px 24px",
        }}>
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            color: "#ff2222", fontSize: 10, letterSpacing: "0.38em",
            marginBottom: 16,
            borderBottom: "1px solid rgba(200,0,0,0.22)", paddingBottom: 11,
          }}>
            EXFILTRATION PROTOCOL v2.7 — ACTIVE
          </div>

          {PROGRESS_TASKS.map((task, i) => (
            <ProgressBar key={i} label={task.label} speed={task.speed} onDone={handleBarDone} />
          ))}

          {allDone && (
            <div style={{
              marginTop: 12, fontFamily: "'Share Tech Mono', monospace",
              color: "#ff0000", fontSize: 10, letterSpacing: "0.3em",
              textAlign: "center", animation: "blink 0.4s infinite",
            }}>
              ⚠ ALL OPERATIONS COMPLETE — UPLOADING TO C2 ⚠
            </div>
          )}
        </div>
      </div>

      {/* YOU ARE HACKED modal — appears AFTER scanning completes */}
      {showModal && <HackedModal onDone={handleModalDone} />}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PHASE 4: Punchline reveal  (unchanged)
───────────────────────────────────────────── */
function Phase4Punchline({ onComplete }) {
  const [step, setStep] = useState(0);
  const scramble1 = useScramble("JUST KIDDING", step >= 1, 1200);
  const scramble2 = useScramble("> ... just my portfolio. welcome.", step >= 2, 1600);
  const [showBtn, setShowBtn] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 300);
    const t2 = setTimeout(() => setStep(2), 1800);
    const t3 = setTimeout(() => setShowBtn(true), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div style={{
      position: "absolute", inset: 0, background: "#000",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", gap: 16,
      animation: "snap-in 0.4s ease-out forwards",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "repeating-linear-gradient(0deg, rgba(255,255,255,0.008) 0px, transparent 2px)",
      }} />

      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: 20, zIndex: 2,
      }}>
        {/* JUST KIDDING */}
        <div style={{
          fontFamily: "'VT323', monospace",
          fontSize: "clamp(56px, 11vw, 100px)",
          color: "#ffffff",
          letterSpacing: "0.08em",
          textShadow: "0 0 2px rgba(255,255,255,0.4)",
          animation: scramble1 === "JUST KIDDING" ? "fadeInUp 0.6s ease forwards" : "none",
        }}>
          {scramble1 || "█"}
        </div>

        {/* Sub-text */}
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "clamp(13px, 2vw, 16px)",
          color: "#00cc00", letterSpacing: "0.08em",
          minHeight: "1.6em",
          textShadow: "0 0 6px #00aa00",
          opacity: step >= 2 ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}>
          {scramble2}
        </div>

        {showBtn && (
          <div style={{
            width: 280, height: 1,
            background: "linear-gradient(90deg, transparent, #00aa00, transparent)",
            margin: "12px 0",
            animation: "fadeInUp 0.5s ease forwards",
          }} />
        )}

        {showBtn && (
          <button
            onClick={onComplete}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 15, letterSpacing: "0.25em",
              color: btnHover ? "#000" : "#00ff00",
              background: btnHover ? "#00ff00" : "transparent",
              border: "1px solid #00ff00",
              padding: "14px 36px",
              cursor: "pointer",
              animation: "btn-pulse 2s infinite, fadeInUp 0.6s ease forwards",
              transition: "background 0.15s, color 0.15s",
              outline: "none", borderRadius: 2,
              position: "relative", overflow: "hidden",
            }}
          >
            [ CLICK TO ENTER ]
          </button>
        )}
      </div>

      <div style={{
        position: "absolute", bottom: 20, right: 24,
        fontFamily: "'Share Tech Mono', monospace",
        color: "#004400", fontSize: 10, letterSpacing: "0.2em",
        opacity: showBtn ? 1 : 0, transition: "opacity 0.5s ease 1s",
      }}>
        // no systems were harmed in this preloader
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CRT TRANSITION FLASH
───────────────────────────────────────────── */
function CRTFlash({ color = "#fff", onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 320);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 50, background: color,
      animation: "crt-flicker 0.3s steps(1) forwards",
      pointerEvents: "none",
    }} />
  );
}

/* ─────────────────────────────────────────────
   ROOT PRELOADER
───────────────────────────────────────────── */
export default function CyberpunkPreloader({ onComplete }) {
  const [phase, setPhase] = useState(1);
  const [flashing, setFlashing] = useState(false);
  const [flashColor, setFlashColor] = useState("#fff");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [soundUnavailable, setSoundUnavailable] = useState(false);
  const audioContextRef = useRef(null);
  const audioGainRef = useRef(null);
  const scanTimerRef = useRef(null);
  const previousPhaseRef = useRef(phase);

  const playTone = useCallback(({
    startFrequency,
    endFrequency = startFrequency,
    duration = 0.08,
    delay = 0,
    volume = 0.12,
    waveform = "sine",
  }) => {
    const context = audioContextRef.current;
    const masterGain = audioGainRef.current;
    if (!context || context.state !== "running" || !masterGain) return;

    const startAt = context.currentTime + delay;
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    oscillator.type = waveform;
    oscillator.frequency.setValueAtTime(startFrequency, startAt);
    oscillator.frequency.exponentialRampToValueAtTime(endFrequency, startAt + duration);
    envelope.gain.setValueAtTime(volume, startAt);
    envelope.gain.exponentialRampToValueAtTime(0.001, startAt + duration);
    oscillator.connect(envelope);
    envelope.connect(masterGain);
    oscillator.start(startAt);
    oscillator.stop(startAt + duration + 0.01);
  }, []);

  const playLineCue = useCallback((line, index) => {
    if (line.includes("[FAIL]")) {
      playTone({ startFrequency: 480, endFrequency: 330, duration: 0.12, volume: 0.2, waveform: "triangle" });
      playTone({ startFrequency: 390, endFrequency: 270, duration: 0.13, delay: 0.16, volume: 0.18, waveform: "triangle" });
      playTone({ startFrequency: 480, endFrequency: 310, duration: 0.15, delay: 0.38, volume: 0.2, waveform: "triangle" });
      return;
    }

    if (line.toLowerCase().includes("scanning")) {
      playTone({ startFrequency: 1040, endFrequency: 820, duration: 0.07, volume: 0.14, waveform: "triangle" });
      playTone({ startFrequency: 760, endFrequency: 590, duration: 0.09, delay: 0.14, volume: 0.14, waveform: "triangle" });
      return;
    }

    if (line.includes("whoami")) {
      playTone({ startFrequency: 300, endFrequency: 220, duration: 0.06, volume: 0.1, waveform: "square" });
      return;
    }

    if (line === "> root") {
      playTone({ startFrequency: 440, endFrequency: 440, duration: 0.1, volume: 0.13 });
      playTone({ startFrequency: 660, endFrequency: 660, duration: 0.13, delay: 0.12, volume: 0.13 });
      playTone({ startFrequency: 880, endFrequency: 880, duration: 0.16, delay: 0.27, volume: 0.13 });
      return;
    }

    if (line.includes("breach.sh")) {
      playTone({ startFrequency: 180, endFrequency: 90, duration: 0.34, volume: 0.2, waveform: "sawtooth" });
      playTone({ startFrequency: 720, endFrequency: 480, duration: 0.08, delay: 0.24, volume: 0.1, waveform: "triangle" });
      return;
    }

    if (line.includes("[OK]")) {
      const tone = 520 + (index % 3) * 70;
      playTone({ startFrequency: tone, endFrequency: tone * 1.2, duration: 0.07, volume: 0.1 });
    }
  }, [playTone]);

  const playScanPair = useCallback(() => {
    playTone({ startFrequency: 980, endFrequency: 840, duration: 0.07, volume: 0.12, waveform: "triangle" });
    playTone({ startFrequency: 650, endFrequency: 540, duration: 0.09, delay: 0.14, volume: 0.12, waveform: "triangle" });
    playTone({ startFrequency: 980, endFrequency: 840, duration: 0.07, delay: 0.58, volume: 0.12, waveform: "triangle" });
    playTone({ startFrequency: 650, endFrequency: 540, duration: 0.09, delay: 0.72, volume: 0.12, waveform: "triangle" });
  }, [playTone]);

  const stopScanAlarm = useCallback(() => {
    if (scanTimerRef.current) {
      clearInterval(scanTimerRef.current);
      scanTimerRef.current = null;
    }
  }, []);

  const startScanAlarm = useCallback(() => {
    if (scanTimerRef.current) return;
    playScanPair();
    scanTimerRef.current = setInterval(playScanPair, 1550);
  }, [playScanPair]);

  const stopLoaderAudio = useCallback(() => {
    stopScanAlarm();
    const context = audioContextRef.current;
    audioContextRef.current = null;
    audioGainRef.current = null;
    if (context && context.state !== "closed") context.close().catch(() => {});
  }, [stopScanAlarm]);

  const toggleLoaderAudio = useCallback(async () => {
    if (audioContextRef.current) {
      stopLoaderAudio();
      setSoundEnabled(false);
      return;
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      setSoundUnavailable(true);
      return;
    }

    try {
      const context = new AudioContextClass();
      const masterGain = context.createGain();
      masterGain.gain.value = 0.35;
      masterGain.connect(context.destination);
      audioContextRef.current = context;
      audioGainRef.current = masterGain;
      await context.resume();
      if (audioContextRef.current !== context) return;
      playTone({ startFrequency: 440, endFrequency: 660, duration: 0.12, volume: 0.14 });
      playTone({ startFrequency: 660, endFrequency: 880, duration: 0.16, delay: 0.14, volume: 0.14 });
      setSoundUnavailable(false);
      setSoundEnabled(true);
    } catch {
      stopLoaderAudio();
      setSoundUnavailable(true);
      setSoundEnabled(false);
    }
  }, [playTone, stopLoaderAudio]);

  const handleComplete = useCallback(() => {
    stopLoaderAudio();
    onComplete();
  }, [onComplete, stopLoaderAudio]);

  useEffect(() => () => stopLoaderAudio(), [stopLoaderAudio]);

  useEffect(() => {
    const previousPhase = previousPhaseRef.current;
    previousPhaseRef.current = phase;
    if (!soundEnabled || previousPhase === phase) return;

    if (phase === 2) {
      playTone({ startFrequency: 520, endFrequency: 780, duration: 0.2, volume: 0.12 });
    } else if (phase === 3) {
      playTone({ startFrequency: 180, endFrequency: 360, duration: 0.3, volume: 0.16, waveform: "sawtooth" });
      playTone({ startFrequency: 720, endFrequency: 520, duration: 0.1, delay: 0.28, volume: 0.1, waveform: "triangle" });
    } else if (phase === 4) {
      playTone({ startFrequency: 440, endFrequency: 660, duration: 0.14, volume: 0.12 });
      playTone({ startFrequency: 660, endFrequency: 880, duration: 0.18, delay: 0.16, volume: 0.12 });
    }
  }, [phase, playTone, soundEnabled]);

  useEffect(() => {
    if (soundEnabled && phase === 3) startScanAlarm();
    else stopScanAlarm();
    return stopScanAlarm;
  }, [phase, soundEnabled, startScanAlarm, stopScanAlarm]);

  useEffect(() => {
    const id = "cyberpunk-preloader-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = GLOBAL_STYLES;
      document.head.appendChild(el);
    }
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  const triggerFlash = useCallback((color, nextPhase) => {
    setFlashColor(color);
    setFlashing(true);
    setTimeout(() => { setFlashing(false); setPhase(nextPhase); }, 340);
  }, []);

  const handlePhase1Done = useCallback(() => triggerFlash("#001100", 2), [triggerFlash]);
  const handlePhase2Done = useCallback(() => triggerFlash("#ffffff", 3), [triggerFlash]);
  const handlePhase3Done = useCallback(() => triggerFlash("#ffffff", 4), [triggerFlash]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#000", overflow: "hidden",
    }}>
      {phase === 1 && <Phase1Terminal onDone={handlePhase1Done} onLineComplete={playLineCue} />}
      {phase === 2 && <Phase2Welcome onDone={handlePhase2Done} />}
      {phase === 3 && <Phase3RedBreach onDone={handlePhase3Done} />}
      {phase === 4 && <Phase4Punchline onComplete={handleComplete} />}
      {flashing && <CRTFlash color={flashColor} onDone={() => { }} />}

      <button
        type="button"
        onClick={toggleLoaderAudio}
        aria-pressed={soundEnabled}
        aria-label={soundUnavailable ? "Loader audio is unavailable" : soundEnabled ? "Turn loader sound off" : "Turn loader sound on"}
        disabled={soundUnavailable}
        style={{
          position: "absolute",
          bottom: "1.6rem",
          left: "1rem",
          zIndex: 100,
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.12em",
          color: soundEnabled ? "#00ff00" : "rgba(0,255,0,0.55)",
          background: soundEnabled ? "rgba(0,255,0,0.06)" : "transparent",
          border: `1px solid ${soundEnabled ? "rgba(0,255,0,0.65)" : "rgba(0,255,0,0.20)"}`,
          borderRadius: "3px",
          padding: "0.38rem 0.7rem",
          cursor: soundUnavailable ? "not-allowed" : "pointer",
          userSelect: "none",
        }}
      >
        {soundUnavailable ? "[ AUDIO N/A ]" : soundEnabled ? "[ SOUND: ON ]" : "[ SOUND: OFF ]"}
      </button>

      {/* ── SKIP BUTTON — bottom-right corner ── */}
      <button
        onClick={handleComplete}
        style={{
          position: "absolute",
          bottom: "1.6rem",
          right: "1.8rem",
          zIndex: 100,
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "0.72rem",
          letterSpacing: "0.18em",
          color: "rgba(0,255,0,0.55)",
          background: "transparent",
          border: "1px solid rgba(0,255,0,0.20)",
          borderRadius: "3px",
          padding: "0.38rem 0.9rem",
          cursor: "pointer",
          transition: "color 0.2s, border-color 0.2s, background 0.2s",
          outline: "none",
          userSelect: "none",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = "rgba(0,255,0,1)";
          e.currentTarget.style.borderColor = "rgba(0,255,0,0.65)";
          e.currentTarget.style.background = "rgba(0,255,0,0.06)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = "rgba(0,255,0,0.55)";
          e.currentTarget.style.borderColor = "rgba(0,255,0,0.20)";
          e.currentTarget.style.background = "transparent";
        }}
      >
        [ SKIP ]
      </button>
    </div>
  );
}

