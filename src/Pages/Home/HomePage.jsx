import { useCategory } from "../../ContextProvider/CategoryContext.jsx";
import HeroBanner from "./HeroBanner.jsx";
import FeaturedProducts from "./FeaturedProducts.jsx";
import PromoBanner from "./PromoBanner.jsx";
import Newsletter from "./Newsletter.jsx";

function HomePage() {
  const { selectedCategory } = useCategory();

  return (
    <div className="container">
      <HeroBanner />
      <FeaturedProducts category={selectedCategory} />
      <PromoBanner />
      <Newsletter />
    </div>
  );
}

export default HomePage;
