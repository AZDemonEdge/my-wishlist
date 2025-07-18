import logo from './logo.svg';
import './App.css';
import Auth from './Component/Auth/Auth';
import Wishlist from './Component/Wishlist/Wishlist';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/wishes" element={<Wishlist />} />
      </Routes>
    </Router>
  );
}

export default App;
