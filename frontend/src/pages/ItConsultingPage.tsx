import { Link } from 'react-router-dom';

const ItConsultingDetail = () => {
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
            Konsultasi IT
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
           Transformasi digital yang tepat untuk mempercepat pertumbuhan bisnis Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">🏗️</span> Integrasi Sistem
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong className="text-gray-800">System Architecture:</strong> Desain infrastruktur IT yang scalable.</li>
              <li><strong className="text-gray-800">API Integration:</strong> Koneksi antar aplikasi dan layanan.</li>
              <li><strong className="text-gray-800">Cloud Migration:</strong> Pemindahan sistem ke platform cloud.</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">🔐</span> Keamanan Siber
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong className="text-gray-800">Security Audit:</strong> Evaluasi kerentanan sistem.</li>
              <li><strong className="text-gray-800">Penetration Testing:</strong> Simulasi serangan untuk evaluasi.</li>
              <li><strong className="text-gray-800">Incident Response:</strong> Prosedur penanganan keamanan.</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">⚙️</span> Pengembangan Software
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong className="text-gray-800">Custom Application:</strong> Pembuatan software sesuai kebutuhan.</li>
              <li><strong className="text-gray-800">Mobile App:</strong> Pengembangan aplikasi mobile.</li>
              <li><strong className="text-gray-800">Web Development:</strong> Pembuatan website dan web app.</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-orange-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">📊</span> IT Consulting
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong className="text-gray-800">IT Strategy:</strong> Perencanaan teknologi jangka panjang.</li>
              <li><strong className="text-gray-800">Digital Transformation:</strong> panduan perubahan digital.</li>
              <li><strong className="text-gray-800">Vendor Selection:</strong> Pemilihan solusi teknologi tepat.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-blue-900 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Wujudkan Transformasi Digital
          </h2>
          <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
            konsultasikan kebutuhan IT Anda dengan tim ahli kami.
          </p>
          <Link to="/kontak" className="inline-block bg-white text-blue-900 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
            Hubungi Kami
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ItConsultingDetail;