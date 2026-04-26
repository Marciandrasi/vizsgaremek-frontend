import { useState, useEffect } from 'react';
import { getAllUsers, deleteUser } from '../../services/adminService';
import Spinner from '../../components/ui/Spinner';
import { useAuth } from '../../context/AuthContext';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user: currentUser } = useAuth();

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch {
      setError('Nem sikerült betölteni a felhasználókat.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Biztosan törölni szeretnéd ezt a felhasználót?')) return;
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
    } catch {
      setError('Hiba a törlés során.');
    }
  };

  const roleLabel = (role) => {
    if (role === 'ADMIN') return { label: 'Admin', cls: 'bg-red-100 text-red-700' };
    if (role === 'USER') return { label: 'Felhasználó', cls: 'bg-blue-100 text-blue-700' };
    return { label: 'Vendég', cls: 'bg-gray-100 text-gray-600' };
  };

  if (loading) return <Spinner />;

  const thStyle = {color: '#a855f7', fontFamily: 'Orbitron, sans-serif', fontSize: '10px', letterSpacing: '0.1em', fontWeight: '700'};
  const tdStyle = {color: '#94a3b8', fontFamily: 'Rajdhani, sans-serif', fontSize: '14px'};

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black" style={{color: 'white', fontFamily: 'Orbitron, sans-serif'}}>👥 FELHASZNÁLÓK</h1>
        <span className="text-sm font-bold" style={{color: '#4b5563', fontFamily: 'Rajdhani, sans-serif'}}>{users.length} GAMER</span>
      </div>

      {error && (
        <div className="rounded-lg p-3 mb-4 text-sm" style={{backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.4)', color: '#f87171', fontFamily: 'Rajdhani, sans-serif'}}>{error}</div>
      )}

      <div className="rounded-2xl overflow-hidden" style={{backgroundColor: '#111118', border: '1px solid rgba(168,85,247,0.3)'}}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead style={{borderBottom: '1px solid rgba(168,85,247,0.3)', backgroundColor: '#0d0d14'}}>
              <tr>
                <th className="text-left px-4 py-3" style={thStyle}>ID</th>
                <th className="text-left px-4 py-3" style={thStyle}>NÉV</th>
                <th className="text-left px-4 py-3" style={thStyle}>EMAIL</th>
                <th className="text-left px-4 py-3" style={thStyle}>TELEFON</th>
                <th className="text-left px-4 py-3" style={thStyle}>RANG</th>
                <th className="text-left px-4 py-3" style={thStyle}>MŰVELET</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const { label, cls } = roleLabel(u.role);
                const isSelf = u.email === currentUser?.sub;
                return (
                  <tr key={u.id} style={{borderBottom: '1px solid rgba(168,85,247,0.1)'}}>
                    <td className="px-4 py-3" style={{...tdStyle, color: '#4b5563'}}>#{u.id}</td>
                    <td className="px-4 py-3 font-bold" style={{...tdStyle, color: '#e2e8f0'}}>{u.name || '-'}</td>
                    <td className="px-4 py-3" style={tdStyle}>{u.email}</td>
                    <td className="px-4 py-3" style={tdStyle}>{u.phone || '-'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${cls}`}>
                        {label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {isSelf ? (
                        <span className="text-xs font-bold" style={{color: '#4b5563', fontFamily: 'Rajdhani, sans-serif'}}>SAJÁT FIÓK</span>
                      ) : (
                        <button onClick={() => handleDelete(u.id)}
                          className="text-xs font-bold transition-colors" style={{color: '#ef4444', fontFamily: 'Rajdhani, sans-serif'}}>
                          TÖRLÉS
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
