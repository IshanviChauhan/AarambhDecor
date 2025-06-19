
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
  featured?: boolean; // Changed from isLatest
  sizeAndDimensions?: string;
  material?: string;
  reviews?: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}

// --- User Profile & Address Types ---
export interface UserAddress {
  id: string; // Firestore document ID for the address subcollection item
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  fullName?: string; // Recipient name for this specific address
  phoneNumber?: string | null;
  isDefault?: boolean;
  createdAt?: any; // Firestore serverTimestamp or Date
}

export interface UserProfile {
  uid: string; // Firebase Auth UID, also the document ID in 'userProfile' collection
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  // This 'address' field stores the initial address provided during registration.
  // Additional shipping addresses are stored in a subcollection.
  address?: {
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

