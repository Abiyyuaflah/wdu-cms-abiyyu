export default function HomePage() {
  return (
    <div>
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Wahana Data Utama</h1>
          <p className="text-xl">Solusi data dan teknologi untuk bisnis Anda</p>
        </div>
      </section>
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Layanan Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Data Analytics</h3>
            <p>Analisis data untuk pengambilan keputusan yang lebih baik.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Software Development</h3>
            <p>Pengembangan aplikasi custom sesuai kebutuhan bisnis.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">IT Consulting</h3>
            <p>Konsultasi strategis untuk transformasi digital.</p>
          </div>
        </div>
      </section>
    </div>
  );
}