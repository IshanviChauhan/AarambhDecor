
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

// --- User Profile & Address Types ---
export interface UserAddress {
  id: string; // Firestore document ID for the address
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  fullName?: string;
  phoneNumber?: string | null; // Allow null for phone number
  isDefault?: boolean;
  createdAt?: any; // Firestore serverTimestamp or Date
}

export interface UserProfile {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string | null; // Allow null for phone number
  // The 'address' field from registration is a single initial address,
  // separate from the 'addresses' subcollection for multiple shipping addresses.
  address?: { // This is the primary address from registration
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  createdAt?: any; // Firestore serverTimestamp or Date
}


// --- Order Related Types ---
export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: string; // Price at the time of order
  imageUrl?: string;
}

export interface Order {
  id: string; // Firestore document ID
  userId: string; // To link order to a user
  orderDate: any; // Firestore serverTimestamp or Date
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: UserAddress; // Snapshot of the address used for this order
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  orderNumber?: string; // Human-readable order number
}
