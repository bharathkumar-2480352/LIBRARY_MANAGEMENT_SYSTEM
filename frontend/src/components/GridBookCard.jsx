// src/components/GridBookCard.jsx
import { BookOpen } from 'lucide-react';
import { COLORS } from '../utils/theme';

const handleImageError = (e) => {
  e.target.src = 'https://placehold.co/150x220/E5D5C5/2D2D2D?text=No+Cover';
};

export default function GridBookCard({ book, cart, onBookClick, addToCart, removeFromCart }) {
  const inCart = cart.some((item) => item.id === book.id);
  
  return (
    <div className="card h-100 border-0 shadow-sm" style={{ backgroundColor: COLORS.white, borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }} onClick={() => onBookClick(book)}>
      <div style={{ height: '180px', backgroundColor: COLORS.sidebarBg, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15px', position: 'relative' }}>
        <img src={book.cover} alt={book.title} onError={handleImageError} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', boxShadow: '2px 2px 8px rgba(0,0,0,0.1)' }} />
        {book.isEbook && <span className="position-absolute top-0 end-0 m-2 badge bg-dark">E-Book</span>}
      </div>
      <div className="card-body d-flex flex-column p-3">
        <h6 className="fw-bold mb-1" style={{ color: COLORS.textPrimary, fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{book.title}</h6>
        <small className="mb-2" style={{ color: COLORS.textSecondary, fontSize: '0.75rem' }}>{book.author}</small>
        <div className="d-flex flex-wrap gap-1 mb-3 mt-auto pt-2">
          <span className="badge fw-normal" style={{ backgroundColor: COLORS.sidebarBg, color: COLORS.textSecondary, fontSize: '0.7rem' }}>{book.genre}</span>
          <span className="badge fw-normal" style={{ backgroundColor: COLORS.sidebarBg, color: COLORS.textSecondary, fontSize: '0.7rem' }}>{book.ageGroup}</span>
        </div>
        <button 
          onClick={(e) => { 
            e.stopPropagation(); 
            if (book.isEbook) {
              alert("Opening E-Reader for members...");
            } else if (book.availableCopies === 0) {
              alert("Waitlist functionality coming soon!");
            } else {
              inCart ? removeFromCart(book.id) : addToCart(book); 
            }
          }}
          className="btn btn-sm w-100 fw-bold rounded-pill d-flex align-items-center justify-content-center gap-2"
          style={{ backgroundColor: inCart ? COLORS.activeBg : 'transparent', border: `1px solid ${COLORS.textPrimary}`, color: COLORS.textPrimary, transition: 'all 0.2s', fontSize: '0.8rem' }}
        >
          {book.isEbook ? <><BookOpen size={14}/> Read Now</> : book.availableCopies === 0 ? 'Join Waitlist' : (inCart ? 'Remove' : '+ Add to Bag')}
        </button>
      </div>
    </div>
  );
}