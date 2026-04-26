export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)'}}>
      <div className="rounded-xl w-full max-w-md" style={{backgroundColor: '#111118', border: '1px solid rgba(168,85,247,0.5)', boxShadow: '0 0 40px rgba(168,85,247,0.2)'}}>
        <div className="flex items-center justify-between p-4" style={{borderBottom: '1px solid rgba(168,85,247,0.2)'}}>
          <h2 className="font-black tracking-widest" style={{color: 'white', fontFamily: 'Orbitron, sans-serif', fontSize: '13px'}}>{title}</h2>
          <button
            onClick={onClose}
            className="text-2xl leading-none transition-colors"
            style={{color: '#4b5563'}}
            onMouseEnter={e => e.target.style.color='#a855f7'}
            onMouseLeave={e => e.target.style.color='#4b5563'}
            aria-label="Bezárás"
          >
            &times;
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
