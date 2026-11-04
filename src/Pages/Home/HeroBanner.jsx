import styles from "./HeroBanner.module.css";

const HERO_IMAGE_URL = "/images/hero-banner.jpg";

function HeroBanner() {
  return (
    <section className={styles.hero} aria-label="Hero Introduction">
      <div className={styles.heroContainer}>
        {/* Left Content */}
        <div className={styles.heroContent}>
          <h1 className={styles.headline}>
            Discover More with <span className={styles.highlight}>ASTRA</span>
          </h1>

          <p className={styles.description}>
            Explore electronics, fashion, beauty, home essentials, and everyday products in one convenient destination. Browse different categories, compare products, and find the right options for your needs.
          </p>

          <div className={styles.ctaGroup}>
            <a href="#featured" className={styles.primaryButton}>
              Shop Now
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
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>

            <a href="#categories" className={styles.secondaryButton}>
              Explore Categories
            </a>
          </div>
        </div>

        {/* Right Visual Showcase */}
        <div className={styles.heroVisual}>
          <div className={styles.imageCard}>
            <img
              src={HERO_IMAGE_URL}
              alt="Laptop displaying online ecommerce storefront on modern desk"
              className={styles.heroImage}
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
