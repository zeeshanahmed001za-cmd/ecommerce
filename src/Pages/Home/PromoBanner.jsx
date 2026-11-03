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
            <span className={styles.promoTag}>LIMITED TIME OFFER</span>
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
            Studio-Grade Sound, Wherever You Go
          </h2>

          <p className={styles.description}>
            Immerse yourself in rich, crystal-clear audio with our premium
            wireless headphones. Perfect for music, podcasts, and studio
            sessions. Get <strong>15% OFF</strong> on top-rated headphones and
            audio accessories this season.
          </p>

          <div
            className={styles.couponBox}
            role="group"
            aria-label="Promotional Discount Code"
          >
            <span className={styles.couponLabel}>Use Promo Code:</span>
            <code className={styles.couponCode}>AUDIO15</code>
          </div>

          <div className={styles.ctaRow}>
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
            <span className={styles.termsNote}>
              *Discounts apply automatically at checkout
            </span>
          </div>
        </div>

        {/* Right Column: Visual Media & Discount Badge */}
        <div className={styles.promoImageWrapper}>
          <div className={styles.imageCard}>
            <img
              src="/images/promo-headphones.jpg"
              alt="Woman wearing premium headphones while recording music in a cozy studio"
              className={styles.promoImage}
              loading="lazy"
            />
            {/* Redesigned Discount Badge */}
            <div
              className={styles.discountFloatingBadge}
              aria-label="Special offer: 15 percent off discount"
            >
              <span className={styles.discountNum}>15%</span>
              <span className={styles.discountDivider}></span>
              <span className={styles.discountTxt}>OFF</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromoBanner;
