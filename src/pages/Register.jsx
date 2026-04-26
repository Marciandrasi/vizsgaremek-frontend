import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { isStrongPassword } from '../utils/validators';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isStrongPassword(form.password)) {
      setError('A jelszónak legalább 6 karakter hosszúnak kell lennie.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await registerService(form);
      login(res.data.token);
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Regisztráció sikertelen. Próbáld újra.'
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {backgroundColor: '#16161f', border: '1px solid rgba(168,85,247,0.3)', color: '#e2e8f0', fontFamily: 'Rajdhani, sans-serif'};
  const labelStyle = {color: '#a855f7', fontFamily: 'Rajdhani, sans-serif', fontSize: '11px'};

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-8">
      <div className="rounded-2xl p-8 w-full max-w-md" style={{backgroundColor: '#111118', border: '1px solid rgba(168,85,247,0.3)', boxShadow: '0 0 40px rgba(168,85,247,0.1)'}}>
        <div className="text-center mb-6">
          <p className="text-xs tracking-widest mb-2" style={{color: '#6b21a8', fontFamily: 'Orbitron, sans-serif'}}>FRAGSTORE</p>
          <h1 className="text-2xl font-black" style={{color: 'white', fontFamily: 'Orbitron, sans-serif'}}>REGISZTRÁCIÓ</h1>
          <p className="text-xs mt-1" style={{color: '#4b5563', fontFamily: 'Rajdhani, sans-serif'}}>Csatlakozz a gamer közösséghez!</p>
        </div>

        {error && (
          <div className="rounded-lg p-3 mb-4 text-sm" style={{backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.4)', color: '#f87171', fontFamily: 'Rajdhani, sans-serif'}}>
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className="block font-bold mb-1 tracking-widest" style={labelStyle}>JÁTÉKOSNÉV / TELJES NÉV <span style={{color: '#f87171'}}>*</span></label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="xXProGamer99Xx"
              className="w-full rounded-lg px-3 py-2.5 focus:outline-none"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor='#a855f7'}
              onBlur={e => e.target.style.borderColor='rgba(168,85,247,0.3)'}
            />
          </div>

          <div>
            <label className="block font-bold mb-1 tracking-widest" style={labelStyle}>E-MAIL CÍM <span style={{color: '#f87171'}}>*</span></label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="gamer@example.com"
              className="w-full rounded-lg px-3 py-2.5 focus:outline-none"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor='#a855f7'}
              onBlur={e => e.target.style.borderColor='rgba(168,85,247,0.3)'}
            />
          </div>

          <div>
            <label className="block font-bold mb-1 tracking-widest" style={labelStyle}>JELSZÓ <span style={{color: '#f87171'}}>*</span></label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Minimum 6 karakter"
              className="w-full rounded-lg px-3 py-2.5 focus:outline-none"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor='#a855f7'}
              onBlur={e => e.target.style.borderColor='rgba(168,85,247,0.3)'}
            />
          </div>

          <div>
            <label className="block font-bold mb-1 tracking-widest" style={labelStyle}>TELEFONSZÁM <span style={{color: '#4b5563'}}>(OPCIONÁLIS)</span></label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+36 30 123 4567"
              className="w-full rounded-lg px-3 py-2.5 focus:outline-none"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor='#a855f7'}
              onBlur={e => e.target.style.borderColor='rgba(168,85,247,0.3)'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-neon py-3 rounded-lg disabled:opacity-60 tracking-widest"
            style={{fontFamily: 'Orbitron, sans-serif', fontSize: '13px'}}
          >
            {loading ? 'FELDOLGOZÁS...' : '🎮 CSATLAKOZÁS'}
          </button>
        </form>

        <p className="text-center text-sm mt-5" style={{color: '#4b5563', fontFamily: 'Rajdhani, sans-serif'}}>
          Már van fiókod?{' '}
          <Link to="/login" className="font-bold" style={{color: '#a855f7'}}>
            BELÉPÉS
          </Link>
        </p>
      </div>
    </div>
  );
}
