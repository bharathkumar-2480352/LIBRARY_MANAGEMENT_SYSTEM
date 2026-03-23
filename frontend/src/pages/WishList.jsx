import React from 'react';
import { ShoppingCart, Trash2 } from 'lucide-react';
import useStore from '../store/useStore';
import { COLORS } from '../utils/theme';

const Wishlist = () => {
  // Update: Destructure toggleWishlist instead of removeFromWishlist
  const { wishlist, addToCart, toggleWishlist } = useStore();

  return (
    <div className="p-4 w-100" style={{ minHeight: '100vh', backgroundColor: '#F9F6F2' }}>
      <h2 className="mb-4 fw-bold" style={{ color: COLORS.textPrimary, fontFamily: 'serif' }}>
        My Wishlist
      </h2>

      <div className="container-fluid px-0">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {wishlist.length > 0 ? (
            wishlist.map((book) => (
              <div className="col d-flex justify-content-center" key={book.id}>
                <WishlistCard 
                  book={book} 
                  onAddToCart={() => addToCart(book)}
                  // Use toggleWishlist here
                  onRemove={() => toggleWishlist(book)}
                />
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <p style={{ color: COLORS.textSecondary }}>Your wishlist is empty.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Updated Card to match your image exactly ---
const WishlistCard = ({ book, onAddToCart, onRemove }) => {
  return (
    <div 
      className="p-3 shadow-sm" 
      style={{ 
        backgroundColor: '#F5E6D3', // Warm tan background
        borderRadius: '12px',
        border: '1px solid #D1C4B2',
        width: '210px',
      }}
    >
      {/* The White Inset Frame for the Cover */}
      <div 
        className="mb-3 d-flex justify-content-center align-items-center bg-white"
        style={{ 
          height: '220px', 
          borderRadius: '6px', 
          border: '1px solid #C4B5A2',
          padding: '10px',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
        }}
      >
        <img 
          src={book.cover} 
          alt={book.title} 
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
        />
      </div>

      <div className="d-flex flex-column gap-2">
        <button 
          onClick={onAddToCart}
          className="btn btn-sm d-flex align-items-center justify-content-center gap-2 py-2 w-100"
          style={{ 
            backgroundColor: '#FFFFFF', 
            color: '#333', 
            borderRadius: '6px', 
            border: '1px solid #CCC',
            fontWeight: '600',
            fontSize: '0.8rem'
          }}
        >
          <ShoppingCart size={14} /> Add to Cart
        </button>

        <button 
          onClick={onRemove}
          className="btn btn-sm d-flex align-items-center justify-content-center gap-2 py-2 w-100"
          style={{ 
            backgroundColor: '#959595', // Matching the grey in the image
            color: '#FFFFFF', 
            borderRadius: '6px', 
            border: 'none',
            fontWeight: '600',
            fontSize: '0.8rem'
          }}
        >
          <Trash2 size={14} /> Remove
        </button>
      </div>
    </div>
  );
};

export default Wishlist;