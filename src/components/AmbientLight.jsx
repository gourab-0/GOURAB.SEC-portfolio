export default function AmbientLight() {
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            {/* Top-left crimson glow */}
            <div
                style={{
                    position: 'absolute',
                    top: '-20%',
                    left: '-10%',
                    width: '50vw',
                    height: '50vh',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(195, 23, 62, 0.06) 0%, transparent 70%)',
                    animation: 'float 8s ease-in-out infinite',
                }}
            />
            {/* Bottom-right rose glow */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '-20%',
                    right: '-10%',
                    width: '60vw',
                    height: '60vh',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255, 107, 122, 0.04) 0%, transparent 70%)',
                    animation: 'float 10s ease-in-out infinite reverse',
                }}
            />
            {/* Center crimson accent */}
            <div
                style={{
                    position: 'absolute',
                    top: '40%',
                    left: '30%',
                    width: '40vw',
                    height: '40vh',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(195, 23, 62, 0.03) 0%, transparent 70%)',
                    animation: 'float 12s ease-in-out infinite 2s',
                }}
            />
        </div>
    );
}
