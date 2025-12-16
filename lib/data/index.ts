export * from "./products.types";

// Импортируем новые массивы товаров
import { shawarmaProducts } from "./products/shawarma";
import { donerProducts } from "./products/doner";
import { shashlikProducts } from "./products/shashlik";
import { sidesProducts } from "./products/sides";
import { saucesProducts } from "./products/sauces";
import { setsProducts } from "./products/sets";
import { promotionsProducts } from "./products/promotions";

// Объединяем все товары в один массив
export const products = [
  ...shawarmaProducts,
  ...donerProducts,
  ...shashlikProducts,
  ...sidesProducts,
  ...saucesProducts,
  ...setsProducts,
  ...promotionsProducts,
];

// Получение товаров по основной категории
export const getProductsByCategory = (category: string) => {
  return products.filter((product) => product.category === category);
};

// Получение товаров по подкатегории
export const getProductsBySubcategory = (subcategory: string) => {
  return products.filter((product) => product.subcategory === subcategory);
};

// Получение только акционных товаров
export const getPromotionProducts = () => {
  return products.filter((product) => product.isPromotion);
};

// Поиск товаров
export const searchProducts = (query: string) => {
  const searchTerm = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      (product.subcategory &&
        product.subcategory.toLowerCase().includes(searchTerm))
  );
};
