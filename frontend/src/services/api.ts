const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export const apiService = {
  async getProducts() {
    const response = await fetch(`${API_URL}/api/products?populate=*`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  async getProduct(documentId: string) {
    const response = await fetch(`${API_URL}/api/products/${documentId}?populate=*`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  async getFeaturedProducts() {
    const response = await fetch(`${API_URL}/api/products?filters[Featured][$eq]=true&populate=*`);
    if (!response.ok) throw new Error('Failed to fetch featured products');
    return response.json();
  },

  async submitOrder(orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    customerMessage?: string;
    product?: string;
    file?: File;
  }) {
    // If there's a file, we need to use FormData with multipart upload
    if (orderData.file) {
      const formData = new FormData();

      // Add order data as JSON string
      formData.append('data', JSON.stringify({
        customerName: orderData.customerName,
        customerEmail: orderData.customerEmail,
        customerPhone: orderData.customerPhone,
        customerMessage: orderData.customerMessage,
        product: orderData.product,
      }));

      // Add the file
      formData.append('files.uploadedFile', orderData.file, orderData.file.name);

      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to submit order');
      return response.json();
    }

    // No file, use simple JSON request
    const response = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          customerName: orderData.customerName,
          customerEmail: orderData.customerEmail,
          customerPhone: orderData.customerPhone,
          customerMessage: orderData.customerMessage,
          product: orderData.product,
        },
      }),
    });
    if (!response.ok) throw new Error('Failed to submit order');
    return response.json();
  },
};

export const getImageUrl = (url: string | undefined) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${API_URL}${url}`;
};

