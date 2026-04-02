// src/App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import MyLibrary from './pages/MyLibrary'; 
import Profile from './pages/Profile';
import WishList from './pages/WishList';
import BookBag from './pages/BookBag';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/my-library" element={<MyLibrary />} /> 
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/cart" element={<BookBag />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;