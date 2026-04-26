import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { addToCart } from '../services/cartService';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import Spinner from '../components/ui/Spinner';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { refreshCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        setProduct(res.data);
      } catch {
        setError('A termék nem található.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    setAdding(true);
    try {
      await addToCart(product.id, quantity);
      await refreshCart();
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return (
    <div className="text-center py-16">
      <p className="text-lg mb-4" style={{color: '#f87171'}}>{error}</p>
      <button onClick={() => navigate('/')} className="font-bold" style={{color: '#a855f7', fontFamily: 'Rajdhani, sans-serif'}}>
        ← Vissza a termékekhez
      </button>
    </div>
  );

  const imageUrl = product.imageUrl ? `${BASE_URL}${product.imageUrl}` : null;

  return (
    <div>
      <button onClick={() => navigate('/')} className="font-bold mb-6 block transition-colors" style={{color: '#a855f7', fontFamily: 'Rajdhani, sans-serif'}}
        onMouseEnter={e => e.target.style.color='#c084fc'} onMouseLeave={e => e.target.style.color='#a855f7'}>
        ← VISSZA AZ ÁRUHÁZBA
      </button>

      <div className="rounded-2xl overflow-hidden" style={{backgroundColor: '#111118', border: '1px solid rgba(168,85,247,0.3)', boxShadow: '0 0 40px rgba(168,85,247,0.08)'}}>
        <div className="md:flex">
          <div className="md:w-1/2">
            {imageUrl ? (
              <img src={imageUrl} alt={product.name} className="w-full h-80 md:h-full object-cover" />
            ) : (
              <div className="w-full h-80 flex items-center justify-center text-8xl" style={{backgroundColor: '#16161f'}}>
                �
              </div>
            )}
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <h1 className="text-3xl font-black mb-3" style={{color: 'white', fontFamily: 'Orbitron, sans-serif', lineHeight: '1.2'}}>{product.name}</h1>
            <p className="mb-6 leading-relaxed" style={{color: '#64748b', fontFamily: 'Rajdhani, sans-serif', fontSize: '16px'}}>
              {product.description || 'Nincs elérhető leírás.'}
            </p>
            <p className="text-4xl font-black mb-6" style={{color: '#a855f7', fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 20px rgba(168,85,247,0.5)'}}>
              {formatCurrency(product.price)}
            </p>

            <div className="flex items-center gap-3 mb-6">
              <label className="text-sm font-bold tracking-widest" style={{color: '#64748b', fontFamily: 'Rajdhani, sans-serif'}}>MENNYISÉG:</label>
              <div className="flex items-center rounded-lg overflow-hidden" style={{border: '1px solid rgba(168,85,247,0.4)'}}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 font-bold transition-colors"
                  style={{backgroundColor: '#16161f', color: '#a855f7'}}
                >
                  -
                </button>
                <span className="px-4 py-2 min-w-[3rem] text-center font-bold" style={{color: 'white', borderLeft: '1px solid rgba(168,85,247,0.4)', borderRight: '1px solid rgba(168,85,247,0.4)'}}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(100, quantity + 1))}
                  className="px-3 py-2 font-bold transition-colors"
                  style={{backgroundColor: '#16161f', color: '#a855f7'}}
                >
                  +
                </button>
              </div>
            </div>

            {isLoggedIn ? (
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="py-3 px-8 rounded-xl font-black text-lg disabled:opacity-60 tracking-widest"
                style={added
                  ? {backgroundColor: '#22c55e', color: 'white', fontFamily: 'Orbitron, sans-serif', fontSize: '14px'}
                  : {background: 'linear-gradient(135deg, #7c3aed, #a855f7)', color: 'white', fontFamily: 'Orbitron, sans-serif', fontSize: '14px', boxShadow: '0 0 20px rgba(168,85,247,0.3)'}}
              >
                {added ? '✓ HOZZÁADVA!' : adding ? 'TÖLTÉS...' : '+ KOSÁRBA'}
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="py-3 px-8 rounded-xl font-black text-lg btn-outline-neon tracking-widest"
                style={{fontFamily: 'Orbitron, sans-serif', fontSize: '13px'}}
              >
                ⚡ BELÉPÉS A VÁSÁRLÁSHOZ
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
