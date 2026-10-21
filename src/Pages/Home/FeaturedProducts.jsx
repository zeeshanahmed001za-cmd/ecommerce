import { useEffect, useState } from "react";
import styles from "./FeaturedProducts.module.css";

function FeaturedProducts({ category = "all" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    async function fetchProducts() {
      setLoading(true);
      setError("");

      try {
        const url =
          category && category !== "all"
            ? `https://dummyjson.com/products/category/${category}?limit=8`
            : "https://dummyjson.com/products?limit=8";

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to load products. Please try again.");
        }

        const data = await response.json();
        if (!isCancelled) {
          setProducts(data.products || []);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(
            err.message || "Something went wrong while fetching products."
          );
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      isCancelled = true;
    };
  }, [category, reloadKey]);

  const handleRetry = () => {
    setReloadKey((prev) => prev + 1);
  };

  if (loading) {
    return (
      <section
        className={styles.featuredProducts}
        id="featured"
        aria-busy="true"
        aria-label="Featured Products Loading"
      >
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionEyebrow}>HANDPICKED FOR YOU</p>
            <h2 className={styles.sectionTitle}>Featured Products</h2>
          </div>
        </div>

        <div className={styles.productGrid}>
          {Array.from({ length: 8 }).map((_, index) => (
            <div className={styles.skeletonCard} key={index} aria-hidden="true">
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
      <section className={styles.featuredProducts} id="featured">
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

  return (
    <section
      className={styles.featuredProducts}
      id="featured"
      aria-labelledby="featured-products-heading"
    >
      <div className={styles.sectionHeader}>
        <div>
          <p className={styles.sectionEyebrow}>HANDPICKED FOR YOU</p>
          <h2 id="featured-products-heading" className={styles.sectionTitle}>
            Featured Products
          </h2>
        </div>
        <span className={styles.countTag}>{products.length} Products Available</span>
      </div>

      <div className={styles.productGrid}>
        {products.map((product) => (
          <article className={styles.productCard} key={product.id}>
            <div className={styles.imageWrapper}>
              <img
                className={styles.productImage}
                src={product.thumbnail}
                alt={product.title}
                loading="lazy"
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

            <div className={styles.productInfo}>
              <p className={styles.productCategory}>{product.category}</p>

              <h3 className={styles.productTitle} title={product.title}>
                {product.title}
              </h3>

              <div className={styles.productFooter}>
                <p className={styles.productPrice}>
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
                <button type="button" className={styles.productButton}>
                  View Product
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
