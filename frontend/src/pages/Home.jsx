import { useState, useRef } from 'react';
import { Search, ChevronRight, ChevronLeft, SlidersHorizontal, X } from 'lucide-react';
import useStore from '../store/useStore';
import { COLORS } from '../utils/theme';
import BookDetailsModal from '../components/BookDetailsModal';

// Expanded Mock Data with added metadata for the modal
const MOCK_BOOKS = [
  { id: 1, title: 'The Pragmatic Programmer', author: 'David Thomas', genre: 'Tech', language: 'English', ageGroup: 'Adult', publisher: 'Addison-Wesley', year: '1999', pages: 352, cover: 'https://covers.openlibrary.org/b/isbn/9780135957059-M.jpg', isTrending: true, isRecommended: false, isComingSoon: false },
  { id: 2, title: 'Clean Code', author: 'Robert C. Martin', genre: 'Tech', language: 'English', ageGroup: 'Adult', publisher: 'Prentice Hall', year: '2008', pages: 464, cover: 'https://covers.openlibrary.org/b/isbn/9780132350884-M.jpg', isTrending: true, isRecommended: true, isComingSoon: false },
  { id: 3, title: 'Dune', author: 'Frank Herbert', genre: 'Fiction', language: 'English', ageGroup: 'Young Adult', publisher: 'Chilton Books', year: '1965', pages: 412, cover: 'https://covers.openlibrary.org/b/isbn/9780441172719-M.jpg', isTrending: true, isRecommended: true, isComingSoon: false },
  { id: 4, title: 'Godan', author: 'Munshi Premchand', genre: 'Classic', language: 'Hindi', ageGroup: 'Adult', publisher: 'Saraswati Press', year: '1936', pages: 368, cover: 'https://covers.openlibrary.org/b/isbn/9788188440053-M.jpg', isTrending: false, isRecommended: true, isComingSoon: false },
  { id: 5, title: 'Atomic Habits', author: 'James Clear', genre: 'Self-Help', language: 'English', ageGroup: 'Adult', publisher: 'Avery', year: '2018', pages: 320, cover: 'https://covers.openlibrary.org/b/isbn/9780735211292-M.jpg', isTrending: true, isRecommended: true, isComingSoon: false },
  { id: 6, title: 'Yayati', author: 'V. S. Khandekar', genre: 'Mythology', language: 'Marathi', ageGroup: 'Adult', publisher: 'Deshmukh & Co', year: '1959', pages: 432, cover: 'https://covers.openlibrary.org/b/isbn/9788177665245-M.jpg', isTrending: false, isRecommended: true, isComingSoon: false },
  { id: 7, title: 'Project Hail Mary', author: 'Andy Weir', genre: 'Fiction', language: 'English', ageGroup: 'Adult', publisher: 'Ballantine Books', year: '2021', pages: 496, cover: 'https://covers.openlibrary.org/b/isbn/9780593135204-M.jpg', isTrending: true, isRecommended: false, isComingSoon: false },
  { id: 8, title: 'Deep Work', author: 'Cal Newport', genre: 'Business', language: 'English', ageGroup: 'Adult', publisher: 'Grand Central', year: '2016', pages: 304, cover: 'https://covers.openlibrary.org/b/isbn/9781455586691-M.jpg', isTrending: false, isRecommended: true, isComingSoon: false },
  { id: 9, title: 'The Winds of Winter', author: 'George R.R. Martin', genre: 'Fiction', language: 'English', ageGroup: 'Adult', publisher: 'Bantam Books', year: '2026', pages: 1024, cover: 'https://covers.openlibrary.org/b/isbn/9780002247412-M.jpg', isTrending: false, isRecommended: false, isComingSoon: true },
  { id: 10, title: 'Madhushala', author: 'Harivansh Rai Bachchan', genre: 'Poetry', language: 'Hindi', ageGroup: 'Adult', publisher: 'Rajpal & Sons', year: '1935', pages: 144, cover: 'https://covers.openlibrary.org/b/isbn/9788121601053-M.jpg', isTrending: true, isRecommended: true, isComingSoon: false },
  { id: 11, title: 'Diary of a Wimpy Kid', author: 'Jeff Kinney', genre: 'Fiction', language: 'English', ageGroup: '9-12 Years', publisher: 'Amulet Books', year: '2007', pages: 224, cover: 'https://covers.openlibrary.org/b/isbn/9780141324906-M.jpg', isTrending: true, isRecommended: false, isComingSoon: false },
  { id: 12, title: 'The Very Hungry Caterpillar', author: 'Eric Carle', genre: 'Fiction', language: 'English', ageGroup: '0-5 Years', publisher: 'World Publishing', year: '1969', pages: 26, cover: 'https://covers.openlibrary.org/b/isbn/9780241003008-M.jpg', isTrending: false, isRecommended: true, isComingSoon: false },
  { id: 13, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', genre: 'Tech', language: 'English', ageGroup: 'Adult', publisher: 'MIT Press', year: '2009', pages: 1312, cover: 'https://covers.openlibrary.org/b/isbn/9780262033848-M.jpg', isTrending: false, isRecommended: true, isComingSoon: false },
  { id: 14, title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'History', language: 'English', ageGroup: 'Adult', publisher: 'Harvill Secker', year: '2014', pages: 464, cover: 'https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg', isTrending: true, isRecommended: true, isComingSoon: false },
  { id: 15, title: '1984', author: 'George Orwell', genre: 'Classic', language: 'English', ageGroup: 'Young Adult', publisher: 'Secker & Warburg', year: '1949', pages: 328, cover: 'https://covers.openlibrary.org/b/isbn/9780451524935-M.jpg', isTrending: false, isRecommended: true, isComingSoon: false },
  { id: 16, title: 'Harry Potter and the Cursed Child', author: 'J.K. Rowling', genre: 'Fiction', language: 'English', ageGroup: '9-12 Years', publisher: 'Little, Brown', year: '2016', pages: 320, cover: 'https://covers.openlibrary.org/b/isbn/9781338099133-M.jpg', isTrending: true, isRecommended: false, isComingSoon: false },
  { id: 17, title: 'The Midnight Library', author: 'Matt Haig', genre: 'Fiction', language: 'English', ageGroup: 'Adult', publisher: 'Canongate Books', year: '2020', pages: 304, cover: 'https://covers.openlibrary.org/b/isbn/9780525559474-M.jpg', isTrending: true, isRecommended: true, isComingSoon: false },
  { id: 18, title: 'Book Lovers', author: 'Emily Henry', genre: 'Fiction', language: 'English', ageGroup: 'Adult', publisher: 'Berkley', year: '2022', pages: 384, cover: 'https://covers.openlibrary.org/b/isbn/9780593440872-M.jpg', isTrending: false, isRecommended: false, isComingSoon: true },
  { id: 19, title: 'Tomorrow, and Tomorrow, and Tomorrow', author: 'Gabrielle Zevin', genre: 'Fiction', language: 'English', ageGroup: 'Adult', publisher: 'Knopf', year: '2022', pages: 416, cover: 'https://covers.openlibrary.org/b/isbn/9780593321201-M.jpg', isTrending: false, isRecommended: false, isComingSoon: true },
  { id: 20, title: 'Iron Flame', author: 'Lauren Roberts', genre: 'Fiction', language: 'English', ageGroup: 'Young Adult', publisher: 'Entangled', year: '2023', pages: 640, cover: 'https://covers.openlibrary.org/b/isbn/9781649374172-M.jpg', isTrending: false, isRecommended: false, isComingSoon: true },
];

const FILTER_OPTIONS = {
  genre: ['All Genres', 'Fiction', 'Tech', 'Business', 'Self-Help', 'Classic', 'Mythology', 'Poetry', 'History'],
  language: ['All Languages', 'English', 'Hindi', 'Marathi'],
  ageGroup: ['All Ages', '0-5 Years', '6-8 Years', '9-12 Years', 'Young Adult', 'Adult']
};

const handleImageError = (e) => {
  e.target.src = 'https://placehold.co/150x220/E5D5C5/2D2D2D?text=No+Cover';
};

// -------------------------------------------------------------
// Component: Skeuomorphic Wooden Shelf
// -------------------------------------------------------------
const BookShelf = ({ title, books, cart, onBookClick, showBadge }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -400 : 400, behavior: 'smooth' });
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
        {/* Adjusted left/right positions to '0px' to prevent clipping */}
        <button onClick={() => scroll('left')} className="btn position-absolute top-50 translate-middle-y rounded-circle shadow-sm d-flex align-items-center justify-content-center" style={{ left: '0px', width: '36px', height: '36px', backgroundColor: COLORS.white, color: COLORS.textPrimary, zIndex: 10, border: 'none' }}><ChevronLeft size={20} /></button>
        <div ref={scrollRef} className="d-flex align-items-end gap-4 px-4 hide-scrollbar" style={{ overflowX: 'auto', paddingBottom: '2px' }}>
          {books.map((book) => {
            const inCart = cart.some((item) => item.id === book.id);
            return (
              <div key={book.id} className="position-relative flex-shrink-0" style={{ width: '115px', cursor: 'pointer' }} onClick={() => onBookClick(book)}>
                <img src={book.cover} alt={book.title} onError={handleImageError} style={{ height: '170px', width: '100%', objectFit: 'cover', borderRadius: '2px 6px 6px 2px', boxShadow: '-4px 0px 10px rgba(0,0,0,0.15)', borderLeft: '3px solid rgba(255,255,255,0.3)', opacity: inCart ? 0.6 : 1, transition: 'opacity 0.2s ease' }} />
                {inCart && <div className="position-absolute top-50 start-50 translate-middle badge rounded-pill px-3 py-2 shadow-sm" style={{ backgroundColor: COLORS.textPrimary, color: COLORS.white, border: `1px solid ${COLORS.white}` }}>In Bag</div>}
                {showBadge === 'Coming Soon' && !inCart && <div className="position-absolute bottom-0 start-50 translate-middle-x badge w-100 rounded-0" style={{ backgroundColor: COLORS.textSecondary, color: COLORS.white, fontSize: '0.7rem' }}>Pre-Order</div>}
              </div>
            );
          })}
        </div>
        <button onClick={() => scroll('right')} className="btn position-absolute top-50 translate-middle-y rounded-circle shadow-sm d-flex align-items-center justify-content-center" style={{ right: '0px', width: '36px', height: '36px', backgroundColor: COLORS.white, color: COLORS.textPrimary, zIndex: 10, border: 'none' }}><ChevronRight size={20} /></button>
        <div style={{ height: '14px', backgroundColor: COLORS.activeBg, borderRadius: '4px', boxShadow: `0 6px 8px ${COLORS.shelfShadow}`, marginTop: '-1px', position: 'relative', zIndex: 1 }} />
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// Component: Clean Flat Card (For Filtered Grid)
// -------------------------------------------------------------
const GridBookCard = ({ book, cart, onBookClick, addToCart, removeFromCart }) => {
  const inCart = cart.some((item) => item.id === book.id);
  
  return (
    <div className="card h-100 border-0 shadow-sm" style={{ backgroundColor: COLORS.white, borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }} onClick={() => onBookClick(book)}>
      <div style={{ height: '180px', backgroundColor: COLORS.sidebarBg, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15px' }}>
        <img src={book.cover} alt={book.title} onError={handleImageError} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', boxShadow: '2px 2px 8px rgba(0,0,0,0.1)' }} />
      </div>
      <div className="card-body d-flex flex-column p-3">
        <h6 className="fw-bold mb-1" style={{ color: COLORS.textPrimary, fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{book.title}</h6>
        <small className="mb-2" style={{ color: COLORS.textSecondary, fontSize: '0.75rem' }}>{book.author}</small>
        <div className="d-flex flex-wrap gap-1 mb-3 mt-auto pt-2">
          <span className="badge fw-normal" style={{ backgroundColor: COLORS.sidebarBg, color: COLORS.textSecondary, fontSize: '0.7rem' }}>{book.genre}</span>
          <span className="badge fw-normal" style={{ backgroundColor: COLORS.sidebarBg, color: COLORS.textSecondary, fontSize: '0.7rem' }}>{book.ageGroup}</span>
        </div>
        <button 
          // Stop propagation prevents the card's onClick (opening the modal) from firing when just trying to add to bag
          onClick={(e) => { e.stopPropagation(); inCart ? removeFromCart(book.id) : addToCart(book); }}
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
// Main Home Component
// -------------------------------------------------------------
export default function Home() {
  const { cart, addToCart, removeFromCart } = useStore();
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    genre: 'All Genres',
    language: 'All Languages',
    ageGroup: 'All Ages'
  });

  // Modal State
  const [selectedBook, setSelectedBook] = useState(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsBookModalOpen(true);
  };

  const trendingBooks = MOCK_BOOKS.filter(b => b.isTrending);
  const recommendedBooks = MOCK_BOOKS.filter(b => b.isRecommended);
  const comingSoonBooks = MOCK_BOOKS.filter(b => b.isComingSoon);

  const filteredCatalog = MOCK_BOOKS.filter(book => {
    const matchesSearch = !searchQuery || book.title.toLowerCase().includes(searchQuery.toLowerCase()) || book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = filters.genre.includes('All') || book.genre === filters.genre;
    const matchesLanguage = filters.language.includes('All') || book.language === filters.language;
    const matchesAge = filters.ageGroup.includes('All') || book.ageGroup === filters.ageGroup;
    
    return matchesSearch && matchesGenre && matchesLanguage && matchesAge;
  });

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const removeFilter = (type) => {
    setFilters(prev => ({ ...prev, [type]: FILTER_OPTIONS[type][0] }));
  };

  const hasActiveFilters = Object.values(filters).some(val => !val.includes('All'));
  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="p-3 p-md-5 w-100">
      
      <div className="d-flex align-items-center mb-4 mb-md-5 bg-white rounded-pill p-2 shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
        <div className="d-flex align-items-center flex-grow-1 px-3">
          <Search size={18} style={{ color: COLORS.textSecondary }} />
          <input type="text" className="form-control border-0 shadow-none bg-transparent" placeholder="Search by title, author, or ISBN..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ color: COLORS.textPrimary, fontSize: '0.95rem' }} />
        </div>
        {isSearching && (
          <button onClick={() => setSearchQuery('')} className="btn btn-link text-decoration-none" style={{ color: COLORS.textSecondary }}><X size={18} /></button>
        )}
      </div>

      <div className="w-100 mx-auto" style={{ maxWidth: '1100px' }}>
        
        {!isSearching && (
          // Removed overflow-hidden to stop clipping the scroll buttons
          <div className="d-flex flex-column gap-5 mb-5 pb-4 border-bottom" style={{ borderColor: COLORS.activeBg }}>
            <BookShelf title="Trending Now" books={trendingBooks} cart={cart} onBookClick={handleBookClick} />
            <BookShelf title="Recommended For You" books={recommendedBooks} cart={cart} onBookClick={handleBookClick} />
            <BookShelf title="Coming Soon" books={comingSoonBooks} cart={cart} onBookClick={handleBookClick} showBadge="Coming Soon" />
          </div>
        )}

        <div className="mt-4">
          <h4 className="fw-bold mb-4" style={{ color: COLORS.textPrimary, letterSpacing: '-0.5px' }}>
            {isSearching ? `Search Results for "${searchQuery}"` : 'Explore the Catalog'}
          </h4>

          <div className="d-flex flex-wrap gap-3 mb-4 align-items-center">
            <SlidersHorizontal size={18} style={{ color: COLORS.textSecondary }} />
            {Object.keys(FILTER_OPTIONS).map(filterKey => (
              <select 
                key={filterKey}
                value={filters[filterKey]}
                onChange={(e) => handleFilterChange(filterKey, e.target.value)}
                className="form-select w-auto rounded-pill shadow-sm"
                style={{ 
                  backgroundColor: COLORS.white, 
                  color: COLORS.textPrimary, 
                  border: 'none', 
                  fontSize: '0.85rem', 
                  fontWeight: '500', 
                  cursor: 'pointer'
                }}
              >
                {FILTER_OPTIONS[filterKey].map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            ))}
          </div>

          {hasActiveFilters && (
            <div className="d-flex flex-wrap gap-2 mb-4">
              {Object.entries(filters).map(([key, val]) => {
                if (val.includes('All')) return null;
                return (
                  <div key={key} className="badge d-flex align-items-center gap-1 shadow-sm" style={{ backgroundColor: COLORS.activeBg, color: COLORS.textPrimary, padding: '6px 12px', fontSize: '0.75rem', fontWeight: '500' }}>
                    {val}
                    <X size={12} style={{ cursor: 'pointer', marginLeft: '4px' }} onClick={() => removeFilter(key)} />
                  </div>
                );
              })}
              <button onClick={() => setFilters({ genre: 'All Genres', language: 'All Languages', ageGroup: 'All Ages' })} className="btn btn-link btn-sm text-decoration-none p-0 ms-2" style={{ color: COLORS.textSecondary, fontSize: '0.8rem' }}>Clear All</button>
            </div>
          )}

          <div className="container-fluid px-0 pb-5">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
              {filteredCatalog.length > 0 ? (
                filteredCatalog.map(book => (
                  <div className="col" key={`grid-${book.id}`}>
                    <GridBookCard book={book} cart={cart} onBookClick={handleBookClick} addToCart={addToCart} removeFromCart={removeFromCart} />
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

      {/* Book Details Modal */}
      <BookDetailsModal 
        book={selectedBook} 
        isOpen={isBookModalOpen} 
        onClose={() => setIsBookModalOpen(false)} 
      />
    </div>
  );
}