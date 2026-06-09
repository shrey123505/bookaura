export type ProductCategory = "Books" | "Productivity" | "Wellness" | "Creative Tools";

export type Product = {
  id: string;
  title: string;
  slug: string;
  category: ProductCategory;
  price: number;
  rating: number;
  badge: string;
  image: string;
  image_url: string;
  description: string;
  features: string[];
  stock: number;
  featured: boolean;
  active: boolean;
  created_at?: string;
  updated_at?: string;
};

export type ContactMessage = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  topic: string;
  message: string;
  status: "new" | "read" | "archived";
  created_at: string;
};

export type Order = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  status: string;
  total: number;
  created_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string | null;
  product_title: string;
  quantity: number;
  unit_price: number;
  total: number;
  created_at: string;
};
