export default function Footer() {
  return (
    <footer style={{backgroundColor: '#0d0d14', borderTop: '1px solid rgba(168,85,247,0.3)'}}>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black tracking-widest" style={{color: '#a855f7', fontFamily: 'Orbitron, sans-serif', fontSize: '16px', textShadow: '0 0 10px rgba(168,85,247,0.5)'}}>FRAG</span>
            <span className="font-black tracking-widest text-white" style={{fontFamily: 'Orbitron, sans-serif', fontSize: '16px'}}>STORE</span>
          </div>
          <p className="text-xs tracking-widest" style={{color: '#4b5563', fontFamily: 'Rajdhani, sans-serif'}}>
            © 2025 FRAGSTORE — MINDEN JOG FENNTARTVA
          </p>
          <p className="text-xs" style={{color: '#6b21a8', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em'}}>
            GG · WP · EZ
          </p>
        </div>
      </div>
    </footer>
  );
}
