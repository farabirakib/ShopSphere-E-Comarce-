import { HomePageProps } from "../type";
import FeaturedProducts from "./FeaturedProducts";
import Hero from "./HeroSection";
import PromoSection from "./AddSection";
const HomePage = ({
  setCurrentPage,
  addToCart,
  handleBuyNow,
}: HomePageProps) => (
  <>
    <Hero setCurrentPage={setCurrentPage} />
    <FeaturedProducts addToCart={addToCart} handleBuyNow={handleBuyNow} />
    <PromoSection />
  </>
);
export default HomePage;
