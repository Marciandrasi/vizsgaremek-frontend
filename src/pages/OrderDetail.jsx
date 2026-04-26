import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getOrderById } from '../services/orderService';
import { formatCurrency } from '../utils/formatCurrency';
import Spinner from '../components/ui/Spinner';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isSuccess = location.state?.success;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getOrderById(id);
        setOrder(res.data);
      } catch {
        setError('A rendelés nem található.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return (
    <div className="text-center py-16">
      <p className="text-lg mb-4" style={{color: '#f87171', fontFamily: 'Rajdhani, sans-serif'}}>❌ {error}</p>
      <button onClick={() => navigate('/orders')} className="font-bold" style={{color: '#a855f7', fontFamily: 'Rajdhani, sans-serif'}}>
        ← Vissza a rendelésekhez
      </button>
    </div>
  );

  const paymentLabel = (method) => method === 'CASH' ? 'Készpénz' : 'Bankkártya';

  const labelCls = {color: '#4b5563', fontFamily: 'Rajdhani, sans-serif', fontSize: '10px', letterSpacing: '0.1em'};
  const valueCls = {color: '#e2e8f0', fontFamily: 'Rajdhani, sans-serif', fontWeight: '600'};

  return (
    <div className="max-w-2xl mx-auto">
      {isSuccess && (
        <div className="rounded-xl p-5 mb-6 text-center" style={{backgroundColor: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.4)'}}>
          <div className="text-4xl mb-2">�</div>
          <h2 className="text-xl font-black mb-1" style={{color: '#a855f7', fontFamily: 'Orbitron, sans-serif'}}>GG! RENDELÉS SIKERES!</h2>
          <p className="text-sm" style={{color: '#64748b', fontFamily: 'Rajdhani, sans-serif'}}>Köszönjük a vásárlást! Hamarosan felvesszük veled a kapcsolatot.</p>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black" style={{color: 'white', fontFamily: 'Orbitron, sans-serif'}}>ORDER #{order.id}</h1>
        <button onClick={() => navigate('/orders')} className="text-sm font-bold" style={{color: '#a855f7', fontFamily: 'Rajdhani, sans-serif'}}>
          ← Vissza
        </button>
      </div>

      <div className="rounded-2xl p-6 space-y-6" style={{backgroundColor: '#111118', border: '1px solid rgba(168,85,247,0.3)'}}>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="uppercase mb-1" style={labelCls}>Név</p>
            <p style={valueCls}>{order.shippingName}</p>
          </div>
          <div>
            <p className="uppercase mb-1" style={labelCls}>E-mail</p>
            <p style={valueCls}>{order.shippingEmail}</p>
          </div>
          <div>
            <p className="uppercase mb-1" style={labelCls}>Telefon</p>
            <p style={valueCls}>{order.shippingPhone}</p>
          </div>
          <div>
            <p className="uppercase mb-1" style={labelCls}>Fizetési mód</p>
            <p style={valueCls}>{paymentLabel(order.paymentMethod)}</p>
          </div>
          <div className="col-span-2">
            <p className="uppercase mb-1" style={labelCls}>Szállítási cím</p>
            <p style={valueCls}>{order.shippingAddress}</p>
          </div>
          <div>
            <p className="uppercase mb-1" style={labelCls}>Dátum</p>
            <p style={valueCls}>
              {new Date(order.createdAt).toLocaleDateString('hu-HU', {
                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
              })}
            </p>
          </div>
        </div>

        <div style={{borderTop: '1px solid rgba(168,85,247,0.2)', paddingTop: '1rem'}}>
          <h3 className="font-black mb-3 tracking-widest" style={{color: '#a855f7', fontFamily: 'Orbitron, sans-serif', fontSize: '12px'}}>RENDELT TERMÉKEK</h3>
          <div className="space-y-3">
            {order.orderItems?.map((item) => {
              const imageUrl = item.productImageUrl ? `${BASE_URL}${item.productImageUrl}` : null;
              return (
                <div key={item.id} className="flex items-center gap-3">
                  {imageUrl ? (
                    <img src={imageUrl} alt={item.productName} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-xl flex-shrink-0" style={{backgroundColor: '#16161f'}}>
                      �
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-bold" style={{color: '#e2e8f0', fontFamily: 'Rajdhani, sans-serif'}}>{item.productName}</p>
                    <p className="text-xs" style={{color: '#4b5563', fontFamily: 'Rajdhani, sans-serif'}}>{item.quantity} db x {formatCurrency(item.unitPrice)}</p>
                  </div>
                  <p className="font-black text-sm" style={{color: '#a855f7', fontFamily: 'Orbitron, sans-serif', fontSize: '12px'}}>
                    {formatCurrency(item.quantity * item.unitPrice)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4" style={{borderTop: '1px solid rgba(168,85,247,0.2)'}}>
          <span className="font-bold tracking-widest" style={{color: '#64748b', fontFamily: 'Rajdhani, sans-serif'}}>VÉGÖSSZEG:</span>
          <span className="text-2xl font-black" style={{color: '#a855f7', fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 15px rgba(168,85,247,0.5)'}}>{formatCurrency(order.totalAmount)}</span>
        </div>
      </div>
    </div>
  );
}
