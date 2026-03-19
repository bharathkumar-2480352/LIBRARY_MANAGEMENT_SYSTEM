// src/components/Sidebar.jsx
import { Home as HomeIcon, BookOpen, Heart, ShoppingCart, User, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import useStore from '../store/useStore';
import { COLORS } from '../utils/theme';
import { useNavigate } from "react-router-dom";


export default function Sidebar({ onOpenCart, isOpen, onClose }) {
  const { activeBorrows, getCartTotal } = useStore();
  const totalCartItems = getCartTotal();

  const getNavLinkStyle = ({ isActive }) => ({
    backgroundColor: isActive ? COLORS.activeBg : 'transparent',
    color: isActive ? COLORS.textPrimary : COLORS.textSecondary,
    fontWeight: isActive ? '600' : '500',
    textDecoration: 'none'
  });

  return (
    <aside 
      className={`d-flex flex-column justify-content-between py-4 px-3 sidebar-wrapper ${isOpen ? 'open' : ''}`} 
      style={{ 
        width: '250px', 
        backgroundColor: COLORS.sidebarBg, 
        position: 'fixed', 
        height: '100vh', 
        borderRight: `1px dashed ${COLORS.activeBg}`, 
        zIndex: 1050,
        top: 0,
        left: 0,
        transition: 'transform 0.3s ease-in-out'
      }}
    >
      <div>
        <div className="d-flex align-items-center justify-content-between px-2 mb-5 mt-2">
          <div className="d-flex align-items-center gap-2">
            <img src="/ReadMonkey-icon.png" alt="ReadMonkey Logo" style={{ width: '42px', height: '42px', objectFit: 'contain' }} />
            <h4 className="mb-0 fw-bold" style={{ color: COLORS.textPrimary, letterSpacing: '-0.5px' }}>ReadMonkey</h4>
          </div>
          {/* Mobile Close Button */}
          <button onClick={onClose} className="btn d-lg-none p-0 border-0" style={{ color: COLORS.textPrimary }}>
            <X size={24} />
          </button>
        </div>
        
        <nav className="d-flex flex-column gap-2">
          <NavLink to="/" onClick={onClose} className="btn text-start d-flex align-items-center gap-3 border-0 py-2 px-3 rounded-pill" style={getNavLinkStyle}>
            <HomeIcon size={22} /> Library Home
          </NavLink>
          
          <NavLink to="/my-library" onClick={onClose} className="btn text-start d-flex align-items-center gap-3 border-0 py-2 px-3 rounded-pill" style={getNavLinkStyle}>
            <BookOpen size={22} /> My library
          </NavLink>
          
          <button onClick={onClose} className="btn text-start d-flex align-items-center gap-3 border-0 py-2 px-3 rounded-pill" style={{ color: COLORS.textSecondary, fontWeight: '500' }}>
            <Heart size={22} /> Wishlist
          </button>
          
          <button onClick={() => { onClose(); onOpenCart(); }} className="btn text-start d-flex align-items-center gap-3 border-0 py-2 px-3 rounded-pill position-relative" style={{ color: COLORS.textSecondary, fontWeight: '500' }}>
            <ShoppingCart size={22} /> Book Bag
            {totalCartItems > 0 && <span className="position-absolute end-0 me-3 badge rounded-pill" style={{ backgroundColor: COLORS.textPrimary, color: COLORS.white }}>{totalCartItems}</span>}
          </button>
        </nav>
      </div>

      <div onClick={() => navigate('/profile')} className="p-3 mt-auto rounded-3 d-flex align-items-center gap-3 cursor-pointer" style={{ backgroundColor: COLORS.white,cursor: 'pointer', boxShadow: `0 2px 10px ${COLORS.shelfShadow}` }}>
        <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: COLORS.activeBg, color: COLORS.textPrimary }}><User size={20} /></div>
        <div style={{ flex: 1 }}>
          <h6 className="mb-0" style={{ color: COLORS.textPrimary, fontSize: '0.9rem', fontWeight: '600' }}>Uday Gandhi</h6>
          <small style={{ color: COLORS.textSecondary, fontSize: '0.75rem' }}>{activeBorrows}/6 Borrowed</small>
        </div>
      </div>
    </aside>
  );
}