import { Outlet, Link } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">WDU</Link>
          <div className="space-x-6">
            <Link to="/" className="hover:text-blue-600">Beranda</Link>
            <Link to="/tentang-kami" className="hover:text-blue-600">Tentang Kami</Link>
            <Link to="/layanan" className="hover:text-blue-600">Layanan</Link>
            <Link to="/pengalaman" className="hover:text-blue-600">Pengalaman</Link>
            <Link to="/kontak" className="hover:text-blue-600">Kontak</Link>
          </div>
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2026 Wahana Data Utama. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}