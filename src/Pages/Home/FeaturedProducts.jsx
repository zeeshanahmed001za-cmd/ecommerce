import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./FeaturedProducts.module.css";
import { products } from "../../data/products.js";

function FeaturedProducts() {
  const [addedItems, setAddedItems] = useState({});
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const carouselRef = useRef(null);

  // Filter only products marked featured
  const featuredProducts = products.filter((product) => product.featured);

  // Update navigation arrow enabled/disabled states based on scroll position
  const updateScrollState = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    updateScrollState();

    el.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

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

  return (
    <section
      className={styles.featuredProducts}
      id="featured"
      aria-labelledby="featured-heading"
    >
      <div id="bestsellers" className={styles.anchorOffset} aria-hidden="true" />

      {/* Section Header */}
      <div className={styles.sectionHeader}>
        <div>
          <p className={styles.sectionEyebrow}>CURATED PICKS</p>
          <h2 id="featured-heading" className={styles.sectionTitle}>
            Featured Products
          </h2>
          <p className={styles.sectionSubtitle}>
            Explore our handpicked selection of top-rated essentials across all
            categories
          </p>
        </div>

        <div className={styles.headerActions}>
          {/* View All Products Link */}
          <a href="#shop" className={styles.viewAllLink}>
            <span>View All Products</span>
            <svg
              className={styles.viewAllArrow}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>

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
        aria-label="Featured Products horizontal carousel"
        tabIndex={0}
      >
        {featuredProducts.map((product) => {
          const isAdded = !!addedItems[product.id];

          return (
            <article className={styles.productCard} key={product.id}>
              {/* Product Thumbnail */}
              <div className={styles.imageWrapper}>
                <img
                  className={styles.productImage}
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                />
              </div>

              {/* Product Details */}
              <div className={styles.productInfo}>
                <p className={styles.productCategory}>{product.category}</p>

                <h3 className={styles.productTitle} title={product.name}>
                  {product.name}
                </h3>

                {/* Rating Row: rating value → 6 star icons → review count */}
                <div
                  className={styles.ratingRow}
                  aria-label={`Rated ${product.rating ? product.rating.toFixed(1) : "4.8"
                    } out of 5 stars from ${product.reviewsCount || 120} reviews`}
                >
                  <span className={styles.ratingValue}>
                    {product.rating ? product.rating.toFixed(1) : "4.8"}
                  </span>
                  <div className={styles.starIcons} aria-hidden="true">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <svg
                        key={index}
                        className={styles.starIcon}
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <span className={styles.reviewCount}>
                    ({product.reviewsCount || 120})
                  </span>
                </div>

                <div className={styles.productFooter}>
                  <p className={styles.productPrice}>
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>

                  <button
                    type="button"
                    className={`${styles.addToCartButton} ${isAdded ? styles.addedActive : ""
                      }`}
                    onClick={() => handleAddToCart(product.id)}
                    aria-label={`Add ${product.name} to cart`}
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

export default FeaturedProducts;

