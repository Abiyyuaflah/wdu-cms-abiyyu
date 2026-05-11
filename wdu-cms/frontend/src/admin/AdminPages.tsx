import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Animation variants
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 }
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.03, staggerDirection: -1 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any }
    },
    exit: {
      opacity: 0, y: -15, scale: 0.97,
      transition: { duration: 0.3 }
    }
  };

  const modalBackdropVariants: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const modalPanelVariants: any = {
    hidden: { opacity: 0, scale: 0.92, y: 30 },
    visible: { 
      opacity: 1, scale: 1, y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any }
    },
    exit: { 
      opacity: 0, scale: 0.95, y: 10,
      transition: { duration: 0.2, ease: 'easeIn' }
    }
  };

  const toastVariants: any = {
    hidden: { opacity: 0, x: 80, scale: 0.95 },
    visible: { 
      opacity: 1, x: 0, scale: 1,
      transition: { type: 'spring', stiffness: 400, damping: 30 }
    },
    exit: { 
      opacity: 0, x: 80, scale: 0.95,
      transition: { duration: 0.2, ease: 'easeIn' }
    }
  };

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
      {
        id: 'p2',
        name: 'Intro Pengalaman',
        type: 'Intro',
        status: 'Published',
        content: {
          badge: 'Pengalaman',
          title: 'Portofolio & Keberhasilan',
          description: 'Kami telah berhasil menyelesaikan berbagai proyek strategis untuk berbagai instansi pemerintah dan perusahaan swasta.',
          image: 'https://wahanadata.co.id/wp-content/uploads/2025/01/34695135-c70d-4d76-92d5-10c39eb5390f.jpg'
        }
      },
      {
        id: 'p3',
        name: 'Klien Unggulan 2024',
        type: 'Clients',
        status: 'Published',
        content: {
          badge: 'Leading Partners',
          title: '2024',
          clients: [
            { name: 'BPK', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/bpk-150x150.png' },
            { name: 'BPOM', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/bpom-1-300x205.png' },
            { name: 'BKPM', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/bkpm-1-300x205.png' },
            { name: 'Kominfo', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/Kominfo-e1737704377593-251x300.png' },
            { name: 'Paljaya', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/paljaya-300x300.png' },
          ]
        }
      },
      {
        id: 'p4',
        name: 'Timeline Perjalanan',
        type: 'Timeline',
        status: 'Published',
        content: {
          title: 'Perjalanan Kami',
          entries: [
            {
              year: '2023',
              logos: [
                { name: 'BPK', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/bpk-square-300x300.png', isActive: true },
                { name: 'STM Yogya', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/stm-yogya-square-300x300.png', isActive: true },
                { name: 'Transpakuan', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/transpakuan-square-resized-300x300.png', isActive: true },
                { name: 'Paljaya', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/paljaya-300x300.png', isActive: true },
                { name: 'Kominfo', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/Kominfo-e1737704377593-251x300.png', isActive: true },
              ]
            },
            {
              year: '2022',
              logos: [
                { name: 'BUMN', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/bumn-square-300x300.png', isActive: true },
                { name: 'Jakarta', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/jakarta-square-300x300.png', isActive: true },
                { name: 'KPK', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/kpk-square-300x300.png', isActive: true },
                { name: 'BPK', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/bpk-square-300x300.png', isActive: true },
                { name: 'Perpusnas', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/perpusnas-square-300x300.png', isActive: true },
                { name: 'Blora', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/blora-square-300x300.png', isActive: true },
                { name: 'Injiniring', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/injiniring-square-300x300.png', isActive: true },
                { name: 'Pakuan Jaya', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/pakuan-jaya-square-300x300.png', isActive: true },
                { name: 'Kominfo', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/kominfo-old-square-300x300.png', isActive: true },
                { name: 'BKPM', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/bkpm-square-300x300.png', isActive: true },
              ]
            },
            {
              year: '2021',
              logos: [
                { name: 'BPOM', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/bpom-1-300x205.png', isActive: true },
                { name: 'Kominfo', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/Kominfo-e1737704377593-251x300.png', isActive: true },
                { name: 'BPK', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/bpk-square-300x300.png', isActive: true },
                { name: 'KPK', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/kpk-square-300x300.png', isActive: true },
                { name: 'Kemendes', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/kemendes-square-300x300.png', isActive: true },
                { name: 'Pakuan Jaya', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/pakuan-jaya-square-300x300.png', isActive: true },
                { name: 'BKPM', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/bkpm-square-300x300.png', isActive: true },
              ]
            },
            {
              year: '2020',
              logos: [
                { name: 'BPK', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/bpk-150x150.png', isActive: true },
                { name: 'Kemendes', img: 'https://wahanadata.co.id/wp-content/uploads/2025/01/kemendes-square-300x300.png', isActive: true },
              ]
            },
          ]
        }
      },
      {
        id: 'p5',
        name: 'Monolith Strategis',
        type: 'Editorial',
        status: 'Published',
        content: {
          headline: 'Strategic Excellence',
          paragraph1: 'Dengan komitmen yang kuat terhadap inovasi dan keakuratan data, Wahana Data Utama siap menjadi mitra terpercaya bagi bisnis dan organisasi dalam mengambil keputusan berbasis informasi. Di era digital yang semakin kompleks, kami terus berinovasi dengan teknologi terkini untuk menghadirkan solusi yang relevan, akurat, dan berdampak nyata. Kepercayaan klien adalah prioritas utama kami, dan dengan pengalaman bertahun-tahun serta tim profesional yang andal, kami berkomitmen untuk membantu berbagai sektor mengoptimalkan strategi bisnis mereka.',
          paragraph2: 'Bersama Wahana Data Utama, Anda tidak hanya mendapatkan data, tetapi juga wawasan strategis yang mendorong pertumbuhan dan kesuksesan jangka panjang. Mari melangkah ke masa depan dengan strategi yang lebih cerdas, efisien, dan berdaya saing tinggi!',
          bgImage: 'https://wahanadata.co.id/wp-content/uploads/2025/01/34695135-c70d-4d76-92d5-10c39eb5390f.jpg'
        }
      }
    ],
    'Kontak': [
      {
        id: 'k1',
        name: 'Hero Kontak',
        type: 'Hero',
        status: 'Published',
        content: {
          badge: 'Hubungi Kami',
          headline: 'Siap\nMembantu\nAnda',
          description: 'Jangan ragu untuk menghubungi kami. Tim profesional kami siap memberikan konsultasi dan menjawab pertanyaan Anda.',
          stats: [
            { value: '24/7', label: 'Dukungan' },
            { value: '< 1 Jam', label: 'Respon Time' },
            { value: '100%', label: 'Professional' },
          ],
          bgImage: 'https://wahanadata.co.id/wp-content/uploads/elementor/thumbs/kontak-header-r02xh9skmo5ipym1j4rohxyhov5sjnraxkbp516srk.jpg',
          ctaText: 'Hubungi Sekarang',
          ctaLink: 'https://wa.me/62881012394686'
        }
      },
      {
        id: 'k2',
        name: 'Form & Info Kontak',
        type: 'Form',
        status: 'Published',
        content: {
          title: 'Hubungi Kami',
          subtitle: 'Dapatkan segala informasi dengan menghubungi kami!',
          contactInfo: [
            { title: 'Alamat Kantor', icon: 'location_on', content: 'Blok AE No. 01, Jl. Terapi Raya, RT 03/19, Menteng. Kec. Bogor Barat, Kota Bogor, Jawa Barat 1611' },
            { title: 'Email Resmi', icon: 'alternate_email', content: 'wahanadata@yahoo.com\nit.support@wahanadata.co.id' },
            { title: 'Layanan Telepon', icon: 'headset_mic', content: '(0251) 7564 109\n+62 812 8740 8806' },
          ],
          image: 'https://wahanadata.co.id/wp-content/uploads/2025/01/kontak-modified-768x474.png',
          formTitle: 'Kami dengan senang hati siap membahas kebutuhan Anda. Silakan hubungi kami melalui informasi kontak di bawah ini.',
          apiEndpoint: '/api/v1/contact'
        }
      },
      {
        id: 'k3',
        name: 'Peta Lokasi (Google Maps)',
        type: 'Map',
        status: 'Published',
        content: {
          title: 'Kunjungi Kami',
          subtitle: 'Kami berlokasi di pusat strategis Bogor Barat.',
          mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.325583333333!2d106.7764606!3d-6.5776568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c45a76630bef%3A0xcc4ae8ae1ccf277f!2sPT.%20Wahana%20Data%20Utama!5e0!3m2!1sen!2sid!4v1700000000000',
          mapLabel: 'Bogor Barat',
          ctaText: 'Buka Navigasi',
          ctaLink: 'https://maps.google.com/?q=Wahana+Data+Utama+Bogor'
        }
      }
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
    
    // Sync Pengalaman data ke wdu_admin_settings untuk ExperiencePage
    const pengalamanSections = pageData['Pengalaman'] || [];
    const introSection = pengalamanSections.find(s => s.id === 'p2');
    const clientsSection = pengalamanSections.find(s => s.id === 'p3');
    const timelineSection = pengalamanSections.find(s => s.id === 'p4');
    
    const existingSettings = (() => {
      try {
        return JSON.parse(localStorage.getItem('wdu_admin_settings') || '{}');
      } catch { return {}; }
    })();
    
    // Map Hero Experience dari Intro (p2) — p1 sudah dihapus
    if (introSection?.content) {
      existingSettings.heroes = existingSettings.heroes || {};
      existingSettings.heroes.experience = {
        badgeText: introSection.content.badge || 'Pengalaman',
        headline: [introSection.content.title || 'Portofolio & Keberhasilan'],
        description: introSection.content.description || '',
        stats: [],
        bgImage: introSection.content.image || '',
        ctaText: '',
        ctaLink: ''
      };
    }

    // Map Timeline (p3 Klien 2024 + p4 Timeline Perjalanan)
    existingSettings.generalSetting = existingSettings.generalSetting || {};
    const timeline: any[] = [];
    
    // Add 2024 entry from Clients section
    if (clientsSection?.content?.clients) {
      timeline.push({
        year: clientsSection.content.title || '2024',
        logos: clientsSection.content.clients.map((c: any) => ({ name: c.name, img: c.img, isActive: true }))
      });
    }
    
    // Add timeline entries from Timeline section
    if (timelineSection?.content?.entries) {
      timelineSection.content.entries.forEach((entry: any) => {
        if (!timeline.find((t: any) => t.year === entry.year)) {
          timeline.push({
            year: entry.year,
            logos: entry.logos.map((l: any) => ({ name: l.name, img: l.img, isActive: l.isActive !== false }))
          });
        }
      });
    }
    
    // Sort descending by year
    timeline.sort((a: any, b: any) => parseInt(b.year) - parseInt(a.year));
    existingSettings.generalSetting.timeline = timeline;
    
    // Sync Kontak data ke wdu_admin_settings untuk ContactPage
    const kontakSections = pageData['Kontak'] || [];
    const heroKontak = kontakSections.find(s => s.id === 'k1');
    const formSection = kontakSections.find(s => s.id === 'k2');
    const mapSection = kontakSections.find(s => s.id === 'k3');
    
    // Map Hero Kontak
    if (heroKontak?.content) {
      existingSettings.heroes = existingSettings.heroes || {};
      existingSettings.heroes.contact = {
        badgeText: heroKontak.content.badge || 'Hubungi Kami',
        headline: (heroKontak.content.headline || 'Siap Membantu Anda').split('\n').filter((l: string) => l.trim() !== ''),
        description: heroKontak.content.description || '',
        stats: heroKontak.content.stats || [],
        bgImage: heroKontak.content.bgImage || '',
        ctaText: heroKontak.content.ctaText || '',
        ctaLink: heroKontak.content.ctaLink || ''
      };
    }
    
    // Map Form & Info
    existingSettings.contactPage = existingSettings.contactPage || {};
    if (formSection?.content) {
      existingSettings.contactPage.form = {
        title: formSection.content.title || '',
        subtitle: formSection.content.subtitle || '',
        contactInfo: formSection.content.contactInfo || [],
        image: formSection.content.image || '',
        formTitle: formSection.content.formTitle || '',
        apiEndpoint: formSection.content.apiEndpoint || '/api/v1/contact'
      };
    }
    
    // Map Peta Lokasi
    if (mapSection?.content) {
      existingSettings.contactPage.map = {
        title: mapSection.content.title || '',
        subtitle: mapSection.content.subtitle || '',
        mapSrc: mapSection.content.mapSrc || '',
        mapLabel: mapSection.content.mapLabel || '',
        ctaText: mapSection.content.ctaText || '',
        ctaLink: mapSection.content.ctaLink || ''
      };
    }
    
    localStorage.setItem('wdu_admin_settings', JSON.stringify(existingSettings));
    
    // Trigger storage event for other tabs
    window.dispatchEvent(new Event('storage'));
    
    setTimeout(() => {
      setIsSaving(false);
      setToast({ message: 'Semua perubahan berhasil disimpan!', type: 'success' });
      setTimeout(() => setToast(null), 3000);
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
                  <motion.button
                    key={item.name}
                    onClick={() => setActivePage(item.name)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className={`px-6 py-2.5 rounded-xl text-xs font-black transition-colors duration-200 uppercase tracking-widest ${
                      activePage === item.name 
                      ? 'bg-[#6ab149] text-white shadow-lg shadow-[#6ab149]/20' 
                      : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
              <motion.button 
                onClick={handlePreview}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="bg-white border border-gray-200 hover:bg-gray-50 px-6 py-3 rounded-2xl text-xs font-black text-gray-700 transition-colors duration-200 shadow-sm flex items-center gap-2 uppercase tracking-widest"
              >
                <motion.span
                  animate={{ rotate: [0, 0, 0] }}
                  whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
                >
                  <EyeOpenIcon />
                </motion.span>
                Preview
              </motion.button>
            </div>
          </div>

          {/* Bento Grid Sections */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {(pageData[activePage] || []).map((section) => (
                <motion.div
                  key={section.id}
                  variants={itemVariants}
                  layout
                  whileHover={{ y: -4, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.1)' }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative bg-white border p-6 rounded-[24px] shadow-sm hover:shadow-xl hover:border-[#6ab149]/20 ${
                    section.status === 'Draft' ? 'border-orange-200 bg-orange-50/10' : 'border-gray-200'
                  }`}
                >
                  {/* Drag handle dots */}
                  <div className="absolute top-6 right-6 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                    <DragHandleDots2Icon className="w-5 h-5" />
                  </div>

                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          section.status === 'Published' ? 'bg-[#6ab149]/10 text-[#6ab149]' : 'bg-orange-500/10 text-orange-500'
                        }`}
                      >
                        <LayersIcon />
                      </motion.div>
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
                        <motion.button
                          whileHover={{ scale: 1.08, backgroundColor: '#6ab149', color: '#fff' }}
                          whileTap={{ scale: 0.92 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          onClick={() => setShowEditModal(section)}
                          className="p-2.5 rounded-xl bg-gray-50 text-gray-600"
                        >
                          <Pencil1Icon className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.92 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          onClick={() => handleToggleStatus(activePage, section.id)}
                          className="p-2.5 rounded-xl bg-gray-50 text-gray-600"
                          title={section.status === 'Published' ? 'Set to Draft' : 'Set to Published'}
                        >
                          {section.status === 'Published' ? <EyeOpenIcon className="w-4 h-4 text-[#6ab149]" /> : <EyeNoneIcon className="w-4 h-4" />}
                        </motion.button>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.08, backgroundColor: '#fee2e2', color: '#ef4444' }}
                        whileTap={{ scale: 0.92 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        onClick={() => handleDelete(activePage, section.id)}
                        className="p-2.5 rounded-xl bg-gray-50 text-red-400"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Add Placeholder Card */}
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02, borderColor: 'rgba(106,177,73,0.4)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="border-2 border-dashed border-gray-200 rounded-[24px] flex flex-col items-center justify-center p-12 bg-transparent hover:bg-gray-50 hover:border-[#6ab149]/30 transition-colors duration-300 group"
              >
                <motion.div
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 group-hover:bg-[#6ab149]/10"
                >
                  <span className="text-2xl text-gray-400 group-hover:text-[#6ab149]">+</span>
                </motion.div>
                <p className="text-gray-500 font-medium text-sm">Add custom section here</p>
              </motion.button>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      <AnimatePresence>
        {showEditModal && (
          <motion.div
            variants={modalBackdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-xl"
          >
          <motion.div
            variants={modalPanelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden"
          >
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
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Paragraph 1</label>
                      <textarea 
                        value={showEditModal.content?.paragraph1 || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), paragraph1: e.target.value } } : s);
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), paragraph1: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none min-h-[120px] font-medium leading-relaxed" 
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
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none min-h-[120px] font-medium leading-relaxed" 
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

                {/* IF INTRO */}
                {showEditModal.type === 'Intro' && (
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
                      <textarea 
                        value={showEditModal.content?.title || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), title: e.target.value } } : s);
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), title: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none font-black min-h-[60px]" 
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
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none min-h-[100px] font-medium leading-relaxed" 
                      />
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

                {/* IF CLIENTS */}
                {showEditModal.type === 'Clients' && (
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
                    <div className="grid grid-cols-2 gap-4">
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
                          className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none font-black" 
                        />
                      </div>
                    </div>
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Client Logos</label>
                      <div className="grid grid-cols-2 gap-3">
                        {(showEditModal.content?.clients || []).map((client: any, idx: number) => (
                          <div key={idx} className="p-3 bg-gray-50 rounded-2xl border border-gray-100 space-y-2 group relative">
                            <button 
                              onClick={() => {
                                const newClients = [...showEditModal.content.clients];
                                newClients.splice(idx, 1);
                                const newData = { ...pageData };
                                newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, clients: newClients } } : s);
                                setPageData(newData);
                                setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, clients: newClients } });
                              }}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all z-10"
                            >
                              <TrashIcon className="w-3 h-3" />
                            </button>
                            <div className="h-14 flex items-center justify-center bg-white rounded-xl border p-2">
                              <img src={client.img} className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all" alt="" />
                            </div>
                            <input 
                              type="text" 
                              value={client.name} 
                              onChange={(e) => {
                                const newClients = [...showEditModal.content.clients];
                                newClients[idx].name = e.target.value;
                                const newData = { ...pageData };
                                newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, clients: newClients } } : s);
                                setPageData(newData);
                                setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, clients: newClients } });
                              }}
                              className="w-full text-[9px] font-black outline-none bg-transparent text-center" 
                              placeholder="Client Name" 
                            />
                            <input 
                              type="text" 
                              value={client.img} 
                              onChange={(e) => {
                                const newClients = [...showEditModal.content.clients];
                                newClients[idx].img = e.target.value;
                                const newData = { ...pageData };
                                newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, clients: newClients } } : s);
                                setPageData(newData);
                                setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, clients: newClients } });
                              }}
                              className="w-full text-[8px] text-gray-400 outline-none bg-transparent truncate text-center" 
                              placeholder="Logo URL" 
                            />
                          </div>
                        ))}
                        <button 
                          onClick={() => {
                            const newClients = [...(showEditModal.content?.clients || []), { name: 'New Client', img: '' }];
                            const newData = { ...pageData };
                            newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), clients: newClients } } : s);
                            setPageData(newData);
                            setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), clients: newClients } });
                          }}
                          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-4 text-gray-400 hover:border-[#6ab149] hover:text-[#6ab149] transition-all"
                        >
                          <span className="text-xl">+</span>
                          <span className="text-[9px] font-bold">Add Client</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* IF TIMELINE */}
                {showEditModal.type === 'Timeline' && (
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
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Timeline Entries (Years)</label>
                      <div className="space-y-6">
                        {(showEditModal.content?.entries || []).map((entry: any, yearIdx: number) => (
                          <div key={yearIdx} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 space-y-4 group relative">
                            <button 
                              onClick={() => {
                                const newEntries = [...showEditModal.content.entries];
                                newEntries.splice(yearIdx, 1);
                                const newData = { ...pageData };
                                newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, entries: newEntries } } : s);
                                setPageData(newData);
                                setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, entries: newEntries } });
                              }}
                              className="absolute top-3 right-3 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg z-10"
                            >
                              <TrashIcon className="w-3 h-3" />
                            </button>
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Year</span>
                              <input 
                                type="text" 
                                value={entry.year} 
                                onChange={(e) => {
                                  const newEntries = [...showEditModal.content.entries];
                                  newEntries[yearIdx].year = e.target.value;
                                  const newData = { ...pageData };
                                  newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, entries: newEntries } } : s);
                                  setPageData(newData);
                                  setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, entries: newEntries } });
                                }}
                                className="px-4 py-2 rounded-xl border border-gray-200 bg-white outline-none font-black text-lg w-24 text-center" 
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Client Logos</label>
                              <div className="grid grid-cols-3 gap-2">
                                {(entry.logos || []).map((logo: any, logoIdx: number) => (
                                  <div key={logoIdx} className="p-2 bg-white rounded-xl border border-gray-100 space-y-1 group/logo relative">
                                    <button 
                                      onClick={() => {
                                        const newEntries = [...showEditModal.content.entries];
                                        newEntries[yearIdx].logos.splice(logoIdx, 1);
                                        const newData = { ...pageData };
                                        newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, entries: newEntries } } : s);
                                        setPageData(newData);
                                        setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, entries: newEntries } });
                                      }}
                                      className="absolute -top-1.5 -right-1.5 p-0.5 bg-red-500 text-white rounded-full opacity-0 group-hover/logo:opacity-100 transition-all z-10"
                                    >
                                      <Cross1Icon className="w-2.5 h-2.5" />
                                    </button>
                                    <div className="h-8 flex items-center justify-center">
                                      <img src={logo.img} className="max-h-full max-w-full object-contain" alt="" />
                                    </div>
                                    <input 
                                      type="text" 
                                      value={logo.name} 
                                      onChange={(e) => {
                                        const newEntries = [...showEditModal.content.entries];
                                        newEntries[yearIdx].logos[logoIdx].name = e.target.value;
                                        const newData = { ...pageData };
                                        newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, entries: newEntries } } : s);
                                        setPageData(newData);
                                        setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, entries: newEntries } });
                                      }}
                                      className="w-full text-[8px] font-bold outline-none bg-transparent text-center" 
                                      placeholder="Name" 
                                    />
                                    <input 
                                      type="text" 
                                      value={logo.img} 
                                      onChange={(e) => {
                                        const newEntries = [...showEditModal.content.entries];
                                        newEntries[yearIdx].logos[logoIdx].img = e.target.value;
                                        const newData = { ...pageData };
                                        newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, entries: newEntries } } : s);
                                        setPageData(newData);
                                        setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, entries: newEntries } });
                                      }}
                                      className="w-full text-[7px] text-gray-400 outline-none bg-transparent truncate text-center" 
                                      placeholder="Logo URL" 
                                    />
                                  </div>
                                ))}
                                <button 
                                  onClick={() => {
                                    const newEntries = [...showEditModal.content.entries];
                                    newEntries[yearIdx].logos.push({ name: 'New Client', img: '', isActive: true });
                                    const newData = { ...pageData };
                                    newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, entries: newEntries } } : s);
                                    setPageData(newData);
                                    setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, entries: newEntries } });
                                  }}
                                  className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-2 text-gray-400 hover:border-[#6ab149] hover:text-[#6ab149] transition-all min-h-[80px]"
                                >
                                  <span className="text-lg">+</span>
                                  <span className="text-[8px] font-bold">Add Logo</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        <button 
                          onClick={() => {
                            const newEntries = [...(showEditModal.content?.entries || []), { year: String(new Date().getFullYear()), logos: [] }];
                            const newData = { ...pageData };
                            newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), entries: newEntries } } : s);
                            setPageData(newData);
                            setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), entries: newEntries } });
                          }}
                          className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-[10px] font-bold text-gray-400 hover:border-[#6ab149] hover:text-[#6ab149] transition-all"
                        >
                          + Add New Year Entry
                        </button>
                      </div>
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

                {/* IF FORM */}
                {showEditModal.type === 'Form' && (
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
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Subtitle</label>
                      <textarea 
                        value={showEditModal.content?.subtitle || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), subtitle: e.target.value } } : s);
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), subtitle: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none min-h-[80px] font-medium" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Form Title (above form)</label>
                      <textarea 
                        value={showEditModal.content?.formTitle || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), formTitle: e.target.value } } : s);
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), formTitle: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none min-h-[60px] font-medium" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Decorative Image URL</label>
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
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">API Endpoint</label>
                      <input 
                        type="text" 
                        value={showEditModal.content?.apiEndpoint || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), apiEndpoint: e.target.value } } : s);
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), apiEndpoint: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none text-xs font-mono" 
                      />
                    </div>
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Contact Info Cards</label>
                      <div className="space-y-3">
                        {(showEditModal.content?.contactInfo || []).map((info: any, idx: number) => (
                          <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3 group relative">
                            <button 
                              onClick={() => {
                                const newContactInfo = [...showEditModal.content.contactInfo];
                                newContactInfo.splice(idx, 1);
                                const newData = { ...pageData };
                                newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, contactInfo: newContactInfo } } : s);
                                setPageData(newData);
                                setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, contactInfo: newContactInfo } });
                              }}
                              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg z-10"
                            >
                              <TrashIcon className="w-3 h-3" />
                            </button>
                            <div className="grid grid-cols-3 gap-3">
                              <input 
                                type="text" 
                                value={info.icon} 
                                onChange={(e) => {
                                  const newContactInfo = [...showEditModal.content.contactInfo];
                                  newContactInfo[idx].icon = e.target.value;
                                  const newData = { ...pageData };
                                  newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, contactInfo: newContactInfo } } : s);
                                  setPageData(newData);
                                  setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, contactInfo: newContactInfo } });
                                }}
                                className="text-[10px] font-black text-[#6ab149] bg-transparent outline-none uppercase" 
                                placeholder="Icon Name" 
                              />
                              <input 
                                type="text" 
                                value={info.title} 
                                onChange={(e) => {
                                  const newContactInfo = [...showEditModal.content.contactInfo];
                                  newContactInfo[idx].title = e.target.value;
                                  const newData = { ...pageData };
                                  newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, contactInfo: newContactInfo } } : s);
                                  setPageData(newData);
                                  setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, contactInfo: newContactInfo } });
                                }}
                                className="text-[10px] font-black bg-transparent outline-none" 
                                placeholder="Card Title" 
                              />
                            </div>
                            <textarea 
                              value={info.content} 
                              onChange={(e) => {
                                const newContactInfo = [...showEditModal.content.contactInfo];
                                newContactInfo[idx].content = e.target.value;
                                const newData = { ...pageData };
                                newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...s.content, contactInfo: newContactInfo } } : s);
                                setPageData(newData);
                                setShowEditModal({ ...showEditModal, content: { ...showEditModal.content, contactInfo: newContactInfo } });
                              }}
                              className="w-full text-[11px] text-gray-500 bg-transparent outline-none leading-relaxed min-h-[60px]" 
                              placeholder="Contact detail content" 
                            />
                          </div>
                        ))}
                        <button 
                          onClick={() => {
                            const newContactInfo = [...(showEditModal.content?.contactInfo || []), { title: 'New Info', icon: 'info', content: '' }];
                            const newData = { ...pageData };
                            newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), contactInfo: newContactInfo } } : s);
                            setPageData(newData);
                            setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), contactInfo: newContactInfo } });
                          }}
                          className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-[10px] font-bold text-gray-400 hover:border-[#6ab149] hover:text-[#6ab149] transition-all"
                        >
                          + Add New Contact Info
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* IF MAP */}
                {showEditModal.type === 'Map' && (
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
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Subtitle</label>
                      <textarea 
                        value={showEditModal.content?.subtitle || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), subtitle: e.target.value } } : s);
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), subtitle: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none min-h-[60px] font-medium" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Google Maps Embed URL</label>
                      <textarea 
                        value={showEditModal.content?.mapSrc || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), mapSrc: e.target.value } } : s);
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), mapSrc: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none min-h-[60px] font-mono text-xs" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Map Label</label>
                        <input 
                          type="text" 
                          value={showEditModal.content?.mapLabel || ''}
                          onChange={(e) => {
                            const newData = { ...pageData };
                            newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), mapLabel: e.target.value } } : s);
                            setPageData(newData);
                            setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), mapLabel: e.target.value } });
                          }}
                          className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none font-bold" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">CTA Button Text</label>
                        <input 
                          type="text" 
                          value={showEditModal.content?.ctaText || ''}
                          onChange={(e) => {
                            const newData = { ...pageData };
                            newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), ctaText: e.target.value } } : s);
                            setPageData(newData);
                            setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), ctaText: e.target.value } });
                          }}
                          className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none font-bold" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">CTA Button Link</label>
                      <input 
                        type="text" 
                        value={showEditModal.content?.ctaLink || ''}
                        onChange={(e) => {
                          const newData = { ...pageData };
                          newData[activePage] = newData[activePage].map(s => s.id === showEditModal.id ? { ...s, content: { ...(s.content || {}), ctaLink: e.target.value } } : s);
                          setPageData(newData);
                          setShowEditModal({ ...showEditModal, content: { ...(showEditModal.content || {}), ctaLink: e.target.value } });
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none" 
                      />
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Footer Modal */}
            <div className="p-8 bg-gray-50 flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                onClick={() => setShowEditModal(null)} 
                className="flex-1 py-4 font-black text-gray-500 hover:bg-gray-200 rounded-2xl transition-colors duration-200 uppercase text-xs tracking-widest"
              >
                Discard
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -12px rgba(106,177,73,0.4)' }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                onClick={() => {
                  handleSaveAll();
                  setShowEditModal(null);
                }} 
                className="flex-1 py-4 bg-[#6ab149] text-white font-black rounded-2xl shadow-xl shadow-[#6ab149]/20 hover:brightness-110 transition-all uppercase text-xs tracking-widest"
              >
                Save Changes
              </motion.button>
            </div>
          </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Save Notifier */}
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.95 }}
        animate={{ opacity: isSaving ? 0 : 1, y: isSaving ? 20 : 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={`fixed bottom-10 right-10 bg-white p-4 pl-6 rounded-3xl flex items-center gap-10 shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-gray-100 ${
          isSaving ? 'pointer-events-none' : ''
        }`}
      >
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
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: '0 20px 40px -12px rgba(106,177,73,0.5)' }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onClick={handleSaveAll}
          disabled={isSaving}
          className="bg-[#6ab149] px-8 py-3.5 rounded-[20px] text-sm font-black hover:brightness-110 text-white flex items-center gap-3 shadow-lg shadow-[#6ab149]/20"
        >
          {isSaving ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <CheckIcon className="w-6 h-6" />
            </motion.span>
          ) : (
            <><CheckIcon className="w-6 h-6" /> Publish Changes</>
          )}
        </motion.button>
      </motion.div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.message}
            variants={toastVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-6 right-6 z-[100] bg-white rounded-2xl shadow-2xl border border-gray-100 px-6 py-4 flex items-center gap-4"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              toast.type === 'success' ? 'bg-[#6ab149]/10 text-[#6ab149]' : 'bg-red-500/10 text-red-500'
            }`}>
              {toast.type === 'success' ? (
                <motion.span
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <CheckIcon className="w-4 h-4" />
                </motion.span>
              ) : (
                <Cross1Icon className="w-4 h-4" />
              )}
            </div>
            <div>
              <p className="text-sm font-black text-gray-900">{toast.message}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">System Notification</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setToast(null)}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Cross1Icon className="w-3 h-3 text-gray-400" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
