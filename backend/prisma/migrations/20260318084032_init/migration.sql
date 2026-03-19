-- CreateTable
CREATE TABLE "GlobalContent" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "heroHeadline" TEXT NOT NULL DEFAULT 'Data is Dynamic.',
    "heroSubtext" TEXT NOT NULL DEFAULT 'Wahana Data Utama architects intelligence. We bridge the gap between complex raw data and high-velocity business growth.',
    "aboutTitle" TEXT NOT NULL DEFAULT 'Human Intuition. Machine Precision.',
    "aboutText" TEXT NOT NULL DEFAULT 'Founded in 2006, we''ve evolved from a research powerhouse into a digital transformation catalyst.',
    "address" TEXT NOT NULL DEFAULT 'SCBD Sector 7, Jakarta Digital District, ID 12190',
    "email" TEXT NOT NULL DEFAULT 'uplink@wahanadata.tech',
    "phone" TEXT NOT NULL DEFAULT '+62 (21) 1234 5678',
    "footerText" TEXT NOT NULL DEFAULT 'Architecting the future of intelligence through sustainable data-driven ecosystems since 2006.',

    CONSTRAINT "GlobalContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gallery" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" SERIAL NOT NULL,
    "quote" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorRole" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);
