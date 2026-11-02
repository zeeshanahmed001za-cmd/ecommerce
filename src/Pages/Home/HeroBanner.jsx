import styles from "./HeroBanner.module.css";

const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80";

function HeroBanner() {
  return (
    <section className={styles.hero} aria-label="Hero Introduction">
      <div className={styles.heroContainer}>
        {/* Left Content */}
        <div className={styles.heroContent}>
          {/* Promotion Badge */}
          <div className={styles.badge}>
            <span className={styles.badgePulse} />
            <span>CURATED ONLINE RETAIL</span>
          </div>

          <h1 className={styles.headline}>
            Everything You Need, <span className={styles.highlight}>All in One Place</span>
          </h1>

          <p className={styles.description}>
            Discover top-rated products across electronics, home essentials, fashion, and daily living. Enjoy verified reviews, reliable value, and fast doorstep delivery.
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

            <a href="#deals" className={styles.secondaryButton}>
              Browse Deals
            </a>
          </div>

          {/* Trust Highlights */}
          <div className={styles.trustRow}>
            <div className={styles.trustItem}>
              <span className={styles.trustStar}>★</span>
              <span><strong>4.9/5</strong> Rating (12k+ Reviews)</span>
            </div>
            <span className={styles.trustDivider}>·</span>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>⚡</span>
              <span><strong>Free Delivery</strong> above ₹499</span>
            </div>
          </div>
        </div>

        {/* Right Visual Showcase */}
        <div className={styles.heroVisual}>
          <div className={styles.imageCard}>
            <img
              src={HERO_IMAGE_URL}
              alt="Curated retail lifestyle collection showcasing multi-category products"
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
