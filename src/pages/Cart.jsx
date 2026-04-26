import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCart, removeCartItem, updateCartItem } from '../services/cartService';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import Spinner from '../components/ui/Spinner';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Cart() {
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { refreshCart } = useCart();
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCartData(res.data);
    } catch {
      setError('Nem sikerült betölteni a kosarat.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (cartItemId) => {
    try {
      await removeCartItem(cartItemId);
      await fetchCart();
      await refreshCart();
    } catch {
      setError('Hiba a törlés során.');
    }
  };

  const handleQuantityChange = async (cartItemId, newQty) => {
    if (newQty < 1) return;
    try {
      await updateCartItem(cartItemId, newQty);
      await fetchCart();
      await refreshCart();
    } catch {
      setError('Hiba a mennyiség módosítása során.');
    }
  };

  if (loading) return <Spinner />;

  if (error) return (
    <div className="rounded-lg p-4" style={{backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.4)', color: '#f87171', fontFamily: 'Rajdhani, sans-serif'}}>❌ {error}</div>
  );

  const items = cartData?.items || [];

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-black mb-2" style={{color: 'white', fontFamily: 'Orbitron, sans-serif'}}>KOSÁR ÜRES</h2>
        <p className="mb-6" style={{color: '#4b5563', fontFamily: 'Rajdhani, sans-serif'}}>Töltsd fel gaming felszereléssel!</p>
        <Link to="/" className="btn-neon px-6 py-3 rounded-xl font-bold tracking-wide" style={{fontFamily: 'Rajdhani, sans-serif'}}>
          🎮 ÁRUHÁZBA
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-black mb-6" style={{color: 'white', fontFamily: 'Orbitron, sans-serif'}}>🛒 KOSAROM</h1>

      <div className="lg:flex gap-8">
        <div className="flex-1 space-y-4 mb-6 lg:mb-0">
          {items.map((item) => {
            const imageUrl = item.productImageUrl ? `${BASE_URL}${item.productImageUrl}` : null;
            return (
              <div key={item.id} className="gamer-card rounded-xl p-4 flex items-center gap-4" style={{backgroundColor: '#111118'}}>
                {imageUrl ? (
                  <img src={imageUrl} alt={item.productName} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
                ) : (
                  <div className="w-20 h-20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0" style={{backgroundColor: '#16161f'}}>
                    �
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold truncate" style={{color: '#e2e8f0', fontFamily: 'Rajdhani, sans-serif', fontSize: '16px'}}>{item.productName}</h3>
                  <p className="font-black" style={{color: '#a855f7', fontFamily: 'Orbitron, sans-serif', fontSize: '13px'}}>{formatCurrency(item.productPrice)}</p>
                </div>
                <div className="flex items-center rounded-lg overflow-hidden" style={{border: '1px solid rgba(168,85,247,0.4)'}}>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="px-2 py-1 font-bold transition-colors"
                    style={{backgroundColor: '#16161f', color: '#a855f7'}}
                  >
                    -
                  </button>
                  <span className="px-3 py-1 min-w-[2.5rem] text-center font-bold" style={{color: 'white', borderLeft: '1px solid rgba(168,85,247,0.4)', borderRight: '1px solid rgba(168,85,247,0.4)'}}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="px-2 py-1 font-bold transition-colors"
                    style={{backgroundColor: '#16161f', color: '#a855f7'}}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="ml-2 text-xl transition-colors"
                  style={{color: '#ef4444'}}
                  aria-label="Törlés"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>

        <div className="lg:w-72">
          <div className="gamer-card rounded-xl p-6 sticky top-6" style={{backgroundColor: '#111118'}}>
            <h2 className="font-black mb-4 tracking-widest" style={{color: 'white', fontFamily: 'Orbitron, sans-serif', fontSize: '14px'}}>ÖSSZESÍTŐ</h2>
            <div className="flex justify-between mb-2" style={{color: '#64748b', fontFamily: 'Rajdhani, sans-serif'}}>
              <span>Termékek ({items.length} db)</span>
            </div>
            <div className="flex justify-between font-black text-xl pt-3 mt-3" style={{borderTop: '1px solid rgba(168,85,247,0.3)'}}>
              <span style={{color: '#e2e8f0', fontFamily: 'Rajdhani, sans-serif'}}>ÖSSZESEN:</span>
              <span style={{color: '#a855f7', fontFamily: 'Orbitron, sans-serif', fontSize: '16px'}}>{formatCurrency(cartData?.totalCartValue)}</span>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full mt-4 btn-neon font-bold py-3 rounded-xl tracking-widest"
              style={{fontFamily: 'Orbitron, sans-serif', fontSize: '13px'}}
            >
              ⚡ MEGRENDELÉS
            </button>
            <Link to="/" className="block text-center text-sm mt-3" style={{color: '#4b5563', fontFamily: 'Rajdhani, sans-serif'}}>
              ← Vásárlás folytatása
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
