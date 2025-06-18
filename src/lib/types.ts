
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


// --- User Profile & Address Types ---
// Address structure for user profiles
export interface UserAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface UserProfile {
  uid: string; // Firestore document ID (auto-generated in this case)
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  address: UserAddress;
  createdAt?: any; // Firestore serverTimestamp
}


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

    