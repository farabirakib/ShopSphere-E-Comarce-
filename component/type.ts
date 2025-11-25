import { StaticImageData } from "next/image";

export interface HomePageProps extends HeroProps {
  addToCart: (product: Product) => void;
  handleBuyNow: (product: Product) => void;
}

export interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export interface OrderConfirmationPageProps {
  setCurrentPage: (page: string) => void;
}

export interface CheckoutPageProps {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  setCurrentPage: (page: string) => void;
}

export interface CartPageProps {
  cart: CartItem[];
  updateCartQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  handleCheckout: () => void;
}

export interface ShopPageProps {
  selectedCategory: Category | null;
  addToCart: (product: Product) => void;
  handleBuyNow: (product: Product) => void;
}

export interface CategoriesPageProps {
  setCurrentPage: (page: string) => void;
  setSelectedCategory: (category: Category) => void;
}

export interface FeaturedProductsProps {
  addToCart: (product: Product) => void;
  handleBuyNow: (product: Product) => void;
}

export interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
  handleBuyNow: (product: Product) => void;
}

export interface HeroProps {
  setCurrentPage: (page: string) => void;
}

export interface HeaderProps {
  setCurrentPage: (page: string) => void;
  currentPage: string;
  setSelectedCategory: (category: Category | null) => void;
  cartCount: number;
}

export type Category = "Apparel" | "Footwear" | "Accessories";

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string | StaticImageData;
  category: Category;
  sku?: string;
  description?: string;
  isInStock?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
