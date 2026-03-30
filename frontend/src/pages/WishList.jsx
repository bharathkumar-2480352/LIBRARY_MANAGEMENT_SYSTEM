import React from 'react';
import { BookOpen, ShoppingCart, Trash2 } from 'lucide-react';
import useStore from '../store/useStore';
import { COLORS } from '../utils/theme';

const Wishlist = () => {
  // We need 'cart' to check if a book is already added
  const { wishlist, cart, addToCart, removeFromCart, toggleWishlist } = useStore();

  const handleImageError = (e) => {
    e.target.src = 'https://placehold.co/150x220/E5D5C5/2D2D2D?text=No+Cover';
  };

  return (
    <div className="p-3 p-md-5 w-100">
      <div className="w-100 mx-auto" style={{ maxWidth: '1100px' }}>
        <h4 className="fw-bold mb-4" style={{ color: COLORS.textPrimary, letterSpacing: '-0.5px' }}>
          My Wishlist ({wishlist.length})
        </h4>

        <div className="container-fluid px-0 pb-5">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
            {wishlist.map((book) => {
              // 1. Check if the book is already in the cart
              const inCart = cart.some((item) => item.id === book.id);

              return (
                <div className="col" key={`wishlist-${book.id}`}>
                  <div className="card h-100 border-0 shadow-sm" style={{ backgroundColor: COLORS.white, borderRadius: '12px', overflow: 'hidden' }}>
                    
                    {/* Image Section */}
                    <div style={{ height: '180px', backgroundColor: COLORS.sidebarBg, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15px', position: 'relative' }}>
                      <img 
                        src={book.cover} 
                        alt={book.title} 
                        onError={handleImageError} 
                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', boxShadow: '2px 2px 8px rgba(0,0,0,0.1)', opacity: inCart ? 0.6 : 1 }} 
                      />
                      {inCart && (
                         <div className="position-absolute top-50 start-50 translate-middle badge rounded-pill px-3 py-2 shadow-sm" style={{ backgroundColor: COLORS.textPrimary, color: COLORS.white, border: `1px solid ${COLORS.white}`, zIndex: 2 }}>
                           In Bag
                         </div>
                      )}
                    </div>
                    
                    <div className="card-body d-flex flex-column p-3">
                      <h6 className="fw-bold mb-1" style={{ color: COLORS.textPrimary, fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {book.title}
                      </h6>
                      <small className="mb-2" style={{ color: COLORS.textSecondary, fontSize: '0.75rem' }}>{book.author}</small>
                      
                      <div className="d-flex flex-wrap gap-1 mb-3 mt-auto pt-2">
                        <span className="badge fw-normal" style={{ backgroundColor: COLORS.sidebarBg, color: COLORS.textSecondary, fontSize: '0.7rem' }}>{book.genre}</span>
                      </div>

                      <div className="d-flex flex-column gap-2">
                        {/* Primary Action: Add or Remove from Bag */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (book.isEbook) return alert("Opening E-Reader...");
                            // If in cart, remove it. If not, add it.
                            inCart ? removeFromCart(book.id) : addToCart(book);
                          }}
                          className="btn btn-sm w-100 fw-bold rounded-pill d-flex align-items-center justify-content-center gap-2"
                          style={{ 
                            backgroundColor: inCart ? COLORS.activeBg : 'transparent', 
                            border: `1px solid ${COLORS.textPrimary}`, 
                            color: COLORS.textPrimary, 
                            fontSize: '0.8rem' 
                          }}
                        >
                          {book.isEbook ? <><BookOpen size={14}/> Read Now</> : (inCart ? 'Remove from Bag' : '+ Add to Bag')}
                        </button>

                        {/* Secondary Action: Remove from Wishlist entirely */}
                        <button 
                          onClick={() => toggleWishlist(book)}
                          className="btn btn-sm w-100 fw-bold rounded-pill"
                          style={{ backgroundColor: '#F0F0F0', border: 'none', color: '#666', fontSize: '0.8rem' }}
                        >
                          <Trash2 size={12} className="me-1" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;