
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
  reviews?: Review[]; // Reviews can still exist even if submission by users is disabled
}

// CartItem can still exist if a non-user-specific cart is implemented later,
// but for now, persistent user carts are removed.
export interface CartItem extends Product {
  quantity: number;
}


// --- User Profile & Address Types (Commented out as auth is removed) ---
/*
export interface Address {
  id?: string;
  fullName: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber?: string | null;
}

export interface UserProfile {
  uid: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
}
*/

// --- Order Related Types (Commented out as they depend on users) ---
/*
export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: string;
  imageUrl?: string;
}

export interface Order {
  id: string;
  userId: string;
  orderDate: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: Address; // Depends on Address type
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}
*/
