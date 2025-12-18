import { Product } from "../products.types";

export const promotionsProducts: Product[] = [
  {
    id: 701,
    name: "Шашлык-фест",
    price: 200,
    originalPrice: 250,
    description: "При покупке 1 кг шашлыка 2 соуса и 2 лаваша в подарок",
    category: "promotions",
    image: "/images/promotions/day-offer.jpg",
    weight: 350,
    unit: "г",
    isPromotion: true,
    discount: 20,
  }
];
