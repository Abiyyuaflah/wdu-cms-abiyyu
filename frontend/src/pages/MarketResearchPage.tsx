import { Link } from 'react-router-dom';

const MarketResearchDetail = () => {
  return (
    <div className="bg-white min-h-screen">
      <Link
        to="/layanan#layanan"
        className="fixed top-24 left-6 z-50 flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all text-slate-700 font-bold"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        Kembali
      </Link>

      <div className="max-w-4xl mx-auto space-y-12 pt-20 px-6">

        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Riset Pasar
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Jelajahi insight mendalam dari riset pasar kami untuk membantu bisnis Anda mengidentifikasi peluang baru dan tetap berada selangkah di depan kompetitor.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Card 1: Identifikasi Peluang */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">💡</span> Identifikasi Peluang Baru
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong className="text-gray-800">Hyper-Localization:</strong> Fokus pada produk yang relevan dengan budaya dan kebutuhan lokal spesifik.</li>
              <li><strong className="text-gray-800">Circular Economy:</strong> Model bisnis berkelanjutan (reuse/recycle) untuk menarik Gen Z & Millennial.</li>
              <li><strong className="text-gray-800">AI-Enhanced Service:</strong> Integrasi AI dalam layanan pelanggan untuk retensi yang lebih tinggi.</li>
            </ul>
          </div>

          {/* Card 2: Sentimen Konsumen */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">👥</span> Analisis Sentimen Konsumen
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong className="text-gray-800">Pergeseran Nilai:</strong> Prioritas konsumen bergeser ke transparansi dan nilai etis, bukan hanya harga murah.</li>
              <li><strong className="text-gray-800">Fokus pada Pain Points:</strong> Menghilangkan hambatan transaksi seperti proses checkout yang rumit dan biaya tersembunyi.</li>
            </ul>
          </div>

          {/* Card 3: Strategi Kompetitif */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">🚀</span> Strategi Kompetitif (Stay Ahead)
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong className="text-gray-800">Data-Driven Decision:</strong> Keputusan berbasis data real-time, bukan sekadar intuisi.</li>
              <li><strong className="text-gray-800">Peta Kompetitor:</strong> Pantau celah dari kompetitor sebagai peluang emas bisnis Anda.</li>
              <li><strong className="text-gray-800">Prediksi Permintaan:</strong> Antisipasi lonjakan permintaan musiman dengan akurasi tinggi.</li>
            </ul>
          </div>

          {/* Card 4: Metodologi */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-orange-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">📊</span> Metodologi Kami
            </h3>
            <ul className="space-y-3 text-gray-600 list-decimal list-inside">
              <li><strong>Pengumpulan Data:</strong> Agregasi dari media sosial, marketplace, dan ekonomi makro.</li>
              <li><strong>Validasi Data:</strong> Penyaringan ketat untuk memastikan data bersih dari bot dan noise pasar.</li>
              <li><strong>Insight Strategis:</strong> Mengubah raw data menjadi langkah nyata yang siap dieksekusi.</li>
            </ul>
          </div>

        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-blue-900 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Siap mendominasi pasar Anda?
          </h2>
          <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
            Dapatkan laporan riset yang disesuaikan secara khusus untuk industri dan model bisnis Anda.
          </p>
          <Link to="/kontak" className="inline-block bg-white text-blue-900 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
            Hubungi Kami
          </Link>
        </div>

      </div>
    </div>
  );
};

export default MarketResearchDetail;