import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-black mb-1" style={{color: 'white', fontFamily: 'Orbitron, sans-serif'}}>⚡ ADMIN PANEL</h1>
      <p className="mb-8" style={{color: '#4b5563', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em'}}>Üdvözöljük, Admin! — FRAGSTORE vezérlőpult</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link to="/admin/products" className="gamer-card rounded-2xl p-6 flex items-center gap-5 group" style={{backgroundColor: '#111118'}}>
          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl" style={{backgroundColor: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)'}}>
            🛍️
          </div>
          <div>
            <h2 className="font-black" style={{color: 'white', fontFamily: 'Orbitron, sans-serif', fontSize: '14px'}}>TERMÉKEK</h2>
            <p className="text-sm mt-1" style={{color: '#4b5563', fontFamily: 'Rajdhani, sans-serif'}}>Létrehozás, szerkesztés, törlés, képfeltöltés</p>
          </div>
        </Link>

        <Link to="/admin/users" className="gamer-card rounded-2xl p-6 flex items-center gap-5 group" style={{backgroundColor: '#111118'}}>
          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl" style={{backgroundColor: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)'}}>
            👥
          </div>
          <div>
            <h2 className="font-black" style={{color: 'white', fontFamily: 'Orbitron, sans-serif', fontSize: '14px'}}>FELHASZNÁLÓK</h2>
            <p className="text-sm mt-1" style={{color: '#4b5563', fontFamily: 'Rajdhani, sans-serif'}}>Felhasználók listázása és törlése</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
