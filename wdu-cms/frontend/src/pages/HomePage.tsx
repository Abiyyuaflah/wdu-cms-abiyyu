import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import TrustClients from '../components/TrustClients';
import Gallery from '../components/Gallery';

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Services />
      <About />
      <TrustClients />
      <Gallery />
    </div>
  );
}