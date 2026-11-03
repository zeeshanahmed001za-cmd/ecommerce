import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./BestSellers.module.css";

// Friendly, retail-ready category display labels
const CATEGORY_DISPLAY_LABELS = {
  "mobile-accessories": "Electronics",
  smartphones: "Electronics",
  laptops: "Tech & Laptops",
  tablets: "Tablets",
  "sports-accessories": "Sports & Fitness",
  "mens-shoes": "Footwear",
  "womens-shoes": "Footwear",
  "mens-watches": "Watches",
  "womens-watches": "Watches",
  sunglasses: "Eyewear",
  "womens-bags": "Bags & Accessories",
  "home-decoration": "Home & Living",
  furniture: "Home & Living",
  fragrances: "Fragrances",
  beauty: "Beauty",
  "skin-care": "Skincare",
  "mens-shirts": "Fashion",
  "womens-dresses": "Fashion",
};

// Excluded categories: groceries, raw food items, cooking ingredients, random vehicle parts
const EXCLUDED_CATEGORIES = new Set([
  "groceries",
  "motorcycle",
  "vehicle",
  "kitchen-accessories",
]);

// Prioritized consumer product categories across electronics, sports, fashion, accessories, and home
const PRIORITY_CATEGORIES = [
  "mobile-accessories",
  "laptops",
  "mens-watches",
  "mens-shoes",
  "sports-accessories",
  "womens-bags",
  "sunglasses",
  "furniture",
  "home-decoration",
  "fragrances",
];

// Fallback SVG placeholder when no image can be loaded
const FALLBACK_IMAGE_DATA_URI =
  "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%221.5%22%3E%3Crect%20width%3D%2224%22%20height%3D%2224%22%20fill%3D%22%23f8fafc%22%2F%3E%3Cpath%20d%3D%22M6%202%203%206v14a2%202%200%200%200%202%202h14a2%202%200%200%200%202-2V6l-3-4Z%22%2F%3E%3Cpath%20d%3D%22M3%206h18%22%2F%3E%3Cpath%20d%3D%22M16%2010a4%204%200%200%201-8%200%22%2F%3E%3C%2Fsvg%3E";

