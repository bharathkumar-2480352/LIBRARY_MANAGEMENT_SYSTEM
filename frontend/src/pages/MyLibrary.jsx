import React, { useState } from 'react';
import { 
  Search, Book, BookOpen, CheckSquare, Clock, 
  Key, Calendar as CalendarIcon, ChevronLeft, ChevronRight 
} from 'lucide-react';
import useStore from '../store/useStore';

// Custom Warm Theme
// Custom Warm Theme
const THEME = {
  bg: '#F3EBE1',
  cardBg: '#FFFFFF',
  textPrimary: '#3A2E20',
  textSecondary: '#8A7A66',
  accent: '#EBE1D5',
  bg: '#F3EBE1',
  cardBg: '#FFFFFF',
  textPrimary: '#3A2E20',
  textSecondary: '#8A7A66',
  accent: '#EBE1D5',
  progressBg: '#EAE1D7',
  progressFill: '#C4A882',
  shadow: '0 8px 24px rgba(180, 160, 140, 0.15)',
  danger: '#D9534F'
};

export default function MyLibrary() {
  const { borrowedBooks } = useStore();
  
  // States
  const [borrowedSearch, setBorrowedSearch] = useState('');
  const [waitlistSearch, setWaitlistSearch] = useState('');
  const [viewMode, setViewMode] = useState('borrowed'); // 'borrowed' | 'all'
  
  // Calendar State
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [hoveredDay, setHoveredDay] = useState(null);

  // Mock Data
  const stats = [
    { label: "Lifetime Books", value: "21 Books Read", icon: Book },
    { label: "Current Reading", value: `${borrowedBooks.length} Books`, icon: BookOpen },
    { label: "Finished", value: "12 Books", icon: CheckSquare },
    { label: "Waitlisted", value: "3 Books", icon: Clock },
  ];

  const waitlistedBooks = [
    { id: 101, title: "Sapiens", position: 2, cover: "https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg" },
    { id: 102, title: "Dune", position: 5, cover: "https://covers.openlibrary.org/b/isbn/9780441172719-M.jpg" },
    { id: 103, title: "Harry Potter", position: 7, cover: "https://covers.openlibrary.org/b/id/15159585-L.jpg" }
  ];

  // Mocking "Past Reads" to demonstrate the 'All Books' toggle
  const pastReads = [
    { id: 'p1', title: 'The Design of Everyday Things', source: 'History', dueDate: 'Returned', cover: 'https://covers.openlibrary.org/b/isbn/9780465050659-M.jpg' },
    { id: 'p2', title: 'Strategic Writing for UX', source: 'History', dueDate: 'Returned', cover: 'https://covers.openlibrary.org/b/isbn/9781492071900-M.jpg' }
  ];

  // Filtering Logic
  const allBooksToDisplay = viewMode === 'borrowed' ? borrowedBooks : [...borrowedBooks, ...pastReads];
  
  const filteredBooks = allBooksToDisplay.filter(b => 
    b.title.toLowerCase().includes(borrowedSearch.toLowerCase())
  );
  
  const filteredWaitlist = waitlistedBooks.filter(b => 
    b.title.toLowerCase().includes(waitlistSearch.toLowerCase())
  );

  // --- Calendar Logic ---
  const currentMonth = calendarDate.getMonth();
  const currentYear = calendarDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanksArray = Array.from({ length: firstDayIndex }, (_, i) => i);

  const handlePrevMonth = () => setCalendarDate(new Date(currentYear, currentMonth - 1, 1));
  const handleNextMonth = () => setCalendarDate(new Date(currentYear, currentMonth + 1, 1));

  const getBooksDueOnDay = (day) => {
    return borrowedBooks.filter(book => {
      if (!book.dueDate || book.dueDate === 'Returned') return false;
      const due = new Date(book.dueDate);
      return due.getDate() === day && due.getMonth() === currentMonth && due.getFullYear() === currentYear;
    });
  };

  const handleImageError = (e) => {
    e.target.src = 'https://placehold.co/45x65/E5D5C5/2D2D2D?text=No+Cover';
  };

  const cardStyle = {
    backgroundColor: THEME.cardBg,
    borderRadius: '20px',
    border: 'none',
    boxShadow: THEME.shadow,
    padding: '24px',
    display: 'flex',
    flexDirection: 'column'
    padding: '24px',
    display: 'flex',
    flexDirection: 'column'
  };

  return (
    <div style={{ backgroundColor: THEME.bg, minHeight: '100vh', fontFamily: "'Inter', sans-serif" }} className="p-3 p-md-4 p-lg-5">
      <div className="w-100 mx-auto" style={{ maxWidth: '1100px' }}>
        
        <h2 className="mb-4" style={{ fontFamily: "'Georgia', serif", color: THEME.textPrimary, fontWeight: 'bold' }}>
          Uday's Dashboard
        </h2>

        {/* Stats Strip - Responsive 2x2 Grid on Mobile, Row on Desktop */}
        <div className="row g-3 mb-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="col-6 col-md-3">
              <div className="d-flex align-items-center gap-3 bg-white rounded-4 shadow-sm p-3 h-100">
                <stat.icon size={26} style={{ color: THEME.textPrimary, flexShrink: 0 }} strokeWidth={1.5} />
                <div className="d-flex flex-column overflow-hidden">
                  <small className="text-truncate" style={{ color: THEME.textSecondary, fontSize: '0.75rem', fontWeight: '600' }}>{stat.label}</small>
                  <span className="fw-bold text-truncate" style={{ color: THEME.textPrimary, fontSize: '0.9rem' }}>{stat.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Top Grid Row */}
        <div className="row g-4 mb-4">
          {/* Left Column (Activity & Streak) */}
          <div className="col-12 col-lg-5 d-flex flex-column gap-4">
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
              <div className="mt-auto">
                <div className="progress rounded-pill mb-2" style={{ height: '10px', backgroundColor: THEME.progressBg }}>
                  <div className="progress-bar rounded-pill" role="progressbar" style={{ width: '75%', backgroundColor: THEME.progressFill }}></div>
                </div>
                <div className="fw-semibold" style={{ color: THEME.textPrimary, fontSize: '0.85rem' }}>75% to Level 4</div>
              </div>
            </div>

            <div style={{ ...cardStyle, justifyContent: 'center' }}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <CalendarIcon size={24} style={{ color: THEME.textPrimary }} />
                <h5 className="fw-bold m-0" style={{ color: THEME.textPrimary }}>Check-In Streak</h5>
              </div>
              <div className="d-flex align-items-center gap-3 bg-light rounded px-3 py-2" style={{ border: `1px solid ${THEME.accent}` }}>
                <CalendarIcon size={20} style={{ color: THEME.textSecondary }} strokeDasharray="2 2" />
                <span className="fw-bold" style={{ color: THEME.textPrimary }}>7-Day Reading Streak</span>
              </div>
            </div>
          </div>

          {/* Right Column (Books List) */}
          <div className="col-12 col-lg-7">
            <div style={{ ...cardStyle, height: '100%' }}>
              
              {/* Header with Search and View Toggle (Responsive Layout Applied) */}
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 gap-3">
                <div className="d-flex align-items-center gap-3 flex-wrap">
                  <h5 className="fw-bold m-0" style={{ color: THEME.textPrimary }}>Your Books</h5>
                  
                  {/* View Toggle */}
                  <div className="d-flex bg-light rounded-pill p-1" style={{ border: `1px solid ${THEME.accent}` }}>
                    <button
                      className={`btn btn-sm rounded-pill border-0 px-3 ${viewMode === 'borrowed' ? 'fw-bold shadow-sm' : 'text-muted'}`}
                      style={{ backgroundColor: viewMode === 'borrowed' ? '#FFF' : 'transparent', fontSize: '0.8rem' }}
                      onClick={() => setViewMode('borrowed')}
                    >
                      Borrowed
                    </button>
                    <button
                      className={`btn btn-sm rounded-pill border-0 px-3 ${viewMode === 'all' ? 'fw-bold shadow-sm' : 'text-muted'}`}
                      style={{ backgroundColor: viewMode === 'all' ? '#FFF' : 'transparent', fontSize: '0.8rem' }}
                      onClick={() => setViewMode('all')}
                    >
                      All Books
                    </button>
                  </div>
                </div>

                <div className="d-flex align-items-center bg-light rounded-pill px-3 py-2 w-100" style={{ border: `1px solid ${THEME.accent}`, maxWidth: '250px' }}>
                  <Search size={14} style={{ color: THEME.textSecondary }} />
                  <input 
                    type="text" 
                    placeholder="Search books..." 
                    className="form-control border-0 shadow-none bg-transparent ms-2 p-0 w-100" 
                    style={{ fontSize: '0.85rem', color: THEME.textPrimary }}
                    value={borrowedSearch}
                    onChange={(e) => setBorrowedSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* Scrollable Book List */}
              <div className="d-flex flex-column gap-3 overflow-auto pe-2 custom-scrollbar" style={{ maxHeight: '320px' }}>
                {filteredBooks.length > 0 ? filteredBooks.map((book) => {
                  const isReturned = book.dueDate === 'Returned';
                  const dueString = isReturned ? 'Returned' : new Date(book.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                  
                  return (
                    <div key={book.id} className="d-flex align-items-center justify-content-between p-3 rounded flex-shrink-0" style={{ backgroundColor: isReturned ? '#F9F9F9' : '#FCFAEE', border: `1px solid ${THEME.accent}` }}>
                      <div className="d-flex align-items-center gap-3">
                        <img src={book.cover} alt={book.title} onError={handleImageError} className="flex-shrink-0" style={{ width: '45px', height: '65px', objectFit: 'cover', borderRadius: '4px', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)' }} />
                        <div>
                          <div className="fw-bold mb-1" style={{ color: THEME.textPrimary, fontSize: '0.95rem' }}>{book.title}</div>
                          <div style={{ color: THEME.textSecondary, fontSize: '0.8rem' }}>borrowed from '{book.source}'</div>
                          <div className={`fw-bold mt-1 ${isReturned ? 'text-success' : 'text-danger'}`} style={{ fontSize: '0.8rem' }}>
                            {isReturned ? 'Returned' : `- due: ${dueString}`}
                          </div>
                        </div>
                      </div>
                      
                      {!isReturned && (
                        <div className="text-center px-2">
                          <button className="btn p-0 border-0 d-flex flex-column align-items-center gap-1 bg-transparent">
                            <Key size={20} style={{ color: THEME.textPrimary }} />
                            <span style={{ fontSize: '0.7rem', color: THEME.textPrimary, fontWeight: '600' }}>Extend</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                }) : (
                  <div className="text-center text-muted py-5" style={{ fontSize: '0.9rem' }}>
                    <BookOpen size={40} className="mb-2 opacity-50 mx-auto"/>
                    <p>No books found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="row g-4">
          
          {/* Due Calendar */}
          <div className="col-12 col-lg-5">
            <div style={{ ...cardStyle, height: '100%', position: 'relative' }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold m-0" style={{ color: THEME.textPrimary }}>Due Calendar</h6>
                <div className="d-flex align-items-center gap-2">
                  <button onClick={handlePrevMonth} className="btn btn-sm border-0 p-1"><ChevronLeft size={18}/></button>
                  <span className="fw-bold text-uppercase" style={{ fontSize: '0.85rem', minWidth: '85px', textAlign: 'center' }}>
                    {calendarDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                  <button onClick={handleNextMonth} className="btn btn-sm border-0 p-1"><ChevronRight size={18}/></button>
                </div>
              </div>

              {/* Days Header */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', marginBottom: '8px' }}>
                {['S','M','T','W','T','F','S'].map((d, i) => (
                  <div key={i} style={{ fontSize: '0.75rem', fontWeight: 'bold', color: THEME.textSecondary }}>{d}</div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', position: 'relative' }}>
                {blanksArray.map((b) => <div key={`blank-${b}`} />)}
                
                {daysArray.map((day) => {
                  const dueBooks = getBooksDueOnDay(day);
                  const hasDue = dueBooks.length > 0;
                  
                  return (
                    <div 
                      key={day} 
                      onMouseEnter={() => hasDue ? setHoveredDay(day) : null}
                      onMouseLeave={() => setHoveredDay(null)}
                      className="d-flex align-items-center justify-content-center rounded position-relative"
                      style={{ 
                        height: '36px', 
                        fontSize: '0.85rem',
                        fontWeight: hasDue ? 'bold' : 'normal',
                        cursor: hasDue ? 'pointer' : 'default',
                        backgroundColor: hasDue ? THEME.danger : '#F9F9F9',
                        color: hasDue ? '#FFF' : THEME.textPrimary,
                        transition: 'transform 0.1s',
                        transform: hoveredDay === day ? 'scale(1.1)' : 'scale(1)'
                      }}
                    >
                      {day}

                      {/* Tooltip hovering ON the specific calendar day */}
                      {hoveredDay === day && hasDue && (
                        <div 
                          className="position-absolute p-2 rounded shadow bg-white border border-danger text-danger text-start" 
                          style={{ 
                            zIndex: 1000, 
                            bottom: '120%', 
                            left: '50%', 
                            transform: 'translateX(-50%)', 
                            width: 'max-content',
                            minWidth: '130px',
                            pointerEvents: 'none'
                          }}
                        >
                          <strong>Due on {hoveredDay}:</strong>
                          <ul className="mb-0 ps-3 mt-1" style={{ fontSize: '0.75rem' }}>
                            {dueBooks.map(b => <li key={b.id}>{b.title}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-auto pt-3 text-center" style={{ minHeight: '40px' }}>
                 <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                    Hover over a highlighted date to see due books.
                 </div>
              </div>

            </div>
          </div>

          {/* Waitlist (Responsive Layout Applied) */}
          <div className="col-12 col-lg-7">
            <div style={{ ...cardStyle, height: '100%' }}>
              
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 gap-3">
                <div className="d-flex align-items-center gap-2">
                  <Clock size={20} style={{ color: THEME.textPrimary }} />
                  <h5 className="fw-bold m-0" style={{ color: THEME.textPrimary }}>Waiting List</h5>
                </div>

                <div className="d-flex align-items-center bg-light rounded-pill px-3 py-2 w-100" style={{ border: `1px solid ${THEME.accent}`, maxWidth: '250px' }}>
                  <Search size={14} style={{ color: THEME.textSecondary }} />
                  <input 
                    type="text" 
                    placeholder="Search waitlist..." 
                    className="form-control border-0 shadow-none bg-transparent ms-2 p-0 w-100" 
                    style={{ fontSize: '0.85rem', color: THEME.textPrimary }}
                    value={waitlistSearch}
                    onChange={(e) => setWaitlistSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* Boxed Items Matching Borrowed Books */}
              <div className="d-flex flex-column gap-3 overflow-auto pe-2 custom-scrollbar" style={{ maxHeight: '250px' }}>
                {filteredWaitlist.length > 0 ? filteredWaitlist.map((book) => (
                  <div key={book.id} className="d-flex align-items-center justify-content-between p-3 rounded flex-shrink-0" style={{ backgroundColor: '#FCFAEE', border: `1px solid ${THEME.accent}` }}>
                    
                    <div className="d-flex align-items-center gap-3">
                      <img 
                        src={book.cover} 
                        alt={book.title} 
                        onError={handleImageError}
                        className="flex-shrink-0"
                        style={{ width: '45px', height: '65px', objectFit: 'cover', borderRadius: '4px', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)' }} 
                      />
                      <div>
                        <div className="fw-bold mb-1" style={{ color: THEME.textPrimary, fontSize: '0.95rem' }}>{book.title}</div>
                        <div style={{ color: THEME.textSecondary, fontSize: '0.8rem' }}>
                          Position: <span className="fw-bold" style={{ color: THEME.textPrimary }}>#{book.position}</span>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                )) : (
                  <div className="text-center text-muted py-5" style={{ fontSize: '0.9rem' }}>
                    <p>No books on your waiting list.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}