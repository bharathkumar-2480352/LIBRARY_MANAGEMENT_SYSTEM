// src/App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import MyLibrary from './pages/MyLibrary'; 
import Profile from './pages/Profile';
import WishList from './pages/WishList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        
        {/* Everything inside this Layout route gets the Sidebar automatically! */}
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/my-library" element={<MyLibrary />} /> 
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/wishlist" element={<WishList />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;