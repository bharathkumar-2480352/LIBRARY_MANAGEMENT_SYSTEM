// src/components/BookShelf.jsx
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { COLORS } from '../utils/theme';

const handleImageError = (e) => {
  e.target.src = 'https://placehold.co/150x220/E5D5C5/2D2D2D?text=No+Cover';
};

export default function BookShelf({ title, books, cart, onBookClick, showBadge }) {
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
        <button onClick={() => scroll('left')} className="btn position-absolute top-50 translate-middle-y rounded-circle shadow-sm d-flex align-items-center justify-content-center" style={{ left: '0px', width: '36px', height: '36px', backgroundColor: COLORS.white, color: COLORS.textPrimary, zIndex: 10, border: 'none' }}><ChevronLeft size={20} /></button>
        <div ref={scrollRef} className="d-flex align-items-end gap-4 px-4 hide-scrollbar" style={{ overflowX: 'auto', paddingBottom: '2px' }}>
          {books.map((book) => {
            const inCart = cart.some((item) => item.id === book.id);
            return (
              <div key={book.id} className="position-relative flex-shrink-0" style={{ width: '115px', cursor: 'pointer' }} onClick={() => onBookClick(book)}>
                <img src={book.cover} alt={book.title} onError={handleImageError} style={{ height: '170px', width: '100%', objectFit: 'cover', borderRadius: '2px 6px 6px 2px', boxShadow: '-4px 0px 10px rgba(0,0,0,0.15)', borderLeft: '3px solid rgba(255,255,255,0.3)', opacity: inCart ? 0.6 : 1, transition: 'opacity 0.2s ease' }} />
                {inCart && <div className="position-absolute top-50 start-50 translate-middle badge rounded-pill px-3 py-2 shadow-sm" style={{ backgroundColor: COLORS.textPrimary, color: COLORS.white, border: `1px solid ${COLORS.white}` }}>In Bag</div>}
                
                {showBadge && !inCart && (
                  <div className="position-absolute bottom-0 start-50 translate-middle-x badge w-100 rounded-0" style={{ backgroundColor: showBadge === 'E-Book' ? COLORS.textPrimary : COLORS.textSecondary, color: COLORS.white, fontSize: '0.7rem' }}>
                    {showBadge}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <button onClick={() => scroll('right')} className="btn position-absolute top-50 translate-middle-y rounded-circle shadow-sm d-flex align-items-center justify-content-center" style={{ right: '0px', width: '36px', height: '36px', backgroundColor: COLORS.white, color: COLORS.textPrimary, zIndex: 10, border: 'none' }}><ChevronRight size={20} /></button>
        <div style={{ height: '14px', backgroundColor: COLORS.activeBg, borderRadius: '4px', boxShadow: `0 6px 8px ${COLORS.shelfShadow}`, marginTop: '-1px', position: 'relative', zIndex: 1 }} />
      </div>
    </div>
  );
}