export interface Billboard {
  id: string;
  title: string;
  url: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  category: Category;
  name: string;
  detail: string;
  price: string;
  type: string;
  sizes: Size[];
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
