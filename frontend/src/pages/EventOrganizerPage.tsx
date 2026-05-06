import { Link } from 'react-router-dom';

const EventOrganizerPage = () => {
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
            Event Organizer
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Manajemen acara profesional dengan pendekatan berbasis data untuk hasil yang maksimal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span> Perencanaan Event
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong className="text-gray-800">Konsep & Tema:</strong> Pembentukan tema acara yang sesuai target.</li>
              <li><strong className="text-gray-800">Timeline:</strong> Penjadwalan detail semua kegiatan.</li>
              <li><strong className="text-gray-800"> budgeting:</strong> Perencanaan anggaran optimal.</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">🎪</span> Eksekusi Event
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong className="text-gray-800">Venue Management:</strong> Pemilihan & persiapan lokasi.</li>
              <li><strong className="text-gray-800">Vendor Coordination:</strong> Koordinasi denganvendor.</li>
              <li><strong className="text-gray-800">Event Day:</strong> Pengelolaan hari pelaksanaan.</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">📣</span> Publikasi & Promosi
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong className="text-gray-800">Social Media:</strong> Promosi melalui platform digital.</li>
              <li><strong className="text-gray-800">Media Relations:</strong> Hubungan dengan media.</li>
              <li><strong className="text-gray-800">Influencer:</strong> Kolaborasi dengan influencer.</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-orange-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">📊</span> Evaluasi & Report
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong className="text-gray-800">Attendance:</strong> Analisis kehadiran peserta.</li>
              <li><strong className="text-gray-800">Engagement:</strong> Ukuran keberhasilan event.</li>
              <li><strong className="text-gray-800">Reporting:</strong> Laporan lengkap pasca event.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-blue-900 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Wujudkan Event Impian Anda
          </h2>
          <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
            Konsultasikan kebutuhan event Anda dengan tim profesional kami.
          </p>
          <Link to="/kontak" className="inline-block bg-white text-blue-900 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
            Hubungi Kami
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventOrganizerPage;