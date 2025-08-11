export type Product = {
  id: number;
  title: string;
  flavour?: string;
  price: number;
  compare_at_price: number;
  discount_label?: string;
  badge?: string[];
  category: "single" | "bundles";
  image: string;
  description?: string;
  badgeBottom?: string[];
};

export type ProductData = {
  products: Product[];
};
