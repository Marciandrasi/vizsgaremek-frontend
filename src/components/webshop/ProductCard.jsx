import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { addToCart } from '../../services/cartService';
import { formatCurrency } from '../../utils/formatCurrency';
import { useState } from 'react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProductCard({ product }) {
  const { isLoggedIn } = useAuth();
  const { refreshCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const imageUrl = product.imageUrl
    ? `${BASE_URL}${product.imageUrl}`
    : null;

  const handleAddToCart = async () => {
    if (!isLoggedIn) return;
    setLoading(true);
    try {
      await addToCart(product.id, 1);
      await refreshCart();
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    } catch (err) {
      console.error('Kosárba helyezés hiba:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gamer-card rounded-xl flex flex-col overflow-hidden" style={{backgroundColor: '#111118'}}>
      <Link to={`/products/${product.id}`} className="relative overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center text-5xl" style={{backgroundColor: '#16161f'}}>
            �
          </div>
        )}
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity" style={{background: 'linear-gradient(to top, rgba(168,85,247,0.2), transparent)'}}></div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-bold mb-1 line-clamp-1 transition-colors" style={{color: '#e2e8f0', fontFamily: 'Rajdhani, sans-serif', fontSize: '16px', letterSpacing: '0.03em'}}
            onMouseEnter={e => e.target.style.color='#a855f7'} onMouseLeave={e => e.target.style.color='#e2e8f0'}>
            {product.name}
          </h3>
        </Link>
        <p className="text-sm mb-3 flex-1 line-clamp-2" style={{color: '#64748b'}}>
          {product.description || 'Nincs leírás'}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-black text-lg" style={{color: '#a855f7', fontFamily: 'Orbitron, sans-serif', fontSize: '14px', textShadow: '0 0 8px rgba(168,85,247,0.4)'}}>
            {formatCurrency(product.price)}
          </span>
          {isLoggedIn ? (
            <button
              onClick={handleAddToCart}
              disabled={loading}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold tracking-wide transition-all disabled:opacity-60 ${
                added ? 'text-white' : 'btn-neon'
              }`}
              style={added ? {backgroundColor: '#22c55e', fontFamily: 'Rajdhani, sans-serif'} : {fontFamily: 'Rajdhani, sans-serif'}}
            >
              {added ? '✓ HOZZÁADVA' : loading ? '...' : '+ KOSÁRBA'}
            </button>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1.5 rounded-lg text-sm font-bold tracking-wide btn-outline-neon"
              style={{fontFamily: 'Rajdhani, sans-serif'}}
            >
              BELÉPÉS
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
