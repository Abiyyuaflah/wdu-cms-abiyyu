interface Testimonial {
  id: number;
  quote: string;
  authorName: string;
  authorRole: string;
  rating: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="py-32 bg-accent-dark overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-primary font-black tracking-[0.4em] uppercase text-[10px] mb-6">Partnership Echoes</h2>
          <h3 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter">Voices of Transformation.</h3>
        </div>

        <div className="relative max-w-5xl mx-auto h-[500px] mt-10">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`absolute transition-all duration-500 hover:-translate-y-4 ${
                index === 0
                  ? 'top-0 left-0 w-full md:w-[450px] bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-[2.5rem] z-10'
                  : index === 1
                  ? 'top-20 right-0 w-full md:w-[450px] bg-white p-12 rounded-[2.5rem] shadow-2xl z-20'
                  : 'bottom-0 left-1/4 w-full md:w-[400px] bg-primary p-10 rounded-[2.5rem] shadow-2xl hidden md:block z-30'
              }`}
            >
              <div className="flex gap-1 text-primary mb-8">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined fill-current">star</span>
                ))}
              </div>
              <p className={`italic mb-10 leading-relaxed ${index === 1 ? 'text-xl text-accent-dark font-extrabold' : 'text-lg text-white font-medium'}`}>
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${index === 1 ? 'bg-primary/10 text-primary' : 'bg-slate-800 text-primary'}`}>
                  {testimonial.authorName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className={`font-bold text-sm ${index === 1 ? 'text-accent-dark' : 'text-white'}`}>
                    {testimonial.authorName}
                  </p>
                  <p className={`text-[10px] uppercase font-black tracking-widest ${index === 1 ? 'text-slate-400' : 'text-primary'}`}>
                    {testimonial.authorRole}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
