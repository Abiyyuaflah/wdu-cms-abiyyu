import { motion } from 'framer-motion';

interface Section {
  id: string;
  type: string;
  content: any;
}

interface DynamicSectionsProps {
  sections: Section[];
}

export default function DynamicSections({ sections }: DynamicSectionsProps) {
  if (!sections || sections.length === 0) return null;

  return (
    <>
      {sections.map((section, index) => {
        return (
          <section key={section.id || index} className="py-20 relative overflow-hidden">
            {section.type === 'text' && (
              <div className="max-w-4xl mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`text-${section.content.align || 'left'}`}
                >
                  <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">
                    {section.content.title}
                  </h2>
                  <div className="prose prose-lg text-gray-600 leading-relaxed whitespace-pre-line">
                    {section.content.body}
                  </div>
                </motion.div>
              </div>
            )}

            {section.type === 'hero_mini' && (
              <div className="max-w-7xl mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-gray-900 to-slate-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full"></div>
                  <div className="relative z-10">
                    <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary rounded-full text-xs font-black uppercase tracking-widest mb-6">
                      {section.content.badge}
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                      {section.content.title}
                    </h2>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                      {section.content.subtitle}
                    </p>
                  </div>
                </motion.div>
              </div>
            )}

            {section.type === 'cta' && (
              <div className="max-w-5xl mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-primary rounded-[2.5rem] p-12 text-center text-white shadow-2xl shadow-primary/20"
                >
                  <h2 className="text-3xl md:text-4xl font-black mb-8">
                    {section.content.title}
                  </h2>
                  <a 
                    href={section.content.link}
                    className="inline-block bg-white text-primary px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
                  >
                    {section.content.buttonText}
                  </a>
                </motion.div>
              </div>
            )}

            {section.type === 'quote' && (
              <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <span className="text-6xl text-primary/20 font-serif block mb-4">"</span>
                  <blockquote className="text-2xl md:text-3xl font-bold text-gray-800 italic mb-8 leading-relaxed">
                    {section.content.text}
                  </blockquote>
                  <div>
                    <h4 className="font-black text-gray-900 uppercase tracking-widest text-sm">
                      {section.content.author}
                    </h4>
                    <p className="text-[#6ab149] text-xs font-bold uppercase mt-1">
                      {section.content.role}
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </section>
        );
      })}
    </>
  );
}
