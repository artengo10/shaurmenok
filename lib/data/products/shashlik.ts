import { Product } from "../products.types";

export const shashlikProducts: Product[] = [
  // Основные шашлыки из меню
  {
    id: 301,
    name: "Шашлык из свиной шеи",
    price: 500, // Нужно указать цену
    description: "Сочный шашлык из свиной шеи на мангале",
    category: "main",
    subcategory: "shashlik",
    image: "/images/products/shashlik/pork-neck.jpg",
    weight: 250,
    unit: "г",
  },
  {
    id: 302,
    name: "Шашлык из куриных крыльев",
    price: 300, // Нужно указать цену
    description: "Хрустящие куриные крылья на гриле",
    category: "main",
    subcategory: "shashlik",
    image: "/images/products/shashlik/chicken-wings.jpg",
    weight: 300,
    unit: "г",
  },
  {
    id: 303,
    name: "Шашлык из баранины",
    price: 900, // Нужно указать цену
    description: "Ароматный шашлык из молодой баранины",
    category: "main",
    subcategory: "shashlik",
    image: "/images/products/shashlik/lamb.jpg",
    weight: 220,
    unit: "г",
    badge: "hit",
  },
  // Люля-кебабы
  {
    id: 304,
    name: "Люля-кебаб из баранины",
    price: 450, // Нужно указать цену
    description: "Традиционный люля-кебаб из рубленой баранины со специями",
    category: "main",
    subcategory: "shashlik",
    image: "/images/products/shashlik/lulya-lamb.jpg",
    weight: 200,
    unit: "г",
  },
  {
    id: 305,
    name: "Люля-кебаб из свинины",
    price: 450, // Нужно указать цену
    description: "Сочный люля-кебаб из свинины",
    category: "main",
    subcategory: "shashlik",
    image: "/images/products/shashlik/lulya-pork.jpg",
    weight: 200,
    unit: "г",
  },
  {
    id: 306,
    name: "Люля-кебаб из курицы",
    price: 450, // Нужно указать цену
    description: "Нежный люля-кебаб из куриного филе",
    category: "main",
    subcategory: "shashlik",
    image: "/images/products/shashlik/lulya-chicken.jpg",
    weight: 200,
    unit: "г",
  },
  // Овощи и гриль (новые позиции)
  {
    id: 307,
    name: "Овощи гриль",
    price: 300, // Нужно указать цену
    description: "Ассорти из свежих овощей, зажаренных на гриле",
    category: "main",
    subcategory: "shashlik", // или можно создать subcategory: "grill"
    image: "/images/products/shashlik/grill-veggies.jpg",
    weight: 200,
    unit: "г",
  },
  {
    id: 308,
    name: "Шампиньоны гриль",
    price: 200, // Нужно указать цену
    description: "Свежие шампиньоны, приготовленные на гриле",
    category: "main",
    subcategory: "shashlik",
    image: "/images/products/shashlik/grill-mushrooms.jpg",
    weight: 180,
    unit: "г",
  },
  {
    id: 309,
    name: "Картофель запеченый",
    price: 150, // Нужно указать цену
    description: "Печеный картофель с травами",
    category: "main",
    subcategory: "shashlik", // Или subcategory: "sides", если перенесем в гарниры
    image: "/images/products/shashlik/baked-potato.jpg",
    weight: 200,
    unit: "г",
  },
];
