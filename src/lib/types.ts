
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
  isLatest?: boolean;
  sizeAndDimensions?: string;
  material?: string;
  reviews?: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Address {
  id?: string; // Firestore document ID
  fullName: string;
  addressLine1: string;
  addressLine2?: string | null; // Allow null for optional fields from Firestore
  city: string;
  state: string; // Or province/region
  postalCode: string;
  country: string;
  phoneNumber?: string | null; // Allow null
}

export interface UserProfile {
  uid: string;
  email: string; // From Firebase Auth
  firstName?: string | null;
  lastName?: string | null;
}
