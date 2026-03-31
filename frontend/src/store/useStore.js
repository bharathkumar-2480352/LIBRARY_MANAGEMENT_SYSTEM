import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { INITIAL_BOOKS } from '../utils/mockData';

const useStore = create(
  persist(
    (set, get) => ({
      // --- 1. USER STATE ---
      user: {
        name: 'Uday Gandhi',
        email: 'uday@example.com',
        role: 'librarian', // SET TO LIBRARIAN FOR NOW TO TEST!
        memberSince: '2024'
      },
      
      // --- 2. GLOBAL DATABASE ---
      books: INITIAL_BOOKS, // The catalog now lives globally!
      cart: [], 
      wishlist: [], 
      activeBorrows: 0,

      // --- 3. LIBRARIAN CRUD ACTIONS ---
      addBook: (newBook) => {
        const { books } = get();
        // Give it a random ID for the demo
        const bookWithId = { ...newBook, id: Date.now() }; 
        set({ books: [bookWithId, ...books] });
      },

      updateBook: (id, updatedFields) => {
        const { books } = get();
        set({
          books: books.map(book => book.id === id ? { ...book, ...updatedFields } : book)
        });
      },

      deleteBook: (id) => {
        const { books, cart, wishlist } = get();
        set({
          books: books.filter(book => book.id !== id),
          // Clean up: if a book is deleted, remove it from people's carts/wishlists too
          cart: cart.filter(item => item.id !== id),
          wishlist: wishlist.filter(item => item.id !== id)
        });
      },
      
      // --- 4. MEMBER ACTIONS ---
      login: (userData) => set({ user: userData }),
      logout: () => set({ user: null, cart: [], wishlist: [], activeBorrows: 0 }),

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
                alert(`Limit reached! You can only hold 6 books total.`);
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
      }
    }),
    {
      name: 'readmonkey-storage', 
    }
  )
);

export default useStore;