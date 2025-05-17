export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  image: string | null;
  role: string;
}
export interface Billboard {
  id: string;
  title: string;
  url: string;
}

export interface Category {
  id: string;
  name: string;
  url: string | null;
  description: string | null;
}

export interface Product {
  id: string;
  category: Category;
  name: string;
  detail: string;
  price: string;
  type: string;
  stock: number;
  sizes: ProductSize[];
  quantity?: number;
  isFeatured: boolean;
  images: Image[];
}

export interface Image {
  id: string;
  url: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface ProductSize {
  id: string;
  productId: string;
  sizeId: string;
  size: Size; // Relationship to Size
}

export interface Province {
  id: string;
  name: string;
}

export interface Address {
  id: string;
  province: string;
  addressDetail: string;
  note: string | null;
  user: User;
}

export interface Delivery {
  id: string;
  name: string;
  description: string;
  price: string;
  logo_url: string;
  createdAt: Date;
  updatedAt: Date;
}
