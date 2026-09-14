export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  stock: number;
  badge?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Reel {
  id: string;
  title: string;
  thumbnail: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  amount: number;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';
  customerName: string;
  items: number;
  paymentStatus: 'Paid' | 'Unpaid';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  mobile: string;
  totalOrders: number;
  totalSpending: number;
}
