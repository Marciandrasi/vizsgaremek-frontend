import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../services/adminService';
import { isStrongPassword } from '../utils/validators';

export default function Profile() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: '', phone: '', password: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password && !isStrongPassword(form.password)) {
      setError('Az új jelszónak legalább 6 karakter hosszúnak kell lennie.');
      return;
    }
    const payload = {};
    if (form.name.trim()) payload.name = form.name.trim();
    if (form.phone.trim()) payload.phone = form.phone.trim();
    if (form.password) payload.password = form.password;

    if (Object.keys(payload).length === 0) {
      setError('Adj meg legalább egy módosítandó adatot.');
      return;
    }

    setLoading(true);
    try {
      await updateProfile(payload);
      setSuccess('Adataid sikeresen frissítve!');
      setForm({ name: '', phone: '', password: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Hiba a frissítés során.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {backgroundColor: '#16161f', border: '1px solid rgba(168,85,247,0.3)', color: '#e2e8f0', fontFamily: 'Rajdhani, sans-serif'};
  const labelStyle = {color: '#a855f7', fontFamily: 'Rajdhani, sans-serif', fontSize: '11px'};

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-black mb-6" style={{color: 'white', fontFamily: 'Orbitron, sans-serif'}}>👤 PROFILOM</h1>

      <div className="rounded-2xl p-6 mb-6" style={{backgroundColor: '#111118', border: '1px solid rgba(168,85,247,0.3)'}}>
        <h2 className="font-black tracking-widest mb-3" style={{color: '#a855f7', fontFamily: 'Orbitron, sans-serif', fontSize: '11px'}}>ACCOUNT ADATOK</h2>
        <div className="space-y-2" style={{fontFamily: 'Rajdhani, sans-serif'}}>
          <p style={{color: '#64748b'}}>EMAIL: <span style={{color: '#e2e8f0', fontWeight: '600'}}>{user?.sub}</span></p>
          <p style={{color: '#64748b'}}>RANG: <span className="font-black" style={{color: user?.role === 'ROLE_ADMIN' ? '#fbbf24' : '#a855f7'}}>{user?.role === 'ROLE_ADMIN' ? '⚡ ADMIN' : '🎮 GAMER'}</span></p>
        </div>
      </div>

      <div className="rounded-2xl p-6" style={{backgroundColor: '#111118', border: '1px solid rgba(168,85,247,0.3)'}}>
        <h2 className="font-black tracking-widest mb-4" style={{color: '#a855f7', fontFamily: 'Orbitron, sans-serif', fontSize: '11px'}}>ADATOK MÓDOSÍTÁSA</h2>

        {success && (
          <div className="rounded-lg p-3 mb-4 text-sm" style={{backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.4)', color: '#4ade80', fontFamily: 'Rajdhani, sans-serif'}}>
            ✅ {success}
          </div>
        )}
        {error && (
          <div className="rounded-lg p-3 mb-4 text-sm" style={{backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.4)', color: '#f87171', fontFamily: 'Rajdhani, sans-serif'}}>
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-bold mb-1 tracking-widest" style={labelStyle}>ÚJ NÉV</label>
            <input type="text" name="name" value={form.name} onChange={handleChange}
              placeholder="Új játékosnév" className="w-full rounded-lg px-3 py-2.5 focus:outline-none" style={inputStyle}
              onFocus={e => e.target.style.borderColor='#a855f7'} onBlur={e => e.target.style.borderColor='rgba(168,85,247,0.3)'} />
          </div>
          <div>
            <label className="block font-bold mb-1 tracking-widest" style={labelStyle}>ÚJ TELEFONSZÁM</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange}
              placeholder="+36 30 123 4567" className="w-full rounded-lg px-3 py-2.5 focus:outline-none" style={inputStyle}
              onFocus={e => e.target.style.borderColor='#a855f7'} onBlur={e => e.target.style.borderColor='rgba(168,85,247,0.3)'} />
          </div>
          <div>
            <label className="block font-bold mb-1 tracking-widest" style={labelStyle}>ÚJ JELSZÓ</label>
            <input type="password" name="password" value={form.password} onChange={handleChange}
              placeholder="Minimum 6 karakter" className="w-full rounded-lg px-3 py-2.5 focus:outline-none" style={inputStyle}
              onFocus={e => e.target.style.borderColor='#a855f7'} onBlur={e => e.target.style.borderColor='rgba(168,85,247,0.3)'} />
          </div>
          <button type="submit" disabled={loading}
            className="w-full btn-neon py-2.5 rounded-lg disabled:opacity-60 tracking-widest"
            style={{fontFamily: 'Orbitron, sans-serif', fontSize: '12px'}}>
            {loading ? 'MENTÉS...' : '💾 VÁLTOZÁSOK MENTÉSE'}
          </button>
        </form>
      </div>
    </div>
  );
}
