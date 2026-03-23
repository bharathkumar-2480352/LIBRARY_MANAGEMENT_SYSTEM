
// src/App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Wrapping everything in Layout so the Sidebar is ALWAYS there */}
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          
          {/* Default redirect to login if not authenticated */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;