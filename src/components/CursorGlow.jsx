import { useEffect, useState } from 'react';

export default function CursorGlow() {
    const [pos, setPos] = useState({ x: -100, y: -100 });

    useEffect(() => {
        const handleMove = (e) => {
            setPos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                left: pos.x - 200,
                top: pos.y - 200,
                width: 400,
                height: 400,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0, 240, 255, 0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 2,
                transition: 'left 0.1s ease-out, top 0.1s ease-out',
            }}
        />
    );
}
