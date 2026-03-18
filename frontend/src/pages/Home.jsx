import { useState, useRef } from 'react';
import { ShoppingCart, Search, Home as HomeIcon, Book, Heart, User, ChevronRight, ChevronLeft, SlidersHorizontal, X } from 'lucide-react';
import useStore from '../store/useStore';
import CartModal from '../components/CartModal';

// ReadMonkey Color Palette
const COLORS = {
  sidebarBg: '#F8F6F1',     
  mainBg: '#F2EAE0',        
  activeBg: '#E5D5C5',      
  textSecondary: '#9C8C7D', 
  textPrimary: '#2D2D2D',   
  white: '#FFFFFF',
  shelfShadow: 'rgba(156, 140, 125, 0.4)'
};

// Unified Mock Data with tags for specific shelves
const MOCK_BOOKS = [
  { id: 1, title: 'The Pragmatic Programmer', author: 'David Thomas', genre: 'Tech', language: 'English', cover: 'https://covers.openlibrary.org/b/isbn/9780135957059-M.jpg', isTrending: true, isRecommended: false, isComingSoon: false },
  { id: 2, title: 'Clean Code', author: 'Robert C. Martin', genre: 'Tech', language: 'English', cover: 'https://covers.openlibrary.org/b/isbn/9780132350884-M.jpg', isTrending: false, isRecommended: true, isComingSoon: false },
  { id: 3, title: 'Dune', author: 'Frank Herbert', genre: 'Fiction', language: 'English', cover: 'https://covers.openlibrary.org/b/isbn/9780441172719-M.jpg', isTrending: true, isRecommended: true, isComingSoon: false },
  { id: 4, title: 'Godan', author: 'Munshi Premchand', genre: 'Classic', language: 'Hindi', cover: 'https://covers.openlibrary.org/b/isbn/9788188440053-M.jpg', isTrending: false, isRecommended: true, isComingSoon: false },
  { id: 5, title: 'Atomic Habits', author: 'James Clear', genre: 'Self-Help', language: 'English', cover: 'https://covers.openlibrary.org/b/isbn/9780735211292-M.jpg', isTrending: true, isRecommended: false, isComingSoon: false },
  { id: 6, title: 'Yayati', author: 'V. S. Khandekar', genre: 'Mythology', language: 'Marathi', cover: 'https://covers.openlibrary.org/b/isbn/9788177665245-M.jpg', isTrending: false, isRecommended: false, isComingSoon: false },
  { id: 7, title: 'Project Hail Mary', author: 'Andy Weir', genre: 'Fiction', language: 'English', cover: 'https://covers.openlibrary.org/b/isbn/9780593135204-M.jpg', isTrending: false, isRecommended: false, isComingSoon: true },
  { id: 8, title: 'Deep Work', author: 'Cal Newport', genre: 'Business', language: 'English', cover: 'https://covers.openlibrary.org/b/isbn/9781455586691-M.jpg', isTrending: false, isRecommended: true, isComingSoon: false },
  { id: 9, title: 'The Winds of Winter', author: 'George R.R. Martin', genre: 'Fiction', language: 'English', cover: 'https://covers.openlibrary.org/b/isbn/9780002247412-M.jpg', isTrending: false, isRecommended: false, isComingSoon: true },
  { id: 10, title: 'Madhushala', author: 'Harivansh Rai Bachchan', genre: 'Poetry', language: 'Hindi', cover: 'https://covers.openlibrary.org/b/isbn/9788121601053-M.jpg', isTrending: true, isRecommended: false, isComingSoon: false },
];

const FILTER_OPTIONS = {
  genre: ['All Genres', 'Fiction', 'Tech', 'Business', 'Self-Help', 'Classic', 'Mythology', 'Poetry'],
  language: ['All Languages', 'English', 'Hindi', 'Marathi']
};

