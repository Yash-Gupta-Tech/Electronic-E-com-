export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  badge?: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}
