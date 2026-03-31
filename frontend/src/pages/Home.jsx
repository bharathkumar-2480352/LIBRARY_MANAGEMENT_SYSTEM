// src/pages/Home.jsx
import useStore from '../store/useStore';
import MemberHome from './MemberHome';
import LibrarianHome from './LibrarianHome';

export default function Home() {
  const { user } = useStore();

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h4 style={{ color: '#9C8C7D' }}>Please log in to access the library.</h4>
      </div>
    );
  }

  // The Dispatcher Logic
  if (user.role === 'librarian') {
    return <LibrarianHome />;
  }

  // Default fallback
  return <MemberHome />;
}