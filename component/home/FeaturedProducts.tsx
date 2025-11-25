import { allProducts } from "../Product";
import ProductCard from "../shared/product-card/ProductCard";
import { FeaturedProductsProps } from "../type";

const featuredProducts = allProducts.slice().reverse().slice(0, 4);

const FeaturedProducts = ({
  addToCart,
  handleBuyNow,
}: FeaturedProductsProps) => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4 lg:px-8">
      <h2 className="text-center text-4xl font-semibold mb-12 text-gray-800">
       Future Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            handleBuyNow={handleBuyNow}
          />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedProducts
