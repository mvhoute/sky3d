# Sky3D - 3D Printing Portfolio Website

A modern portfolio website for showcasing and selling 3D printed products, built with React, TypeScript, and Strapi CMS.

## Project Structure

```
sky3d/
├── frontend/          # React + TypeScript + Vite + Tailwind CSS
├── backend/           # Strapi CMS
└── docs/             # Documentation
```

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing

### Backend
- **Strapi v5** - Headless CMS
- **SQLite** - Database (development)
- **PostgreSQL** - Database (production, recommended)

## Getting Started

### Prerequisites
- Node.js 18+ LTS
- npm or yarn

### Development Setup

#### 1. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

#### 2. Backend Setup

```bash
cd backend
npm install
npm run develop
```

The Strapi admin panel will be available at `http://localhost:1337/admin`

**First time setup:**
1. Create an admin account when prompted
2. Configure content types (see below)

### Configure Strapi Content Types

#### Product Content Type
1. Go to Content-Type Builder → Create new collection type → "Product"
2. Add fields:
   - `title` (Text, required)
   - `description` (Rich text)
   - `price` (Number, decimal, required)
   - `featured` (Boolean, default: false)
   - `inStock` (Boolean, default: true)
   - `images` (Media, multiple files)
3. Save and the server will restart

#### Order Content Type
1. Create new collection type → "Order"
2. Add fields:
   - `customerName` (Text, required)
   - `customerEmail` (Email, required)
   - `customerPhone` (Text)
   - `customerMessage` (Long text)
   - `product` (Relation: Order has one Product)
   - `status` (Enumeration: new, processing, completed, cancelled)
3. Save

#### Set Permissions
1. Go to Settings → Users & Permissions → Roles → Public
2. Enable permissions:
   - **Product**: `find`, `findOne`
   - **Order**: `create`
3. Save

## Features

- 📱 Responsive design (mobile-first)
- 🎨 Modern, clean UI with Tailwind CSS
- 🖼️ Image gallery with thumbnails for products
- 📝 Easy-to-use CMS for managing products
- 📧 Contact/order form
- ⚡ Fast performance with Vite
- 🔒 Type-safe with TypeScript

## Pages

- **Home** (`/`) - Landing page with hero section
- **Products** (`/producten`) - Product listing page
- **Product Detail** (`/producten/:id`) - Individual product page with gallery
- **About** (`/over-ons`) - About page

## Environment Variables

### Frontend `.env`
```
VITE_API_URL=http://localhost:1337
```

### Backend `.env`
Created automatically by Strapi. Update for production deployment.

## Building for Production

### Frontend
```bash
cd frontend
npm run build
```
Production files will be in `frontend/dist/`

### Backend
```bash
cd backend
NODE_ENV=production npm run build
NODE_ENV=production npm start
```

## Deployment on Raspberry Pi 5

See [docs/deployment.md](docs/deployment.md) for detailed deployment instructions.

### Quick Overview
1. Install Node.js 18+ on Raspberry Pi
2. Install PostgreSQL
3. Install PM2 for process management
4. Deploy frontend (static files) to nginx
5. Run Strapi backend with PM2
6. Configure nginx proxy manager for SSL and routing

## Development Roadmap

### Phase 1: Setup & Foundation ✅
- [x] Initialize frontend with Vite + React + TypeScript
- [x] Setup Strapi backend
- [x] Configure folder structure
- [x] Basic routing

### Phase 2: Backend Development
- [ ] Configure Strapi content types
- [ ] Setup media library
- [ ] Configure permissions
- [ ] Add sample products

### Phase 3: Frontend Development
- [ ] Build remaining components
- [ ] Implement contact/order form
- [ ] Add animations and transitions
- [ ] Optimize images (lazy loading)
- [ ] Mobile responsive testing

### Phase 4: Testing & Optimization
- [ ] Cross-browser testing
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] User testing

### Phase 5: Deployment
- [ ] Setup Raspberry Pi 5
- [ ] Configure nginx proxy manager
- [ ] Deploy application
- [ ] SSL certificates
- [ ] Backup scripts

## Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code

### Backend
- `npm run develop` - Start development server with auto-reload
- `npm run start` - Start production server
- `npm run build` - Build admin panel
- `npm run strapi` - Run Strapi CLI commands

## Contributing

This is a private project for Sky3D.

## License

Private - All Rights Reserved

## Support

For questions or issues, contact: info@sky3d.nl

