
export interface Product {
  id: string;
  name: string;
  description: string;
  careInstructions: string;
  imageUrl: string;
  dataAiHint: string;
  price?: string; // Optional for now
  category?: string; // Optional
  isLatest?: boolean; // To identify latest products for home page
}

export interface CartItem extends Product {
  quantity: number;
}
