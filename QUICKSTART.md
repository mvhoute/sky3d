# Sky3D - Quick Start Guide

## 🚀 Getting Started (Development)

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### 1. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at: `http://localhost:5173`

### 2. Backend Setup (Strapi Cloud)

Backend is hosted on [Strapi Cloud](https://cloud.strapi.io). No local backend setup needed!

**For admin/CMS access:**
- Go to your Strapi Cloud project URL
- Log in to admin panel
- See [STRAPI_CLOUD_MIGRATION.md](docs/STRAPI_CLOUD_MIGRATION.md) for migration details

### 3. Configure Frontend API URL

Update `frontend/.env`:
```bash
VITE_API_URL=https://your-strapi-cloud-project.strapiapp.com
```

### 4. Test Everything

Visit `http://localhost:5173`:
- ✅ Home page loads
- ✅ Navigate to "Producten" 
- ✅ See your products
- ✅ Click a product to see details

---

## 📁 Project Structure

```
sky3d/
├── frontend/          # React + TypeScript frontend
│   ├── src/
│   │   ├── components/    # Header, Footer, ProductCard, etc.
│   │   ├── pages/         # HomePage, ProductsPage, etc.
│   │   ├── services/      # API calls to Strapi
│   │   ├── types/         # TypeScript definitions
│   │   └── App.tsx        # Main app with routing
│   └── package.json
│
├── docs/              # Documentation
│   ├── STRAPI_CLOUD_MIGRATION.md  # Strapi Cloud migration guide
│   ├── user-guide.md              # For site owner
│   └── deployment.md              # Production deployment
│
└── scripts/           # Deployment & backup scripts
```

---

## 🛠️ Common Commands

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Lint code
```

---

## 🎨 Customization

### Change Site Name/Branding
- Edit `frontend/src/components/Header.tsx` - Change "Sky3D" to your name
- Edit `frontend/src/components/Footer.tsx` - Update footer text

### Change Colors
- Edit `frontend/tailwind.config.js` - Customize theme colors
- Current primary color: Blue (blue-600)

### Add More Pages
1. Create new page in `frontend/src/pages/`
2. Import and add route in `frontend/src/App.tsx`
3. Add link in `frontend/src/components/Header.tsx`

---

## 📚 Documentation

- **Strapi Cloud Migration**: [docs/STRAPI_CLOUD_MIGRATION.md](docs/STRAPI_CLOUD_MIGRATION.md)
- **CMS User Guide**: [docs/user-guide.md](docs/user-guide.md) (for site owner)
- **Production Deployment**: [docs/deployment.md](docs/deployment.md)
- **Main README**: [README.md](README.md)

---

## 🐛 Troubleshooting

**Frontend not connecting to backend?**
- Check `frontend/.env` has correct Strapi Cloud URL
- Verify URL format: `https://your-project.strapiapp.com`
- Check Strapi Cloud permissions (Public role)

**No products showing?**
- Make sure products are **Published** in Strapi Cloud admin
- Check Public role has `find` and `findOne` permissions on Product
- Open browser DevTools → Network tab to see API requests

**API errors?**
- Verify Strapi Cloud project is running
- Check admin panel is accessible
- Review [STRAPI_CLOUD_MIGRATION.md](docs/STRAPI_CLOUD_MIGRATION.md) for troubleshooting

---

## ✅ Next Steps

1. ✅ **Setup Complete** - Frontend and Strapi Cloud configured
2. 🔄 **Add Products** - Create and publish products in Strapi Cloud admin
3. 🔄 **Test Forms** - Verify order submissions work
4. ⏳ **Deploy to Production** - Deploy frontend to Statichost
5. ⏳ **Monitoring** - Monitor Strapi Cloud dashboard

---

## 🎉 You're Ready!

Your development environment is set up and ready to go. Start by:
1. Running the frontend dev server
2. Accessing Strapi Cloud admin to add products
3. Viewing them on the frontend at localhost:5173

Happy coding! 🚀

