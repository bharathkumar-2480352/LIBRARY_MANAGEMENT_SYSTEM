// src/App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
// import MyLibrary from './pages/MyLibrary'; // You will create this later!

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Everything inside this Layout route gets the Sidebar automatically! */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/my-library" element={<MyLibrary />} /> */}
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;