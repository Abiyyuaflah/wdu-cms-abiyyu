import { Routes, Route } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import HomePage from './pages/HomePage';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './components/AdminLayout';

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<div className="p-8">Dashboard</div>} />
      </Route>
    </Routes>
  );
}

export default App;