import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      title: "Alamat Kantor",
      icon: "location_on",
      content: "Blok AE No. 01, Jl. Terapi Raya, RT 03/19, Menteng. Kec. Bogor Barat, Kota Bogor, Jawa Barat 1611",
      color: "bg-blue-500/20 text-blue-400"
    },
    {
      title: "Email Resmi",
      icon: "alternate_email",
      content: "wahanadata@yahoo.com\nit.support@wahanadata.co.id",
      color: "bg-primary/20 text-primary"
    },
    {
      title: "Layanan Telepon",
      icon: "headset_mic",
      content: "(0251) 7564 109\n+62 812 8740 8806",
      color: "bg-orange-500/20 text-orange-400"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  return (
    <section className="relative pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Left: Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div variants={itemVariants} className="space-y-4 mb-12">
              <h2 className="text-6xl font-black text-slate-900 leading-tight">
                Hubungi <span className="text-primary italic">Kami</span>
              </h2>
              <p className="text-slate-500 text-lg font-light leading-relaxed">
                Dapatkan segala informasi dengan menghubungi kami!
              </p>
            </motion.div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="p-8 bg-white/70 backdrop-blur-xl border border-white rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 ${info.color} rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                      <span className="material-symbols-outlined text-3xl">{info.icon}</span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">{info.title}</h3>
                      <p className="text-lg font-bold text-slate-900 whitespace-pre-line leading-snug">{info.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Glass Form */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 bg-white p-10 md:p-14 rounded-[60px] shadow-2xl border border-white relative overflow-hidden"
          >
            <div className="relative space-y-10">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    className="text-center py-16"
                  >
                    <div className="w-24 h-24 mx-auto mb-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-6xl text-primary">check_circle</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4">Pesan Terkirim!</h3>
                    <p className="text-slate-500 text-lg mb-8 max-w-md mx-auto">Terima kasih sudah menghubungi kami. Tim kami akan menghubungi Anda segera.</p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-widest rounded-3xl hover:bg-primary transition-all duration-500 flex items-center justify-center gap-3 mx-auto"
                    >
                      <span className="material-symbols-outlined">send</span>
                      Kirim Pesan Baru
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div className="space-y-2 mb-8">
                      <span className="text-primary font-bold text-xs uppercase tracking-[0.4em]">Send Message</span>
                      <h3 className="text-2xl font-black text-slate-900">Kami siap membahas kebutuhan Anda.</h3>
                    </div>

                    <form className="space-y-8" onSubmit={async (e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const data = {
                        name: formData.get('name'),
                        email: formData.get('email'),
                        phone: formData.get('phone'),
                        subject: formData.get('subject'),
                        message: formData.get('message'),
                      };

                      const button = e.currentTarget.querySelector('button');
                      if (button) {
                        button.disabled = true;
                        button.innerText = 'Mengirim...';
                      }

                      try {
                        const res = await fetch('/api/v1/contact', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(data),
                        });
                        if (res.ok) {
                          setIsSubmitted(true);
                        } else {
                          alert('Gagal mengirim pesan. Silakan coba lagi.');
                        }
                      } catch (err) {
                        console.error(err);
                        alert('Terjadi kesalahan koneksi.');
                      } finally {
                        if (button) {
                          button.disabled = false;
                          button.innerHTML = 'Kirim Pesan Sekarang <span class="material-symbols-outlined">send</span>';
                        }
                      }
                    }}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                          <input name="name" type="text" required placeholder="Ex: John Doe" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl outline-none transition-all font-medium text-slate-900" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                          <input name="email" type="email" required placeholder="john@example.com" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl outline-none transition-all font-medium text-slate-900" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Your Message</label>
                        <textarea name="message" required rows={4} placeholder="Write your inquiry here..." className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl outline-none transition-all font-medium text-slate-900 resize-none" />
                      </div>
                      <button type="submit" className="w-full py-5 bg-slate-900 text-white font-black uppercase tracking-widest rounded-3xl hover:bg-primary transition-all duration-500 flex items-center justify-center gap-3">
                        Kirim Pesan Sekarang
                        <span className="material-symbols-outlined">send</span>
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
