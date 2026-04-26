import { useState, useEffect } from 'react';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../../services/productService';
import { formatCurrency } from '../../utils/formatCurrency';
import Spinner from '../../components/ui/Spinner';
import Modal from '../../components/ui/Modal';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const emptyForm = { name: '', description: '', price: '', imageUrl: '' };

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data);
    } catch {
      setError('Nem sikerült betölteni a termékeket.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setImageFile(null);
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description || '',
      price: product.price,
      imageUrl: product.imageUrl || '',
    });
    setImageFile(null);
    setFormError('');
    setModalOpen(true);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError('');
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setFormError('A név megadása kötelező.'); return; }
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) {
      setFormError('Érvényes árat adj meg!'); return;
    }

    setSaving(true);
    setFormError('');
    try {
      const formData = new FormData();
      formData.append('name', form.name.trim());
      formData.append('description', form.description.trim());
      formData.append('price', form.price);
      if (form.imageUrl && !imageFile) formData.append('imageUrl', form.imageUrl);
      if (imageFile) formData.append('image', imageFile);

      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await createProduct(formData);
      }
      await fetchProducts();
      setModalOpen(false);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Hiba a mentés során.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Biztosan törölni szeretnéd ezt a terméket?')) return;
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch {
      setError('Hiba a törlés során.');
    }
  };

  if (loading) return <Spinner />;

  const thStyle = {color: '#a855f7', fontFamily: 'Orbitron, sans-serif', fontSize: '10px', letterSpacing: '0.1em', fontWeight: '700'};
  const inputStyle = {backgroundColor: '#0d0d14', border: '1px solid rgba(168,85,247,0.3)', color: '#e2e8f0', fontFamily: 'Rajdhani, sans-serif'};
  const labelStyle = {color: '#a855f7', fontFamily: 'Rajdhani, sans-serif', fontSize: '11px', fontWeight: '700', letterSpacing: '0.05em'};

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black" style={{color: 'white', fontFamily: 'Orbitron, sans-serif'}}>🛍️ TERMÉKEK</h1>
        <button onClick={openCreateModal} className="btn-neon px-4 py-2 rounded-lg font-bold tracking-wide text-sm" style={{fontFamily: 'Rajdhani, sans-serif'}}>
          + ÚJ TERMÉK
        </button>
      </div>

      {error && (
        <div className="rounded-lg p-3 mb-4 text-sm" style={{backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.4)', color: '#f87171', fontFamily: 'Rajdhani, sans-serif'}}>{error}</div>
      )}

      <div className="rounded-2xl overflow-hidden" style={{backgroundColor: '#111118', border: '1px solid rgba(168,85,247,0.3)'}}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead style={{borderBottom: '1px solid rgba(168,85,247,0.3)', backgroundColor: '#0d0d14'}}>
              <tr>
                <th className="text-left px-4 py-3" style={thStyle}>KÉP</th>
                <th className="text-left px-4 py-3" style={thStyle}>NÉV</th>
                <th className="text-left px-4 py-3" style={thStyle}>LEÍRÁS</th>
                <th className="text-left px-4 py-3" style={thStyle}>ÁR</th>
                <th className="text-left px-4 py-3" style={thStyle}>MŰVELETEK</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const imageUrl = p.imageUrl ? `${BASE_URL}${p.imageUrl}` : null;
                return (
                  <tr key={p.id} style={{borderBottom: '1px solid rgba(168,85,247,0.1)'}}>
                    <td className="px-4 py-3">
                      {imageUrl ? (
                        <img src={imageUrl} alt={p.name} className="w-12 h-12 object-cover rounded-lg" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center text-xl" style={{backgroundColor: '#16161f'}}>�</div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-bold max-w-[150px] truncate" style={{color: '#e2e8f0', fontFamily: 'Rajdhani, sans-serif'}}>{p.name}</td>
                    <td className="px-4 py-3 max-w-[200px] truncate" style={{color: '#4b5563', fontFamily: 'Rajdhani, sans-serif'}}>{p.description || '-'}</td>
                    <td className="px-4 py-3 font-black" style={{color: '#a855f7', fontFamily: 'Orbitron, sans-serif', fontSize: '12px'}}>{formatCurrency(p.price)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        <button onClick={() => openEditModal(p)} className="text-xs font-bold transition-colors" style={{color: '#3b82f6', fontFamily: 'Rajdhani, sans-serif'}}>SZERKESZTÉS</button>
                        <button onClick={() => handleDelete(p.id)} className="text-xs font-bold transition-colors" style={{color: '#ef4444', fontFamily: 'Rajdhani, sans-serif'}}>TÖRLÉS</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <Modal
          title={editingProduct ? 'TERMÉK SZERKESZTÉSE' : 'ÚJ TERMÉK'}
          onClose={() => setModalOpen(false)}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {formError && (
              <div className="rounded-lg p-2 text-sm" style={{backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.4)', color: '#f87171', fontFamily: 'Rajdhani, sans-serif'}}>{formError}</div>
            )}
            <div>
              <label className="block mb-1" style={labelStyle}>NÉV <span style={{color: '#f87171'}}>*</span></label>
              <input type="text" name="name" value={form.name} onChange={handleFormChange} required
                className="w-full rounded-lg px-3 py-2 focus:outline-none text-sm" style={inputStyle}
                onFocus={e => e.target.style.borderColor='#a855f7'} onBlur={e => e.target.style.borderColor='rgba(168,85,247,0.3)'} />
            </div>
            <div>
              <label className="block mb-1" style={labelStyle}>LEÍRÁS</label>
              <textarea name="description" value={form.description} onChange={handleFormChange} rows={3}
                className="w-full rounded-lg px-3 py-2 focus:outline-none text-sm resize-none" style={inputStyle}
                onFocus={e => e.target.style.borderColor='#a855f7'} onBlur={e => e.target.style.borderColor='rgba(168,85,247,0.3)'} />
            </div>
            <div>
              <label className="block mb-1" style={labelStyle}>ÁR (HUF) <span style={{color: '#f87171'}}>*</span></label>
              <input type="number" name="price" value={form.price} onChange={handleFormChange} required min="1" step="1"
                className="w-full rounded-lg px-3 py-2 focus:outline-none text-sm" style={inputStyle}
                onFocus={e => e.target.style.borderColor='#a855f7'} onBlur={e => e.target.style.borderColor='rgba(168,85,247,0.3)'} />
            </div>
            <div>
              <label className="block mb-1" style={labelStyle}>TERMÉK KÉPE</label>
              <input type="file" accept="image/*" onChange={handleImageChange}
                className="w-full text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:cursor-pointer"
                style={{color: '#64748b', fontFamily: 'Rajdhani, sans-serif', '--tw-file-bg': '#1a0a2e'}}
              />
              {editingProduct?.imageUrl && !imageFile && (
                <p className="text-xs mt-1" style={{color: '#4b5563', fontFamily: 'Rajdhani, sans-serif'}}>Jelenlegi kép: {editingProduct.imageUrl}</p>
              )}
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setModalOpen(false)}
                className="flex-1 btn-outline-neon py-2 rounded-lg text-sm font-bold" style={{fontFamily: 'Rajdhani, sans-serif'}}>
                MÉGSE
              </button>
              <button type="submit" disabled={saving}
                className="flex-1 btn-neon py-2 rounded-lg text-sm font-bold disabled:opacity-60" style={{fontFamily: 'Rajdhani, sans-serif'}}>
                {saving ? 'MENTÉS...' : editingProduct ? 'MENTÉS' : 'LÉTREHOZÁS'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
