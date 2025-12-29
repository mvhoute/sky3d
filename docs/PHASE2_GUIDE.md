# Phase 2: Backend Development - Step-by-Step Guide

## 🎯 Goal
Configure Strapi CMS, create content types, set permissions, and add sample products.

**Estimated Time**: 20-30 minutes

---

## Step 1: Start Strapi Backend

Open a terminal and run:

```bash
cd backend
npm run develop
```

**What happens:**
- Strapi will start on `http://localhost:1337`
- Your browser should automatically open to `http://localhost:1337/admin`
- If it doesn't open automatically, navigate there manually

**First time setup:**
You'll see a registration form to create your admin account.

---

## Step 2: Create Admin Account

Fill in the admin registration form:

- **First Name**: Your first name
- **Last Name**: Your last name
- **Email**: Your email address (you'll use this to log in)
- **Password**: Choose a strong password (min 8 characters)
- **Confirm Password**: Re-enter your password

Click **"Let's start"**

You'll be logged into the Strapi admin panel.

---

## Step 3: Create Product Content Type

### 3.1 Navigate to Content-Type Builder
1. Look at the left sidebar
2. Click on **"Content-Type Builder"** (looks like a building blocks icon)

### 3.2 Create Collection Type
1. Click the **"Create new collection type"** button
2. **Display name**: Enter `Product`
3. **API ID (singular)**: Will auto-fill as `product` ✓
4. **API ID (plural)**: Will auto-fill as `products` ✓
5. Click **"Continue"**

### 3.3 Add Fields to Product

Now you'll add fields one by one. For each field, click **"Add another field"** or the appropriate field type:

#### Field 1: Title
1. Click **"Text"**
2. **Name**: `title`
3. Click **"Advanced settings"** tab
4. Check ✓ **"Required field"**
5. Click **"Finish"**

#### Field 2: Description
1. Click **"Rich text"**
2. **Name**: `description`
3. Click **"Finish"**

#### Field 3: Price
1. Click **"Number"**
2. **Name**: `price`
3. **Number format**: Select `decimal`
4. Click **"Advanced settings"** tab
5. Check ✓ **"Required field"**
6. Click **"Finish"**

#### Field 4: Featured
1. Click **"Boolean"**
2. **Name**: `featured`
3. **Default value**: `false`
4. Click **"Finish"**

#### Field 5: In Stock
1. Click **"Boolean"**
2. **Name**: `inStock`
3. **Default value**: `true`
4. Click **"Finish"**

#### Field 6: Images
1. Click **"Media"**
2. **Name**: `images`
3. **Type**: Select `Multiple media`
4. Click **"Advanced settings"** tab
5. **Allowed types of media**: Check only ✓ **"Images"**
6. Click **"Finish"**

### 3.4 Save Product Content Type
1. Click **"Save"** button (top right)
2. Wait for Strapi to restart (takes ~10-20 seconds)
3. You'll see a success message

---

## Step 4: Create Order Content Type

### 4.1 Create Collection Type
1. In Content-Type Builder, click **"Create new collection type"** again
2. **Display name**: Enter `Order`
3. Click **"Continue"**

### 4.2 Add Fields to Order

#### Field 1: Customer Name
1. Click **"Text"**
2. **Name**: `customerName`
3. Click **"Advanced settings"** tab
4. Check ✓ **"Required field"**
5. Click **"Finish"**

#### Field 2: Customer Email
1. Click **"Email"**
2. **Name**: `customerEmail`
3. Click **"Advanced settings"** tab
4. Check ✓ **"Required field"**
5. Click **"Finish"**

#### Field 3: Customer Phone
1. Click **"Text"**
2. **Name**: `customerPhone`
3. Click **"Finish"** (not required)

#### Field 4: Customer Message
1. Click **"Text"**
2. **Name**: `customerMessage`
3. **Type**: Select `Long text`
4. Click **"Finish"**

#### Field 5: Product (Relation)
1. Click **"Relation"**
2. You'll see two boxes: `Order` on the left, and a dropdown on the right
3. From the right dropdown, select **"Product"**
4. Choose the relation type: **"Order has one Product"**
   - This means: One order is for one product
   - The middle icon should look like: `Order →| Product`
5. Click **"Finish"**

#### Field 6: Status
1. Click **"Enumeration"**
2. **Name**: `status`
3. **Values**: Add these values one by one (click "Add another value" after each):
   - `new`
   - `processing`
   - `completed`
   - `cancelled`
4. **Default value**: Select `new`
5. Click **"Finish"**

### 4.3 Save Order Content Type
1. Click **"Save"** button (top right)
2. Wait for Strapi to restart
3. Success! Both content types are now created

---

## Step 5: Configure Public Permissions

This allows your frontend to fetch products and submit orders without authentication.

### 5.1 Navigate to Settings
1. Click **"Settings"** in the left sidebar (gear icon at bottom)
2. Under **"USERS & PERMISSIONS PLUGIN"** section, click **"Roles"**

### 5.2 Configure Public Role
1. Click on the **"Public"** role
2. Scroll down to **"Permissions"** section

### 5.3 Enable Product Permissions
1. Find **"Product"** in the list
2. Expand it by clicking the arrow
3. Check these boxes:
   - ✓ **find** (allows fetching all products)
   - ✓ **findOne** (allows fetching single product)
4. Leave unchecked: `create`, `update`, `delete` (public users shouldn't modify products)

### 5.4 Enable Order Permissions
1. Find **"Order"** in the list
2. Expand it
3. Check this box:
   - ✓ **create** (allows submitting orders)
4. Leave unchecked: `find`, `findOne`, `update`, `delete` (public shouldn't see others' orders)

### 5.5 Save Permissions
1. Click **"Save"** button (top right)
2. Success message will appear

---

## Step 6: Add Sample Products

Now let's add some test products to see the site in action!

### 6.1 Navigate to Content Manager
1. Click **"Content Manager"** in left sidebar
2. Click **"Product"** under **"COLLECTION TYPES"**

### 6.2 Create First Product
1. Click **"Create new entry"** button (top right)

#### Fill in the fields:

**Title**: `Custom Phone Stand`

**Description**: Use the rich text editor to add:
```
A stylish and functional 3D printed phone stand, perfect for your desk or nightstand.

Features:
• Stable base design
• Compatible with most smartphones
• Available in multiple colors
• Eco-friendly PLA material
```

**Price**: `15.99`

**Featured**: ✓ Check this (will appear on homepage)

**In Stock**: ✓ Check this

**Images**: 
- Click the images field
- You can either:
  - **Drag & drop** image files directly
  - Click **"Add more assets"** → **"Upload assets"** → Browse for images
- For testing, you can use placeholder images or real product photos
- Upload at least 2-3 images if possible

### 6.3 Save and Publish
1. Click **"Save"** button (top right)
2. Then click **"Publish"** button
   - **Important**: "Save" creates a draft, "Publish" makes it visible on your website
3. Success message will appear

### 6.4 Add More Sample Products

Repeat the process to add 2-3 more products. Here are some ideas:

**Product 2:**
- **Title**: `Cable Organizer Clips`
- **Description**: `Keep your cables tidy with these convenient 3D printed organizer clips. Set of 5 clips.`
- **Price**: `9.99`
- **Featured**: Leave unchecked
- **In Stock**: ✓ Checked
- **Images**: Upload images

**Product 3:**
- **Title**: `Decorative Plant Pot`
- **Description**: `Modern geometric plant pot, perfect for succulents and small plants. Drainage hole included.`
- **Price**: `22.50`
- **Featured**: ✓ Check this
- **In Stock**: ✓ Checked
- **Images**: Upload images

**Product 4 (Optional - Out of Stock Example):**
- **Title**: `Custom Keychains`
- **Description**: `Personalized 3D printed keychains with custom designs.`
- **Price**: `7.99`
- **Featured**: Leave unchecked
- **In Stock**: ❌ **UNCHECK** (to test "sold out" display)
- **Images**: Upload images

Remember to **Save** and **Publish** each product!

---

## Step 7: Test the API

Let's verify the API is working correctly.

### 7.1 Test in Browser
Open these URLs in your browser:

**All Products:**
```
http://localhost:1337/api/products?populate=*
```

You should see JSON data with your products.

**Single Product:**
```
http://localhost:1337/api/products/[documentId]?populate=*
```
Replace `[documentId]` with the documentId from one of your products (you can see it in the JSON response above).

**Featured Products:**
```
http://localhost:1337/api/products?filters[featured][$eq]=true&populate=*
```

You should see only the products marked as featured.

---

## Step 8: Start the Frontend

Now let's see everything working together!

### 8.1 Start Frontend Dev Server
Open a **new terminal** window (keep Strapi running):

```bash
cd frontend
npm run dev
```

### 8.2 Open in Browser
Navigate to: `http://localhost:5173` (or the port shown in the terminal)

### 8.3 Test the Website

**Home Page:**
- ✓ Should show hero section
- ✓ Features section
- ✓ Navigation works

**Products Page (`/producten`):**
- ✓ Should display all your products in a grid
- ✓ Product cards show title, price, and first image
- ✓ "Uitverkocht" label on out-of-stock items
- ✓ Clicking a product navigates to detail page

**Product Detail Page (`/producten/:id`):**
- ✓ Shows all product images in gallery
- ✓ Thumbnail navigation works
- ✓ Shows title, price, description
- ✓ "Bestellen" button present
- ✓ Out-of-stock warning if applicable

**About Page (`/over-ons`):**
- ✓ Shows about content

---

## ✅ Phase 2 Completion Checklist

Before moving to Phase 3, verify:

- [ ] Strapi admin panel accessible at `http://localhost:1337/admin`
- [ ] Product content type created with all 6 fields
- [ ] Order content type created with all 6 fields
- [ ] Public permissions set (Product: find, findOne | Order: create)
- [ ] At least 3 sample products added with images
- [ ] At least 1 product marked as "featured"
- [ ] At least 1 product marked as out of stock (for testing)
- [ ] All products published (not just saved)
- [ ] API endpoints return data
- [ ] Frontend displays products correctly
- [ ] Product detail pages work
- [ ] Image galleries function properly

---

## 🐛 Troubleshooting

### Products not showing on frontend?
- Make sure products are **Published** (not just saved)
- Check Public role has `find` and `findOne` permissions
- Check browser console for errors
- Verify API URL in `frontend/.env` is correct: `VITE_API_URL=http://localhost:1337`

### Images not displaying?
- Check that images were successfully uploaded (green checkmark in Strapi)
- Verify image field is named `images` (plural)
- Check Public role permissions include Product: `find`, `findOne`
- Check browser console Network tab for failed requests

### Can't create products?
- Make sure you're logged in as admin
- Check that you clicked "Save" after creating content types
- Try refreshing the Strapi admin page

### Strapi won't start?
```bash
# Delete cache and restart
cd backend
rm -rf .tmp .cache
npm run develop
```

---

## 📸 Screenshots Checklist

As you go through this phase, you should see:

1. **Admin Registration Screen** - On first launch
2. **Content-Type Builder** - Creating Product with 6 fields
3. **Content Manager** - List of products
4. **Product Entry Form** - Adding a product with images
5. **Published Products** - Green "Published" badge
6. **Public Permissions** - Checkboxes for find, findOne, create
7. **Frontend Home** - Hero section with features
8. **Frontend Products Grid** - All products displayed
9. **Frontend Product Detail** - Image gallery and description

---

## 🎉 Next Steps - Phase 3

Once Phase 2 is complete, you'll be ready for Phase 3:
- Contact/Order form component
- Form validation
- Email notifications
- Mobile hamburger menu
- Additional polish and features

---

## 💡 Tips

**Working with Images:**
- Image files should be under 2MB for best performance
- Supported formats: JPG, PNG, GIF, WebP
- For product photos, use well-lit, clear images
- Show products from multiple angles

**Content Best Practices:**
- Write clear, detailed descriptions
- Include dimensions/sizes
- Mention materials used
- Note any customization options
- Use proper pricing (include decimals: 15.99 not 15)

**Testing:**
- Always test both in-stock and out-of-stock scenarios
- Test featured and non-featured products
- Check mobile responsive design
- Verify image galleries work on all products

---

**Ready to start? Follow each step carefully and check off items as you complete them!** 🚀

Need help? Check the troubleshooting section above or refer to the Strapi documentation at https://docs.strapi.io

