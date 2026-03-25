// src/components/Layout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, ShoppingCart } from 'lucide-react';
import Sidebar from './Sidebar';
import CartModal from './CartModal';
import { COLORS } from '../utils/theme';
import useStore from '../store/useStore';

export default function Layout() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { getCartTotal } = useStore();
  const totalCartItems = getCartTotal();

  // Injecting Responsive CSS
  const responsiveCSS = `
    .hide-scrollbar::-webkit-scrollbar { display: none; }
    
    @media (max-width: 991.98px) {
      .sidebar-wrapper {
        transform: translateX(-100%);
      }
      .sidebar-wrapper.open {
        transform: translateX(0);
      }
      .main-content-wrapper {
        margin-left: 0 !important;
        width: 100vw !important;
      }
    }
  `;

  return (
    <div className="d-flex flex-column flex-lg-row" style={{ backgroundColor: COLORS.mainBg, minHeight: '100vh', fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>
      <style>{responsiveCSS}</style>
      <div className="d-lg-none d-flex justify-content-between align-items-center p-3 shadow-sm bg-white sticky-top">
        <div className="d-flex align-items-center gap-3">
          <button onClick={() => setIsSidebarOpen(true)} className="btn p-0 border-0" style={{ color: COLORS.textPrimary }}>
            <Menu size={28} />
          </button>
          <div className="d-flex align-items-center gap-2">
            <img src="/ReadMonkey-icon.png" alt="ReadMonkey Logo" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
            <h5 className="mb-0 fw-bold" style={{ color: COLORS.textPrimary, letterSpacing: '-0.5px' }}>ReadMonkey</h5>
          </div>
        </div>
        <div className="position-relative" onClick={() => setIsCartOpen(true)} style={{ cursor: 'pointer' }}>
          <ShoppingCart size={24} style={{ color: COLORS.textPrimary }} />
          {totalCartItems > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" style={{ backgroundColor: COLORS.textPrimary, color: COLORS.white }}>{totalCartItems}</span>}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="d-lg-none position-fixed top-0 start-0 w-100 h-100" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040 }} 
        />
      )}

      {/* Persistent Sidebar */}
      <Sidebar 
        onOpenCart={() => setIsCartOpen(true)} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Dynamic Page Content Area */}
      <main className="main-content-wrapper flex-grow-1" style={{ marginLeft: '250px', width: 'calc(100vw - 250px)', overflowX: 'hidden' }}>
        <Outlet />
      </main>

      {/* Persistent Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}