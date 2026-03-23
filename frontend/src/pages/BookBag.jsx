import React from 'react';
import useStore from '../store/useStore';
import { Trash2 } from 'lucide-react';

const BookBag = () => {
  const { cart, removeFromCart, clearCart } = useStore();

  // Calculation logic
  const subtotal = cart.reduce((acc, book) => acc + (book.price || 19.99), 0);
  const tax = subtotal * 0.16; // Example 16% tax
  const total = subtotal + tax;

  const handleCheckout = () => {
    alert('Checkout successful! These books have been reserved.');
    clearCart();
  };

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: '#F8F3EE', minHeight: '100vh' }}>
      <div className="container">
        <h2 className="mb-4 font-weight-bold" style={{ color: '#724E2C', fontFamily: 'serif' }}>My Cart</h2>
        
        <div className="row">
          {/* Left Side: Cart Items */}
          <div className="col-lg-8">
            {cart.length === 0 ? (
              <div className="card border-0 shadow-sm p-5 text-center" style={{ borderRadius: '15px' }}>
                <p className="text-muted">Your bag is empty. Time to find some stories!</p>
                <button className="btn mt-3 shadow-sm" style={{ backgroundColor: '#E8DED3', color: '#724E2C' }}>Continue Shopping</button>
              </div>
            ) : (
              cart.map((book) => (
                <div key={book.id} className="card mb-3 border-0 shadow-sm" style={{ borderRadius: '15px', backgroundColor: '#E8DED3' }}>
                  <div className="card-body d-flex align-items-center">
                    {/* Book Thumbnail */}
                    <div className="bg-white p-2 mr-3 shadow-sm" style={{ borderRadius: '8px' }}>
                      <img src={book.image || 'https://via.placeholder.com/60x80'} alt={book.title} style={{ height: '80px', borderRadius: '4px' }} />
                    </div>

                    {/* Book Info */}
                    <div className="flex-grow-1">
                      <h5 className="mb-0 font-weight-bold" style={{ color: '#333' }}>{book.title}</h5>
                      <p className="text-muted small mb-0">{book.author}</p>
                    </div>

                    {/* Pricing Breakdown */}
                    <div className="text-right d-none d-md-block mr-4">
                      <div className="small text-muted">Unit Price</div>
                      <div className="font-weight-bold">${(book.price || 19.99).toFixed(2)}</div>
                    </div>

                    <div className="text-right mr-4">
                      <div className="small text-muted">Line Total</div>
                      <div className="font-weight-bold">${(book.price || 19.99).toFixed(2)}</div>
                    </div>

                    {/* Remove Button */}
                    <button 
                      className="btn btn-link text-muted p-0" 
                      onClick={() => removeFromCart(book.id)}
                      title="Remove from bag"
                    >
                      <Trash2 size={20} />
                      <div className="small">Remove</div>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Side: Cart Summary */}
          {cart.length > 0 && (
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '20px', border: '2px solid #D6C7B7' }}>
                <h4 className="font-weight-bold mb-4" style={{ color: '#333' }}>Cart Summary</h4>
                
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-weight-bold">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Tax</span>
                  <span className="font-weight-bold">${tax.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Shipping</span>
                  <span className="text-success font-weight-bold">Free</span>
                </div>

                <hr style={{ borderTop: '2px solid #E8DED3' }} />

                <div className="d-flex justify-content-between mb-4 mt-2">
                  <span className="h5 font-weight-bold">Total</span>
                  <span className="h5 font-weight-bold" style={{ color: '#724E2C' }}>${total.toFixed(2)}</span>
                </div>

                <button 
                  className="btn btn-block py-3 font-weight-bold shadow-sm" 
                  style={{ backgroundColor: '#B2967D', color: 'white', borderRadius: '12px' }}
                  onClick={handleCheckout}
                >
                  <span className="mr-2">🛒</span> Checkout
                </button>
                
                <button 
                   className="btn btn-link btn-block text-muted small mt-2"
                   onClick={() => window.history.back()}
                >
                  Continue Shopping
                </button>
              </div>
              
              {/* UI Version Reference */}
              <div className="text-right mt-3">
                <small className="badge badge-light border text-muted">Version: 2.1.3</small>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookBag;