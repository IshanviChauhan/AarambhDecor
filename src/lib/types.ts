
export interface Review {
  reviewer: string;
  rating: number; // e.g., 1-5
  comment: string;
  date: string; // e.g., "YYYY-MM-DD"
}

export interface ProductImage {
  url: string;
  dataAiHint: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  careInstructions: string;
  imageUrls: ProductImage[]; // Changed from imageUrl and dataAiHint
  price?: string;
  category?: string;
  isLatest?: boolean;
  sizeAndDimensions?: string;
  material?: string;
  reviews?: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}
