import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkout } from '../services/orderService';
import { useCart } from '../context/CartContext';
import { isValidEmail, isValidPhone } from '../utils/validators';

export default function Checkout() {
  const navigate = useNavigate();
  const { refreshCart } = useCart();
  const [form, setForm] = useState({
    shippingName: '',
    shippingEmail: '',
    shippingPhone: '',
    shippingAddress: '',
    paymentMethod: 'CASH',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.shippingName.trim()) {
      setError('A név megadása kötelező.');
      return;
    }
    if (!isValidEmail(form.shippingEmail)) {
      setError('Érvénytelen e-mail cím.');
      return;
    }
    if (form.shippingPhone && !isValidPhone(form.shippingPhone)) {
      setError('Érvénytelen telefonszám formátum.');
      return;
    }
    if (!form.shippingAddress.trim()) {
      setError('A szállítási cím megadása kötelező.');
      return;
    }

    setLoading(true);
    try {
      const res = await checkout(form);
      await refreshCart();
      navigate(`/orders/${res.data.id}`, { state: { success: true } });
    } catch (err) {
      setError(
        err.response?.data?.message || 'Hiba a rendelés leadása során. Ellenőrizd a kosarad!'
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {backgroundColor: '#16161f', border: '1px solid rgba(168,85,247,0.3)', color: '#e2e8f0', fontFamily: 'Rajdhani, sans-serif'};
  const labelStyle = {color: '#a855f7', fontFamily: 'Rajdhani, sans-serif', fontSize: '11px'};

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-black mb-6" style={{color: 'white', fontFamily: 'Orbitron, sans-serif'}}>⚡ MEGRENDELÉS</h1>

      {error && (
        <div className="rounded-lg p-3 mb-4 text-sm" style={{backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.4)', color: '#f87171', fontFamily: 'Rajdhani, sans-serif'}}>
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="rounded-2xl p-6 space-y-5" style={{backgroundColor: '#111118', border: '1px solid rgba(168,85,247,0.3)'}}>
        <h2 className="font-black tracking-widest pb-2" style={{color: '#a855f7', fontFamily: 'Orbitron, sans-serif', fontSize: '12px', borderBottom: '1px solid rgba(168,85,247,0.2)'}}>📦 SZÁLLÍTÁSI ADATOK</h2>

        <div>
          <label className="block font-bold mb-1 tracking-widest" style={labelStyle}>TELJES NÉV <span style={{color: '#f87171'}}>*</span></label>
          <input type="text" name="shippingName" value={form.shippingName} onChange={handleChange} required
            placeholder="Kovács János" className="w-full rounded-lg px-3 py-2.5 focus:outline-none" style={inputStyle}
            onFocus={e => e.target.style.borderColor='#a855f7'} onBlur={e => e.target.style.borderColor='rgba(168,85,247,0.3)'} />
        </div>

        <div>
          <label className="block font-bold mb-1 tracking-widest" style={labelStyle}>E-MAIL CÍM <span style={{color: '#f87171'}}>*</span></label>
          <input type="email" name="shippingEmail" value={form.shippingEmail} onChange={handleChange} required
            placeholder="gamer@example.com" className="w-full rounded-lg px-3 py-2.5 focus:outline-none" style={inputStyle}
            onFocus={e => e.target.style.borderColor='#a855f7'} onBlur={e => e.target.style.borderColor='rgba(168,85,247,0.3)'} />
        </div>

        <div>
          <label className="block font-bold mb-1 tracking-widest" style={labelStyle}>TELEFONSZÁM <span style={{color: '#f87171'}}>*</span></label>
          <input type="tel" name="shippingPhone" value={form.shippingPhone} onChange={handleChange} required
            placeholder="+36 30 123 4567" className="w-full rounded-lg px-3 py-2.5 focus:outline-none" style={inputStyle}
            onFocus={e => e.target.style.borderColor='#a855f7'} onBlur={e => e.target.style.borderColor='rgba(168,85,247,0.3)'} />
        </div>

        <div>
          <label className="block font-bold mb-1 tracking-widest" style={labelStyle}>SZÁLLÍTÁSI CÍM <span style={{color: '#f87171'}}>*</span></label>
          <input type="text" name="shippingAddress" value={form.shippingAddress} onChange={handleChange} required
            placeholder="Budapest, 1011 Fő utca 1." className="w-full rounded-lg px-3 py-2.5 focus:outline-none" style={inputStyle}
            onFocus={e => e.target.style.borderColor='#a855f7'} onBlur={e => e.target.style.borderColor='rgba(168,85,247,0.3)'} />
        </div>

        <div>
          <h2 className="font-black tracking-widest pb-2 mb-3" style={{color: '#a855f7', fontFamily: 'Orbitron, sans-serif', fontSize: '12px', borderBottom: '1px solid rgba(168,85,247,0.2)'}}>💳 FIZETÉSI MÓD</h2>
          <div className="flex gap-4">
            <label className="flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all flex-1" style={{border: form.paymentMethod === 'CASH' ? '2px solid #a855f7' : '2px solid rgba(168,85,247,0.2)', backgroundColor: form.paymentMethod === 'CASH' ? 'rgba(168,85,247,0.1)' : 'transparent'}}>
              <input type="radio" name="paymentMethod" value="CASH" checked={form.paymentMethod === 'CASH'} onChange={handleChange} className="accent-purple-500" />
              <span className="text-2xl">💵</span>
              <span className="font-bold" style={{color: '#e2e8f0', fontFamily: 'Rajdhani, sans-serif'}}>Készpénz</span>
            </label>
            <label className="flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all flex-1" style={{border: form.paymentMethod === 'CARD' ? '2px solid #a855f7' : '2px solid rgba(168,85,247,0.2)', backgroundColor: form.paymentMethod === 'CARD' ? 'rgba(168,85,247,0.1)' : 'transparent'}}>
              <input type="radio" name="paymentMethod" value="CARD" checked={form.paymentMethod === 'CARD'} onChange={handleChange} className="accent-purple-500" />
              <span className="text-2xl">💳</span>
              <span className="font-bold" style={{color: '#e2e8f0', fontFamily: 'Rajdhani, sans-serif'}}>Bankkártya</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-neon py-3 rounded-xl disabled:opacity-60 tracking-widest"
          style={{fontFamily: 'Orbitron, sans-serif', fontSize: '13px'}}
        >
          {loading ? 'FELDOLGOZÁS...' : '⚡ RENDELÉS LEADÁSA'}
        </button>
      </form>
    </div>
  );
}
