# GitHub Copilot Instructions for Sky3D Project

## Project Overview
Sky3D is a modern 3D printing portfolio website with a React frontend and Strapi CMS backend. The site allows customers to browse 3D printed products, view detailed product information, and place orders through a contact form.

## Technology Stack

### Frontend
- **Framework**: React 19.2 with TypeScript 5.9
- **Build Tool**: Vite 7.3
- **Styling**: Tailwind CSS 4.1 (with custom theme)
- **Routing**: React Router 7.11
- **Form Handling**: React Hook Form + Zod validation
- **Fonts**: Inter (body text), Poppins (headings)

### Backend
- **CMS**: Strapi v5.33.1 on [Strapi Cloud](https://cloud.strapi.io) (free tier)
- **Database**: PostgreSQL (managed by Strapi Cloud)
- **API**: REST API with CDN media delivery
- **Status**: ⚠️ Migration from self-hosted to Strapi Cloud in progress

## Code Style & Conventions

### TypeScript
- Use **ES6+ syntax** (const, arrow functions, template literals)
- Use **named exports** instead of default exports for components
- Always use **type imports** with `import type { ... }` for type-only imports
- Interfaces for component props (e.g., `ComponentNameProps`)

### React Components
```typescript
// ✅ Correct pattern
export const ComponentName = () => {
  // component logic
  return <div>...</div>;
};

// ❌ Avoid
export default function ComponentName() { ... }
```

### Styling
- Use Tailwind CSS utility classes
- Custom colors: `primary-*` (blue), `accent-*` (purple)
- Custom patterns: `bg-grid-pattern`, `bg-dot-pattern`, `bg-diagonal-stripes`
- Glass effect: `glass` class for glassmorphism
- Font families: `font-family: 'Poppins, sans-serif'` for headings, Inter for body

### File Structure
```
frontend/src/
├── components/     # Reusable UI components
├── pages/         # Page components (one per route)
├── services/      # API integration (api.ts)
├── types/         # TypeScript type definitions
└── hooks/         # Custom React hooks (if needed)
```

## Important Patterns

### Strapi v5 Specifics
- Use `documentId` (string) for relations and URL params, NOT numeric `id`
- Field names in Strapi appear in API exactly as typed (case-sensitive)
- Current field names use **PascalCase**: `Title`, `Description`, `Price`, `Featured`, `Images`
- Rich text fields return arrays of blocks, not strings
- Images: `product.Images` (plural, capital I)

### API Calls
```typescript
// Product fields (match Strapi's case)
product.Title        // string
product.Description  // rich text blocks (array)
product.Price        // number
product.Featured     // boolean
product.inStock      // boolean (camelCase!)
product.Images       // StrapiImage[]
product.documentId   // string (for URLs/relations)
product.id           // number (internal only)
```

### Form Validation
- Use React Hook Form with Zod schema
- All forms should have loading states and error handling
- Success messages should be clear and actionable

### Responsive Design
- Mobile-first approach
- Breakpoints: `md:` (768px), `lg:` (1024px), `xl:` (1280px)
- Mobile menu: Fixed overlay with slide-down animation
- Grid layouts: 1 column (mobile) → 2 columns (tablet) → 3-4 columns (desktop)

## Design System

### Color Palette
- **Primary (Blue)**: `primary-500` to `primary-900` (#3b82f6 - #2563eb)
- **Accent (Purple)**: `accent-500` to `accent-900` (#a855f7 - #9333ea)
- **Neutrals**: Gray scale from `gray-50` to `gray-900`

### Gradients
- Hero: `from-primary-600 via-primary-700 to-accent-700`
- Buttons: `from-primary-600 to-accent-600`
- Text highlights: `bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent`

### Typography
- Headings: Poppins, bold weights (600-700)
- Body: Inter, regular to medium (400-600)
- Scale: 5xl-7xl for hero, 4xl-5xl for section headings, xl-2xl for component headings

### Animations
- Float animation: `animate-float` (6s loop)
- Slide-down: `animate-slide-down` (0.2s)
- Hover effects: `hover:scale-105`, `hover:-translate-y-1`, `hover:shadow-xl`
- Transitions: `transition-all` with 300ms duration

### Spacing
- Section padding: `py-20` (80px)
- Component padding: `p-6` to `p-8`
- Section margins: `mb-12` to `mb-16`

## Routes
- `/` - HomePage (hero, featured products, features, process, stats, testimonials, CTA)
- `/producten` - ProductsPage (product grid)
- `/producten/:documentId` - ProductDetailPage (product details with gallery)
- `/over-ons` - AboutPage (about company)
- `/contact` - ContactPage (order/contact form)
- `/contact?product=:documentId` - Pre-filled contact form with product

## Key Features

### Product Cards
- Show title, price, image, out-of-stock badge
- Featured badge for featured products
- Hover effects: lift + image zoom
- Link to product detail page

### Product Detail Page
- Image gallery with thumbnails
- Full product information
- Rich text description rendering
- Out-of-stock notice (amber/yellow, not red)
- Button changes based on stock: "Bestellen" vs "Product Aanvragen"

### Mobile Menu
- Fixed overlay (doesn't push content)
- Click outside to close
- Slide-down animation
- No backdrop overlay
- Close button has blue background when open

### Forms
- React Hook Form + Zod validation
- Real-time error messages
- Loading states with spinners
- Success states with clear messages
- Submit to Strapi Orders API

## Environment Variables
```bash
# Frontend (.env)
VITE_API_URL=http://localhost:1337

# Backend (auto-generated by Strapi)
# PostgreSQL recommended for production
```

## Common Tasks

### Adding a New Page
1. Create file in `src/pages/PageName.tsx`
2. Export named component: `export const PageName = () => { ... }`
3. Add route in `App.tsx`
4. Add navigation link in `Header.tsx`

### Adding a New Component
1. Create file in `src/components/ComponentName.tsx`
2. Use named export: `export const ComponentName = () => { ... }`
3. Import with: `import { ComponentName } from '../components/ComponentName'`

### Styling New Components
1. Use Tailwind utility classes first
2. Follow existing patterns (rounded-2xl, shadow-md, etc.)
3. Add hover states with transitions
4. Ensure mobile responsiveness
5. Use custom colors: `primary-*`, `accent-*`

### Fetching from Strapi
```typescript
// Always populate relations/media
const response = await apiService.getProducts();
const products = response.data;

// Access fields with PascalCase
products.map(p => p.Title, p.Price, p.Images)
```

## Deployment

### Development
```bash
# Frontend only (backend is on Strapi Cloud)
cd frontend && npm run dev  # Port 5173
```

### Production (Statichost + Strapi Cloud)
- **Frontend**: Deploy `frontend/dist/` to Statichost
- **Backend**: Hosted on [Strapi Cloud](https://cloud.strapi.io) free tier
- See `docs/STRAPI_CLOUD_MIGRATION.md` for complete guide and migration status
- Environment variable: `VITE_API_URL=https://your-strapi-cloud-project.strapiapp.com`

## Documentation
- `README.md` - Project overview
- `QUICKSTART.md` - Quick start guide
- `docs/STRAPI_CLOUD_MIGRATION.md` - Strapi Cloud migration details and timeline
- `docs/deployment.md` - Legacy Raspberry Pi deployment (not currently in use)
- `docs/user-guide.md` - CMS guide for non-technical users

## Known Gotchas

### Strapi v5 Changes
- Use `documentId` for relations, not `id`
- Field names are case-sensitive
- Rich text returns blocks array, not HTML string
- Images field is `Images` (capital I)

### Strapi Cloud Specifics
- Media URLs are served via CDN (different from self-hosted)
- Backups are automatic (no manual backup needed)
- Rate limits apply (generous for free tier)
- See [STRAPI_CLOUD_MIGRATION.md](docs/STRAPI_CLOUD_MIGRATION.md) for troubleshooting

### Mobile Menu
- No backdrop overlay (removed for better UX)
- Click-outside-to-close functionality
- Close button background changes when open

### Out of Stock Products
- Still allow ordering (it's a request)
- Show amber notice, not red error
- Button text: "Product Aanvragen"
- Explain they'll be contacted

## Testing
Always test:
- Mobile responsiveness (<768px)
- Form validation (empty fields, invalid emails)
- Product grid with different numbers of items
- Out-of-stock product flow
- Image loading states
- Navigation on all screen sizes

## Code Quality
- No console.logs in production code (use proper error handling)
- All external URLs should use environment variables
- Always handle loading and error states
- Use TypeScript types, no `any` unless absolutely necessary
- Prefer composition over prop drilling (use context if needed)

## When in Doubt
- Follow existing patterns in the codebase
- Use named exports with arrow functions
- Match Tailwind classes to existing components
- Check Strapi field names are PascalCase
- Use `documentId` for relations
- Keep mobile-first responsive design

