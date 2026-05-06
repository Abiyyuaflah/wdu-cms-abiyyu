import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import PageTransition from './PageTransition';
import BackToTop from './BackToTop';
import WhatsAppButton from './WhatsAppButton';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-body">
      <Navbar />
      
      <main className="flex-1 w-full">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>

      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </div>
  );
}