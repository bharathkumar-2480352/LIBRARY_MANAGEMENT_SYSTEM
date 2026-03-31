import { useState, useEffect } from 'react';
import { X, Building2, Calendar, FileText, Globe, Heart, ShoppingCart, BookOpen, Clock, Edit3, Trash2, Save } from 'lucide-react';
import useStore from '../store/useStore';
import { COLORS } from '../utils/theme';

export default function BookDetailsModal({ book, isOpen, onClose }) {
  // Pull in user role and librarian CRUD actions from Zustand
  const { user, cart, wishlist, addToCart, removeFromCart, toggleWishlist, addBook, updateBook, deleteBook } = useStore();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const isLibrarian = user?.role === 'librarian';

  // Sync form data whenever the modal opens or a new book is selected
  useEffect(() => {
    if (book) {
      if (book.isNew) {
        setIsEditing(true);
        setFormData({
          title: '', author: '', description: '', cover: '', genre: 'Fiction', ageGroup: 'Adult',
          publisher: '', year: '', language: 'English', pages: '', availableCopies: 1, isEbook: false
        });
      } else {
        setIsEditing(false);
        setFormData({ ...book });
      }
    }
  }, [book, isOpen]);

  if (!isOpen || !book) return null;

  const inCart = cart.some((item) => item.id === book.id);
  const inWishlist = wishlist.some((item) => item.id === book.id);

  const handleImageError = (e) => {
    e.target.src = 'https://placehold.co/300x450/E5D5C5/2D2D2D?text=No+Cover';
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    // Basic validation
    if (!formData.title || !formData.author) {
      alert("Title and Author are required.");
      return;
    }

    // Convert numbers
    const finalData = {
      ...formData,
      pages: parseInt(formData.pages) || 0,
      availableCopies: parseInt(formData.availableCopies) || 0
    };

    if (book.isNew) {
      addBook(finalData);
    } else {
      updateBook(book.id, finalData);
    }
    
    setIsEditing(false);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${book.title}" from the catalog?`)) {
      deleteBook(book.id);
      onClose();
    }
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1060, padding: '20px' }}>
      
      <div className="card border-0 shadow-lg position-relative overflow-hidden" style={{ width: '100%', maxWidth: '800px', maxHeight: '90vh', backgroundColor: COLORS.sidebarBg, borderRadius: '16px' }}>
        
        <button onClick={onClose} className="btn position-absolute top-0 end-0 m-3 p-1 rounded-circle bg-white shadow-sm" style={{ zIndex: 10 }}>
          <X size={20} color={COLORS.textPrimary} />
        </button>

        <div className="row g-0 h-100 overflow-auto hide-scrollbar">
          
          {/* LEFT COLUMN: Cover Image */}
          <div className="col-md-5 d-flex flex-column justify-content-center align-items-center p-4 position-relative" style={{ backgroundColor: COLORS.activeBg }}>
            <img 
              src={formData.cover || 'https://placehold.co/300x450/E5D5C5/2D2D2D?text=No+Cover'} 
              alt={formData.title} 
              onError={handleImageError}
              className="shadow-lg mb-3"
              style={{ width: '100%', maxWidth: '250px', objectFit: 'cover', borderRadius: '4px 8px 8px 4px', borderLeft: '4px solid rgba(255,255,255,0.4)' }}
            />
            {formData.isEbook && !isEditing && (
              <span className="position-absolute top-0 start-0 m-3 badge bg-dark fs-6 shadow">Digital E-Book</span>
            )}
            
            {/* If Editing, allow them to change the cover URL */}
            {isEditing && (
              <div className="w-100 mt-2">
                <label className="form-label" style={{ fontSize: '0.8rem', color: COLORS.textPrimary, fontWeight: 'bold' }}>Cover Image URL</label>
                <input type="text" name="cover" value={formData.cover || ''} onChange={handleChange} className="form-control form-control-sm shadow-none border-0" placeholder="https://..." />
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Book Details / Form */}
          <div className="col-md-7 p-4 p-md-5 d-flex flex-column">
            
            {isEditing ? (
              // --- EDIT MODE FORM ---
              <div className="d-flex flex-column gap-3 mb-4">
                <h4 className="fw-bold mb-3" style={{ color: COLORS.textPrimary }}>{book.isNew ? 'Add New Book' : 'Edit Book Details'}</h4>
                
                <div className="row g-2">
                  <div className="col-8">
                    <label className="form-label mb-1" style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Title *</label>
                    <input type="text" name="title" value={formData.title || ''} onChange={handleChange} className="form-control shadow-none border-0" />
                  </div>
                  <div className="col-4">
                    <label className="form-label mb-1" style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Format</label>
                    <div className="form-check mt-1">
                      <input type="checkbox" name="isEbook" checked={formData.isEbook || false} onChange={handleChange} className="form-check-input shadow-none" id="ebookCheck" />
                      <label className="form-check-label" htmlFor="ebookCheck" style={{ fontSize: '0.85rem' }}>Is E-Book</label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="form-label mb-1" style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Author *</label>
                  <input type="text" name="author" value={formData.author || ''} onChange={handleChange} className="form-control shadow-none border-0" />
                </div>

                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label mb-1" style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Genre</label>
                    <input type="text" name="genre" value={formData.genre || ''} onChange={handleChange} className="form-control shadow-none border-0" />
                  </div>
                  <div className="col-6">
                    <label className="form-label mb-1" style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Age Group</label>
                    <input type="text" name="ageGroup" value={formData.ageGroup || ''} onChange={handleChange} className="form-control shadow-none border-0" />
                  </div>
                </div>

                <div>
                  <label className="form-label mb-1" style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Description</label>
                  <textarea name="description" value={formData.description || ''} onChange={handleChange} className="form-control shadow-none border-0" rows="3"></textarea>
                </div>

                <div className="row g-2">
                  <div className="col-3">
                    <label className="form-label mb-1" style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Publisher</label>
                    <input type="text" name="publisher" value={formData.publisher || ''} onChange={handleChange} className="form-control shadow-none border-0 form-control-sm" />
                  </div>
                  <div className="col-3">
                    <label className="form-label mb-1" style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Year</label>
                    <input type="text" name="year" value={formData.year || ''} onChange={handleChange} className="form-control shadow-none border-0 form-control-sm" />
                  </div>
                  <div className="col-3">
                    <label className="form-label mb-1" style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Language</label>
                    <input type="text" name="language" value={formData.language || ''} onChange={handleChange} className="form-control shadow-none border-0 form-control-sm" />
                  </div>
                  <div className="col-3">
                    <label className="form-label mb-1" style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Pages</label>
                    <input type="number" name="pages" value={formData.pages || ''} onChange={handleChange} className="form-control shadow-none border-0 form-control-sm" />
                  </div>
                </div>

                {!formData.isEbook && (
                  <div>
                    <label className="form-label mb-1" style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Available Physical Copies</label>
                    <input type="number" name="availableCopies" value={formData.availableCopies || 0} onChange={handleChange} className="form-control shadow-none border-0" style={{ width: '100px' }} />
                  </div>
                )}
              </div>
            ) : (
              // --- VIEW MODE (Read Only) ---
              <>
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
                    <small className="fw-bold" style={{ fontSize: '0.75rem', color: COLORS.textPrimary }}>{book.publisher || 'N/A'}</small>
                    <small style={{ fontSize: '0.65rem', color: COLORS.textSecondary }}>Publisher</small>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-1">
                    <Calendar size={20} color={COLORS.textSecondary} />
                    <small className="fw-bold" style={{ fontSize: '0.75rem', color: COLORS.textPrimary }}>{book.year || 'N/A'}</small>
                    <small style={{ fontSize: '0.65rem', color: COLORS.textSecondary }}>Published</small>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-1">
                    <Globe size={20} color={COLORS.textSecondary} />
                    <small className="fw-bold" style={{ fontSize: '0.75rem', color: COLORS.textPrimary }}>{book.language}</small>
                    <small style={{ fontSize: '0.65rem', color: COLORS.textSecondary }}>Language</small>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-1">
                    <FileText size={20} color={COLORS.textSecondary} />
                    <small className="fw-bold" style={{ fontSize: '0.75rem', color: COLORS.textPrimary }}>{book.pages || 'N/A'}</small>
                    <small style={{ fontSize: '0.65rem', color: COLORS.textSecondary }}>Pages</small>
                  </div>
                </div>

                {/* Library Stats / Status */}
                {!book.isEbook && (
                  <div className="mb-3 d-flex align-items-center gap-2">
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: book.availableCopies > 0 ? '#27ae60' : '#e74c3c' }}></span>
                    <span style={{ fontSize: '0.85rem', color: COLORS.textPrimary, fontWeight: '600' }}>
                      {book.availableCopies > 0 ? `${book.availableCopies} ${book.availableCopies === 1 ? 'copy' : 'copies'} available` : '0 copies available (Checked out)'}
                    </span>
                  </div>
                )}
              </>
            )}

            {/* --- ACTION BUTTONS (Role Based) --- */}
            <div className="mt-auto d-flex gap-3">
              {isLibrarian ? (
                // Librarian Controls
                <>
                  {isEditing ? (
                    <>
                      <button onClick={handleSave} className="btn flex-grow-1 fw-bold d-flex align-items-center justify-content-center gap-2 rounded-pill" style={{ backgroundColor: '#27ae60', color: COLORS.white, padding: '12px' }}>
                        <Save size={18} /> Save Changes
                      </button>
                      {!book.isNew && (
                        <button onClick={() => setIsEditing(false)} className="btn rounded-pill" style={{ backgroundColor: COLORS.mainBg, color: COLORS.textPrimary, padding: '12px 24px' }}>
                          Cancel
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      <button onClick={() => setIsEditing(true)} className="btn flex-grow-1 fw-bold d-flex align-items-center justify-content-center gap-2 rounded-pill" style={{ backgroundColor: COLORS.textPrimary, color: COLORS.white, padding: '12px' }}>
                        <Edit3 size={18} /> Edit Details
                      </button>
                      <button onClick={handleDelete} className="btn rounded-pill d-flex align-items-center justify-content-center" style={{ backgroundColor: '#fee2e2', color: '#e74c3c', border: '1px solid #fca5a5', width: '50px' }}>
                        <Trash2 size={20} />
                      </button>
                    </>
                  )}
                </>
              ) : (
                // Member Controls
                <>
                  {book.isEbook ? (
                    <button onClick={() => alert("Opening E-Reader securely in your browser...")} className="btn flex-grow-1 fw-bold d-flex align-items-center justify-content-center gap-2 rounded-pill shadow-sm" style={{ backgroundColor: COLORS.textPrimary, color: COLORS.white, border: `1px solid ${COLORS.textPrimary}`, padding: '12px' }}>
                      <BookOpen size={18} /> Read Now (Included)
                    </button>
                  ) : book.availableCopies === 0 ? (
                    <button onClick={() => alert("Waitlist functionality coming soon!")} className="btn flex-grow-1 fw-bold d-flex align-items-center justify-content-center gap-2 rounded-pill" style={{ backgroundColor: COLORS.mainBg, color: COLORS.textPrimary, border: `1px solid ${COLORS.textSecondary}`, padding: '12px' }}>
                      <Clock size={18} /> Join Waitlist
                    </button>
                  ) : (
                    <button onClick={() => inCart ? removeFromCart(book.id) : addToCart(book)} className="btn flex-grow-1 fw-bold d-flex align-items-center justify-content-center gap-2 rounded-pill" style={{ backgroundColor: inCart ? COLORS.mainBg : COLORS.textPrimary, color: inCart ? COLORS.textPrimary : COLORS.white, border: `1px solid ${COLORS.textPrimary}`, padding: '12px' }}>
                      <ShoppingCart size={18} /> {inCart ? 'Remove from Bag' : 'Add to Bag'}
                    </button>
                  )}
                  
                  <button onClick={() => toggleWishlist(book)} className="btn rounded-pill d-flex align-items-center justify-content-center" style={{ backgroundColor: inWishlist ? COLORS.activeBg : 'transparent', border: `1px solid ${COLORS.textPrimary}`, color: inWishlist ? COLORS.textPrimary : COLORS.textSecondary, width: '50px' }}>
                    <Heart size={20} fill={inWishlist ? COLORS.textPrimary : 'none'} color={inWishlist ? COLORS.textPrimary : COLORS.textPrimary} />
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}