import { Link } from 'react-router-dom';

const SurveyPage = () => {
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
            Survei
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Pengumpulan data primer yang reliabel untuk memahami perilaku konsumen dan tren publik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">📝</span> Survei Online
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong className="text-gray-800">Kuesioner Digital:</strong> Desain kuesioner online profesional.</li>
              <li><strong className="text-gray-800">Panel Survey:</strong> Akses ke responden terverifikasi.</li>
              <li><strong className="text-gray-800">Data Collection:</strong> Pengumpulan data efisien.</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">🏠</span> Survei Tatap Muka
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong className="text-gray-800">Interview:</strong> Wawancara langsung dengan responden.</li>
              <li><strong className="text-gray-800">Home Visit:</strong> Kunjungan ke rumah responden.</li>
              <li><strong className="text-gray-800">Mall Intercept:</strong> Survey di lokasi strategis.</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">📞</span> Survei Telepon
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong className="text-gray-800">CATI:</strong> Computer Assisted Telephone Interview.</li>
              <li><strong className="text-gray-800">Phone Survey:</strong> Survey melalui telepon.</li>
              <li><strong className="text-gray-800">IVR:</strong> Interactive Voice Response.</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-orange-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">🔬</span> Riset Kualitatif
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong className="text-gray-800">FGD:</strong> Focus Group Discussion.</li>
              <li><strong className="text-gray-800">In-depth Interview:</strong> Wawancara mendalam.</li>
              <li><strong className="text-gray-800">Observasi:</strong> Pengamatan langsung di lapangan.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-blue-900 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Dapatkan Data Akurat untuk Keputusan Anda
          </h2>
          <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
            Konsultasikan kebutuhan survei Anda dengan tim profesional kami.
          </p>
          <Link to="/kontak" className="inline-block bg-white text-blue-900 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
            Hubungi Kami
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;