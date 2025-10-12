import './App.css';
import Auth from './Component/Auth/Auth';
import Wishlist from './Component/Wishlist/Wishlist';
import AdminPanel from './Component/AdminPanel/AdminPanel';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/wishes" element={<Wishlist />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
