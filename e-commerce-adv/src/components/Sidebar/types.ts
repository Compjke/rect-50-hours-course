export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type Categories = {
  slug: string;
  name: string;
  url: string;
};

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: Tag[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export type Tag =
  | "beauty"
  | "mascara"
  | "eyeshadow"
  | "face powder"
  | "lipstick"
  | "nail polish"
  | "fragrances"
  | "perfumes"
  | "furniture"
  | "beds"
  | "sofas"
  | "bedside tables"
  | "office chairs"
  | "bathroom"
  | "groceries"
  | "fruits"
  | "meat"
  | "pet supplies"
  | "cat food"
  | "dog food"
  | "dairy"
  | "seafood"
  | "vegetables"
  | "condiments"
  | "desserts"
  | "beverages";
