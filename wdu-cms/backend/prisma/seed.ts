import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 12);
  
  await prisma.user.upsert({
    where: { email: 'admin@wdu.co.id' },
    update: {},
    create: {
      email: 'admin@wdu.co.id',
      name: 'Super Admin',
      passwordHash,
      role: 'SUPER_ADMIN',
    },
  });

  console.log('✅ Admin user: admin@wdu.co.id / admin123');

  // Seed Services - 6 Services matching frontend
  const services = [
    {
      title: 'Riset Pasar',
      description:
        'Jelajahi peluang baru dan pahami tren pasar yang akan membantu bisnis anda tetap di depan.',
      icon: 'bar_chart',
      order: 1,
      isActive: true,
    },
    {
      title: 'Analisis Data',
      description:
        'Ambil langkah cerdas dengan analisis data akurat yang memberikan panduan untuk keputusan strategis yang lebih baik.',
      icon: 'database',
      order: 2,
      isActive: true,
    },
    {
      title: 'Konsultasi IT',
      description:
        'Bergabunglah dengan kami untuk mendapatkan solusi IT inovatif yang akan mendorong transformasi digital dan kesuksesan bisnis anda.',
      icon: 'headphones',
      order: 3,
      isActive: true,
    },
    {
      title: 'Riset Data',
      description:
        'Kami memberikan riset data yang mendalam, membuka pintu bagi informasi yang mengarah pada keputusan yang lebih cerdas dan berkembang.',
      icon: 'file_bar_chart',
      order: 4,
      isActive: true,
    },
    {
      title: 'Event Organizer',
      description:
        'Manajemen acara profesional dengan pendekatan berbasis data untuk hasil yang maksimal.',
      icon: 'celebration',
      order: 5,
      isActive: true,
    },
    {
      title: 'Survei',
      description:
        'Pengumpulan data primer yang reliabel untuk memahami perilaku konsumen dan tren publik.',
      icon: 'pie_chart',
      order: 6,
      isActive: true,
    },
  ];

  for (const svc of services) {
    const existing = await prisma.service.findFirst({ where: { title: svc.title } });
    if (!existing) {
      await prisma.service.create({ data: svc });
      console.log(`✅ Service created: ${svc.title}`);
    } else {
      console.log(`⏭️  Service already exists: ${svc.title}`);
    }
  }

  // Seed Contact Messages
  const messages = [
    {
      name: 'Adrian Wijaya',
      email: 'adrian@corp.id',
      phone: '081234567890',
      subject: 'Konsultasi IT',
      message: 'Halo tim WDU, kami tertarik untuk melakukan migrasi infrastruktur ke cloud. Apakah bisa dijadwalkan meeting minggu depan? Terima kasih.',
      isRead: false,
    },
    {
      name: 'Sisca Halim',
      email: 'sisca@creative.com',
      phone: '085566778899',
      subject: 'Tanya EO',
      message: 'Inquiry about event organizing services for the upcoming gallery opening at Menteng. We need a sophisticated setup.',
      isRead: false,
    },
    {
      name: 'Bambang S.',
      email: 'bambang.s@logistik.id',
      phone: '081122334455',
      subject: 'Project Follow-up',
      message: 'Thank you for the presentation yesterday. We will review the archive and get back to you soon.',
      isRead: true,
    },
    {
      name: 'Lina Permata',
      email: 'lina@artcenter.org',
      phone: '089900112233',
      subject: 'New Archive Submission',
      message: 'A new portfolio entry has been submitted for review from the art department. Please check the attachment.',
      isRead: true,
    },
  ];

  for (const msg of messages) {
    const existing = await prisma.contactMessage.findFirst({ where: { email: msg.email, subject: msg.subject } });
    if (!existing) {
      await prisma.contactMessage.create({ data: msg });
      console.log(`✅ Message created from: ${msg.name}`);
    }
  }

  // Seed Projects - 6 default portfolio projects
  const projects = [
    {
      title: 'Digital Transformation Project',
      client: 'PT Maju Jaya',
      category: 'IT',
      year: 2025,
      description: 'Transformasi digital komprehensif untuk streamline proses bisnis.',
      imageUrl: 'https://wahanadata.co.id/wp-content/uploads/2025/01/91ff19eb-9bae-41be-bd79-86c09efa26ae.jpg',
      isHighlight: true,
      order: 1,
    },
    {
      title: 'Market Research Analytics',
      client: 'PT Berkah Sejahtera',
      category: 'Analytics',
      year: 2025,
      description: 'Riset pasar mendalam untuk understood comportement konsumen.',
      imageUrl: 'https://wahanadata.co.id/wp-content/uploads/2025/01/1384bbe7-3362-446d-b989-77114335e7ea-scaled.jpg',
      isHighlight: true,
      order: 2,
    },
    {
      title: 'Data Infrastructure Setup',
      client: 'PT Nusantara Unity',
      category: 'IT',
      year: 2024,
      description: 'Setup infrastruktur data untuk enable analytics capabilities.',
      imageUrl: 'https://wahanadata.co.id/wp-content/uploads/2025/01/433319d2-e1de-4c4f-9a80-b83df6470507-scaled.jpg',
      isHighlight: true,
      order: 3,
    },
    {
      title: 'Annual Corporate Event',
      client: 'PT Indo Corpora',
      category: 'EO',
      year: 2024,
      description: 'Pengelolaan acara tahunan dengan 500+ peserta.',
      imageUrl: 'https://wahanadata.co.id/wp-content/uploads/2025/01/feac7c05-7818-4564-951d-893e14f37bfe-scaled.jpg',
      isHighlight: true,
      order: 4,
    },
    {
      title: 'Consumer Survey Program',
      client: 'PT Selalu Bersama',
      category: 'Riset',
      year: 2024,
      description: 'Program survei konsumen untuk product improvement.',
      imageUrl: 'https://wahanadata.co.id/wp-content/uploads/2025/01/34695135-c70d-4d76-92d5-10c39eb5390f.jpg',
      isHighlight: true,
      order: 5,
    },
    {
      title: 'Business Intelligence Dashboard',
      client: 'PT Maju Bersama',
      category: 'Analytics',
      year: 2024,
      description: 'Dashboard BI untuk real-time decision making.',
      imageUrl: 'https://wahanadata.co.id/wp-content/uploads/2025/01/a3f30e87-3b43-418b-b4ba-4529ed4e895a.jpg',
      isHighlight: true,
      order: 6,
    },
  ];

  for (const proj of projects) {
    const existing = await prisma.project.findFirst({ where: { title: proj.title } });
    if (!existing) {
      await prisma.project.create({ data: proj });
      console.log(`✅ Project created: ${proj.title}`);
    } else {
      console.log(`⏭️  Project already exists: ${proj.title}`);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());