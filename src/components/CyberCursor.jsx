import { useEffect, useRef, useState } from 'react';

export default function CyberCursor() {
    const cursorRef = useRef(null);
    const ringRef = useRef(null);
    const [clicking, setClicking] = useState(false);
    const [hovering, setHovering] = useState(false);
    const pos = useRef({ x: -200, y: -200 });
    const ring = useRef({ x: -200, y: -200 });
    const rafId = useRef(null);

    useEffect(() => {
        // Hide native cursor globally
        document.body.style.cursor = 'none';

        const onMove = (e) => {
            pos.current = { x: e.clientX, y: e.clientY };
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }
            // Detect hoverable elements
            const el = document.elementFromPoint(e.clientX, e.clientY);
            const isLink = el && (el.closest('a') || el.closest('button') || el.closest('[role="button"]'));
            setHovering(!!isLink);
        };

        const onDown = () => setClicking(true);
        const onUp   = () => setClicking(false);

        // Smooth ring lag with rAF
        const lerp = (a, b, t) => a + (b - a) * t;
        const animate = () => {
            ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
            ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
            }
            rafId.current = requestAnimationFrame(animate);
        };
        rafId.current = requestAnimationFrame(animate);

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);
        return () => {
            document.body.style.cursor = '';
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mousedown', onDown);
            window.removeEventListener('mouseup', onUp);
            cancelAnimationFrame(rafId.current);
        };
    }, []);

    const SIZE  = hovering ? 48 : 36;
    const COLOR = hovering ? '#ff6b7a' : '#c3173e';
    const GLOW  = hovering ? '0 0 14px #ff6b7a, 0 0 24px rgba(255,107,122,0.4)' : '0 0 10px #c3173e, 0 0 20px rgba(195,23,62,0.3)';

    const base = {
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9999999, // Increased to render above the 1000000 z-index modal
        top: 0, left: 0,
        willChange: 'transform',
    };

    return (
        <>
            {/* Inner crosshair dot */}
            <div
                ref={cursorRef}
                style={{
                    ...base,
                    width: clicking ? '6px' : '8px',
                    height: clicking ? '6px' : '8px',
                    marginLeft: clicking ? '-3px' : '-4px',
                    marginTop:  clicking ? '-3px' : '-4px',
                    background: COLOR,
                    borderRadius: '50%',
                    boxShadow: GLOW,
                    transition: 'background 0.2s, box-shadow 0.2s, width 0.1s, height 0.1s',
                }}
            />

            {/* Outer targeting ring */}
            <div
                ref={ringRef}
                style={{
                    ...base,
                    width:  `${SIZE}px`,
                    height: `${SIZE}px`,
                    marginLeft: `-${SIZE/2}px`,
                    marginTop:  `-${SIZE/2}px`,
                    transition: 'width 0.2s, height 0.2s, margin 0.2s, border-color 0.2s, box-shadow 0.2s',
                }}
            >
                {/* SVG targeting reticle */}
                <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ display: 'block' }}>
                    {/* Outer ring — broken into 4 arcs with gaps */}
                    <circle
                        cx={SIZE/2} cy={SIZE/2} r={SIZE/2 - 2}
                        fill="none"
                        stroke={COLOR}
                        strokeWidth={clicking ? 2 : 1.5}
                        strokeDasharray={`${(SIZE/2 - 2) * Math.PI * 0.4} ${(SIZE/2 - 2) * Math.PI * 0.6}`}
                        strokeDashoffset="0"
                        style={{ filter: `drop-shadow(0 0 3px ${COLOR})`, transition: 'stroke 0.2s' }}
                    />
                    {/* Second arc rotated */}
                    <circle
                        cx={SIZE/2} cy={SIZE/2} r={SIZE/2 - 2}
                        fill="none"
                        stroke={COLOR}
                        strokeWidth={clicking ? 2 : 1.5}
                        strokeDasharray={`${(SIZE/2 - 2) * Math.PI * 0.4} ${(SIZE/2 - 2) * Math.PI * 0.6}`}
                        strokeDashoffset={`-${(SIZE/2 - 2) * Math.PI * 0.5}`}
                        style={{ filter: `drop-shadow(0 0 3px ${COLOR})`, transition: 'stroke 0.2s' }}
                    />
                    {/* 4 tick marks at cardinal points */}
                    {[0, 90, 180, 270].map(angle => {
                        const rad = (angle * Math.PI) / 180;
                        const cx = SIZE/2 + (SIZE/2 - 2) * Math.cos(rad);
                        const cy = SIZE/2 + (SIZE/2 - 2) * Math.sin(rad);
                        const ex = SIZE/2 + (SIZE/2 + 4) * Math.cos(rad);
                        const ey = SIZE/2 + (SIZE/2 + 4) * Math.sin(rad);
                        return (
                            <line
                                key={angle}
                                x1={cx} y1={cy} x2={ex} y2={ey}
                                stroke={COLOR}
                                strokeWidth="1"
                                style={{ transition: 'stroke 0.2s' }}
                            />
                        );
                    })}
                    {/* Small inner crosshair lines */}
                    <line x1={SIZE/2 - 5} y1={SIZE/2} x2={SIZE/2 + 5} y2={SIZE/2} stroke={COLOR} strokeWidth="0.8" opacity="0.6" />
                    <line x1={SIZE/2} y1={SIZE/2 - 5} x2={SIZE/2} y2={SIZE/2 + 5} stroke={COLOR} strokeWidth="0.8" opacity="0.6" />
                </svg>
            </div>
        </>
    );
}
