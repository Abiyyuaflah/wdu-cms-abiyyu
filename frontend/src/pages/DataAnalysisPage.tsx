import { Link } from 'react-router-dom';

const DataAnalysisDetail = () => {
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
        
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Analisis Data
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Ubah data mentah menjadi wawasan berharga yang dapat menggerakkan keputusan bisnis Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">📈</span> Pemodelan Statistik
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong className="text-gray-800">Regresi & Korelasi:</strong> Mengidentifikasi hubungan antar variabel bisnis.</li>
              <li><strong className="text-gray-800">Time Series Analysis:</strong> Prediksi tren berdasarkan data historis.</li>
              <li><strong className="text-gray-800">Cluster Analysis:</strong> Segmentasi pelanggan berdasarkan karakteristik.</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">🔍</span> Data Cleansing
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong className="text-gray-800">Validasi Data:</strong> Memastikan akurasi dan konsistensi data.</li>
              <li><strong className="text-gray-800">Missing Value Handling:</strong> Strategi penanganan data kosong.</li>
              <li><strong className="text-gray-800">Outlier Detection:</strong> Identifikasi data anomali yang perlu perhatian.</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">📊</span> Visualisasi Data
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong className="text-gray-800">Interactive Dashboards:</strong> Pemahaman data secara real-time.</li>
              <li><strong className="text-gray-800">Storytelling with Data:</strong> Komunikasi insight secara efektif.</li>
              <li><strong className="text-gray-800">Automated Reporting:</strong> Laporan berkala tanpa upaya manual.</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-orange-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">🧠</span> Machine Learning
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong className="text-gray-800">Predictive Analytics:</strong> Forecast kebutuhan dan penjualan.</li>
              <li><strong className="text-gray-800">Classification:</strong> Prediksi kategori atau risiko.</li>
              <li><strong className="text-gray-800">Recommendation System:</strong> Personalisasi pengalaman pelanggan.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-blue-900 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Mulai Transformasi Data Anda
          </h2>
          <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
            Konsultasikan kebutuhan analisis data Anda dengan tim ahli kami.
          </p>
          <Link to="/kontak" className="inline-block bg-white text-blue-900 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
            Hubungi Kami
          </Link>
        </div>

      </div>
    </div>
  );
};

export default DataAnalysisDetail;