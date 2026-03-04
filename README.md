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
- **Strapi v5.33.1** - Headless CMS (EU-hosted on [Strapi Cloud](https://cloud.strapi.io))
- **PostgreSQL** - Managed database
- **Free Tier** - No backend hosting costs

## 🚀 Status: Strapi Cloud Ready
**Current**: Self-hosted Strapi v5.33.1 (local development)
**Target**: Migrate to [Strapi Cloud](https://cloud.strapi.io) (EU servers, free tier)
**Benefit**: Remove DevOps overhead, automatic backups, improved reliability

See [docs/STRAPI_CLOUD_MIGRATION.md](docs/STRAPI_CLOUD_MIGRATION.md) for complete migration guide and step-by-step instructions.

## Getting Started

### Prerequisites
- Node.js 18+ LTS
- npm or yarn

### Development Setup

#### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

#### Backend (Strapi Cloud)
Backend is hosted on [Strapi Cloud](https://cloud.strapi.io). No local backend setup needed for development.

**First time setup (admin only):**
1. Access Strapi Cloud admin panel at your project URL
2. Configure content types if needed (see Configuration section)

### Configure Strapi Content Types (Strapi Cloud)

#### Product Content Type
1. Go to Content-Type Builder → Create new collection type → "Product"
2. Add fields:
   - `Title` (Text, required)
   - `Description` (Rich text - Blocks)
   - `Price` (Number, decimal, required)
   - `Featured` (Boolean, default: false)
   - `inStock` (Boolean, default: true)
   - `Images` (Media, multiple files)
3. Save and the server will restart

#### Order Content Type
1. Create new collection type → "Order"
2. Add fields:
   - `customerName` (Text, required)
   - `customerEmail` (Email, required)
   - `customerPhone` (Text)
   - `customerMessage` (Long text)
   - `product` (Relation: Order has one Product)
   - `customerStatus` (Enumeration: new, processing, completed, cancelled)
   - `uploadedFile` (Media, single file)
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
Backend is hosted on Strapi Cloud - no build needed. See [Strapi Cloud Migration Guide](docs/STRAPI_CLOUD_MIGRATION.md) for details.

## Deployment

### Frontend Deployment (Statichost)
1. Build the frontend: `cd frontend && npm run build`
2. Deploy `frontend/dist/` folder to Statichost
3. Configure environment variable: `VITE_API_URL=https://your-strapi-cloud-project.strapiapp.com`

### Backend (Strapi Cloud)
Hosted on [Strapi Cloud](https://cloud.strapi.io). See [STRAPI_CLOUD_MIGRATION.md](docs/STRAPI_CLOUD_MIGRATION.md) for setup and management instructions.

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

