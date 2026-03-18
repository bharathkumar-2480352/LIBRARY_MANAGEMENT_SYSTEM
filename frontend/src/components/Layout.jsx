// src/components/Layout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import CartModal from './CartModal';
import { COLORS } from '../utils/theme';

export default function Layout() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="d-flex" style={{ backgroundColor: COLORS.mainBg, minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
      
      {/* Persistent Sidebar */}
      <Sidebar onOpenCart={() => setIsCartOpen(true)} />

      {/* Dynamic Page Content Area */}
      <main className="flex-grow-1" style={{ marginLeft: '250px', width: 'calc(100vw - 250px)', overflowX: 'hidden' }}>
        {/* The <Outlet /> is where Home.jsx, MyLibrary.jsx, etc. will actually render */}
        <Outlet />
      </main>

      {/* Persistent Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}