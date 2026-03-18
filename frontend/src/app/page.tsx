import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const defaultServices = [
  {
    id: 1,
    title: 'Neural Research',
    description: 'AI-driven consumer behavioral analysis that maps psychological drivers and market shifts before they happen.',
    icon: 'query_stats',
    link: 'System Architecture',
  },
  {
    id: 2,
    title: 'Velocity Insights',
    description: 'Real-time data streaming and visualization engines that convert high-velocity data points into surgical actions.',
    icon: 'dynamic_feed',
    link: 'Actionable Intelligence',
  },
  {
    id: 3,
    title: 'Core Infrastructure',
    description: 'Building robust, infinitely scalable IT backbones designed to withstand the data demands of the next decade.',
    icon: 'cloud_sync',
    link: 'View Engineering',
  },
];

const defaultGallery = [
  { id: 1, title: 'Project Alpha', imageUrl: 'https://picsum.photos/800/600?random=1' },
  { id: 2, title: 'Project Beta', imageUrl: 'https://picsum.photos/800/600?random=2' },
  { id: 3, title: 'Project Gamma', imageUrl: 'https://picsum.photos/800/600?random=3' },
  { id: 4, title: 'Project Delta', imageUrl: 'https://picsum.photos/800/600?random=4' },
  { id: 5, title: 'Project Epsilon', imageUrl: 'https://picsum.photos/800/600?random=5' },
  { id: 6, title: 'Project Zeta', imageUrl: 'https://picsum.photos/800/600?random=6' },
];

const defaultTestimonials = [
  {
    id: 1,
    quote: 'Wahana Data Utama redefined how we approach national statistics. Their precision is unparalleled in the industry.',
    authorName: 'Bambang Kusuma',
    authorRole: 'Director, Ministry of Finance',
    rating: 5,
  },
  {
    id: 2,
    quote: "They don't just deliver reports; they deliver roadmaps to the future. Our growth spiked 40% after implementing their insights.",
    authorName: 'Amanda Suherman',
    authorRole: 'CEO, DigiFlow Asia',
    rating: 5,
  },
  {
    id: 3,
    quote: 'True technological partners.',
    authorName: 'Digital Strategist',
    authorRole: 'Bank Central',
    rating: 5,
  },
];

export default function Home() {
  return (
    <main className="bg-background-light text-slate-700 overflow-x-hidden antialiased selection:bg-primary/30">
      <Navbar />
      <Hero />
      <Services services={defaultServices} />
      <Gallery items={defaultGallery} />
      <About />
      <Testimonials testimonials={defaultTestimonials} />
      
      <section className="py-24 border-y border-slate-100 bg-slate-50/80">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-slate-400 text-[9px] font-black uppercase tracking-[0.5em] mb-16">Global Standard Partnerships</p>
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-28 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 md:h-12 w-auto">
                <img alt={`Partner ${i}`} className="max-h-full" src={`https://via.placeholder.com/150x50?text=Partner+${i}`} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
