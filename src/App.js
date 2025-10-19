import './App.css';
import Auth from './Component/Auth/Auth';
import Wishlist from './Component/Wishlist/Wishlist';
import AdminPanel from './Component/AdminPanel/AdminPanel';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ExclusivityList from './Component/ExclusivityList/ExclusivityList';
import ExclusivitiesAdminPanel from './Component/ExclusivitiesAdminPanel/ExclusivitiesAdminPanel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/wishes" element={<Wishlist />} />
        <Route path="/exclusivities" element={<ExclusivityList />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/exclusivities" element={<ExclusivitiesAdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
