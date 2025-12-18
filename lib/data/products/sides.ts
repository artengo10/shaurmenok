import { Product } from "../products.types";

export const sidesProducts: Product[] = [
  {
    id: 401,
    name: "Картофель фри",
    price: 150, // Нужно указать цену
    description: "Хрустящий картофель фри, золотистые ломтики",
    category: "main",
    subcategory: "sides",
    image: "/images/products/sides/fries.jpg",
    weight: 150,
    unit: "г",
  },
  {
    id: 402,
    name: "Картофель по-деревенски",
    price: 150, // Нужно указать цену
    description: "Картофель с кожурой, запеченный со специями",
    category: "main",
    subcategory: "sides",
    image: "/images/products/sides/country-potato.jpg",
    weight: 180,
    unit: "г",
  },
  {
    id: 403,
    name: "Луковые кольца",
    price: 150, // Нужно указать цену
    description: "Хрустящие луковые кольца в панировке",
    category: "main",
    subcategory: "sides",
    image: "/images/products/sides/onion-rings.jpg",
    weight: 180,
    unit: "г",
  },
];
