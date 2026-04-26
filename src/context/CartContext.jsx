import { createContext, useContext, useState, useEffect } from 'react';
import { getCart } from '../services/cartService';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const { isLoggedIn } = useAuth();

  const refreshCart = async () => {
    if (!isLoggedIn) {
      setCartCount(0);
      setCartTotal(0);
      return;
    }
    try {
      const res = await getCart();
      const items = res.data.items || [];
      setCartCount(items.reduce((sum, item) => sum + item.quantity, 0));
      setCartTotal(res.data.totalCartValue || 0);
    } catch {
      setCartCount(0);
      setCartTotal(0);
    }
  };

  useEffect(() => {
    refreshCart();
  }, [isLoggedIn]);

  return (
    <CartContext.Provider value={{ cartCount, cartTotal, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
