import { useState } from 'react';
import { ShoppingCart, Search, BookOpen } from 'lucide-react';
import useStore from '../store/useStore';
import CartModal from '../components/CartModal';

// Chocolate Truffle Palette Constants
const COLORS = {
  black: '#38240D',
  brown: '#713600',
  orange: '#C05800',
  cream: '#FDFBD4',
  white: '#FFFFFF'
};

// Updated Mock Data with Languages & Categories
const MOCK_BOOKS = [
  { id: 1, title: 'The Pragmatic Programmer', author: 'David Thomas', category: 'Tech', language: 'English' },
  { id: 2, title: 'Dune', author: 'Frank Herbert', category: 'Fiction', language: 'English' },
  { id: 3, title: 'Atomic Habits', author: 'James Clear', category: 'Non-Fiction', language: 'English' },
  { id: 4, title: 'Godan', author: 'Munshi Premchand', category: 'Fiction', language: 'Hindi' },
  { id: 5, title: 'Clean Code', author: 'Robert C. Martin', category: 'Tech', language: 'English' },
  { id: 6, title: 'Madhushala', author: 'Harivansh Rai Bachchan', category: 'Non-Fiction', language: 'Hindi' },
];

const FILTERS = ['All', 'Tech', 'Fiction', 'Non-Fiction', 'Hindi', 'English'];

export default function Home() {
  const { cart, activeBorrows, addToCart, updateQuantity, getCartTotal } = useStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const totalCartItems = getCartTotal();

  // Filter Logic
  const filteredBooks = MOCK_BOOKS.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesFilter = true;
    if (activeFilter !== 'All') {
      if (['Hindi', 'English'].includes(activeFilter)) {
        matchesFilter = book.language === activeFilter;
      } else {
        matchesFilter = book.category === activeFilter;
      }
    }
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div style={{ backgroundColor: COLORS.cream, minHeight: '100vh', paddingBottom: '50px' }}>
      
      {/* Top Navbar */}
      <nav className="shadow-sm px-4 py-3 sticky-top" style={{ backgroundColor: COLORS.black }}>
        <div className="container-fluid d-flex flex-wrap align-items-center justify-content-between gap-3">
          
          <div className="d-flex align-items-center gap-2" style={{ color: COLORS.cream }}>
            <BookOpen size={28} style={{ color: COLORS.orange }} />
            <span className="h4 mb-0 fw-bold">The Grand Library</span>
          </div>
          
          <div className="input-group" style={{ maxWidth: '400px' }}>
            <span className="input-group-text border-0" style={{ backgroundColor: COLORS.white, color: COLORS.brown }}>
              <Search size={18} />
            </span>
            <input 
              type="text" 
              className="form-control border-0 shadow-none" 
              placeholder="Search title or author..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* User Stats & Cart */}
          <div className="d-flex align-items-center gap-4 text-white">
            
            {/* DYNAMIC LIMIT TRACKER */}
            <div className="small d-none d-sm-block text-end">
               <div style={{ color: COLORS.cream, opacity: 0.8, fontSize: '0.8rem' }}>
                 At Home: {activeBorrows}
               </div>
               <div>
                 Total Allocated: <strong style={{ color: COLORS.orange, fontSize: '1.1rem' }}>{activeBorrows + totalCartItems}</strong> / 6
               </div>
            </div>
            
            <div className="position-relative" onClick={() => setIsCartOpen(true)} style={{ cursor: 'pointer' }}>
              <ShoppingCart size={24} style={{ color: COLORS.cream }} />
              {totalCartItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" style={{ backgroundColor: COLORS.orange, color: COLORS.cream }}>
                  {totalCartItems}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section: Welcome & About */}
      <div className="container py-5 text-center">
        <h1 className="fw-bold display-4 mb-3" style={{ color: COLORS.black }}>Welcome to The Grand Library</h1>
        <p className="lead mx-auto" style={{ maxWidth: '700px', color: COLORS.brown }}>
          Discover a world of knowledge. Whether you are diving into deep technical concepts, exploring vast fictional universes, or seeking self-improvement, our curated collection is here to fuel your imagination.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="container mb-5">
        <div className="d-flex flex-wrap justify-content-center gap-2">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="btn rounded-pill px-4 py-2 fw-bold shadow-sm"
              style={{
                backgroundColor: activeFilter === filter ? COLORS.orange : COLORS.white,
                color: activeFilter === filter ? COLORS.cream : COLORS.brown,
                border: `1px solid ${COLORS.brown}`,
                transition: 'all 0.2s ease-in-out'
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Book Grid */}
      <main className="container">
        {filteredBooks.length === 0 ? (
          <div className="text-center py-5">
            <h5 style={{ color: COLORS.brown }}>No books match your criteria. Try another filter!</h5>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {filteredBooks.map((book) => {
              const cartItem = cart.find((item) => item.id === book.id);
              
              return (
                <div className="col" key={book.id}>
                  <div className="card h-100 border-0 shadow-sm overflow-hidden" style={{ backgroundColor: COLORS.white, borderRadius: '12px' }}>
                    
                    {/* Consistent Placeholder Cover */}
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '220px', backgroundColor: COLORS.black, color: COLORS.cream, padding: '20px', textAlign: 'center' }}>
                      <h5 className="fw-bold opacity-75">{book.title}</h5>
                    </div>

                    <div className="card-body d-flex flex-column p-4">
                      <h5 className="card-title fw-bold mb-1" style={{ color: COLORS.black }}>{book.title}</h5>
                      <p className="card-text small mb-2" style={{ color: COLORS.brown }}>by {book.author}</p>
                      
                      <div className="d-flex gap-2 mb-3">
                        <span className="badge" style={{ backgroundColor: COLORS.cream, color: COLORS.brown, border: `1px solid ${COLORS.brown}` }}>{book.category}</span>
                        <span className="badge" style={{ backgroundColor: COLORS.cream, color: COLORS.brown, border: `1px solid ${COLORS.brown}` }}>{book.language}</span>
                      </div>
                      
                      {/* Quantity Controls or Add to Cart */}
                      <div className="mt-auto pt-2 border-top">
                        {cartItem ? (
                          <div className="d-flex align-items-center justify-content-between mt-2">
                            <button 
                              onClick={() => updateQuantity(book.id, -1)} 
                              className="btn btn-sm fw-bold rounded-circle shadow-sm"
                              style={{ width: '35px', height: '35px', backgroundColor: COLORS.brown, color: COLORS.cream }}
                            >-</button>
                            <span className="fw-bold" style={{ color: COLORS.black }}>{cartItem.quantity} in Bag</span>
                            <button 
                              onClick={() => updateQuantity(book.id, 1)} 
                              className="btn btn-sm fw-bold rounded-circle shadow-sm"
                              style={{ width: '35px', height: '35px', backgroundColor: COLORS.orange, color: COLORS.cream }}
                            >+</button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(book)}
                            className="btn w-100 fw-bold shadow-sm mt-2"
                            style={{ backgroundColor: COLORS.orange, color: COLORS.cream }}
                          >
                            + Add to Bag
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}