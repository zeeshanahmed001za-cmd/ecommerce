import styles from "./PromoBanner.module.css";

function PromoBanner() {
  return (
    <section
      className={styles.promoBanner}
      id="deals"
      aria-labelledby="promo-heading"
    >
      <div className={styles.promoContainer}>
        {/* Left Column: Promotional Content */}
        <div className={styles.promoContent}>
          <div className={styles.badgeRow}>
            <span className={styles.discountBadge}>
              <span className={styles.badgeDot} aria-hidden="true"></span>
              Save Up To 15% OFF
            </span>
            <div
              className={styles.timerBadge}
              role="timer"
              aria-label="Sale ends in 3 days, 8 hours, and 45 minutes"
            >
              <span className={styles.clockIcon} aria-hidden="true">
                ⏳
              </span>
              <span className={styles.timerLabel}>Ends in:</span>
              <time className={styles.timeValue} dateTime="P3DT8H45M">
                03d : 08h : 45m
              </time>
            </div>
          </div>

          <h2 id="promo-heading" className={styles.heading}>
            Elevate Your Listening Experience – Save 15%
          </h2>

          <p className={styles.description}>
            Discover exceptional sound quality and seamless wireless connectivity. Explore our premium headphone collection and enjoy up to <strong>15% off</strong> selected models.
          </p>

          {/* Coupon + CTA side by side */}
          <div className={styles.ctaRow}>
            <div
              className={styles.couponBox}
              role="group"
              aria-label="Promotional Discount Code"
            >
              <span className={styles.couponLabel}>Promo Code:</span>
              <code className={styles.couponCode}>AUDIO15</code>
            </div>
            <a href="#bestsellers" className={styles.primaryBtn}>
              <span>Shop Headphones</span>
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
          </div>
        </div>

        {/* Right Column: Visual Media */}
        <div className={styles.promoImageWrapper}>
          <div className={styles.imageCard}>
            <img
              src="/images/promoimage.jpg"
              alt="Close-up of woman listening to music with premium matte black wireless over-ear headphones"
              className={styles.promoImage}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromoBanner;
