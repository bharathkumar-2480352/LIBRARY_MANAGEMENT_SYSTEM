import { X, Building2, Calendar, FileText, Globe, Heart, ShoppingCart, BookOpen } from 'lucide-react';
import useStore from '../store/useStore';
import { COLORS } from '../utils/theme';

export default function BookDetailsModal({ book, isOpen, onClose }) {
  const { cart, wishlist, addToCart, removeFromCart, toggleWishlist } = useStore();

  if (!isOpen || !book) return null;

  const inCart = cart.some((item) => item.id === book.id);
  const inWishlist = wishlist.some((item) => item.id === book.id);

  const handleImageError = (e) => {
    e.target.src = 'https://placehold.co/300x450/E5D5C5/2D2D2D?text=No+Cover';
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1060, padding: '20px' }}>
      
      <div className="card border-0 shadow-lg position-relative overflow-hidden" style={{ width: '100%', maxWidth: '800px', maxHeight: '90vh', backgroundColor: COLORS.sidebarBg, borderRadius: '16px' }}>
        
        <button onClick={onClose} className="btn position-absolute top-0 end-0 m-3 p-1 rounded-circle bg-white shadow-sm" style={{ zIndex: 10 }}>
          <X size={20} color={COLORS.textPrimary} />
        </button>

        <div className="row g-0 h-100 overflow-auto hide-scrollbar">
          <div className="col-md-5 d-flex justify-content-center align-items-center p-4 position-relative" style={{ backgroundColor: COLORS.activeBg }}>
            <img 
              src={book.cover} 
              alt={book.title} 
              onError={handleImageError}
              className="shadow-lg"
              style={{ width: '100%', maxWidth: '250px', objectFit: 'cover', borderRadius: '4px 8px 8px 4px', borderLeft: '4px solid rgba(255,255,255,0.4)' }}
            />
            {book.isEbook && (
              <span className="position-absolute top-0 start-0 m-3 badge bg-dark fs-6 shadow">Digital E-Book</span>
            )}
          </div>

          <div className="col-md-7 p-4 p-md-5 d-flex flex-column">
            <div className="mb-4">
              <div className="d-flex gap-2 mb-2">
                <span className="badge rounded-pill" style={{ backgroundColor: COLORS.activeBg, color: COLORS.textPrimary }}>{book.genre}</span>
                <span className="badge rounded-pill border" style={{ color: COLORS.textSecondary, borderColor: COLORS.textSecondary }}>{book.ageGroup}</span>
              </div>
              <h2 className="fw-bold mb-1" style={{ color: COLORS.textPrimary, letterSpacing: '-0.5px' }}>{book.title}</h2>
              <h6 style={{ color: COLORS.textSecondary }}>By {book.author}</h6>
            </div>

            <p style={{ color: COLORS.textPrimary, fontSize: '0.95rem', lineHeight: '1.6' }}>
              {book.description || "A fascinating journey through this brilliantly crafted universe. This book has captivated readers worldwide with its compelling narrative and thought-provoking themes. A must-read addition to your collection."}
            </p>

            <div className="d-flex justify-content-between text-center mt-4 mb-4 py-3 border-top border-bottom" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
              <div className="d-flex flex-column align-items-center gap-1">
                <Building2 size={20} color={COLORS.textSecondary} />
                <small className="fw-bold" style={{ fontSize: '0.75rem', color: COLORS.textPrimary }}>{book.publisher || 'Penguin'}</small>
                <small style={{ fontSize: '0.65rem', color: COLORS.textSecondary }}>Publisher</small>
              </div>
              <div className="d-flex flex-column align-items-center gap-1">
                <Calendar size={20} color={COLORS.textSecondary} />
                <small className="fw-bold" style={{ fontSize: '0.75rem', color: COLORS.textPrimary }}>{book.year || '2023'}</small>
                <small style={{ fontSize: '0.65rem', color: COLORS.textSecondary }}>Published</small>
              </div>
              <div className="d-flex flex-column align-items-center gap-1">
                <Globe size={20} color={COLORS.textSecondary} />
                <small className="fw-bold" style={{ fontSize: '0.75rem', color: COLORS.textPrimary }}>{book.language}</small>
                <small style={{ fontSize: '0.65rem', color: COLORS.textSecondary }}>Language</small>
              </div>
              <div className="d-flex flex-column align-items-center gap-1">
                <FileText size={20} color={COLORS.textSecondary} />
                <small className="fw-bold" style={{ fontSize: '0.75rem', color: COLORS.textPrimary }}>{book.pages || '320'}</small>
                <small style={{ fontSize: '0.65rem', color: COLORS.textSecondary }}>Pages</small>
              </div>
            </div>

            <div className="mt-auto d-flex gap-3">
              {/* E-Book vs Physical Cart Logic */}
              {book.isEbook ? (
                <button 
                  onClick={() => alert("Opening E-Reader securely in your browser...")}
                  className="btn flex-grow-1 fw-bold d-flex align-items-center justify-content-center gap-2 rounded-pill shadow-sm"
                  style={{ backgroundColor: COLORS.textPrimary, color: COLORS.white, border: `1px solid ${COLORS.textPrimary}`, padding: '12px' }}
                >
                  <BookOpen size={18} /> Read Now (Included)
                </button>
              ) : (
                <button 
                  onClick={() => inCart ? removeFromCart(book.id) : addToCart(book)}
                  className="btn flex-grow-1 fw-bold d-flex align-items-center justify-content-center gap-2 rounded-pill"
                  style={{ backgroundColor: inCart ? COLORS.mainBg : COLORS.textPrimary, color: inCart ? COLORS.textPrimary : COLORS.white, border: `1px solid ${COLORS.textPrimary}`, padding: '12px' }}
                >
                  <ShoppingCart size={18} /> {inCart ? 'Remove from Bag' : 'Add to Bag'}
                </button>
              )}
              
              <button 
                onClick={() => toggleWishlist(book)}
                className="btn rounded-pill d-flex align-items-center justify-content-center"
                style={{ backgroundColor: inWishlist ? COLORS.activeBg : 'transparent', border: `1px solid ${COLORS.textPrimary}`, color: inWishlist ? COLORS.textPrimary : COLORS.textSecondary, width: '50px' }}
              >
                <Heart size={20} fill={inWishlist ? COLORS.textPrimary : 'none'} color={inWishlist ? COLORS.textPrimary : COLORS.textPrimary} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}