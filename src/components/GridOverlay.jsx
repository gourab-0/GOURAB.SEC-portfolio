export default function GridOverlay() {
    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 1,
                pointerEvents: 'none',
                opacity: 0.018,
                backgroundImage: `
          linear-gradient(rgba(195, 23, 62, 0.24) 1px, transparent 1px),
          linear-gradient(90deg, rgba(195, 23, 62, 0.24) 1px, transparent 1px)
        `,
                backgroundSize: '60px 60px',
            }}
        />
    );
}
