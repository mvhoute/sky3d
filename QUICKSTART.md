# Sky3D - Quick Start Guide

## 🚀 Getting Started (Development)

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### 1. Start the Backend (Strapi CMS)

```bash
cd backend
npm run develop
```

**First time?**
- Strapi will open at `http://localhost:1337/admin`
- Create your admin account
- Follow the setup guide in `docs/phase1-complete.md` to create content types

### 2. Start the Frontend

```bash
# In a new terminal window
cd frontend
npm run dev
```

Frontend will be available at: `http://localhost:5173`

### 3. Configure Strapi (First Time Only)

See detailed instructions in `docs/phase1-complete.md`, but here's the quick version:

1. **Create Product Content Type**:
   - Go to Content-Type Builder → Create "Product"
   - Add fields: title (Text), description (Rich text), price (Number), featured (Boolean), inStock (Boolean), images (Media - multiple)
   
2. **Create Order Content Type**:
   - Create "Order" collection
   - Add fields: customerName, customerEmail, customerPhone, customerMessage, product (relation), status (enum)

3. **Set Permissions**:
   - Settings → Roles → Public
   - Enable: Product (find, findOne), Order (create)

4. **Add Sample Products**:
   - Content Manager → Product → Create products
   - Upload images, set prices, publish

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
├── backend/           # Strapi CMS
│   ├── src/api/          # API endpoints (auto-generated)
│   ├── config/           # Configuration
│   └── package.json
│
├── docs/              # Documentation
│   ├── deployment.md      # Deploy to Raspberry Pi
│   ├── user-guide.md      # For site owner
│   └── phase1-complete.md # Phase 1 summary
│
└── scripts/           # Deployment & backup scripts
    ├── backup.sh
    └── deploy.sh
```

---

## 🛠️ Common Commands

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend
```bash
npm run develop  # Development mode (auto-reload)
npm run start    # Production mode
npm run build    # Build admin panel
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

- **Full Project Plan**: See initial project plan (shared earlier)
- **Phase 1 Summary**: `docs/phase1-complete.md`
- **Deployment Guide**: `docs/deployment.md` (Raspberry Pi 5)
- **CMS User Guide**: `docs/user-guide.md` (for site owner)
- **Main README**: `README.md`

---

## 🐛 Troubleshooting

**Backend won't start?**
```bash
cd backend
rm -rf .tmp .cache
npm install
npm run develop
```

**Frontend not connecting to backend?**
- Check `frontend/.env` has correct API URL
- Verify Strapi is running on port 1337
- Check Strapi permissions (Public role)

**No products showing?**
- Make sure products are **Published** in Strapi (not just saved)
- Check Public role has `find` and `findOne` permissions
- Open browser DevTools → Network tab to see API requests

---

## ✅ Next Steps

1. ✅ **Phase 1 Complete** - Project setup and structure
2. 🔄 **Phase 2** - Configure Strapi content types and add products
3. ⏳ **Phase 3** - Add contact form and additional features
4. ⏳ **Phase 4** - Testing and optimization
5. ⏳ **Phase 5** - Deploy to Raspberry Pi 5

---

## 🎉 You're Ready!

Your development environment is set up and ready to go. Start by:
1. Running the backend and creating content types
2. Adding some test products with images
3. Viewing them on the frontend

Happy coding! 🚀

