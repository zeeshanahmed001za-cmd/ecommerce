import { useCategory } from "../../ContextProvider/CategoryContext.jsx";
import HeroBanner from "./HeroBanner.jsx";
import TrustBar from "./TrustBar.jsx";
import CategoryBar from "./CategoryBar.jsx";
import FeaturedProducts from "./FeaturedProducts.jsx";
import PromoBanner from "./PromoBanner.jsx";
import Newsletter from "./Newsletter.jsx";

function HomePage() {
  const { selectedCategory, setSelectedCategory } = useCategory();

  return (
    <div className="container">
      <HeroBanner />
      <TrustBar />
      <CategoryBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <FeaturedProducts category={selectedCategory} />
      <PromoBanner />
      <Newsletter />
    </div>
  );
}

export default HomePage;
