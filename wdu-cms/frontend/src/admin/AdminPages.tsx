import { useState, useEffect } from 'react';
import { 
  DragHandleDots2Icon, 
  Pencil1Icon, 
  EyeOpenIcon, 
  EyeNoneIcon, 
  TrashIcon,
  LayersIcon,
  InfoCircledIcon,
  GearIcon,
  ArchiveIcon,
  EnvelopeClosedIcon,
  CheckIcon,
  Cross1Icon
} from '@radix-ui/react-icons';

interface PageSection {
  id: string;
  name: string;
  type: string;
  status: string;
  content?: any;
}

export default function AdminPages() {
  const [activePage, setActivePage] = useState<string>('Beranda');
  const [pageData, setPageData] = useState<Record<string, PageSection[]>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [showEditModal, setShowEditModal] = useState<PageSection | null>(null);

  // Default data structure dengan konten asli
  const defaultPageData: Record<string, PageSection[]> = {
    'Beranda': [
      { 
        id: 'b1', 
        name: 'Hero Banner', 
        type: 'Hero', 
        status: 'Published',
        content: {
          badge: 'Innovative Research & Data Analysis',
          headline: 'AKURAT, PRESISI,\nDAN ANDAL.',
          description: 'Wahana Data Utama adalah mitra terpercaya dalam bidang riset dan analisis data yang membantu organisasi pemerintah dan swasta di Indonesia.',
          bgImage: 'https://wahanadata.co.id/wp-content/uploads/2025/01/hero-bg.jpg'
        }
      },
      { 
        id: 'b2', 
        name: 'Layanan Utama', 
        type: 'Services', 
        status: 'Published',
        content: {
          badge: 'Layanan Kami',
          title: 'Solusi terbaik untuk Anda!',
          description: 'Wahana Data Utama berkomitmen untuk membantu bisnis dan organisasi Anda mengelola, menganalisis, dan memanfaatkan data secara optimal.',
          items: [
            { title: 'Riset & Survei', description: 'Melakukan riset, survei dan kajian yang kredibel sesuai kaidah ilmiah.', icon: 'analytics' },
            { title: 'Analisis Data', description: 'Mengolah data mentah menjadi wawasan strategis untuk pengambilan keputusan.', icon: 'monitoring' },
            { title: 'Konsultasi IT', description: 'Solusi teknologi informasi yang inovatif dan terintegrasi.', icon: 'computer' },
            { title: 'Manajemen Proyek', description: 'Pengelolaan proyek yang efisien dan tepat waktu.', icon: 'assignment' },
            { title: 'Event Organizer', description: 'Penyelenggaraan acara profesional untuk instansi publik.', icon: 'event' }
          ]
        }
      },
      { 
        id: 'b3', 
        name: 'Tentang WDU (Short)', 
        type: 'About', 
        status: 'Published',
        content: {
          badge: 'Wahana Data Utama',
          headline: 'Memiliki pengalaman yang luas serta didukung oleh tim profesional yang kompeten',
          paragraph1: 'Wahana Data Utama didirikan pada 2006 merupakan perusahaan riset dan survei yang berfokus pada bidang sosial-politik, ekonomi, pemasaran, pertanian, dan lainnya.',
          paragraph2: 'Dengan visi menjadi penyedia data riset global, WDU didukung oleh tim profesional berpengalaman lebih dari 10 tahun. Berkantor di Bogor, kami telah memperoleh kepercayaan dari berbagai instansi pemerintah dan swasta untuk menangani berbagai proyek konsultasi, mulai dari riset hingga event organizing.',
          image: 'https://wahanadata.co.id/wp-content/uploads/2025/02/Pak-Yudi-homepage-2.png',
          ceoName: 'Ir. Yudi A. Idrus',
          ceoTitle: 'Direktur Utama'
        }
      },
      { 
        id: 'b4', 
        name: 'Klien Kepercayaan', 
        type: 'TrustClients', 
        status: 'Published',
        content: {
          badge: 'Trust',
          title: 'Kepercayaan Klien Terhadap Kami',
          description: 'Dengan pengalaman selama 18 tahun, kami membangun kolaborasi strategis untuk organisasi pemerintah dan juga sektor swasta.',
          partners: [
            { name: 'Kementerian ESDM', logoUrl: 'https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/esdm-qzsnluwm095tgkmzgmxqlw3rrz56acfjho7xuw2dq4.png' },
            { name: 'Kemenperin', logoUrl: 'https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/kemenperin-qzsnlynyrlayr0hiuok8vv5m5imn54ugu6tvrzwt18.png' },
            { name: 'BUMN', logoUrl: 'https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/bumn-qzsn7zsb786k7mrzf56ubw20cdh9r2e2l1t40ymfi4.png' },
            { name: 'BPJS', logoUrl: 'https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/bps-qzsmwqnvdmrz7p4g4s2mz8acbay2liprdcmu6pb3zw.png' },
            { name: 'Badan POM', logoUrl: 'https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/bpom-qzsmvfnxvwzn370pr7raik5am1dpwnj6iw0k6v8sn0.png' },
            { name: 'BKPM', logoUrl: 'https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/bkpm-qzsmr5ier34m758mrd4h5n1p6uhiuaj79p0xhhlczg.png' },
            { name: 'Bank Indonesia', logoUrl: 'https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/bank-indonesia-qzsmr4kkk93bvj9zwupul5a8lgm5mlfgxkdg07mr5o.png' },
            { name: 'Pemkab Bangka Selatan', logoUrl: 'https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/bangka-selatan-1-qzsmd5owzvyxc5kghbcg166msbgs8iz2ofco96cdmk.png' },
            { name: 'KOMDIGI', logoUrl: 'https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/komdigi-qzsnm1hhc3etpudfe7s4lcfzxo8qs85nuksc7tsmik.png' },
            { name: 'OJK', logoUrl: 'https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/ojk-qzsnm4azwliooo9bxr00atqdptuufbguuyqsnnofzw.png' },
            { name: 'KPK', logoUrl: 'https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/kpk-qzsnm3d5prhed2ap38ldqbyx4fzh7md4iu3b6dpu64.png' },
            { name: 'Pemkot Bogor', logoUrl: 'https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/kota-bogor-qzsnm2fbixg41gc28q6r5u7gj243zx9e6pftp3r8cc.png' },
            { name: 'KLHK', logoUrl: 'https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/klh-qzsnm0jn59dje8esjpdi0uojcaddkj1xig4uqju0os.png' },
            { name: 'RISTEK', logoUrl: 'https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/kemenristek-qzsnlzlsyfc92mg5p6yvgcx2qwi0cty76bhd99vev0.png' },
            { name: 'KEMENKOPUKM', logoUrl: 'https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/kemenkopukm-qzsnlxq4kr9ofeiw065mbde5k4r9xfqqi26eapy77g.png' },
            { name: 'Provinsi DKI Jakarta', logoUrl: 'https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/jakarta-qzsnlwsadx8e3sk95nqzqvmoyqvwpqn05xiwtfzldo.png' },
            { name: 'Kementerian PUPR', logoUrl: 'https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/pupr-qzsnm58u3fjz0a7ys9emvbhub7q7n0kl73ea4xn1to.png' }
          ]
        }
      },
      { 
        id: 'b5', 
        name: 'Galeri Portfolio', 
        type: 'Gallery', 
        status: 'Published',
        content: {
          badge: 'Portfolio',
          title: 'Potret kegiatan dan kolaborasi kami',
          items: [
            { title: 'Project 1', imageUrl: 'https://wahanadata.co.id/wp-content/uploads/2025/01/91ff19eb-9bae-41be-bd79-86c09efa26ae.jpg' },
            { title: 'Project 2', imageUrl: 'https://wahanadata.co.id/wp-content/uploads/2025/01/1384bbe7-3362-446d-b989-77114335e7ea-scaled.jpg' },
            { title: 'Project 3', imageUrl: 'https://wahanadata.co.id/wp-content/uploads/2025/01/433319d2-e1de-4c4f-9a80-b83df6470507-scaled.jpg' },
            { title: 'Project 4', imageUrl: 'https://wahanadata.co.id/wp-content/uploads/2025/01/feac7c05-7818-4564-951d-893e14f37bfe-scaled.jpg' },
            { title: 'Project 5', imageUrl: 'https://wahanadata.co.id/wp-content/uploads/2025/01/34695135-c70d-4d76-92d5-10c39eb5390f.jpg' },
            { title: 'Project 6', imageUrl: 'https://wahanadata.co.id/wp-content/uploads/2025/01/a3f30e87-3b43-418b-b4ba-4529ed4e895a.jpg' }
          ]
        }
      }
    ],
    'Tentang Kami': [
      { 
        id: 't1', 
        name: 'Hero Cinematic', 
        type: 'Hero', 
        status: 'Published',
        content: {
          badge: 'Tentang Kami',
          headline: 'Mengubah Data Menjadi\nKekuatan Untuk\nKeputusan Cerdas',
          description: 'Wahana Data Utama adalah mitra terpercaya dalam bidang riset dan analisis data yang membantu organisasi pemerintah dan swasta di Indonesia.',
          bgImage: 'https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/1384bbe7-3362-446d-b989-77114335e7ea-1-scaled-r09xvdqugccp0qj415ithlfa8gvrifzftmrqwj4fts.jpg',
          ctaText: 'Pelajari Lebih Lanjut',
          ctaLink: '#experience',
          stats: [
            { value: '15+', label: 'Tahun Pengalaman' },
            { value: '500+', label: 'Proyek Selesai' },
            { value: '50+', label: 'Tim Ahli' }
          ]
        }
      },
      { 
        id: 't2', 
        name: 'Visi & Misi', 
        type: 'VisiMisi', 
        status: 'Published',
        content: {
          visi: 'Menjadi perusahaan penyedia data riset & survei global terdepan.',
          misi: [
            { title: 'Riset & Survei', text: 'Melakukan riset, survei dan kajian yang kredibel sesuai kaidah ilmiah untuk menghasilkan data yang akurat, presisi, dan andal.', icon: 'biotech' },
            { title: 'Event Organizer', text: 'Mengorganisir sebuah kegiatan dengan akurat, presisi dan andal untuk kepentingan publik.', icon: 'event_available' },
            { title: 'Inovasi & Kreativitas', text: 'Menjadi perusahaan kreatif yang penuh inovasi, solusi dan gagasan untuk masa depan.', icon: 'psychology' }
          ]
        }
      },
      { 
        id: 't3', 
        name: 'Garda Terdepan', 
        type: 'History', 
        status: 'Published',
        content: {
          title: 'Garda Terdepan Profesional Berpengalaman',
          paragraph1: 'Wahana Data Utama adalah perusahaan penyedia data riset dan survei global terdepan. Kami membantu organisasi pemerintah dan swasta dalam mengubah data mentah menjadi wawasan yang berharga.',
          paragraph2: 'Didukung oleh tim profesional yang berpengalaman di berbagai bidang seperti Ekonomi, Sosial, dan Politik, kami berkomitmen memberikan hasil yang akurat, presisi, dan andal bagi klien kami.',
          image: 'https://sis.wahanadata.co.id/img/wdu-building.jpg'
        }
      },
      { 
        id: 't4', 
        name: 'Jajaran Direksi', 
        type: 'Directors', 
        status: 'Published',
        content: {
          title: 'Jajaran Direksi',
          members: [
            { name: 'Ir. Yudi A. Idrus', role: 'Direktur Utama', img: 'https://wahanadata.co.id/wp-content/uploads/2025/02/Pak-Yudi-homepage-2.png' },
            { name: 'Dr. Ir. Erviani M.Si', role: 'Komisaris Utama', img: 'https://wahanadata.co.id/wp-content/uploads/2025/02/direksi_bu-erfi_scaled-1024x841.png' },
            { name: 'M. Fadhlan Fadilah, S.E', role: 'Direktur', img: 'https://wahanadata.co.id/wp-content/uploads/2025/02/direksi_pak-adlan_fixed.png' },
            { name: 'M. Hafiz Abdillah, S.T', role: 'Direktur', img: 'https://wahanadata.co.id/wp-content/uploads/2025/02/direksi_bu-hafiz_fixed.png' },
            { name: 'Nurul Athia R, S.Bns', role: 'Direktur', img: 'https://wahanadata.co.id/wp-content/uploads/2025/02/direksi_mba-nia_fixed.png' }
          ]
        }
      }
    ],
    'Layanan': [
      { 
        id: 'l1', 
        name: 'Hero Header', 
        type: 'Hero', 
        status: 'Published',
        content: {
          badge: 'Layanan Kami',
          headline: 'Solusi\nTerbaik Untuk\nKebutuhan Anda',
          description: 'Kami menyediakan berbagai layanan riset, analisis data, dan konsultasi teknologi yang disesuaikan dengan kebutuhan Anda.',
          bgImage: 'https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/header-layanan-r0d1p013xjdauuqbpgua94u7h5oe3zp0dnk4ku7wdc.jpg'
        }
      },
      { 
        id: 'l2', 
        name: 'Pengantar Layanan', 
        type: 'About', 
        status: 'Published',
        content: {
          badge: 'Layanan Kami',
          headline: 'Solusi Terbaik Untuk Bisnis Anda',
          paragraph1: 'Wahana Data Utama berkomitmen untuk membantu bisnis dan organisasi Anda mengelola, menganalisis, dan memanfaatkan data secara optimal.',
          paragraph2: 'Dengan tim profesional yang berpengalaman, kami bekerja sama dengan Anda untuk merancang solusi berbasis data yang relevan, akurat, dan dapat diandalkan.',
          image: 'https://wahanadata.co.id/wp-content/uploads/2025/01/hero-bg.jpg'
        }
      },
      { 
        id: 'l3', 
        name: 'Daftar Layanan Grid', 
        type: 'ServicesList', 
        status: 'Published',
        content: {
          items: [
            { title: 'Riset & Survei', description: 'Melakukan riset, survei dan kajian yang kredibel sesuai kaidah ilmiah.', icon: 'analytics' },
            { title: 'Analisis Data', description: 'Mengolah data mentah menjadi wawasan strategis untuk pengambilan keputusan.', icon: 'monitoring' },
            { title: 'Konsultasi IT', description: 'Solusi teknologi informasi yang inovatif dan terintegrasi.', icon: 'computer' },
            { title: 'Manajemen Proyek', description: 'Pengelolaan proyek yang efisien dan tepat waktu.', icon: 'assignment' },
            { title: 'Event Organizer', description: 'Penyelenggaraan acara profesional untuk instansi publik.', icon: 'event' }
          ]
        }
      },
      { 
        id: 'l4', 
        name: 'Visi Bisnis Data', 
        type: 'Editorial', 
        status: 'Published',
        content: {
          headline: 'DATA IS OUR\nBUSINESS',
          quote: '"Data bukan hanya angka bagi kami, tapi fondasi untuk menciptakan solusi terbaik. Dengan keahlian dan teknologi, kami menghadirkan wawasan yang mendorong pertumbuhan dan inovasi."',
          bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5RBKpoKOweh7oewDuSplkr02yMIykWHdlgaw0pQbKXaJGpiQb2q8P0TpjUzGZtM6A0NJji6CZiVBYHqrct5-bse_f5lqmn58uaV3ywxGK9VEMlHow6A6lCrktK7jHBxfAF6oBH0soe_AJ92ecTcMJVRPmRn6o474kgUZLw8DlplpIoJJ40yVd5-7wUDZCtqWh4mSezx6bTKvSkLEJFqYAHTb1LUNQ6qj4MXzzO8DuAWLR8ds5E9zIDN4sbnjKFTguYa3D7oLy2lpx'
        }
      }
    ],
    'Pengalaman': [
      { id: 'p1', name: 'Hero Experience', type: 'Hero', status: 'Published' },
      { id: 'p2', name: 'Intro Pengalaman', type: 'Intro', status: 'Published' },
      { id: 'p3', name: 'Klien Unggulan 2024', type: 'Clients', status: 'Published' },
      { id: 'p4', name: 'Timeline Perjalanan', type: 'Timeline', status: 'Published' },
      { id: 'p5', name: 'Monolith Strategis', type: 'Editorial', status: 'Published' }
    ],
    'Kontak': [
      { id: 'k1', name: 'Hero Kontak', type: 'Hero', status: 'Published' },
      { id: 'k2', name: 'Form & Info Kontak', type: 'Form', status: 'Published' },
      { id: 'k3', name: 'Peta Lokasi (Google Maps)', type: 'Map', status: 'Published' }
    ]
  };

  // Load data from localStorage on mount with AUTO-MERGE
  useEffect(() => {
    const storedData = localStorage.getItem('wdu_admin_sections');
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        // Buat salinan dari defaultPageData
        const mergedData = { ...defaultPageData };
        
        // Loop tiap halaman dan section untuk mengisi konten yang kosong
        Object.keys(mergedData).forEach(page => {
          if (parsed[page]) {
            mergedData[page] = mergedData[page].map(defaultSec => {
              const storedSec = parsed[page].find((s: any) => s.id === defaultSec.id);
              if (storedSec) {
                // HANYA ambil status dan content dari storage
                // ID, Name, dan Type HARUS ikut default terbaru dari kode
                return {
                  ...defaultSec,
                  status: storedSec.status || defaultSec.status,
                  content: { ...defaultSec.content, ...storedSec.content }
                };
              }
              return defaultSec;
            });
          }
        });
        
        setPageData(mergedData);
      } catch (e) {
        setPageData(defaultPageData);
      }
    } else {
      setPageData(defaultPageData);
    }
  }, []);

  // Handlers
  const handleToggleStatus = (page: string, sectionId: string) => {
    const newData = { ...pageData };
    newData[page] = newData[page].map(s => 
      s.id === sectionId 
      ? { ...s, status: s.status === 'Published' ? 'Draft' : 'Published' } 
      : s
    );
    setPageData(newData);
  };

  const handleDelete = (page: string, sectionId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus section ini?')) {
      const newData = { ...pageData };
      newData[page] = newData[page].filter(s => s.id !== sectionId);
      setPageData(newData);
    }
  };

  const handleSaveAll = () => {
    setIsSaving(true);
    localStorage.setItem('wdu_admin_sections', JSON.stringify(pageData));
    
    // Trigger storage event for other tabs
    window.dispatchEvent(new Event('storage'));
    
    setTimeout(() => {
      setIsSaving(false);
      alert('Semua perubahan berhasil disimpan dan disinkronkan!');
    }, 800);
  };

  const handlePreview = () => {
    const routes: Record<string, string> = {
      'Beranda': '/',
      'Tentang Kami': '/about',
      'Layanan': '/services',
      'Pengalaman': '/experience',
      'Kontak': '/contact'
    };
    window.open(routes[activePage] || '/', '_blank');
  };

  const sidebarItems = [
    { name: 'Beranda', icon: <LayersIcon /> },
    { name: 'Tentang Kami', icon: <InfoCircledIcon /> },
    { name: 'Layanan', icon: <GearIcon /> },
    { name: 'Pengalaman', icon: <ArchiveIcon /> },
    { name: 'Kontak', icon: <EnvelopeClosedIcon /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden">
      
      {/* MAIN CONTENT AREA - Full Width */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50/50">
        <div className="max-w-6xl mx-auto p-12 pb-32">
          
          {/* Header */}
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-[2px] bg-[#6ab149]"></div>
                <p className="text-[#6ab149] text-xs font-black uppercase tracking-[0.3em]">Content Management System</p>
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-gray-900 uppercase italic">
                Editor <span className="text-[#6ab149]">Halaman</span>
              </h1>
            </div>
            <div className="flex gap-4">
              <div className="flex bg-white p-1 rounded-2xl border border-gray-200 shadow-sm mr-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setActivePage(item.name)}
                    className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all uppercase tracking-widest ${
                      activePage === item.name 
                      ? 'bg-[#6ab149] text-white shadow-lg shadow-[#6ab149]/20' 
                      : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <button 
                onClick={handlePreview}
                className="bg-white border border-gray-200 hover:bg-gray-50 px-6 py-3 rounded-2xl text-xs font-black text-gray-700 transition-all shadow-sm flex items-center gap-2 uppercase tracking-widest"
              >
                <EyeOpenIcon /> Preview
              </button>
            </div>
          </div>

          {/* Bento Grid Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {(pageData[activePage] || []).map((section) => (
              <div 
                key={section.id} 
                className={`group relative bg-white border p-6 rounded-[24px] transition-all duration-300 shadow-sm hover:shadow-md ${
                  section.status === 'Draft' ? 'border-orange-200 bg-orange-50/10' : 'border-gray-200'
                }`}
              >
                {/* Drag handle dots */}
                <div className="absolute top-6 right-6 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                  <DragHandleDots2Icon className="w-5 h-5" />
                </div>

                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      section.status === 'Published' ? 'bg-[#6ab149]/10 text-[#6ab149]' : 'bg-orange-500/10 text-orange-500'
                    }`}>
                       <LayersIcon />
                    </div>
                    <div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        section.status === 'Published' ? 'bg-[#6ab149]/10 text-[#6ab149]' : 'bg-orange-500/10 text-orange-500'
                      }`}>
                        {section.status}
                      </span>
                      <h3 className="text-lg font-bold mt-0.5 text-gray-900">{section.name}</h3>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                    Mengatur konten visual dan teks untuk tipe <span className="font-semibold">{section.type}</span> pada halaman {activePage}.
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setShowEditModal(section)}
                        className="p-2.5 rounded-xl bg-gray-50 hover:bg-[#6ab149] hover:text-white transition-all group/btn text-gray-600"
                      >
                        <Pencil1Icon className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleToggleStatus(activePage, section.id)}
                        className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all text-gray-600"
                        title={section.status === 'Published' ? 'Set to Draft' : 'Set to Published'}
                      >
                        {section.status === 'Published' ? <EyeOpenIcon className="w-4 h-4 text-[#6ab149]" /> : <EyeNoneIcon className="w-4 h-4" />}
                      </button>
                    </div>
                    <button 
                      onClick={() => handleDelete(activePage, section.id)}
                      className="p-2.5 rounded-xl bg-gray-50 hover:bg-red-100 text-red-400 hover:text-red-500 transition-all"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Placeholder Card */}
            <button className="border-2 border-dashed border-gray-200 rounded-[24px] flex flex-col items-center justify-center p-12 bg-transparent hover:bg-gray-50 hover:border-[#6ab149]/30 transition-all group">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-[#6ab149]/10 transition-all">
                <span className="text-2xl text-gray-400 group-hover:text-[#6ab149]">+</span>
              </div>
              <p className="text-gray-500 font-medium text-sm">Add custom section here</p>
            </button>
          </div>

        </div>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header Modal */}
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/80">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#6ab149] text-white flex items-center justify-center shadow-lg shadow-[#6ab149]/20">
                  <Pencil1Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight">Content Editor</h3>
                  <p className="text-sm font-bold text-[#6ab149] uppercase tracking-widest">{showEditModal.type} Section</p>
                </div>
              </div>
              <button onClick={() => setShowEditModal(null)} className="p-3 hover:bg-gray-200 rounded-full transition-all active:scale-90">
                <Cross1Icon className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Editor */}
            <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar space-y-8">
              
              {/* Common Settings */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Section Display Name</label>
                  <input 
                    type="text" 
                    value={showEditModal.name}
                    onChange={(e) => {
                      const newData = { ...pageData };
                      newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, name: e.target.value } : s);
                      setPageData(newData);
                      setShowEditModal({ ...showEditModal, name: e.target.value });
                    }}
                    className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#6ab149] focus:ring-4 focus:ring-[#6ab149]/5 outline-none transition-all font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Visibility Status</label>
                  <select 
                    value={showEditModal.status}
                    onChange={(e) => {
                      const newData = { ...pageData };
                      newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, status: e.target.value } : s);
                      setPageData(newData);
                      setShowEditModal({ ...showEditModal, status: e.target.value });
                    }}
                    className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#6ab149] outline-none transition-all font-bold"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="h-px bg-gray-100 w-full"></div>

              {/* Dynamic Content Fields based on Type */}
              <div className="space-y-6">
                <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                  <GearIcon className="w-4 h-4 text-[#6ab149]" /> Section Properties
                </h4>

                {/* IF HERO */}
                {showEditModal.type === 'Hero' && (
                  <div className="space-y-6 animate-in slide-in-from-top-2">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Badge Text</label>
                      <input 
                        type="text" 
                        value={showEditModal.content?.badge || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => 
                            s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), badge: e.target.value } } : s
                          );
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), badge: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none font-bold text-[#6ab149]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Headline Text</label>
                      <textarea 
                        value={showEditModal.content?.headline || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => 
                            s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), headline: e.target.value } } : s
                          );
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), headline: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#6ab149] outline-none transition-all font-medium min-h-[100px]"
                        placeholder="Masukkan headline utama..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                      <textarea 
                        value={showEditModal.content?.description || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => 
                            s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), description: e.target.value } } : s
                          );
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), description: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#6ab149] outline-none transition-all font-medium min-h-[100px]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">CTA Button Text</label>
                        <input 
                          type="text" 
                          value={showEditModal.content?.ctaText || ''}
                          onChange={(e) => {
                            const newData = { ...pageData };
                            newData[activePage] = newData[activePage].map(s => 
                              s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), ctaText: e.target.value } } : s
                            );
                            setPageData(newData);
                            setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), ctaText: e.target.value } });
                          }}
                          className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none font-bold" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">CTA Button Link</label>
                        <input 
                          type="text" 
                          value={showEditModal.content?.ctaLink || ''}
                          onChange={(e) => {
                            const newData = { ...pageData };
                            newData[activePage] = newData[activePage].map(s => 
                              s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), ctaLink: e.target.value } } : s
                            );
                            setPageData(newData);
                            setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), ctaLink: e.target.value } });
                          }}
                          className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none" 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Hero Statistics</label>
                      <div className="space-y-3">
                        {(showEditModal.content?.stats || []).map((stat: any, idx: number) => (
                          <div key={idx} className="flex gap-3 items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <div className="flex-1 grid grid-cols-2 gap-4">
                              <input 
                                type="text" 
                                value={stat.value} 
                                onChange={(e) => {
                                  const newStats = [...showEditModal.content.stats];
                                  newStats[idx].value = e.target.value;
                                  const newData = { ...pageData };
                                  newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, stats: newStats } } : s);
                                  setPageData(newData);
                                  setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, stats: newStats } });
                                }}
                                className="text-sm font-black bg-transparent outline-none text-[#6ab149]" 
                                placeholder="Value (e.g. 15+)" 
                              />
                              <input 
                                type="text" 
                                value={stat.label} 
                                onChange={(e) => {
                                  const newStats = [...showEditModal.content.stats];
                                  newStats[idx].label = e.target.value;
                                  const newData = { ...pageData };
                                  newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, stats: newStats } } : s);
                                  setPageData(newData);
                                  setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, stats: newStats } });
                                }}
                                className="text-[10px] text-gray-400 font-bold uppercase outline-none bg-transparent" 
                                placeholder="Label" 
                              />
                            </div>
                            <button 
                              onClick={() => {
                                const newStats = showEditModal.content.stats.filter((_: any, i: number) => i !== idx);
                                const newData = { ...pageData };
                                newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, stats: newStats } } : s);
                                setPageData(newData);
                                setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, stats: newStats } });
                              }}
                              className="text-red-400 hover:text-red-600"
                            >
                              <TrashIcon className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <button 
                          onClick={() => {
                            const newStats = [...(showEditModal.content?.stats || []), { value: '0', label: 'New Stat' }];
                            const newData = { ...pageData };
                            newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), stats: newStats } } : s);
                            setPageData(newData);
                            setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), stats: newStats } });
                          }}
                          className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-[10px] font-bold text-gray-400 hover:border-[#6ab149] hover:text-[#6ab149] transition-all"
                        >
                          + Add New Statistic
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Background Image URL</label>
                      <div className="flex gap-3">
                        <input 
                          type="text" 
                          value={showEditModal.content?.bgImage || ''}
                          onChange={(e) => {
                            const newData = { ...pageData };
                            newData[activePage] = newData[activePage].map(s => 
                              s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), bgImage: e.target.value } } : s
                            );
                            setPageData(newData);
                            setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), bgImage: e.target.value } });
                          }}
                          className="flex-1 px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#6ab149] outline-none transition-all" 
                          placeholder="https://..." 
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* IF SERVICES */}
                {showEditModal.type === 'Services' && (
                  <div className="space-y-6 animate-in slide-in-from-top-2">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Section Title</label>
                      <input 
                        type="text" 
                        value={showEditModal.content?.title || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), title: e.target.value } } : s);
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), title: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none font-black text-primary" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                      <textarea 
                        value={showEditModal.content?.description || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), description: e.target.value } } : s);
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), description: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none min-h-[100px]" 
                      />
                    </div>
                    
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Service Items (Carousel)</label>
                      <div className="space-y-3">
                        {(showEditModal.content?.items || []).map((item: any, idx: number) => (
                          <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3 group relative">
                            <button 
                              onClick={() => {
                                const newItems = showEditModal.content.items.filter((_: any, i: number) => i !== idx);
                                const newData = { ...pageData };
                                newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, items: newItems } } : s);
                                setPageData(newData);
                                setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, items: newItems } });
                              }}
                              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg z-10"
                            >
                              <TrashIcon className="w-3 h-3" />
                            </button>
                            <div className="flex gap-4">
                              <div className="w-12 h-12 bg-white rounded-xl border flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-primary text-2xl">{item.icon}</span>
                              </div>
                              <div className="flex-1 space-y-2">
                                <input 
                                  type="text" 
                                  value={item.icon} 
                                  onChange={(e) => {
                                    const newItems = [...showEditModal.content.items];
                                    newItems[idx].icon = e.target.value;
                                    const newData = { ...pageData };
                                    newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, items: newItems } } : s);
                                    setPageData(newData);
                                    setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, items: newItems } });
                                  }}
                                  className="text-[10px] font-black text-primary bg-transparent outline-none uppercase" 
                                  placeholder="Icon Name" 
                                />
                                <input 
                                  type="text" 
                                  value={item.title} 
                                  onChange={(e) => {
                                    const newItems = [...showEditModal.content.items];
                                    newItems[idx].title = e.target.value;
                                    const newData = { ...pageData };
                                    newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, items: newItems } } : s);
                                    setPageData(newData);
                                    setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, items: newItems } });
                                  }}
                                  className="w-full text-xs font-black bg-transparent outline-none uppercase tracking-wider" 
                                  placeholder="Service Title" 
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        <button 
                          onClick={() => {
                            const newItems = [...(showEditModal.content?.items || []), { title: 'New Service', description: '', icon: 'star' }];
                            const newData = { ...pageData };
                            newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), items: newItems } } : s);
                            setPageData(newData);
                            setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), items: newItems } });
                          }}
                          className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-[10px] font-bold text-gray-400 hover:border-[#6ab149] hover:text-[#6ab149] transition-all"
                        >
                          + Add New Service to Carousel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* IF TRUSTCLIENTS */}
                {showEditModal.type === 'TrustClients' && (
                  <div className="space-y-6 animate-in slide-in-from-top-2">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Badge Text</label>
                      <input 
                        type="text" 
                        value={showEditModal.content?.badge || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), badge: e.target.value } } : s);
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), badge: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none font-bold text-[#6ab149]" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Title</label>
                      <input 
                        type="text" 
                        value={showEditModal.content?.title || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), title: e.target.value } } : s);
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), title: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none font-bold" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                      <textarea 
                        value={showEditModal.content?.description || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), description: e.target.value } } : s);
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), description: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none min-h-[100px]" 
                      />
                    </div>
                    
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Partner Logos</label>
                      <div className="grid grid-cols-2 gap-3">
                        {(showEditModal.content?.partners || []).map((partner: any, idx: number) => (
                          <div key={idx} className="p-3 bg-gray-50 rounded-2xl border border-gray-100 space-y-2 group relative">
                            <button 
                              onClick={() => {
                                const newPartners = showEditModal.content.partners.filter((_: any, i: number) => i !== idx);
                                const newData = { ...pageData };
                                newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, partners: newPartners } } : s);
                                setPageData(newData);
                                setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, partners: newPartners } });
                              }}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all z-10"
                            >
                              <TrashIcon className="w-3 h-3" />
                            </button>
                            <div className="h-12 flex items-center justify-center bg-white rounded-xl border p-2">
                              <img src={partner.logoUrl} className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all" alt="" />
                            </div>
                            <input 
                              type="text" 
                              value={partner.name} 
                              onChange={(e) => {
                                const newPartners = [...showEditModal.content.partners];
                                newPartners[idx].name = e.target.value;
                                const newData = { ...pageData };
                                newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, partners: newPartners } } : s);
                                setPageData(newData);
                                setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, partners: newPartners } });
                              }}
                              className="w-full text-[9px] font-black outline-none bg-transparent" 
                              placeholder="Partner Name" 
                            />
                            <input 
                              type="text" 
                              value={partner.logoUrl} 
                              onChange={(e) => {
                                const newPartners = [...showEditModal.content.partners];
                                newPartners[idx].logoUrl = e.target.value;
                                const newData = { ...pageData };
                                newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, partners: newPartners } } : s);
                                setPageData(newData);
                                setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, partners: newPartners } });
                              }}
                              className="w-full text-[8px] text-gray-400 outline-none bg-transparent truncate" 
                              placeholder="Logo URL" 
                            />
                          </div>
                        ))}
                        <button 
                          onClick={() => {
                            const newPartners = [...(showEditModal.content?.partners || []), { name: 'New Partner', logoUrl: '' }];
                            const newData = { ...pageData };
                            newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), partners: newPartners } } : s);
                            setPageData(newData);
                            setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), partners: newPartners } });
                          }}
                          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-4 text-gray-400 hover:border-[#6ab149] hover:text-[#6ab149] transition-all"
                        >
                          <span className="text-xl">+</span>
                          <span className="text-[9px] font-bold">Add Logo</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  )}
                  
                {/* IF ABOUT / CONTENT */}
                {(showEditModal.type === 'About' || showEditModal.type === 'Content') && (
                  <div className="space-y-6 animate-in slide-in-from-top-2">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Badge Text</label>
                      <input 
                        type="text" 
                        value={showEditModal.content?.badge || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), badge: e.target.value } } : s);
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), badge: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none font-bold text-[#6ab149]" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Headline</label>
                      <textarea 
                        value={showEditModal.content?.headline || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), headline: e.target.value } } : s);
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), headline: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none font-bold" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Paragraph 1</label>
                      <textarea 
                        value={showEditModal.content?.paragraph1 || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), paragraph1: e.target.value } } : s);
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), paragraph1: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none min-h-[100px]" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Paragraph 2</label>
                      <textarea 
                        value={showEditModal.content?.paragraph2 || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), paragraph2: e.target.value } } : s);
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), paragraph2: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none min-h-[100px]" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">CEO Name</label>
                        <input 
                          type="text" 
                          value={showEditModal.content?.ceoName || ''}
                          onChange={(e) => {
                            const newData = { ...pageData };
                            newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), ceoName: e.target.value } } : s);
                            setPageData(newData);
                            setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), ceoName: e.target.value } });
                          }}
                          className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">CEO Title</label>
                        <input 
                          type="text" 
                          value={showEditModal.content?.ceoTitle || ''}
                          onChange={(e) => {
                            const newData = { ...pageData };
                            newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), ceoTitle: e.target.value } } : s);
                            setPageData(newData);
                            setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), ceoTitle: e.target.value } });
                          }}
                          className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Side Image URL</label>
                      <input 
                        type="text" 
                        value={showEditModal.content?.image || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), image: e.target.value } } : s);
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), image: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none" 
                      />
                    </div>
                  </div>
                )}

                {/* IF VISI MISI */}
                {showEditModal.type === 'VisiMisi' && (
                  <div className="space-y-6 animate-in slide-in-from-top-2">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Visi Utama</label>
                      <textarea 
                        value={showEditModal.content?.visi || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), visi: e.target.value } } : s);
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), visi: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none font-bold italic" 
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Misi List</label>
                      <div className="space-y-3">
                        {(showEditModal.content?.misi || []).map((m: any, idx: number) => (
                          <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                            <div className="flex justify-between items-center">
                              <input 
                                type="text" 
                                value={m.icon} 
                                onChange={(e) => {
                                  const newMisi = [...showEditModal.content.misi];
                                  newMisi[idx].icon = e.target.value;
                                  const newData = { ...pageData };
                                  newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, misi: newMisi } } : s);
                                  setPageData(newData);
                                  setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, misi: newMisi } });
                                }}
                                className="text-[10px] font-black text-[#6ab149] bg-transparent outline-none uppercase" 
                                placeholder="Icon Name (Material Icons)" 
                              />
                              <button 
                                onClick={() => {
                                  const newMisi = showEditModal.content.misi.filter((_: any, i: number) => i !== idx);
                                  const newData = { ...pageData };
                                  newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, misi: newMisi } } : s);
                                  setPageData(newData);
                                  setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, misi: newMisi } });
                                }}
                                className="text-red-400 hover:text-red-600"
                              >
                                <TrashIcon className="w-3 h-3" />
                              </button>
                            </div>
                            <input 
                              type="text" 
                              value={m.title} 
                              onChange={(e) => {
                                const newMisi = [...showEditModal.content.misi];
                                newMisi[idx].title = e.target.value;
                                const newData = { ...pageData };
                                newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, misi: newMisi } } : s);
                                setPageData(newData);
                                setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, misi: newMisi } });
                              }}
                              className="w-full text-xs font-black bg-transparent outline-none uppercase tracking-wider" 
                              placeholder="Misi Title" 
                            />
                            <textarea 
                              value={m.text} 
                              onChange={(e) => {
                                const newMisi = [...showEditModal.content.misi];
                                newMisi[idx].text = e.target.value;
                                const newData = { ...pageData };
                                newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, misi: newMisi } } : s);
                                setPageData(newData);
                                setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, misi: newMisi } });
                              }}
                              className="w-full text-[11px] text-gray-500 bg-transparent outline-none leading-relaxed" 
                              placeholder="Misi Description" 
                            />
                          </div>
                        ))}
                        <button 
                          onClick={() => {
                            const newMisi = [...(showEditModal.content?.misi || []), { title: 'New Mission', text: '', icon: 'star' }];
                            const newData = { ...pageData };
                            newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), misi: newMisi } } : s);
                            setPageData(newData);
                            setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), misi: newMisi } });
                          }}
                          className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-[10px] font-bold text-gray-400 hover:border-[#6ab149] hover:text-[#6ab149] transition-all"
                        >
                          + Add New Mission
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* IF HISTORY (GARDA TERDEPAN) */}
                {showEditModal.type === 'History' && (
                  <div className="space-y-6 animate-in slide-in-from-top-2">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Main Title</label>
                      <input 
                        type="text" 
                        value={showEditModal.content?.title || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), title: e.target.value } } : s);
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), title: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none font-bold" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Paragraph 1</label>
                      <textarea 
                        value={showEditModal.content?.paragraph1 || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), paragraph1: e.target.value } } : s);
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), paragraph1: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none min-h-[100px]" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Paragraph 2</label>
                      <textarea 
                        value={showEditModal.content?.paragraph2 || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), paragraph2: e.target.value } } : s);
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), paragraph2: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none min-h-[100px]" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Image URL</label>
                      <input 
                        type="text" 
                        value={showEditModal.content?.image || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), image: e.target.value } } : s);
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), image: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none" 
                      />
                    </div>
                  </div>
                )}

                {/* IF DIRECTORS */}
                {showEditModal.type === 'Directors' && (
                  <div className="space-y-6 animate-in slide-in-from-top-2">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Board of Directors</label>
                      <div className="grid grid-cols-2 gap-4">
                        {(showEditModal.content?.members || []).map((member: any, idx: number) => (
                          <div key={idx} className="group relative bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                            <button 
                              onClick={() => {
                                const newMembers = showEditModal.content.members.filter((_: any, i: number) => i !== idx);
                                const newData = { ...pageData };
                                newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, members: newMembers } } : s);
                                setPageData(newData);
                                setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, members: newMembers } });
                              }}
                              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg z-10"
                            >
                              <TrashIcon className="w-3 h-3" />
                            </button>
                            <img src={member.img} className="w-full h-32 object-cover" alt="" />
                            <div className="p-3 space-y-2">
                              <input 
                                type="text" 
                                value={member.name} 
                                onChange={(e) => {
                                  const newMembers = [...showEditModal.content.members];
                                  newMembers[idx].name = e.target.value;
                                  const newData = { ...pageData };
                                  newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, members: newMembers } } : s);
                                  setPageData(newData);
                                  setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, members: newMembers } });
                                }}
                                className="w-full text-[10px] font-black outline-none bg-transparent" 
                                placeholder="Name" 
                              />
                              <input 
                                type="text" 
                                value={member.role} 
                                onChange={(e) => {
                                  const newMembers = [...showEditModal.content.members];
                                  newMembers[idx].role = e.target.value;
                                  const newData = { ...pageData };
                                  newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, members: newMembers } } : s);
                                  setPageData(newData);
                                  setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, members: newMembers } });
                                }}
                                className="w-full text-[9px] text-[#6ab149] font-black uppercase tracking-widest outline-none bg-transparent" 
                                placeholder="Role" 
                              />
                              <input 
                                type="text" 
                                value={member.img} 
                                onChange={(e) => {
                                  const newMembers = [...showEditModal.content.members];
                                  newMembers[idx].img = e.target.value;
                                  const newData = { ...pageData };
                                  newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, members: newMembers } } : s);
                                  setPageData(newData);
                                  setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, members: newMembers } });
                                }}
                                className="w-full text-[8px] text-gray-400 outline-none bg-transparent truncate" 
                                placeholder="Photo URL" 
                              />
                            </div>
                          </div>
                        ))}
                        <button 
                          onClick={() => {
                            const newMembers = [...(showEditModal.content?.members || []), { name: 'New Director', role: 'Director', img: '' }];
                            const newData = { ...pageData };
                            newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), members: newMembers } } : s);
                            setPageData(newData);
                            setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), members: newMembers } });
                          }}
                          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-[30px] p-6 text-gray-400 hover:border-[#6ab149] hover:text-[#6ab149] transition-all min-h-[180px]"
                        >
                          <span className="text-2xl">+</span>
                          <span className="text-[10px] font-bold">Add New Member</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* IF SERVICES LIST */}
                {showEditModal.type === 'ServicesList' && (
                  <div className="space-y-6 animate-in slide-in-from-top-2">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Layanan Grid</label>
                      <div className="space-y-3">
                        {(showEditModal.content?.items || []).map((item: any, idx: number) => (
                          <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3 group relative">
                            <button 
                              onClick={() => {
                                const newItems = showEditModal.content.items.filter((_: any, i: number) => i !== idx);
                                const newData = { ...pageData };
                                newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, items: newItems } } : s);
                                setPageData(newData);
                                setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, items: newItems } });
                              }}
                              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg z-10"
                            >
                              <TrashIcon className="w-3 h-3" />
                            </button>
                            <div className="flex gap-4">
                              <div className="w-16 h-16 bg-white rounded-xl border flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-primary text-3xl">{item.icon}</span>
                              </div>
                              <div className="flex-1 space-y-2">
                                <input 
                                  type="text" 
                                  value={item.icon} 
                                  onChange={(e) => {
                                    const newItems = [...showEditModal.content.items];
                                    newItems[idx].icon = e.target.value;
                                    const newData = { ...pageData };
                                    newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, items: newItems } } : s);
                                    setPageData(newData);
                                    setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, items: newItems } });
                                  }}
                                  className="text-[10px] font-black text-primary bg-transparent outline-none uppercase" 
                                  placeholder="Icon Name" 
                                />
                                <input 
                                  type="text" 
                                  value={item.title} 
                                  onChange={(e) => {
                                    const newItems = [...showEditModal.content.items];
                                    newItems[idx].title = e.target.value;
                                    const newData = { ...pageData };
                                    newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, items: newItems } } : s);
                                    setPageData(newData);
                                    setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, items: newItems } });
                                  }}
                                  className="w-full text-xs font-black bg-transparent outline-none uppercase tracking-wider" 
                                  placeholder="Service Title" 
                                />
                              </div>
                            </div>
                            <textarea 
                              value={item.description} 
                              onChange={(e) => {
                                const newItems = [...showEditModal.content.items];
                                newItems[idx].description = e.target.value;
                                const newData = { ...pageData };
                                newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, items: newItems } } : s);
                                setPageData(newData);
                                setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, items: newItems } });
                              }}
                              className="w-full text-[11px] text-gray-500 bg-transparent outline-none leading-relaxed" 
                              placeholder="Service Description" 
                            />
                          </div>
                        ))}
                        <button 
                          onClick={() => {
                            const newItems = [...(showEditModal.content?.items || []), { title: 'New Service', description: '', icon: 'star' }];
                            const newData = { ...pageData };
                            newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), items: newItems } } : s);
                            setPageData(newData);
                            setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), items: newItems } });
                          }}
                          className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-[10px] font-bold text-gray-400 hover:border-[#6ab149] hover:text-[#6ab149] transition-all"
                        >
                          + Add New Service
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* IF EDITORIAL */}
                {showEditModal.type === 'Editorial' && (
                  <div className="space-y-6 animate-in slide-in-from-top-2">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Main Headline</label>
                      <textarea 
                        value={showEditModal.content?.headline || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), headline: e.target.value } } : s);
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), headline: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none font-black text-2xl uppercase italic tracking-tighter" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Quote / Description</label>
                      <textarea 
                        value={showEditModal.content?.quote || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), quote: e.target.value } } : s);
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), quote: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none min-h-[100px] italic font-medium" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Background Image URL</label>
                      <input 
                        type="text" 
                        value={showEditModal.content?.bgImage || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), bgImage: e.target.value } } : s);
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), bgImage: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none" 
                      />
                    </div>
                  </div>
                )}

                {/* IF GALLERY */}
                {showEditModal.type === 'Gallery' && (
                  <div className="space-y-6 animate-in slide-in-from-top-2">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Section Title</label>
                      <input 
                        type="text" 
                        value={showEditModal.content?.title || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), title: e.target.value } } : s);
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), title: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none font-bold" 
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Portfolio Items</label>
                      <div className="grid grid-cols-2 gap-4">
                        {(showEditModal.content?.items || []).map((item: any, idx: number) => (
                          <div key={idx} className="relative group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                            <img src={item.imageUrl} className="w-full h-32 object-cover" alt="" />
                            <div className="p-3 space-y-2">
                              <input 
                                type="text" 
                                value={item.title} 
                                onChange={(e) => {
                                  const newItems = [...showEditModal.content.items];
                                  newItems[idx].title = e.target.value;
                                  const newData = { ...pageData };
                                  newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, items: newItems } } : s);
                                  setPageData(newData);
                                  setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, items: newItems } });
                                }}
                                className="w-full text-[10px] font-black outline-none bg-transparent" 
                                placeholder="Project Title" 
                              />
                              <input 
                                type="text" 
                                value={item.imageUrl} 
                                onChange={(e) => {
                                  const newItems = [...showEditModal.content.items];
                                  newItems[idx].imageUrl = e.target.value;
                                  const newData = { ...pageData };
                                  newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, items: newItems } } : s);
                                  setPageData(newData);
                                  setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, items: newItems } });
                                }}
                                className="w-full text-[9px] text-gray-400 outline-none bg-transparent truncate" 
                                placeholder="Image URL" 
                              />
                            </div>
                            <button 
                              onClick={() => {
                                const newItems = showEditModal.content.items.filter((_: any, i: number) => i !== idx);
                                const newData = { ...pageData };
                                newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, items: newItems } } : s);
                                setPageData(newData);
                                setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, items: newItems } });
                              }}
                              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                            >
                              <TrashIcon className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <button 
                          onClick={() => {
                            const newItems = [...(showEditModal.content?.items || []), { title: 'New Project', imageUrl: '' }];
                            const newData = { ...pageData };
                            newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), items: newItems } } : s);
                            setPageData(newData);
                            setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), items: newItems } });
                          }}
                          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-6 text-gray-400 hover:border-[#6ab149] hover:text-[#6ab149] transition-all"
                        >
                          <span className="text-xl">+</span>
                          <span className="text-[10px] font-bold">Add Project</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Footer Modal */}
            <div className="p-8 bg-gray-50 flex gap-4">
              <button 
                onClick={() => setShowEditModal(null)} 
                className="flex-1 py-4 font-black text-gray-500 hover:bg-gray-200 rounded-2xl transition-all uppercase text-xs tracking-widest"
              >
                Discard
              </button>
              <button 
                onClick={() => {
                  handleSaveAll();
                  setShowEditModal(null);
                }} 
                className="flex-1 py-4 bg-[#6ab149] text-white font-black rounded-2xl shadow-xl shadow-[#6ab149]/20 hover:brightness-110 active:scale-95 transition-all uppercase text-xs tracking-widest"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Save Notifier */}
      <div className={`fixed bottom-10 right-10 bg-white p-4 pl-6 rounded-3xl flex items-center gap-10 shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-all duration-500 border border-gray-100 ${
        isSaving ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'
      }`}>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-3 h-3 bg-[#6ab149] rounded-full animate-ping absolute inset-0"></div>
            <div className="w-3 h-3 bg-[#6ab149] rounded-full relative z-10 shadow-[0_0_15px_#6ab149]"></div>
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">System Status</p>
            <p className="text-sm font-black text-gray-800 tracking-tight">Live Sync Active</p>
          </div>
        </div>
        <button 
          onClick={handleSaveAll}
          disabled={isSaving}
          className="bg-[#6ab149] px-8 py-3.5 rounded-[20px] text-sm font-black hover:brightness-110 active:scale-95 transition-all text-white flex items-center gap-3 shadow-lg shadow-[#6ab149]/20"
        >
          {isSaving ? 'Syncing...' : <><CheckIcon className="w-6 h-6" /> Publish Changes</>}
        </button>
      </div>

    </div>
  );
}
