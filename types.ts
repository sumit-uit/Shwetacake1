
export interface Product {
  name: string;
  price: string;
  description?: string;
  image: string;
}

export interface Category {
  name: string;
  id: string;
  description?: string;
  products: Product[];
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}
