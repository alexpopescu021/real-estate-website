# Real Estate Website

A Next.js-based real estate website with admin CRUD functionality for property listings, supporting Romanian and English languages.

## Features

- **Public Browsing**: Users can browse property listings without signup
- **Admin Dashboard**: Single admin user can create, read, update, and delete properties
- **Multi-language Support**: English and Romanian translations using next-intl
- **Property Management**: Support for rent/sale properties with detailed fields
- **Contact Information**: Broker contact details displayed on property pages
- **Property Status**: Draft, Available, Reserved, and Closed status options
- **Currency Support**: Pricing in EUR and RON
- **Image Storage**: Supabase Storage for property images

## Tech Stack

- **Frontend**: Next.js 14+ with App Router, React, Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: PostgreSQL with Prisma ORM
- **Image Storage**: Supabase Storage
- **Internationalization**: next-intl
- **Authentication**: Simple session-based auth for admin

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Supabase account (for image storage)
- npm, yarn, pnpm, or bun

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/realestate"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"

# Admin Credentials
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your-secure-password"
```

### 3. Database Setup

Generate Prisma client and run migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Create a storage bucket named `properties`
3. Configure CORS settings to allow your domain
4. Copy your Supabase URL and anon key to the `.env` file

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

### Public Access

- Visit `/` to see the home page
- Visit `/listings` to browse all available properties
- Visit `/listings/[id]` to view property details
- Visit `/search` to search and filter properties
- Use the language switcher (EN/RO) to change language

### Admin Access

1. Visit `/admin/login`
2. Enter admin credentials (from environment variables)
3. Access dashboard at `/admin/dashboard`
4. Manage properties at `/admin/listings`
5. Create new properties at `/admin/listings/new`
6. Edit properties at `/admin/listings/[id]/edit`

## Project Structure

```
real-estate-website/
├── app/
│   ├── [locale]/
│   │   ├── (public)/
│   │   │   ├── page.tsx          # Home page
│   │   │   ├── listings/
│   │   │   │   ├── page.tsx      # All listings
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx  # Property detail
│   │   │   └── search/
│   │   │       └── page.tsx      # Search page
│   │   ├── (admin)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx      # Admin login
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx      # Admin dashboard
│   │   │   └── listings/
│   │   │       ├── page.tsx      # All properties
│   │   │       ├── new/
│   │   │       │   └── page.tsx  # Create property
│   │   │       └── [id]/
│   │   │           ├── page.tsx  # View property
│   │   │           └── edit/
│   │   │               └── page.tsx  # Edit property
│   │   └── layout.tsx            # Locale layout
│   ├── api/
│   │   └── admin/
│   │       ├── login/
│   │       │   └── route.ts      # Login API
│   │       └── properties/
│   │           ├── route.ts       # Create property
│   │           └── [id]/
│   │               └── route.ts   # Get/Update/Delete property
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Redirect to /en
├── components/
│   ├── ui/                       # shadcn/ui components
│   └── LanguageSwitcher.tsx      # Language switcher
├── lib/
│   ├── prisma.ts                 # Prisma client
│   ├── supabase.ts               # Supabase client
│   └── auth.ts                   # Auth utilities
├── messages/
│   ├── en.json                   # English translations
│   └── ro.json                   # Romanian translations
├── prisma/
│   └── schema.prisma             # Database schema
└── middleware.ts                 # i18n middleware
```

## Database Schema

The Property model includes:
- Basic info: title, description, price, currency, area
- Location: city, street, building, apartment, coordinates
- Property details: rooms, bedrooms, bathrooms, floor, year built
- Contact: broker name, email, phone
- Status: draft, available, reserved, closed
- Transaction type: rent, sale
- Property type: apartment, house, land, commercial, office
- Images: array of image URLs

## Deployment

### Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

Ensure your platform supports:
- Node.js 18+
- PostgreSQL database
- Environment variables

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app)
- [shadcn/ui Documentation](https://ui.shadcn.com)
