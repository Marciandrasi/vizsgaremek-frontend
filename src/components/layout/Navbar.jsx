import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout, isAdmin, isLoggedIn } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav style={{backgroundColor: '#0d0d14', borderBottom: '1px solid rgba(168,85,247,0.3)'}}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-gaming font-black tracking-widest" style={{color: '#a855f7', textShadow: '0 0 15px rgba(168,85,247,0.7)', fontFamily: 'Orbitron, sans-serif'}}>
            FRAG
          </span>
          <span className="text-2xl font-gaming font-black tracking-widest text-white" style={{fontFamily: 'Orbitron, sans-serif'}}>
            STORE
          </span>
          <span className="text-xs px-1.5 py-0.5 rounded text-black font-bold ml-1" style={{backgroundColor: '#a855f7', fontSize: '10px'}}>GG</span>
        </Link>

        <button
          className="md:hidden p-2 rounded transition-colors"
          style={{color: '#a855f7'}}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü"
        >
          <span className="block w-6 h-0.5 mb-1" style={{backgroundColor: '#a855f7'}}></span>
          <span className="block w-6 h-0.5 mb-1" style={{backgroundColor: '#a855f7'}}></span>
          <span className="block w-6 h-0.5" style={{backgroundColor: '#a855f7'}}></span>
        </button>

        <div className={`${menuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:static top-14 left-0 right-0 z-50 md:z-auto gap-1 md:gap-1 p-4 md:p-0 items-start md:items-center`}
          style={menuOpen ? {backgroundColor: '#0d0d14', borderBottom: '1px solid rgba(168,85,247,0.3)'} : {}}>
          <Link to="/" onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded text-sm font-semibold tracking-wide transition-colors w-full md:w-auto text-center" style={{color: '#cbd5e1', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em'}}
            onMouseEnter={e => e.target.style.color='#a855f7'} onMouseLeave={e => e.target.style.color='#cbd5e1'}>
            🎮 ÁRUHÁZ
          </Link>

          {isLoggedIn ? (
            <>
              <Link to="/cart" onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded text-sm font-semibold tracking-wide transition-colors relative w-full md:w-auto text-center" style={{color: '#cbd5e1', fontFamily: 'Rajdhani, sans-serif'}}
                onMouseEnter={e => e.target.style.color='#a855f7'} onMouseLeave={e => e.target.style.color='#cbd5e1'}>
                🛒 KOSÁR
                {cartCount > 0 && (
                  <span className="ml-1 text-xs font-bold px-1.5 py-0.5 rounded-full" style={{backgroundColor: '#a855f7', color: 'white'}}>
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link to="/orders" onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded text-sm font-semibold tracking-wide transition-colors w-full md:w-auto text-center" style={{color: '#cbd5e1', fontFamily: 'Rajdhani, sans-serif'}}
                onMouseEnter={e => e.target.style.color='#a855f7'} onMouseLeave={e => e.target.style.color='#cbd5e1'}>
                📦 RENDELÉSEIM
              </Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded text-sm font-semibold tracking-wide transition-colors w-full md:w-auto text-center" style={{color: '#cbd5e1', fontFamily: 'Rajdhani, sans-serif'}}
                onMouseEnter={e => e.target.style.color='#a855f7'} onMouseLeave={e => e.target.style.color='#cbd5e1'}>
                👤 PROFIL
              </Link>
              {isAdmin && (
                <Link to="/admin" onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded text-sm font-bold tracking-widest w-full md:w-auto text-center" style={{color: '#fbbf24', fontFamily: 'Orbitron, sans-serif', fontSize: '11px'}}>
                  ⚡ ADMIN
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded text-sm font-bold tracking-wide w-full md:w-auto text-center btn-outline-neon"
                style={{fontFamily: 'Rajdhani, sans-serif'}}
              >
                KILÉPÉS
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded text-sm font-semibold tracking-wide transition-colors w-full md:w-auto text-center" style={{color: '#cbd5e1', fontFamily: 'Rajdhani, sans-serif'}}
                onMouseEnter={e => e.target.style.color='#a855f7'} onMouseLeave={e => e.target.style.color='#cbd5e1'}>
                BEJELENTKEZÉS
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="px-4 py-2 rounded text-sm font-bold tracking-wide btn-neon w-full md:w-auto text-center">
                REGISZTRÁCIÓ
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
