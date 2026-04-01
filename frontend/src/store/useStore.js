import { create } from 'zustand';

const useStore = create((set, get) => ({
  user: null,
  cart: [], 
  wishlist: [], // NEW: Track wishlisted items
  activeBorrows: 0,
  isLogged : localStorage.getItem('isLoggedIn') === 'true',
  currUser:JSON.parse(localStorage.getItem('currentUser'))|| null,
  
  login: (userData) => set({ user: userData }),
  setLoggedIn: (status) => {
    localStorage.setItem('isLoggedIn', status ? 'true' : 'false');
    set({ isLogged: status });
  },
  setCurrentUser: (user)=>{
    localStorage.setItem('currentUser', JSON.stringify(user));
    set({currUser:user})
  },
  getCartTotal: () => {
    return get().cart.reduce((total, item) => total + (item.quantity || 1), 0);
  },

  getActiveBorrowsCount: () => {
    return get().borrowedBooks.length;
  },
  
  addToCart: (book) => {
    const { cart, getActiveBorrowsCount, getCartTotal } = get();
    const activeBorrows = getActiveBorrowsCount();
    
    if (getCartTotal() + activeBorrows >= 6) {
      alert(`Limit reached! You have ${activeBorrows} active borrows. You can only hold 6 books total.`);
      return;
    }
    
    set({ cart: [...cart, { ...book, quantity: 1 }] });
  },

  updateQuantity: (bookId, delta) => {
    const { cart, getActiveBorrowsCount, getCartTotal } = get();
    const activeBorrows = getActiveBorrowsCount();
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
  
  clearCart: () => set({ cart: [] }),

  toggleWishlist: (book) => {
    const { wishlist } = get();
    const exists = wishlist.some(item => item.id === book.id);
    if (exists) {
      set({ wishlist: wishlist.filter(item => item.id !== book.id) });
    } else {
      set({ wishlist: [...wishlist, book] });
    }
  },

  // NEW: Checkout flow to process bag items into borrowed books
  checkout: () => {
    const { cart, borrowedBooks } = get();
    const today = new Date();
    
    // Calculate due date (14 days from today)
    const dueDate = new Date(today);
    dueDate.setDate(today.getDate() + 14);

    const checkedOutBooks = cart.map(book => ({
      ...book,
      dueDate: dueDate.toISOString(),
      source: 'My Library'
    }));

    set({ 
      borrowedBooks: [...borrowedBooks, ...checkedOutBooks],
      cart: [] 
    });
  }
}));

export default useStore;