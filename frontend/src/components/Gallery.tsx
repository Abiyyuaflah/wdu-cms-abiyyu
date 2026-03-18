interface GalleryItem {
  id: number;
  title: string;
  imageUrl: string;
}

interface GalleryProps {
  items: GalleryItem[];
}

export default function Gallery({ items }: GalleryProps) {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-primary font-black tracking-[0.4em] uppercase text-[10px] mb-6">Our Work</h2>
          <h3 className="text-4xl md:text-6xl font-extrabold text-accent-dark tracking-tighter">
            Portfolio Gallery
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-3xl aspect-[4/3] hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <p className="text-white font-bold text-lg">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
