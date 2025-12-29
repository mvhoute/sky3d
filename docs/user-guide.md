# Sky3D CMS User Guide

Welcome! This guide will help you manage products on your Sky3D website using the Strapi admin panel.

## Accessing the Admin Panel

1. Open your web browser
2. Go to: `https://api.yourdomain.com/admin` (or `http://localhost:1337/admin` for local development)
3. Log in with your admin credentials

## Managing Products

### Adding a New Product

1. **Navigate to Products**
   - Click on "Content Manager" in the left sidebar
   - Click on "Product" under "Collection Types"

2. **Create New Product**
   - Click the "Create new entry" button (top right)

3. **Fill in Product Details**
   - **Title**: Enter the product name (e.g., "Custom Phone Stand")
   - **Description**: Write a detailed description. You can use the formatting toolbar to:
     - Make text bold or italic
     - Add bullet points
     - Add links
     - Add headings
   - **Price**: Enter the price (e.g., 15.99)
   - **Featured**: Check this box if you want the product to appear on the homepage
   - **In Stock**: Check this box if the product is available for purchase

4. **Add Photos**
   - Click on the "Images" field
   - You can either:
     - **Drag & drop** images directly
     - Click "Browse files" to select from your computer
   - **Upload multiple images** (customers will see a gallery)
   - **Tip**: The first image will be the main thumbnail

5. **Save and Publish**
   - Click "Save" button (top right)
   - Click "Publish" to make the product visible on your website
   - If you want to save without publishing (draft), just click "Save"

### Editing an Existing Product

1. Go to Content Manager → Product
2. Find the product you want to edit
3. Click on the product title
4. Make your changes
5. Click "Save" to update

### Removing a Product

**Option 1: Unpublish (Hide but keep the product)**
1. Open the product
2. Click "Unpublish" button
3. The product will be hidden from the website but saved in the system

**Option 2: Delete (Permanently remove)**
1. Go to Content Manager → Product
2. Find the product in the list
3. Click the trash icon on the right
4. Confirm deletion
5. **Warning**: This cannot be undone!

### Managing Product Images

**To add more images to an existing product:**
1. Edit the product
2. Click on the Images field
3. Upload additional images
4. Click "Save"

**To remove an image:**
1. Edit the product
2. Click on the Images field
3. Hover over the image you want to remove
4. Click the X button
5. Click "Save"

**To reorder images:**
1. Edit the product
2. In the Images field, drag and drop images to reorder
3. The first image is your main product photo
4. Click "Save"

## Managing Orders

### Viewing Orders

1. Go to Content Manager → Order
2. You'll see a list of all customer orders

### Order Details

Each order contains:
- **Customer Name**: Who placed the order
- **Customer Email**: Their email address
- **Customer Phone**: Their phone number (if provided)
- **Customer Message**: Any special requests or questions
- **Product**: Which product they want to order (linked)
- **Status**: Current order status

### Updating Order Status

1. Click on an order to open it
2. Change the "Status" dropdown:
   - **New**: Just received
   - **Processing**: You're working on it
   - **Completed**: Order fulfilled
   - **Cancelled**: Order cancelled
3. Click "Save"

### Responding to Orders

1. Check the customer's email and phone
2. Contact them directly to confirm the order
3. Update the status as you progress

## Tips & Best Practices

### For Great Product Photos:
- ✅ Use good lighting
- ✅ Show multiple angles
- ✅ Use a clean background
- ✅ Show scale (include common objects for size reference)
- ✅ Highlight details and features
- ❌ Avoid blurry or dark photos

### For Product Descriptions:
- ✅ Be clear and detailed
- ✅ Mention dimensions (size)
- ✅ Describe the material used
- ✅ Explain what it's used for
- ✅ Note any customization options
- ❌ Don't leave description empty

### For Pricing:
- ✅ Use decimal format (15.99)
- ✅ Include all costs (material, time, etc.)
- ✅ Be consistent across similar products
- ❌ Don't forget to update prices when needed

## Common Tasks

### Making a Product Featured (Show on Homepage)

1. Edit the product
2. Check the "Featured" checkbox
3. Save and publish
4. The product will now appear on the homepage

### Marking a Product as Out of Stock

1. Edit the product
2. Uncheck the "In Stock" checkbox
3. Save
4. Customers will see "Uitverkocht" (Sold Out) on the product

### Bulk Upload Photos

Unfortunately, you need to upload images product-by-product. However:
1. You can upload multiple images at once per product
2. Keep your images organized in folders on your computer for easy access

## Troubleshooting

### "I can't see my product on the website"
- Make sure you clicked "Publish" (not just "Save")
- Check that "In Stock" is checked (out of stock products still show, but with a notice)
- Clear your browser cache and refresh

### "Images are not showing up"
- Make sure images were successfully uploaded (check for green checkmark)
- Try uploading smaller file sizes (under 2MB works best)
- Supported formats: JPG, PNG, GIF, WebP

### "I accidentally deleted a product"
- Unfortunately, deletions are permanent
- You'll need to recreate the product
- **Tip**: Use "Unpublish" instead of "Delete" if you're unsure

### "I forgot my password"
- Contact your web administrator
- They can reset it for you from the server

## Need More Help?

- **Strapi Documentation**: [https://docs.strapi.io](https://docs.strapi.io)
- **Contact Support**: info@sky3d.nl

## Quick Reference

| Task | Steps |
|------|-------|
| Add Product | Content Manager → Product → Create new entry |
| Edit Product | Content Manager → Product → Click product title |
| Upload Images | Edit product → Images → Browse/Drag files |
| Publish Product | Edit product → Click "Publish" |
| Hide Product | Edit product → Click "Unpublish" |
| View Orders | Content Manager → Order |
| Update Order Status | Click order → Change Status → Save |

---

**Remember**: Always click "Save" after making changes, and "Publish" to make products visible to customers!

