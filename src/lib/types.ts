
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
  id?: string; // Optional: for Firestore document ID if stored as separate docs
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  fullName?: string; // Often associated with an address
  phoneNumber?: string; // Often associated with an address
  isDefault?: boolean; // Optional: if user can set a default address
}

export interface UserProfile {
  uid: string;
  email: string; // Typically non-editable by user directly after creation
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  // Addresses might be a subcollection in Firestore or an array if simple
  // For this example, we'll manage addresses via actions that would use a subcollection
  // address: UserAddress; // This was for the registration form, profile might have multiple addresses
  createdAt?: any;
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
