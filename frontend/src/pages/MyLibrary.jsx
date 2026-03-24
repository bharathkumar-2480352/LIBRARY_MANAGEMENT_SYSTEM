import React, { useState } from 'react';
import { 
  Search, Book, BookOpen, CheckSquare, Clock, 
  Key, Award, ArrowRight, Bookmark, Calendar 
} from 'lucide-react';

// Custom Warm Theme
const THEME = {
  bg: '#F3EBE1',
  cardBg: '#FFFFFF',
  textPrimary: '#3A2E20',
  textSecondary: '#8A7A66',
  accent: '#EBE1D5',
  progressBg: '#EAE1D7',
  progressFill: '#C4A882',
  shadow: '0 8px 24px rgba(180, 160, 140, 0.15)'
};

export default function MyLibrary() {
  // Dedicated search states for each card
  const [borrowedSearch, setBorrowedSearch] = useState('');
  const [waitlistSearch, setWaitlistSearch] = useState('');

  // --- Mocked Data ---
  const stats = [
    { label: "Lifetime Books", value: "21 Books Read", icon: Book },
    { label: "Current Reading", value: "3 Books", icon: BookOpen },
    // "Next Up" removed
    { label: "Finished", value: "12 Books", icon: CheckSquare },
    { label: "Waitlisted", value: "2 Books", icon: Clock },
  ];

  const borrowedBooks = [
    { 
      id: 1, 
      title: "Strategic Writing for UX", 
      source: "My Library", 
      due: "Oct 26", 
      cover: "https://covers.openlibrary.org/b/isbn/9781492071900-M.jpg" 
    },
    { 
      id: 2, 
      title: "1984", 
      source: "My Library", 
      due: "Nov 01", 
      cover: "https://covers.openlibrary.org/b/isbn/9780451524935-M.jpg" 
    },
    { 
      id: 3, 
      title: "The Design of Everyday Things", 
      source: "My Library", 
      due: "Nov 10", 
      cover: "https://covers.openlibrary.org/b/isbn/9780465050659-M.jpg" 
    }
  ];

  const waitlistedBooks = [
    { 
      id: 1, 
      title: "Sapiens", 
      position: 2, 
      cover: "https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg" 
    },
    { 
      id: 2, 
      title: "Dune", 
      position: 5, 
      cover: "https://covers.openlibrary.org/b/isbn/9780441172719-M.jpg" 
    }
  ];

  // Filtering Logic
  const filteredBorrowed = borrowedBooks.filter(b => 
    b.title.toLowerCase().includes(borrowedSearch.toLowerCase())
  );
  
  const filteredWaitlist = waitlistedBooks.filter(b => 
    b.title.toLowerCase().includes(waitlistSearch.toLowerCase())
  );

  // Reusable Card Style
  const cardStyle = {
    backgroundColor: THEME.cardBg,
    borderRadius: '20px',
    border: 'none',
    boxShadow: THEME.shadow,
    padding: '24px',
    display: 'flex',
    flexDirection: 'column'
  };

  return (
    <div style={{ backgroundColor: THEME.bg, minHeight: '100vh', padding: '30px 40px', fontFamily: "'Inter', sans-serif" }}>
      <div className="w-100 mx-auto" style={{ maxWidth: '1100px' }}>
        
        {/* Header moved up since top bar is removed */}
        <h2 className="mb-4" style={{ fontFamily: "'Georgia', serif", color: THEME.textPrimary, fontWeight: 'bold' }}>
          Uday's Dashboard
        </h2>

        {/* Stats Strip */}
        <div className="d-flex justify-content-between align-items-center bg-white rounded-pill shadow-sm px-4 py-3 mb-4" style={{ overflowX: 'auto' }}>
          {stats.map((stat, idx) => (
            <div key={idx} className="d-flex align-items-center gap-3 px-3">
              <stat.icon size={28} style={{ color: THEME.textPrimary }} strokeWidth={1.5} />
              <div className="d-flex flex-column">
                <small style={{ color: THEME.textSecondary, fontSize: '0.75rem', fontWeight: '600' }}>{stat.label}</small>
                <span className="fw-bold" style={{ color: THEME.textPrimary, fontSize: '0.9rem' }}>{stat.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid Layout */}
        <div className="row g-4 mb-4">
          
          {/* Left Column (Activity & Streak) */}
          <div className="col-12 col-md-5 d-flex flex-column gap-4">
            
            {/* Reading Activity */}
            <div style={cardStyle}>
              <h5 className="fw-bold mb-4" style={{ color: THEME.textPrimary }}>My Reading Activity</h5>
              <div className="d-flex gap-3 align-items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces&q=80" 
                  alt="Uday" 
                  className="rounded-circle"
                  style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                />
                <div>
                  <h5 className="fw-bold mb-1" style={{ color: THEME.textPrimary }}>Uday</h5>
                  <div style={{ color: THEME.textSecondary, fontSize: '0.9rem' }}>(Level 3 - Voracious Reader)</div>
                </div>
              </div>
              <div className="mt-auto">
                <div className="progress rounded-pill mb-2" style={{ height: '10px', backgroundColor: THEME.progressBg }}>
                  <div className="progress-bar rounded-pill" role="progressbar" style={{ width: '75%', backgroundColor: THEME.progressFill }}></div>
                </div>
                <div className="fw-semibold" style={{ color: THEME.textPrimary, fontSize: '0.85rem' }}>75% to Level 4</div>
              </div>
            </div>

            {/* Reading Streak */}
            <div style={{ ...cardStyle, justifyContent: 'center' }}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <Calendar size={24} style={{ color: THEME.textPrimary }} />
                <h5 className="fw-bold m-0" style={{ color: THEME.textPrimary }}>Check-In Streak</h5>
              </div>
              <div className="d-flex align-items-center gap-3 bg-light rounded px-3 py-2" style={{ border: `1px solid ${THEME.accent}` }}>
                <Calendar size={20} style={{ color: THEME.textSecondary }} strokeDasharray="2 2" />
                <span className="fw-bold" style={{ color: THEME.textPrimary }}>7-Day Reading Streak</span>
              </div>
            </div>

          </div>

          {/* Right Column (Borrowed Books) */}
          <div className="col-12 col-md-7">
            <div style={{ ...cardStyle, height: '100%' }}>
              
              <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                <h5 className="fw-bold m-0" style={{ color: THEME.textPrimary }}>Borrowed Books</h5>
                
                {/* Borrowed Books Search Bar */}
                <div className="d-flex align-items-center bg-light rounded-pill px-3 py-1" style={{ border: `1px solid ${THEME.accent}`, width: '220px' }}>
                  <Search size={14} style={{ color: THEME.textSecondary }} />
                  <input 
                    type="text" 
                    placeholder="Search borrowed..." 
                    className="form-control border-0 shadow-none bg-transparent ms-2 p-0" 
                    style={{ fontSize: '0.85rem', color: THEME.textPrimary }}
                    value={borrowedSearch}
                    onChange={(e) => setBorrowedSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* Scrollable Container */}
              <div className="d-flex flex-column gap-3 overflow-auto pe-2 custom-scrollbar" style={{ flexGrow: 1, maxHeight: '320px' }}>
                {filteredBorrowed.length > 0 ? filteredBorrowed.map((book) => (
                  <div key={book.id} className="d-flex align-items-center justify-content-between p-3 rounded" style={{ backgroundColor: '#FCFAEE', border: `1px solid ${THEME.accent}` }}>
                    
                    <div className="d-flex align-items-center gap-3">
                      <img src={book.cover} alt={book.title} style={{ width: '45px', height: '65px', objectFit: 'cover', borderRadius: '4px', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)' }} />
                      <div>
                        <div className="fw-bold mb-1" style={{ color: THEME.textPrimary, fontSize: '0.95rem' }}>{book.title}</div>
                        <div style={{ color: THEME.textSecondary, fontSize: '0.8rem' }}>borrowed from '{book.source}'</div>
                        <div className="fw-medium mt-1" style={{ color: THEME.textPrimary, fontSize: '0.8rem' }}>- due: [{book.due}]</div>
                      </div>
                    </div>

                    {/* Action - Only Extend Remains */}
                    <div className="text-center px-2">
                      <button className="btn p-0 border-0 d-flex flex-column align-items-center gap-1 bg-transparent">
                        <Key size={20} style={{ color: THEME.textPrimary }} />
                        <span style={{ fontSize: '0.7rem', color: THEME.textPrimary, fontWeight: '600' }}>Extend</span>
                      </button>
                    </div>

                  </div>
                )) : (
                  <div className="text-center text-muted py-4" style={{ fontSize: '0.9rem' }}>No books found.</div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="row g-4">
          
          {/* Badges Earned */}
          <div className="col-12 col-md-5">
            <div style={{ ...cardStyle, height: '100%' }}>
              <h6 className="fw-bold mb-4" style={{ color: THEME.textPrimary }}>Badges Earned</h6>
              <div className="d-flex justify-content-around text-center mt-auto mb-auto">
                <div>
                  <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2" style={{ width: '60px', height: '60px', backgroundColor: '#F0E6D9', border: '3px solid #D4B895' }}>
                    <Award size={28} style={{ color: '#A68A61' }} />
                  </div>
                  <small className="fw-semibold text-wrap d-block" style={{ color: THEME.textPrimary, width: '60px' }}>UX Explorer</small>
                </div>
                <div>
                  <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2" style={{ width: '60px', height: '60px', backgroundColor: '#EBEBEB', border: '3px solid #BDBDBD' }}>
                    <Award size={28} style={{ color: '#7A7A7A' }} />
                  </div>
                  <small className="fw-semibold text-wrap d-block" style={{ color: THEME.textPrimary, width: '60px' }}>Sci-Fi Fan</small>
                </div>
                <div>
                  <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2" style={{ width: '60px', height: '60px', backgroundColor: '#EED9C4', border: '3px solid #CD7F32' }}>
                    <Award size={28} style={{ color: '#8B4513' }} />
                  </div>
                  <small className="fw-semibold text-wrap d-block" style={{ color: THEME.textPrimary, width: '60px' }}>Classics Master</small>
                </div>
              </div>
            </div>
          </div>

          {/* Waiting List */}
          <div className="col-12 col-md-4">
            <div style={{ ...cardStyle, height: '100%' }}>
              
              <div className="d-flex align-items-center justify-content-between mb-3 gap-2 flex-wrap">
                <div className="d-flex align-items-center gap-2">
                  <Clock size={18} style={{ color: THEME.textPrimary }} />
                  <h6 className="fw-bold m-0" style={{ color: THEME.textPrimary }}>Waiting List</h6>
                </div>
              </div>

              {/* Waiting List Search Bar */}
              <div className="d-flex align-items-center bg-light rounded-pill px-3 py-1 mb-3" style={{ border: `1px solid ${THEME.accent}` }}>
                <Search size={14} style={{ color: THEME.textSecondary }} />
                <input 
                  type="text" 
                  placeholder="Search waitlist..." 
                  className="form-control border-0 shadow-none bg-transparent ms-2 p-0" 
                  style={{ fontSize: '0.8rem', color: THEME.textPrimary }}
                  value={waitlistSearch}
                  onChange={(e) => setWaitlistSearch(e.target.value)}
                />
              </div>

              {/* Scrollable Container for Waitlist */}
              <div className="d-flex flex-column gap-3 overflow-auto pe-2" style={{ flexGrow: 1, maxHeight: '160px' }}>
                {filteredWaitlist.length > 0 ? filteredWaitlist.map((book) => (
                  <div key={book.id} className="d-flex align-items-center gap-3">
                    <img src={book.cover} alt={book.title} style={{ width: '45px', height: '65px', objectFit: 'cover', borderRadius: '4px', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)' }} />
                    <div>
                      <div className="fw-bold mb-1" style={{ color: THEME.textPrimary, fontSize: '0.9rem' }}>{book.title}</div>
                      <div style={{ color: THEME.textSecondary, fontSize: '0.85rem' }}>- position: {book.position}</div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center text-muted py-3" style={{ fontSize: '0.85rem' }}>No waitlisted books.</div>
                )}
              </div>
              
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-3">
            <div style={{ ...cardStyle, height: '100%' }}>
              <h6 className="fw-bold mb-4" style={{ color: THEME.textPrimary }}>Quick Links</h6>
              <div className="d-flex flex-column gap-3 mt-auto mb-auto">
                <a href="#" className="d-flex align-items-center gap-2 text-decoration-none px-3 py-2 rounded" style={{ backgroundColor: THEME.accent, color: THEME.textPrimary, fontWeight: '600', fontSize: '0.9rem' }}>
                  <ArrowRight size={16} /> View Overdues
                </a>
                <a href="#" className="d-flex align-items-center gap-2 text-decoration-none px-3 py-2 rounded" style={{ backgroundColor: THEME.accent, color: THEME.textPrimary, fontWeight: '600', fontSize: '0.9rem' }}>
                  <Bookmark size={16} /> Manage Wishlist
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}