// src/pages/LibrarianHome.jsx
import { useState } from 'react';
import { Search, SlidersHorizontal, X, Plus } from 'lucide-react';
import useStore from '../store/useStore';
import { COLORS } from '../utils/theme';
import { FILTER_OPTIONS } from '../utils/mockData';
import BookDetailsModal from '../components/BookDetailsModal';
import BookShelf from '../components/BookShelf';
import GridBookCard from '../components/GridBookCard';

export default function LibrarianHome() {
  const { books, cart, addToCart, removeFromCart } = useStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    genre: 'All Genres',
    language: 'All Languages',
    ageGroup: 'All Ages'
  });

  const [selectedBook, setSelectedBook] = useState(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsBookModalOpen(true);
  };

  // Special handler to open the modal in "Create Mode"
  const handleAddNewBook = () => {
    setSelectedBook({ isNew: true }); // Pass a flag to tell the modal we are creating, not editing
    setIsBookModalOpen(true);
  };

  // Librarian specific shelves: Low stock items, Coming Soon, etc.
  const lowStockBooks = books.filter(b => b.availableCopies === 0 && !b.isEbook);
  const ebookBooks = books.filter(b => b.isEbook);
  const comingSoonBooks = books.filter(b => b.isComingSoon);

  const filteredCatalog = books.filter(book => {
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
      
      {/* LIBRARIAN HEADER: Search + Add Book Button */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 gap-3 mx-auto" style={{ maxWidth: '1100px' }}>
        <div className="d-flex align-items-center bg-white rounded-pill p-2 shadow-sm w-100" style={{ maxWidth: '600px' }}>
          <div className="d-flex align-items-center flex-grow-1 px-3">
            <Search size={18} style={{ color: COLORS.textSecondary }} />
            <input type="text" className="form-control border-0 shadow-none bg-transparent" placeholder="Search catalog to edit..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ color: COLORS.textPrimary, fontSize: '0.95rem' }} />
          </div>
          {isSearching && (
            <button onClick={() => setSearchQuery('')} className="btn btn-link text-decoration-none" style={{ color: COLORS.textSecondary }}><X size={18} /></button>
          )}
        </div>

        <button 
          onClick={handleAddNewBook}
          className="btn d-flex align-items-center gap-2 rounded-pill px-4 py-2 shadow-sm fw-bold" 
          style={{ backgroundColor: COLORS.textPrimary, color: COLORS.white }}
        >
          <Plus size={20} /> Add New Book
        </button>
      </div>

      <div className="w-100 mx-auto" style={{ maxWidth: '1100px' }}>
        
        {!isSearching && (
          <div className="d-flex flex-column gap-5 mb-5 pb-4 border-bottom" style={{ borderColor: COLORS.activeBg }}>
            <BookShelf title="Low Stock / Waitlisted" books={lowStockBooks} cart={cart} onBookClick={handleBookClick} showBadge="0 Copies" />
            <BookShelf title="Digital Assets (E-Books)" books={ebookBooks} cart={cart} onBookClick={handleBookClick} showBadge="E-Book" />
            <BookShelf title="Upcoming Shipments" books={comingSoonBooks} cart={cart} onBookClick={handleBookClick} showBadge="Coming Soon" />
          </div>
        )}

        <div className="mt-4">
          <h4 className="fw-bold mb-4" style={{ color: COLORS.textPrimary, letterSpacing: '-0.5px' }}>
            {isSearching ? `Search Results for "${searchQuery}"` : 'Complete Library Catalog'}
          </h4>

          <div className="d-flex flex-wrap gap-3 mb-4 align-items-center">
            <SlidersHorizontal size={18} style={{ color: COLORS.textSecondary }} />
            {Object.keys(FILTER_OPTIONS).map(filterKey => (
              <select 
                key={filterKey}
                value={filters[filterKey]}
                onChange={(e) => handleFilterChange(filterKey, e.target.value)}
                className="form-select w-auto rounded-pill shadow-sm"
                style={{ backgroundColor: COLORS.white, color: COLORS.textPrimary, border: 'none', fontSize: '0.85rem', fontWeight: '500', cursor: 'pointer' }}
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

      {/* Book Modal (Will be updated in the next step to handle Edit/Create modes based on the role) */}
      <BookDetailsModal 
        book={selectedBook} 
        isOpen={isBookModalOpen} 
        onClose={() => setIsBookModalOpen(false)} 
      />
    </div>
  );
}