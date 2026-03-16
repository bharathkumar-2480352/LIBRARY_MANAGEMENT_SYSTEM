import useStore from '../store/useStore';
import { Trash2 } from 'lucide-react';

export default function CartModal({ isOpen, onClose }) {
  const { cart, removeFromCart, clearCart } = useStore();

  if (!isOpen) return null;

  const handleCheckout = () => {
    alert('Checkout successful! These books have been reserved.');
    clearCart();
    onClose();
  };

  return (
    <>
      {/* Bootstrap Modal Backdrop */}
      <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>
      
      <div className="modal show d-block" tabIndex="-1" style={{ zIndex: 1050 }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h5 className="modal-title fw-bold">Your Book Bag</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            
            <div className="modal-body">
              {cart.length === 0 ? (
                <div className="text-center text-muted py-4">
                  <p>Your bag is empty.</p>
                </div>
              ) : (
                <ul className="list-group list-group-flush">
                  {cart.map((book) => (
                    <li key={book.id} className="list-group-item d-flex justify-content-between align-items-center px-0">
                      <div>
                        <h6 className="mb-0 fw-bold">{book.title}</h6>
                        <small className="text-muted">{book.author}</small>
                      </div>
                      <button 
                        className="btn btn-sm btn-outline-danger border-0" 
                        onClick={() => removeFromCart(book.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="modal-footer bg-light d-flex justify-content-between">
                <span className="text-muted small">
                  Total Books: <strong>{cart.length}</strong>
                </span>
                <button type="button" className="btn btn-success fw-bold px-4" onClick={handleCheckout}>
                  Confirm Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}