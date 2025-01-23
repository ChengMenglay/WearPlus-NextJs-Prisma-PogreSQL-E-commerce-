export interface Billboard {
  id: string;
  title: string;
  url: string;
}

export interface Category {
  id: string;
  name: string;
  url: string | null;
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
