export default function VersionCheckPage() {
    return (
        <div style={{
            backgroundColor: '#FF00FF', // Magenta background - Very obvious
            color: 'white',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'sans-serif',
            fontSize: '2rem',
            textAlign: 'center'
        }}>
            <h1>VERIFICATION PAGE</h1>
            <p>If you see this magenta screen,</p>
            <p>The deployment IS updating.</p>
            <br />
            <p style={{ fontSize: '1rem', opacity: 0.8 }}>
                Build ID: CHECK_2026_01_04_2135
            </p>
        </div>
    );
}
