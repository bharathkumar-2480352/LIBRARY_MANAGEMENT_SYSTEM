import { create } from 'zustand';

const useStore = create((set, get) => ({
  user: null,
  cart: [], 
  activeBorrows: 0, // Changed from 2 to 0 for testing a brand new user
  
  login: (userData) => set({ user: userData }),

  getCartTotal: () => {
    return get().cart.reduce((total, item) => total + item.quantity, 0);
  },
  
  addToCart: (book) => {
    const { cart, activeBorrows, getCartTotal } = get();
    
    if (getCartTotal() + activeBorrows >= 6) {
      alert(`Limit reached! You have ${activeBorrows} active borrows. You can only hold 6 books total.`);
      return;
    }
    
    set({ cart: [...cart, { ...book, quantity: 1 }] });
  },

  updateQuantity: (bookId, delta) => {
    const { cart, activeBorrows, getCartTotal } = get();
    const currentTotal = getCartTotal();

    set({
      cart: cart.map(item => {
        if (item.id === bookId) {
          const newQuantity = item.quantity + delta;
          
          if (delta > 0 && currentTotal + activeBorrows >= 6) {
            alert(`Limit reached! You have ${activeBorrows} active borrows. You can only hold 6 books total.`);
            return item;
          }
          
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0) 
    });
  },

  removeFromCart: (bookId) => {
    const { cart } = get();
    set({ cart: cart.filter((item) => item.id !== bookId) });
  },
  
  clearCart: () => set({ cart: [] })
}));

export default useStore;