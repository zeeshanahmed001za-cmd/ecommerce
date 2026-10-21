import styles from "./PromoBanner.module.css";

function PromoBanner() {
  return (
    <section className={styles.promoBanner} id="deals" aria-label="Limited Time Promotion">
      <div className={styles.promoContainer}>
        {/* Left Content */}
        <div className={styles.promoContent}>
          <div className={styles.badgeRow}>
            <span className={styles.promoTag}>LIMITED TIME SALE</span>
            <span className={styles.timerBadge}>
              <span className={styles.clockIcon}>⏳</span> Ends in 02d : 14h : 38m
            </span>
          </div>

          <h2 className={styles.heading}>
            Upgrade Your Everyday Tech & Audio
          </h2>

          <p className={styles.description}>
            Experience studio-grade sound and minimalist design. Save up to{" "}
            <strong>50% OFF</strong> on premium wireless audio, smartwatch gear, and charging
            essentials.
          </p>

          <div className={styles.couponBox}>
            <span className={styles.couponLabel}>Use Promo Code:</span>
            <span className={styles.couponCode}>SPRING50</span>
          </div>

          <div className={styles.ctaRow}>
            <a href="#featured" className={styles.primaryBtn}>
              Shop the Sale
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
            <span className={styles.termsNote}>*Discounts apply automatically at checkout</span>
          </div>
        </div>

        {/* Right Media */}
        <div className={styles.promoImageWrapper}>
          <img
            src="/images/promo-banner.jpg"
            alt="Elevate your everyday tech with premium audio and accessories"
            className={styles.promoImage}
            loading="lazy"
          />
          <div className={styles.discountFloatingBadge}>
            <span className={styles.discountNum}>50%</span>
            <span className={styles.discountTxt}>OFF</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromoBanner;