// -------------------------------------------------------------
// Component: Skeuomorphic Wooden Shelf
// -------------------------------------------------------------
const BookShelf = ({ title, books, cart, addToCart, removeFromCart, showBadge }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  if (books.length === 0) return null;

  return (
    <div className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3 px-2">
        <h4 className="mb-0 fw-bold" style={{ color: COLORS.textPrimary, letterSpacing: '-0.5px' }}>{title}</h4>
        <span style={{ color: COLORS.textPrimary, cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500' }}>View All &rarr;</span>
      </div>
      <div className="position-relative group">
        <button onClick={() => scroll('left')} className="btn position-absolute start-0 top-50 translate-middle-y rounded-circle shadow-sm d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', backgroundColor: COLORS.white, color: COLORS.textPrimary, zIndex: 10, border: 'none', marginLeft: '-15px' }}><ChevronLeft size={20} /></button>
        <div ref={scrollRef} className="d-flex align-items-end gap-4 px-3 hide-scrollbar" style={{ overflowX: 'auto', paddingBottom: '2px' }}>
          {books.map((book) => {
            const inCart = cart.some((item) => item.id === book.id);
            return (
              <div key={book.id} className="position-relative" style={{ minWidth: '120px', cursor: 'pointer' }} onClick={() => inCart ? removeFromCart(book.id) : addToCart(book)}>
                <img src={book.cover} alt={book.title} style={{ height: '170px', width: '115px', objectFit: 'cover', borderRadius: '2px 6px 6px 2px', boxShadow: '-4px 0px 10px rgba(0,0,0,0.15)', borderLeft: '3px solid rgba(255,255,255,0.3)', opacity: inCart ? 0.6 : 1, transition: 'opacity 0.2s ease' }} />
                {inCart && <div className="position-absolute top-50 start-50 translate-middle badge rounded-pill px-3 py-2 shadow-sm" style={{ backgroundColor: COLORS.textPrimary, color: COLORS.white, border: `1px solid ${COLORS.white}` }}>In Bag</div>}
                {showBadge === 'Coming Soon' && !inCart && <div className="position-absolute bottom-0 start-50 translate-middle-x badge w-100 rounded-0" style={{ backgroundColor: COLORS.textSecondary, color: COLORS.white, fontSize: '0.7rem' }}>Pre-Order</div>}
              </div>
            );
          })}
        </div>
        <button onClick={() => scroll('right')} className="btn position-absolute end-0 top-50 translate-middle-y rounded-circle shadow-sm d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', backgroundColor: COLORS.white, color: COLORS.textPrimary, zIndex: 10, border: 'none', marginRight: '-15px' }}><ChevronRight size={20} /></button>
        <div style={{ height: '14px', backgroundColor: COLORS.activeBg, borderRadius: '4px', boxShadow: `0 6px 8px ${COLORS.shelfShadow}`, marginTop: '-1px', position: 'relative', zIndex: 1 }} />
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// Component: Clean Flat Card (For Filtered Grid)
// -------------------------------------------------------------
const GridBookCard = ({ book, cart, addToCart, removeFromCart }) => {
  const inCart = cart.some((item) => item.id === book.id);
  
  return (
    <div className="card h-100 border-0 shadow-sm" style={{ backgroundColor: COLORS.white, borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ height: '180px', backgroundColor: COLORS.sidebarBg, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15px' }}>
        <img src={book.cover} alt={book.title} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', boxShadow: '2px 2px 8px rgba(0,0,0,0.1)' }} />
      </div>
      <div className="card-body d-flex flex-column p-3">
        <h6 className="fw-bold mb-1" style={{ color: COLORS.textPrimary, fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{book.title}</h6>
        <small className="mb-2" style={{ color: COLORS.textSecondary, fontSize: '0.75rem' }}>{book.author}</small>
        <div className="d-flex flex-wrap gap-1 mb-3 mt-auto pt-2">
          <span className="badge fw-normal" style={{ backgroundColor: COLORS.sidebarBg, color: COLORS.textSecondary, fontSize: '0.7rem' }}>{book.genre}</span>
          <span className="badge fw-normal" style={{ backgroundColor: COLORS.sidebarBg, color: COLORS.textSecondary, fontSize: '0.7rem' }}>{book.language}</span>
        </div>
        <button 
          onClick={() => inCart ? removeFromCart(book.id) : addToCart(book)}
          className="btn btn-sm w-100 fw-bold rounded-pill"
          style={{ backgroundColor: inCart ? COLORS.activeBg : 'transparent', border: `1px solid ${COLORS.textPrimary}`, color: COLORS.textPrimary, transition: 'all 0.2s', fontSize: '0.8rem' }}
        >
          {inCart ? 'Remove' : '+ Add to Bag'}
        </button>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// Main Layout
// -------------------------------------------------------------
export default function Home() {
  const { cart, activeBorrows, addToCart, removeFromCart, getCartTotal } = useStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter State
  const [filters, setFilters] = useState({
    genre: 'All Genres',
    language: 'All Languages'
  });

  const totalCartItems = getCartTotal();

  // Curated Shelf Data
  const trendingBooks = MOCK_BOOKS.filter(b => b.isTrending);
  const recommendedBooks = MOCK_BOOKS.filter(b => b.isRecommended);
  const comingSoonBooks = MOCK_BOOKS.filter(b => b.isComingSoon);

  // Filtered Catalog Data (Bottom Section or Search Results)
  const filteredCatalog = MOCK_BOOKS.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = filters.genre === 'All Genres' || book.genre === filters.genre;
    const matchesLanguage = filters.language === 'All Languages' || book.language === filters.language;
    return matchesSearch && matchesGenre && matchesLanguage;
  });

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const removeFilter = (type) => {
    setFilters(prev => ({ ...prev, [type]: FILTER_OPTIONS[type][0] }));
  };

  const hasActiveFilters = Object.values(filters).some(val => !val.startsWith('All '));
  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="d-flex" style={{ backgroundColor: COLORS.mainBg, minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
      
      {/* 1. Left Sidebar (Fixed) */}
      <aside className="d-flex flex-column justify-content-between py-4 px-3" style={{ width: '240px', backgroundColor: COLORS.sidebarBg, position: 'fixed', height: '100vh', borderRight: `1px dashed ${COLORS.activeBg}` }}>
        <div>
          <div className="d-flex align-items-center gap-2 px-3 mb-5 mt-2">
            <span style={{ fontSize: '1.8rem' }}>🐒</span> 
            <h4 className="mb-0 fw-bold" style={{ color: COLORS.textPrimary, letterSpacing: '-0.5px' }}>ReadMonkey</h4>
          </div>
          <nav className="d-flex flex-column gap-2">
            <button className="btn text-start d-flex align-items-center gap-3 border-0 py-2 px-3 rounded-pill" style={{ backgroundColor: COLORS.activeBg, color: COLORS.textPrimary, fontWeight: '600' }}>
              <HomeIcon size={20} /> Library Home
            </button>
            <button className="btn text-start d-flex align-items-center gap-3 border-0 py-2 px-3 rounded-pill" style={{ color: COLORS.textSecondary, fontWeight: '500' }}>
              <Heart size={20} /> Wishlist
            </button>
            <button onClick={() => setIsCartOpen(true)} className="btn text-start d-flex align-items-center gap-3 border-0 py-2 px-3 rounded-pill position-relative" style={{ color: COLORS.textSecondary, fontWeight: '500' }}>
              <ShoppingCart size={20} /> Book Bag
              {totalCartItems > 0 && <span className="position-absolute end-0 me-3 badge rounded-pill" style={{ backgroundColor: COLORS.textPrimary, color: COLORS.white }}>{totalCartItems}</span>}
            </button>
          </nav>
        </div>
        <div className="p-3 mt-auto rounded-3 d-flex align-items-center gap-3 cursor-pointer" style={{ backgroundColor: COLORS.white, boxShadow: `0 2px 10px ${COLORS.shelfShadow}` }}>
          <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: COLORS.activeBg, color: COLORS.textPrimary }}><User size={20} /></div>
          <div style={{ flex: 1 }}>
            <h6 className="mb-0" style={{ color: COLORS.textPrimary, fontSize: '0.9rem', fontWeight: '600' }}>Uday Gandhi</h6>
            <small style={{ color: COLORS.textSecondary, fontSize: '0.75rem' }}>{activeBorrows}/6 Borrowed</small>
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-grow-1" style={{ marginLeft: '240px' }}>
        <div style={{ padding: '30px 50px' }}>
          
          {/* Global Search Bar */}
          <div className="d-flex align-items-center mb-5 bg-white rounded-pill p-2 shadow-sm" style={{ maxWidth: '600px' }}>
            <div className="d-flex align-items-center flex-grow-1 px-3">
              <Search size={18} style={{ color: COLORS.textSecondary }} />
              <input type="text" className="form-control border-0 shadow-none bg-transparent" placeholder="Search by title, author, or ISBN..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ color: COLORS.textPrimary, fontSize: '0.95rem' }} />
            </div>
            {isSearching && (
              <button onClick={() => setSearchQuery('')} className="btn btn-link text-decoration-none" style={{ color: COLORS.textSecondary }}><X size={18} /></button>
            )}
          </div>

          <div style={{ maxWidth: '1000px' }}>
            
            {/* Show Curated Shelves ONLY if not searching actively */}
            {!isSearching && (
              <div className="d-flex flex-column gap-5 mb-5 pb-4 border-bottom" style={{ borderColor: COLORS.activeBg }}>
                <BookShelf title="Trending Now" books={trendingBooks} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />
                <BookShelf title="Recommended For You" books={recommendedBooks} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />
                <BookShelf title="Coming Soon" books={comingSoonBooks} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} showBadge="Coming Soon" />
              </div>
            )}

            {/* Filterable Catalog Section */}
            <div className="mt-4">
              <h4 className="fw-bold mb-4" style={{ color: COLORS.textPrimary, letterSpacing: '-0.5px' }}>
                {isSearching ? `Search Results for "${searchQuery}"` : 'Explore the Catalog'}
              </h4>

              {/* Filters Row */}
              <div className="d-flex flex-wrap gap-3 mb-4 align-items-center">
                <SlidersHorizontal size={18} style={{ color: COLORS.textSecondary }} />
                {Object.keys(FILTER_OPTIONS).map(filterKey => (
                  <select 
                    key={filterKey}
                    value={filters[filterKey]}
                    onChange={(e) => handleFilterChange(filterKey, e.target.value)}
                    className="form-select w-auto rounded-pill shadow-sm py-1 px-3"
                    style={{ backgroundColor: COLORS.white, color: COLORS.textPrimary, border: 'none', fontSize: '0.85rem', fontWeight: '500', cursor: 'pointer' }}
                  >
                    {FILTER_OPTIONS[filterKey].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                ))}
              </div>

              {/* Active Tags Row */}
              {hasActiveFilters && (
                <div className="d-flex flex-wrap gap-2 mb-4">
                  {Object.entries(filters).map(([key, val]) => {
                    if (val.startsWith('All ')) return null;
                    return (
                      <div key={key} className="badge d-flex align-items-center gap-1 shadow-sm" style={{ backgroundColor: COLORS.activeBg, color: COLORS.textPrimary, padding: '6px 12px', fontSize: '0.75rem', fontWeight: '500' }}>
                        {val}
                        <X size={12} style={{ cursor: 'pointer', marginLeft: '4px' }} onClick={() => removeFilter(key)} />
                      </div>
                    );
                  })}
                  <button onClick={() => setFilters({ genre: 'All Genres', language: 'All Languages' })} className="btn btn-link btn-sm text-decoration-none p-0 ms-2" style={{ color: COLORS.textSecondary, fontSize: '0.8rem' }}>Clear All</button>
                </div>
              )}

              {/* Filtered Grid Results */}
              <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4 pb-5">
                {filteredCatalog.length > 0 ? (
                  filteredCatalog.map(book => (
                    <div className="col" key={`grid-${book.id}`}>
                      <GridBookCard book={book} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />
                    </div>
                  ))
                ) : (
                  <div className="col-12 py-5">
                    <p style={{ color: COLORS.textSecondary }}>No books found matching your criteria.</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </main>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}