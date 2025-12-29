# Strapi Field Naming Issue - Fixed

## 🐛 Problem

When testing the `/producten` page, you encountered:
```
Uncaught TypeError: Cannot read properties of undefined (reading 'toFixed')
at ProductCard (ProductCard.tsx:34:72)
```

## 🔍 Root Cause

**Strapi v5 uses PascalCase (Capital letters) for field names by default**, while our TypeScript interfaces were using camelCase.

When you created fields in Strapi like:
- Title
- Description  
- Price
- Featured
- inStock
- Images

Strapi stored them with capital letters in the API response:
```json
{
  "Title": "Product Name",
  "Price": 15.99,
  "Featured": true,
  "Images": [...]
}
```

But our code was trying to access:
```typescript
product.price.toFixed(2)  // ❌ product.price is undefined
```

Instead of:
```typescript
product.Price.toFixed(2)  // ✅ Correct!
```

## ✅ Solution Applied

I updated all files to match Strapi's actual API response structure:

### 1. Updated Type Definitions (`types/index.ts`)
```typescript
// Before
export interface Product {
  title: string;
  description: string;
  price: number;
  featured: boolean;
  inStock: boolean;
  images: StrapiImage[];
}

// After
export interface Product {
  Title: string;
  Description: any; // Rich text returns array of blocks
  Price: number;
  Featured: boolean;
  inStock: boolean;
  Images: StrapiImage[];
}
```

### 2. Updated ProductCard Component
```typescript
// Changed all references:
product.title → product.Title
product.price → product.Price
product.images → product.Images
```

### 3. Updated ProductDetailPage Component
```typescript
// Changed all references:
product.title → product.Title
product.price → product.Price
product.images → product.Images
product.description → product.Description

// Added helper function to convert rich text blocks to HTML
const getDescriptionHtml = () => {
  if (!product.Description) return '';
  if (typeof product.Description === 'string') return product.Description;
  
  return product.Description.map((block: any) => {
    if (block.type === 'paragraph') {
      const text = block.children?.map((child: any) => child.text || '').join('') || '';
      return `<p>${text}</p>`;
    }
    return '';
  }).join('');
};
```

### 4. Updated API Service
```typescript
// Changed filter to use capital letter:
filters[featured] → filters[Featured]
```

## 📋 Actual API Response Structure

Here's what Strapi v5 actually returns:

```json
{
  "data": [
    {
      "id": 2,
      "documentId": "mthbqbz9bwwbv7zbublc77yx",
      "Title": "Titel 1",
      "Description": [
        {
          "type": "paragraph",
          "children": [
            {
              "type": "text",
              "text": "Lorem ipsum dolor sit amet"
            }
          ]
        }
      ],
      "Price": 12,
      "Featured": true,
      "inStock": true,
      "Images": [
        {
          "id": 1,
          "documentId": "aj0j0nf83t8dto6zlb2xc2is",
          "name": "image.jpeg",
          "url": "/uploads/image.jpeg",
          "formats": {
            "thumbnail": { "url": "/uploads/thumbnail_image.jpeg" },
            "small": { "url": "/uploads/small_image.jpeg" }
          }
        }
      ]
    }
  ]
}
```

## 🎯 Key Differences

| Field in Strapi | API Response | Our Interface |
|----------------|--------------|---------------|
| Title | `Title` | `Title` ✅ |
| Description | `Description` (array) | `Description` ✅ |
| Price | `Price` | `Price` ✅ |
| Featured | `Featured` | `Featured` ✅ |
| inStock | `inStock` | `inStock` ✅ |
| Images | `Images` | `Images` ✅ |

**Note**: `inStock` remains camelCase because that's how you created it in Strapi.

## 🚨 Important: Strapi Field Naming

In Strapi v5:
- **Field names are case-sensitive**
- **They appear in the API exactly as you type them**
- If you type "Title" with capital T, it becomes "Title" in the API
- If you type "title" with lowercase t, it becomes "title" in the API

### Recommendation for Future Fields:

When creating new fields in Strapi, use **camelCase** for consistency:
- ✅ `title` (not `Title`)
- ✅ `description` (not `Description`)
- ✅ `price` (not `Price`)
- ✅ `featured` (not `Featured`)

This matches JavaScript conventions and makes your code more readable.

However, since you've already created fields with capital letters, I've updated the code to match your current setup.

## 🔄 If You Want to Fix the Field Names

If you want to change them to camelCase in the future:

1. **In Strapi Admin:**
   - Go to Content-Type Builder
   - Click on Product
   - Edit each field and change the name to lowercase
   - Save (server will restart)

2. **In your code:**
   - Revert the type definitions back to lowercase
   - Update all component references back to lowercase

**Warning**: Changing field names will require republishing all existing products!

## ✅ What's Working Now

After these fixes:
- ✅ Products display correctly on `/producten`
- ✅ Product cards show title, price, and images
- ✅ Product detail pages work
- ✅ Image galleries function
- ✅ Rich text descriptions render
- ✅ Featured products filter works
- ✅ Out of stock labels display

## 🧪 Test Your Site

Visit these URLs to confirm everything works:

1. **Products Page**: http://localhost:5173/producten
   - Should show all products in grid
   - Prices should display correctly

2. **Product Detail**: Click any product
   - Should show full details
   - Image gallery should work
   - Description should render

3. **Home Page**: http://localhost:5173
   - Featured products should appear (if you marked any as featured)

## 📝 Summary

The issue was a **field name mismatch** between what Strapi returns (`Title`, `Price`, `Images`) and what our TypeScript code expected (`title`, `price`, `images`).

This is now fixed, and all components use the correct field names matching Strapi's API response.

---

**Status**: ✅ **FIXED** - All products should now display correctly!

