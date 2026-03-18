# WDU CMS - Wahana Data Utama Content Management System

A professional CMS for Wahana Data Utama built with Node.js, Express, Prisma, and Next.js.

## Tech Stack

- **Backend**: Node.js, Express, TypeScript, Prisma (PostgreSQL)
- **Frontend**: Next.js 14 (App Router), Tailwind CSS
- **Assets**: Material Symbols

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm atau yarn

## Installation

### 1. Clone dan Setup Project

```bash
# Clone repository
git clone <repo-url>
cd wdu-cms

# Install backend dependencies
cd wdu-cms/backend
npm install

# Install frontend dependencies  
cd ../wdu-cms/frontend
npm install
```

### 2. Database Setup

#### Menggunakan PostgreSQL

1. Buat database PostgreSQL:
```sql
CREATE DATABASE wdu_cms;
```

2. Konfigurasi environment variable di `backend/.env`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/wdu_cms"
PORT=3001
NODE_ENV=development
```

3. Generate Prisma Client danjalankan migration:
```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

4. (Optional) Seed data awal:
```bash
npx prisma db seed
```

#### Menggunakan SQLite (Development)

1. Ubah `backend/prisma/schema.prisma`:
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

2. Ubah `backend/.env`:
```env
DATABASE_URL="file:./dev.db"
PORT=3001
NODE_ENV=development
```

3. Generate dan migrate:
```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

## Running the Application

### Backend

```bash
cd backend
npm run dev
```

Backend akan running di `http://localhost:3001`

### Frontend

```bash
cd frontend
npm run dev
```

Frontend akan running di `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/landing` | Get all landing page content |
| POST | `/api/admin/update` | Update content (services, gallery, testimonials, global content) |

### Request Body Examples

#### Update Services
```json
{
  "section": "services",
  "data": {
    "title": "Neural Research",
    "description": "AI-driven consumer behavioral analysis",
    "icon": "query_stats",
    "link": "System Architecture"
  }
}
```

#### Update Gallery
```json
{
  "section": "gallery", 
  "data": {
    "title": "Project Alpha",
    "imageUrl": "https://example.com/image.jpg"
  }
}
```

## Project Structure

```
wdu-cms/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma      # Database schema
│   ├── src/
│   │   ├── config/
│   │   │   └── prisma.ts      # Prisma client
│   │   ├── controllers/
│   │   │   └── contentController.ts
│   │   ├── middleware/
│   │   │   └── errorMiddleware.ts
│   │   ├── routes/
│   │   │   └── contentRoutes.ts
│   │   └── app.ts             # Express app entry
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Gallery.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── Footer.tsx
│   │   └── lib/
│   │       └── api.ts        # API client
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── init_wdu.sh
├── MASTER_INSTRUCTIONS.md
└── README.md
```

## Available Scripts

### Backend
```bash
npm run dev          # Start development server
npm run build        # Build TypeScript
npm run start        # Start production server
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/wdu_cms
PORT=3001
NODE_ENV=development
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
npx kill-port 3000

# Atau gunakan port berbeda
PORT=3001 npm run dev
```

### Prisma migration error
```bash
# Reset database
npx prisma migrate reset

# Force generate
npx prisma generate --force
```

### Next.js build error
```bash
# Clean cache
rm -rf .next
npm run dev
```

## License

ISC
