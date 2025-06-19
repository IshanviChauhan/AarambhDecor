
// UserProfile, UserAddress, Order, OrderItem, CartItem types are removed
// as authentication, user profiles, and user-specific cart/orders
// are no longer part of the application.

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
  imageUrls: ProductImage[];
  price?: string;
  category?: string;
  featured?: boolean; 
  sizeAndDimensions?: string;
  material?: string;
  reviews?: Review[];
}
