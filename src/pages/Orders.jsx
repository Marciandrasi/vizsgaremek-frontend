import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../services/orderService';
import { formatCurrency } from '../utils/formatCurrency';
import Spinner from '../components/ui/Spinner';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders();
        setOrders(res.data);
      } catch {
        setError('Nem sikerült betölteni a rendeléseket.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <Spinner />;

  if (error) return (
    <div className="rounded-lg p-4" style={{backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.4)', color: '#f87171', fontFamily: 'Rajdhani, sans-serif'}}>❌ {error}</div>
  );

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-2xl font-black mb-2" style={{color: 'white', fontFamily: 'Orbitron, sans-serif'}}>MÉG NINCS RENDELÉSED</h2>
        <p className="mb-6" style={{color: '#4b5563', fontFamily: 'Rajdhani, sans-serif'}}>Add le az első rendelésedet!</p>
        <Link to="/" className="btn-neon px-6 py-3 rounded-xl font-bold tracking-wide" style={{fontFamily: 'Rajdhani, sans-serif'}}>
          🎮 ÁRUHÁZBA
        </Link>
      </div>
    );
  }

  const paymentLabel = (method) => method === 'CASH' ? 'Készpénz' : 'Bankkártya';

  return (
    <div>
      <h1 className="text-2xl font-black mb-6" style={{color: 'white', fontFamily: 'Orbitron, sans-serif'}}>📦 RENDELÉSEIM</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/orders/${order.id}`}
            className="block gamer-card rounded-xl p-5 transition-all"
            style={{backgroundColor: '#111118'}}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-black" style={{color: 'white', fontFamily: 'Orbitron, sans-serif', fontSize: '14px'}}>ORDER #{order.id}</p>
                <p className="text-sm mt-0.5" style={{color: '#64748b', fontFamily: 'Rajdhani, sans-serif'}}>
                  {new Date(order.createdAt).toLocaleDateString('hu-HU', {
                    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                  })}
                </p>
                <p className="text-sm mt-0.5" style={{color: '#4b5563', fontFamily: 'Rajdhani, sans-serif'}}>
                  {order.shippingAddress}
                </p>
              </div>
              <div className="text-right">
                <p className="font-black text-lg" style={{color: '#a855f7', fontFamily: 'Orbitron, sans-serif', fontSize: '15px'}}>{formatCurrency(order.totalAmount)}</p>
                <span className="inline-block mt-1 text-xs font-bold px-2 py-0.5 rounded-full" style={{backgroundColor: 'rgba(168,85,247,0.15)', color: '#a855f7', border: '1px solid rgba(168,85,247,0.3)'}}>
                  {paymentLabel(order.paymentMethod)}
                </span>
              </div>
            </div>
            <div className="mt-3 text-sm" style={{color: '#4b5563', fontFamily: 'Rajdhani, sans-serif'}}>
              {order.orderItems?.length} termék &bull; Részletek megtekintése →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
