import styles from "./HeroBanner.module.css";

function HeroBanner() {
  return (
    <section className={styles.hero} aria-label="Hero Introduction">
      <div className={styles.heroContainer}>
        {/* Left Content */}
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={styles.badgePulse} />
            <span>SPRING 2026 COLLECTION</span>
          </div>

          <h1 className={styles.headline}>
            Better Products for a <span className={styles.highlight}>Brighter Lifestyle</span>
          </h1>

          <p className={styles.description}>
            Discover curated gadgets, trending essentials, and premium lifestyle goods — designed
            for modern everyday living at prices you’ll love.
          </p>

          <div className={styles.ctaGroup}>
            <a href="#featured" className={styles.primaryButton}>
              Explore Collection
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>

            <a href="#deals" className={styles.secondaryButton}>
              View Flash Deals
            </a>
          </div>

          {/* Trust Highlights */}
          <div className={styles.trustRow}>
            <div className={styles.trustItem}>
              <span className={styles.trustStar}>★</span>
              <span><strong>4.9/5</strong> Rating (12k+ Reviews)</span>
            </div>
            <span className={styles.trustDivider}>•</span>
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
              src="/images/hero-lifestyle.jpg"
              alt="Premium lifestyle gadgets and curated accessories"
              className={styles.heroImage}
              loading="eager"
            />
            {/* Floating Offer Badge */}
            <div className={styles.floatingBadge}>
              <span className={styles.floatingTag}>🔥 HOT DEAL</span>
              <p className={styles.floatingTitle}>Up to 40% OFF</p>
              <span className={styles.floatingSub}>On top audio & smart gear</span>
            </div>

            {/* Floating Quality Pill */}
            <div className={styles.verifiedBadge}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>100% Genuine</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
