export interface Product {
  id: number;
  documentId: string;
  Title: string;
  Description: any; // Rich text field returns array of blocks
  Price: number;
  Featured: boolean;
  inStock: boolean;
  Images: StrapiImage[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Order {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerMessage?: string;
  product?: number;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

