import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import productsData from '../data/products.json';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user) {
      const storedCart = localStorage.getItem(`cart_${user.email}`);
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        const validCart = parsedCart.filter(
          (item) =>
            item.product &&
            typeof item.product === 'object' &&
            item.product.id &&
            item.quantity > 0 &&
            productsData.find((p) => p.id === item.product.id)
        );
        setCart(validCart);
      } else {
        setCart([]);
      }
    } else {
      setCart([]);
    }
  }, [user]);

  const saveCart = (newCart) => {
    if (user) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(newCart));
    }
    setCart(newCart);
  };

  const addToCart = (product, quantity) => {
    if (!product || !product.id || quantity < 1 || !productsData.find((p) => p.id === product.id)) {
      console.warn('Invalid product or quantity:', product, quantity);
      return;
    }
    const newCart = [...cart];
    const existingItem = newCart.find((item) => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity; 
    } else {
      newCart.push({ product, quantity });
    }
    saveCart(newCart);
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter((item) => item.product.id !== productId);
    saveCart(newCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const newCart = cart.map((item) =>
      item.product.id === productId ? { ...item, quantity: newQuantity } : item
    );
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  const getCartTotal = () => {
    return cart.reduce(
      (total, item) =>
        total + ((item.product && item.product.price ? item.product.price : 0) * (item.quantity || 0)),
      0
    );
  };

  const getAllUserCarts = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userCarts = [];
    users.forEach((u) => {
      const cart = JSON.parse(localStorage.getItem(`cart_${u.email}`) || '[]');
      const validCart = cart.filter(
        (item) =>
          item.product &&
          typeof item.product === 'object' &&
          item.product.id &&
          item.quantity > 0 &&
          productsData.find((p) => p.id === item.product.id)
      );
      if (validCart.length > 0) {
        userCarts.push({ email: u.email, cart: validCart });
      }
    });
    return userCarts;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        getCartTotal,
        getAllUserCarts,
        saveCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};