function getCategoryLabel(slug) {
  if (CATEGORY_DISPLAY_LABELS[slug]) return CATEGORY_DISPLAY_LABELS[slug];
  if (!slug) return "General";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getProductImage(product) {
  // Prefer the full-res hero product photograph if available, else thumbnail
  if (product.images && product.images.length > 0 && product.images[0]) {
    return product.images[0];
  }
  return product.thumbnail || FALLBACK_IMAGE_DATA_URI;
}

function BestSellers({ category = "all" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [addedItems, setAddedItems] = useState({});

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const carouselRef = useRef(null);

  // Update navigation arrow enabled/disabled states based on scroll position
  const updateScrollState = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
  }, []);

  useEffect(() => {
    let isCancelled = false;

    async function fetchPopularProducts() {
      setLoading(true);
      setError("");

      try {
        const isAll = !category || category === "all";
        const url = isAll
          ? "https://dummyjson.com/products?limit=194"
          : `https://dummyjson.com/products/category/${category}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            "Unable to load products. Please check your connection.",
          );
        }

        const data = await response.json();
        if (isCancelled) return;

        const rawProducts = data.products || [];
        let curatedList = [];

        if (isAll) {
          // Curated cross-category selection:
          // 1. Group high-quality products by category (rating >= 4.0, valid image, not excluded)
          const categoryGroups = {};

          for (const item of rawProducts) {
            if (EXCLUDED_CATEGORIES.has(item.category)) continue;
            if (!PRIORITY_CATEGORIES.includes(item.category)) continue;
            if ((item.rating || 0) < 4.0) continue;
            if (!item.thumbnail && (!item.images || !item.images[0])) continue;

            if (!categoryGroups[item.category]) {
              categoryGroups[item.category] = [];
            }
            categoryGroups[item.category].push(item);
          }

          // 2. Select top product per priority category for balanced variety
          for (const cat of PRIORITY_CATEGORIES) {
            if (categoryGroups[cat] && categoryGroups[cat].length > 0) {
              categoryGroups[cat].sort(
                (a, b) => (b.rating || 0) - (a.rating || 0),
              );
              curatedList.push(categoryGroups[cat][0]);
            }
          }

          // Fallback if priority categories yielded few items
          if (curatedList.length < 5) {
            const remaining = rawProducts
              .filter(
                (p) =>
                  !EXCLUDED_CATEGORIES.has(p.category) &&
                  (p.rating || 0) >= 4.0,
              )
              .sort((a, b) => (b.rating || 0) - (a.rating || 0));

            const selectedIds = new Set(curatedList.map((p) => p.id));
            for (const p of remaining) {
              if (!selectedIds.has(p.id)) {
                curatedList.push(p);
                selectedIds.add(p.id);
                if (curatedList.length >= 8) break;
              }
            }
          }
        } else {
          // Specific category requested: sort by rating descending and exclude irrelevant items
          curatedList = rawProducts
            .filter((p) => !EXCLUDED_CATEGORIES.has(p.category))
            .sort((a, b) => (b.rating || 0) - (a.rating || 0));
        }

        setProducts(curatedList);
      } catch (err) {
        if (!isCancelled) {
          setError(
            err.message ||
              "Failed to load products. Please check your connection.",
          );
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchPopularProducts();

    return () => {
      isCancelled = true;
    };
  }, [category, reloadKey]);

  // Recalculate scroll arrows on product update or window resize
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    updateScrollState();

    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [products, loading, updateScrollState]);

  const scrollPrev = () => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.firstElementChild;
    const step = card ? (card.clientWidth + 20) * 2 : el.clientWidth * 0.75;
    el.scrollBy({ left: -step, behavior: "smooth" });
  };

  const scrollNext = () => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.firstElementChild;
    const step = card ? (card.clientWidth + 20) * 2 : el.clientWidth * 0.75;
    el.scrollBy({ left: step, behavior: "smooth" });
  };

  const handleAddToCart = (productId) => {
    setAddedItems((prev) => ({ ...prev, [productId]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [productId]: false }));
    }, 1500);
  };

  const handleImageError = (e, product) => {
    // If full-res images[0] fails, fallback to thumbnail, else fallback SVG
    if (product.thumbnail && e.currentTarget.src !== product.thumbnail) {
      e.currentTarget.src = product.thumbnail;
    } else {
      e.currentTarget.onerror = null;
      e.currentTarget.src = FALLBACK_IMAGE_DATA_URI;
    }
  };

  const handleRetry = () => {
    setReloadKey((prev) => prev + 1);
  };

  if (loading) {
    return (
      <section
        className={styles.bestSellers}
        id="bestsellers"
        aria-busy="true"
        aria-label="Best Sellers Loading"
      >
        <div id="featured" className={styles.anchorOffset} aria-hidden="true" />
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionEyebrow}>CUSTOMER FAVORITES</p>
            <h2 className={styles.sectionTitle}>Best Sellers</h2>
            <p className={styles.sectionSubtitle}>
              Curated top-rated picks across electronics, fashion, home, and
              accessories
            </p>
          </div>
        </div>

        <div className={styles.carouselTrack} aria-hidden="true">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className={styles.skeletonCard} key={index}>
              <div className={styles.skeletonImage} />
              <div className={styles.skeletonInfo}>
                <div
                  className={`${styles.skeletonLine} ${styles.skeletonLineShort}`}
                />
                <div
                  className={`${styles.skeletonLine} ${styles.skeletonLineTitle}`}
                />
                <div
                  className={`${styles.skeletonLine} ${styles.skeletonLinePrice}`}
                />
                <div className={styles.skeletonButton} />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.bestSellers} id="bestsellers">
        <div id="featured" className={styles.anchorOffset} aria-hidden="true" />
        <div className={styles.errorState} role="alert">
          <p className={styles.errorMessage}>{error}</p>
          <button
            type="button"
            className={styles.retryButton}
            onClick={handleRetry}
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className={styles.bestSellers} id="bestsellers">
        <div id="featured" className={styles.anchorOffset} aria-hidden="true" />
        <div className={styles.emptyState}>
          <p className={styles.emptyMessage}>
            No products currently available in this selection.
          </p>
          <button
            type="button"
            className={styles.retryButton}
            onClick={handleRetry}
          >
            Refresh Selection
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      className={styles.bestSellers}
      id="bestsellers"
      aria-labelledby="bestsellers-heading"
    >
      <div id="featured" className={styles.anchorOffset} aria-hidden="true" />

      {/* Section Header */}
      <div className={styles.sectionHeader}>
        <div>
          <p className={styles.sectionEyebrow}>CUSTOMER FAVORITES</p>
          <h2 id="bestsellers-heading" className={styles.sectionTitle}>
            Best Sellers
          </h2>
          <p className={styles.sectionSubtitle}>
            Top-rated picks across electronics, sports, fashion, home, and
            accessories
          </p>
        </div>

        <div className={styles.headerActions}>
          {/* Desktop Navigation Arrows */}
          <div
            className={styles.carouselNav}
            role="group"
            aria-label="Carousel navigation"
          >
            <button
              type="button"
              className={styles.navButton}
              onClick={scrollPrev}
              disabled={!canScrollLeft}
              aria-label="Previous products"
              title="Previous"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              className={styles.navButton}
              onClick={scrollNext}
              disabled={!canScrollRight}
              aria-label="Next products"
              title="Next"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Track with Native Mobile Swipe */}
      <div
        className={styles.carouselTrack}
        ref={carouselRef}
        role="region"
        aria-label="Best Sellers horizontal carousel"
        tabIndex={0}
      >
        {products.map((product) => {
          const isAdded = !!addedItems[product.id];
          const displayImage = getProductImage(product);
          const categoryLabel = getCategoryLabel(product.category);

          return (
            <article className={styles.productCard} key={product.id}>
              {/* Product Thumbnail & Rating Badge */}
              <div className={styles.imageWrapper}>
                <img
                  className={styles.productImage}
                  src={displayImage}
                  alt={product.title}
                  loading="lazy"
                  onError={(e) => handleImageError(e, product)}
                />
                {product.rating ? (
                  <div
                    className={styles.ratingBadge}
                    title={`Rated ${product.rating.toFixed(1)} out of 5`}
                  >
                    <span className={styles.ratingStar} aria-hidden="true">
                      ★
                    </span>
                    <span>{product.rating.toFixed(1)}</span>
                  </div>
                ) : null}
              </div>

              {/* Product Details */}
              <div className={styles.productInfo}>
                <p className={styles.productCategory}>{categoryLabel}</p>

                <h3 className={styles.productTitle} title={product.title}>
                  {product.title}
                </h3>

                <div className={styles.productFooter}>
                  <p className={styles.productPrice}>
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>

                  <button
                    type="button"
                    className={`${styles.addToCartButton} ${isAdded ? styles.addedActive : ""}`}
                    onClick={() => handleAddToCart(product.id)}
                    aria-label={`Add ${product.title} to cart`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="8" cy="21" r="1" />
                      <circle cx="19" cy="21" r="1" />
                      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                    </svg>
                    <span>{isAdded ? "Added ✓" : "Add to Cart"}</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default BestSellers;
