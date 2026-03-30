// src/pages/BookBag.jsx
import React from 'react';
import useStore from '../store/useStore';
import { Trash2, BookOpen, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const THEME = {
  paper: '#F5E6D3', // Cream background
  cardBg: '#FAF3E0', // Lighter cream for cards
  border: '#D2B48C', // Tan border
  text: '#2D241E',
  button: '#C6A682'  // Wood-like brown
};

export default function BookBag() {
  const { cart, removeFromCart, clearCart, activeBorrows } = useStore();
  const navigate = useNavigate();

  const totalInBag = cart.length;
  const totalOccupied = totalInBag + activeBorrows;
  const isOverLimit = totalOccupied > 6;

  const handleCheckout = () => {
    if (totalInBag === 0) return;
    if (isOverLimit) {
      alert("Please remove some books. You can only have 6 books total.");
      return;
    }
    alert('Books reserved! Please pick them up at the front desk.');
    clearCart();
    navigate('/my-library');
  };

  return (
    <div style={{ backgroundColor: THEME.paper, minHeight: '100vh', padding: '40px' }}>
      <div className="container-fluid" style={{ maxWidth: '1100px' }}>
        <h1 className="display-5 fw-bold mb-4" style={{ fontFamily: 'serif', color: THEME.text }}>My Book Bag</h1>

        <div className="row g-4">
          {/* Main List of Books */}
          <div className="col-lg-8">
            {totalInBag === 0 ? (
              <div className="text-center p-5 rounded-4" style={{ border: `2px dashed ${THEME.border}` }}>
                <BookOpen size={48} className="text-muted mb-3" />
                <p className="fw-bold">Your bag is empty.</p>
                <button className="btn btn-sm btn-outline-dark rounded-pill" onClick={() => navigate('/')}>Browse Library</button>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {cart.map((book) => (
                  <div 
                    key={book.id} 
                    className="d-flex align-items-center p-3" 
                    style={{ 
                      backgroundColor: THEME.cardBg, 
                      borderRadius: '15px', 
                      border: `1px solid ${THEME.border}`,
                      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)'
                    }}
                  >
                    <img 
                      src={book.coverImage || "/api/placeholder/80/120"} 
                      alt={book.title} 
                      className="rounded shadow-sm"
                      style={{ width: '80px', height: '110px', objectFit: 'cover' }}
                    />
                    
                    <div className="ms-4 flex-grow-1">
                      <h4 className="mb-0 fw-bold" style={{ fontFamily: 'serif' }}>{book.title}</h4>
                      <p className="text-muted mb-0 small">by {book.author}</p>
                    </div>

                    <div className="text-end pe-3">
                        <button 
                          className="btn btn-sm d-flex flex-column align-items-center border-0 text-danger opacity-75"
                          onClick={() => removeFromCart(book.id)}
                        >
                          <Trash2 size={20} />
                          <small style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>Remove</small>
                        </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Borrow Summary Sidebar */}
          <div className="col-lg-4">
            <div 
              className="p-4" 
              style={{ 
                backgroundColor: '#FFF', 
                borderRadius: '20px', 
                border: `1px solid ${THEME.border}`,
                boxShadow: '5px 5px 15px rgba(0,0,0,0.05)'
              }}
            >
              <h4 className="fw-bold mb-4" style={{ fontFamily: 'serif' }}>Borrow Summary</h4>
              
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Books in Bag</span>
                <span className="fw-bold">{totalInBag}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Already Borrowed</span>
                <span className="fw-bold">{activeBorrows}</span>
              </div>

              <hr style={{ borderColor: THEME.border }} />

              <div className="mt-3">
                <div className="d-flex justify-content-between mb-1">
                    <span className="fw-bold">Total Capacity</span>
                    <span className={`fw-bold ${isOverLimit ? 'text-danger' : ''}`}>{totalOccupied} / 6</span>
                </div>
                {/* Progress Bar for Capacity */}
                <div className="progress mb-4" style={{ height: '8px', backgroundColor: '#EEE' }}>
                    <div 
                        className="progress-bar" 
                        role="progressbar" 
                        style={{ 
                            width: `${(totalOccupied / 6) * 100}%`, 
                            backgroundColor: isOverLimit ? '#dc3545' : THEME.button 
                        }}
                    ></div>
                </div>
              </div>

              {isOverLimit && (
                <div className="alert alert-danger d-flex align-items-center gap-2 p-2 small mb-4">
                    <AlertCircle size={16} />
                    <span>Please remove {totalOccupied - 6} book(s) to proceed.</span>
                </div>
              )}

              <button 
                onClick={handleCheckout}
                disabled={totalInBag === 0 || isOverLimit}
                className="btn w-100 py-2 d-flex align-items-center justify-content-center gap-2 mb-2"
                style={{ 
                  backgroundColor: totalInBag === 0 || isOverLimit ? '#CCC' : THEME.button, 
                  color: 'white', 
                  borderRadius: '12px',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  boxShadow: totalInBag === 0 || isOverLimit ? 'none' : '0 4px 0 #A68A6A'
                }}
              >
                Confirm Borrow
              </button>
              
              <button 
                className="btn btn-link w-100 text-decoration-none text-muted small"
                onClick={() => navigate('/')}
              >
                Continue Browsing
              </button>

              <div className="mt-3 p-2 bg-light rounded text-center" style={{ fontSize: '0.7rem', color: '#888' }}>
                <p className="mb-0">Note: Books must be returned within 14 days of checkout.</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}