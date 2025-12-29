# ✅ Product Relation Bug Fix

## 🐛 Problem

When submitting orders through the contact form, the product relation was not being saved in Strapi. In the Strapi admin panel, the "product" field showed an empty "Add or create relation" dropdown.

## 🔍 Root Cause

**Strapi v5 uses `documentId` (string) for relations, not numeric `id`**

The code was passing the numeric `id` field, but Strapi v5 relations require the `documentId` field which is a string identifier.

### What was wrong:
```typescript
// Product detail page was passing documentId in URL ✅
to={`/contact?product=${product.documentId}`}

// But ContactForm was using numeric id ❌
productId={product?.id}  // Wrong!

// And submitting numeric id to API ❌
product: data.productId  // Wrong!
```

## ✅ Solution

Updated 3 files to use `documentId` instead of numeric `id`:

### 1. ContactPage.tsx
```typescript
// Before
const productId = searchParams.get('product');
<ContactForm productId={product?.id} />

// After
const productDocumentId = searchParams.get('product');
<ContactForm productDocumentId={product?.documentId} />
```

### 2. ContactForm.tsx
```typescript
// Before
interface ContactFormProps {
  productId?: number;
  productTitle?: string;
}
const orderSchema = z.object({
  productId: z.number().optional(),
});

// After
interface ContactFormProps {
  productDocumentId?: string;
  productTitle?: string;
}
const orderSchema = z.object({
  productDocumentId: z.string().optional(),
});
```

### 3. services/api.ts
```typescript
// Before
async submitOrder(orderData: {
  // ...
  product?: number;
})

// After
async submitOrder(orderData: {
  // ...
  product?: string;  // Now accepts documentId string
})
```

## 🧪 How to Test

1. **Navigate to a product**:
   - Go to: `http://localhost:5173/producten`
   - Click any product

2. **Click "Bestellen" button**:
   - Should navigate to: `/contact?product=<documentId>`
   - Product title should appear in blue info box

3. **Fill out and submit form**:
   - Enter name and email
   - Click "Bestelling Plaatsen"
   - Should see success message

4. **Check Strapi Admin**:
   - Go to: `http://localhost:1337/admin`
   - Content Manager → Orders
   - Open the latest order
   - **The "product" field should now show the linked product!** ✅

## 📋 Understanding Strapi v5 IDs

Strapi v5 has two types of IDs:

| Field | Type | Example | Usage |
|-------|------|---------|-------|
| `id` | Number | `2` | Internal database ID |
| `documentId` | String | `"mthbqbz9bwwbv7zbublc77yx"` | Public identifier for relations |

**For relations, always use `documentId`**, not `id`.

## ✅ What's Fixed

- ✅ Product relation now saves correctly
- ✅ Orders in Strapi show linked product
- ✅ Product information visible in order details
- ✅ Admin can see which product customer wants to order

## 🎯 Result

When you submit an order now, the Strapi admin will show:
- Customer name, email, phone
- Customer message
- **Product relation properly linked** ← This now works!
- Order status

You can click the product relation to see product details directly from the order!

---

**Status**: ✅ **FIXED**

Test it now by submitting an order and checking Strapi admin panel!

