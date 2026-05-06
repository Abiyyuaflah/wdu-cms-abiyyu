const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const pages = [
  { slug: 'home', title: 'Home', metaTitle: 'WDU - Wahana Data Utama', metaDesc: 'Precision Data Architecture for Your Success.', sections: {} },
  { slug: 'tentang-kami', title: 'Tentang Kami', metaTitle: 'Tentang Kami - WDU', metaDesc: 'Pelajari lebih lanjut tentang Wahana Data Utama.', sections: {} },
  { slug: 'layanan', title: 'Layanan', metaTitle: 'Layanan Kami - WDU', metaDesc: 'Solusi data arsitektur presisi untuk bisnis Anda.', sections: {} },
  { slug: 'portfolio', title: 'Portfolio', metaTitle: 'Portfolio - WDU', metaDesc: 'Pengalaman dan keberhasilan project kami.', sections: {} },
  { slug: 'kontak', title: 'Kontak', metaTitle: 'Hubungi Kami - WDU', metaDesc: 'Hubungi tim ahli kami untuk konsultasi gratis.', sections: {} },
  { slug: 'riset-pasar', title: 'Riset Pasar', metaTitle: 'Riset Pasar - WDU', metaDesc: 'Layanan riset pasar profesional.', sections: {} },
  { slug: 'analisis-data', title: 'Analisis Data', metaTitle: 'Analisis Data - WDU', metaDesc: 'Analisis data mendalam untuk pengambilan keputusan.', sections: {} },
  { slug: 'konsultasi-it', title: 'Konsultasi IT', metaTitle: 'Konsultasi IT - WDU', metaDesc: 'Solusi teknologi tepat guna untuk perusahaan.', sections: {} },
  { slug: 'riset-data', title: 'Riset Data', metaTitle: 'Riset Data - WDU', metaDesc: 'Eksplorasi data untuk wawasan bisnis.', sections: {} },
  { slug: 'event-organizer', title: 'Event Organizer', metaTitle: 'Event Organizer - WDU', metaDesc: 'Penyelenggara acara berbasis data.', sections: {} },
  { slug: 'survei', title: 'Survei', metaTitle: 'Survei - WDU', metaDesc: 'Layanan survei dan pengumpulan data lapangan.', sections: {} },
  { slug: 'sis-wdu', title: 'SIS WDU', metaTitle: 'SIS WDU - Coming Soon', metaDesc: 'Sistem Informasi Strategis Wahana Data Utama.', sections: {} },
  { slug: 'privacy-policy', title: 'Privacy Policy', metaTitle: 'Kebijakan Privasi - WDU', metaDesc: 'Bagaimana kami menjaga privasi data Anda.', sections: {} },
  { slug: 'terms-of-service', title: 'Terms of Service', metaTitle: 'Syarat & Ketentuan - WDU', metaDesc: 'Syarat dan ketentuan penggunaan layanan WDU.', sections: {} },
];

async function main() {
  console.log('Seeding pages...');
  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {},
      create: {
        ...page,
        isPublished: true,
      },
    });
  }
  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
