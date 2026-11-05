import HeroBanner from "./HeroBanner.jsx";
import ShopByCategory from "./ShopByCategory.jsx";
import FeaturedProducts from "./FeaturedProducts.jsx";
import PromoBanner from "./PromoBanner.jsx";
import Newsletter from "./Newsletter.jsx";

function HomePage() {
  return (
    <div className="container">
      <HeroBanner />
      <ShopByCategory />
      <FeaturedProducts />
      <PromoBanner />
      <Newsletter />
    </div>
  );
}

export default HomePage;
