import { Link } from 'react-router-dom';

const DataResearchDetail = () => {
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
            Riset Data
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Eksplorasi data mendalam untuk mendukung keputusan bisnis yang didasarkan pada fakta otentik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">🔬</span> Riset Primer
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong className="text-gray-800">Survei Online:</strong> Pengumpulan data melalui kuesioner digital.</li>
              <li><strong className="text-gray-800">Focus Group Discussion:</strong> Diskusi mendalam dengan responden.</li>
              <li><strong className="text-gray-800">In-depth Interview:</strong> Wawancara mendalam dengan informan kunci.</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">📚</span> Riset Sekunder
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong className="text-gray-800">Desk Research:</strong> Kajian dari literature dan laporan.</li>
              <li><strong className="text-gray-800">Market Analysis:</strong> Analisis kondisi pasar dari data tersedia.</li>
              <li><strong className="text-gray-800">Competitor Intelligence:</strong> Pengumpulan info kompetitor.</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">📋</span> Riset Kuantitatif
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong className="text-gray-800">Sampling Technique:</strong> Metode pemilihan sampel representative.</li>
              <li><strong className="text-gray-800">Questionnaire Design:</strong> Desain kuesioner terstruktur.</li>
              <li><strong className="text-gray-800">Statistical Analysis:</strong> Analisis statistik dengan software.</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-orange-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">💬</span> Riset Kualitatif
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong className="text-gray-800">Thematic Analysis:</strong> Identifikasi pola makna.</li>
              <li><strong className="text-gray-800">Content Analysis:</strong> Analisis konten dokumen.</li>
              <li><strong className="text-gray-800">Case Study:</strong> Studi kasus mendalam.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-blue-900 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ambil Keputusan Berbasis Bukti
          </h2>
          <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
            Dapatkan insight akurat dari riset data kami.
          </p>
          <Link to="/kontak" className="inline-block bg-white text-blue-900 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
            Hubungi Kami
          </Link>
        </div>

      </div>
    </div>
  );
};

export default DataResearchDetail;