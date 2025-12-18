import { Product } from "../products.types";

export const saucesProducts: Product[] = [
  {
    id: 501,
    name: "Сырный соус",
    price: 50, // Нужно указать цену
    description: "Нежный сливочно-сырный соус",
    category: "main",
    subcategory: "sauces",
    image: "/images/products/sauces/cheese.jpg",
    weight: 50,
    unit: "г",
    badge: "hit",
  },
  {
    id: 502,
    name: "Кисло-сладкий соус",
    price: 50, // Нужно указать цену
    description: "Традиционный кисло-сладкий соус",
    category: "main",
    subcategory: "sauces",
    image: "/images/products/sauces/sweet-sour.jpg",
    weight: 50,
    unit: "г",
  },
  {
    id: 503,
    name: "Шашлычный соус",
    price: 50, // Нужно указать цену
    description: "Фирменный соус для шашлыка",
    category: "main",
    subcategory: "sauces",
    image: "/images/products/sauces/shashlik-sauce.jpg",
    weight: 50,
    unit: "г",
  },
  {
    id: 504,
    name: "Чесночный соус",
    price: 50, // Нужно указать цену
    description: "Ароматный чесночный соус",
    category: "main",
    subcategory: "sauces",
    image: "/images/products/sauces/garlic.jpg",
    weight: 50,
    unit: "г",
  },
  {
    id: 505,
    name: "Фирменный соус",
    price: 50, // Нужно указать цену
    description: "Уникальный фирменный соус от Шаурменка",
    category: "main",
    subcategory: "sauces",
    image: "/images/products/sauces/house-special.jpg",
    weight: 50,
    unit: "г",
    badge: "new",
  },
];
