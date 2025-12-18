export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image?: string;
  category: "main" | "sets" | "promotions";
  subcategory?:
    | "shawarma"
    | "doner"
    | "shawarma-new"
    | "shashlik"
    | "sides"
    | "sauces"
    | "sets";
  weight?: number;
  unit?: string;
  isPromotion?: boolean;
  originalPrice?: number;
  discount?: number;
  setIncludes?: string[];
  badge?: "new" | "hit" | "recommended";
}
