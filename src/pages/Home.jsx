import { useState, useEffect } from 'react';
import { getAllProducts } from '../services/productService';
import ProductCard from '../components/webshop/ProductCard';
import Spinner from '../components/ui/Spinner';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res.data);
        setFiltered(res.data);
      } catch {
        setError('Nem sikerült betölteni a termékeket.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.description || '').toLowerCase().includes(search.toLowerCase())
    );

    if (sortBy === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === 'name') result = [...result].sort((a, b) => a.name.localeCompare(b.name));

    setFiltered(result);
  }, [search, sortBy, products]);

  return (
    <div>
      <div className="mb-10 text-center py-10 relative overflow-hidden rounded-2xl" style={{background: 'linear-gradient(135deg, #0d0d14 0%, #1a0a2e 50%, #0d0d14 100%)', border: '1px solid rgba(168,85,247,0.3)'}}>
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(168,85,247,0.3) 40px, rgba(168,85,247,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(168,85,247,0.3) 40px, rgba(168,85,247,0.3) 41px)'}}></div>
        <div className="relative z-10">
          <p className="text-xs tracking-widest mb-3 font-bold" style={{color: '#a855f7', fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.3em'}}>⚡ FRAGSTORE — GEAR UP, DOMINATE ⚡</p>
          <h1 className="text-4xl md:text-5xl font-black mb-3" style={{color: 'white', fontFamily: 'Orbitron, sans-serif', lineHeight: '1.1'}}>
            A LEGJOBB<br/>
            <span style={{color: '#a855f7', textShadow: '0 0 30px rgba(168,85,247,0.7)'}}>GAMING GEAR</span>
          </h1>
          <p className="text-base" style={{color: '#64748b', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em'}}>Profi felszerelés hardcore gamereknek. Nulla kompromisszum.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Keresés termék neve alapján..."
          className="flex-1 rounded-lg px-4 py-2.5 focus:outline-none"
          style={{backgroundColor: '#111118', border: '1px solid rgba(168,85,247,0.3)', color: '#e2e8f0', fontFamily: 'Rajdhani, sans-serif'}}
          onFocus={e => e.target.style.borderColor='#a855f7'}
          onBlur={e => e.target.style.borderColor='rgba(168,85,247,0.3)'}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg px-3 py-2.5 focus:outline-none"
          style={{backgroundColor: '#111118', border: '1px solid rgba(168,85,247,0.3)', color: '#e2e8f0', fontFamily: 'Rajdhani, sans-serif'}}
        >
          <option value="default">RENDEZÉS: ALAPÉRTELMEZETT</option>
          <option value="price-asc">ÁR: NÖVEKVŐ</option>
          <option value="price-desc">ÁR: CSÖKKENŐ</option>
          <option value="name">NÉV: A-Z</option>
        </select>
      </div>

      {loading && <Spinner />}

      {error && (
        <div className="rounded-lg p-4 text-center" style={{backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171'}}>
          {error}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-16 text-lg" style={{color: '#4b5563', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em'}}>
          {search ? '❌ Nincs találat a keresési feltételre.' : '🎮 Nincsenek elérhető termékek.'}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
