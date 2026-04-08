import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function AdminLayout() {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">WDU Admin</h1>
          <div className="space-x-4">
            <a href="/admin" className="hover:text-blue-600">Dashboard</a>
            <a href="/admin/pages" className="hover:text-blue-600">Pages</a>
            <a href="/admin/services" className="hover:text-blue-600">Services</a>
            <a href="/admin/projects" className="hover:text-blue-600">Projects</a>
            <a href="/admin/contact" className="hover:text-blue-600">Contact</a>
          </div>
        </div>
      </div>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}