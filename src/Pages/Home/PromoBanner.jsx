import styles from "./PromoBanner.module.css";

// High-resolution photography: natural smartphone photography during Diwali Festival of Lights
const FESTIVE_PROMO_IMAGE_URL =
  "https://images.unsplash.com/photo-1792665291143-5f5ae36c13fb?auto=format&fit=crop&w=1200&q=80";

// Clean fallback data URI in case network is disconnected
const FALLBACK_IMAGE_DATA_URI =
  "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22800%22%20height%3D%22500%22%20viewBox%3D%220%200%20800%20500%22%3E%3Crect%20fill%3D%22%231e293b%22%20width%3D%22800%22%20height%3D%22500%22%2F%3E%3Ccircle%20cx%3D%22400%22%20cy%3D%22250%22%20r%3D%2280%22%20fill%3D%22%23334155%22%2F%3E%3Cpath%20d%3D%22M400%20190l18%2036%2040%206-29%2028%207%2040-36-19-36%2019%207-40-29-28%2040-6z%22%20fill%3D%22%23f59e0b%22%2F%3E%3C%2Fsvg%3E";

function PromoBanner() {
  const handleImageError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = FALLBACK_IMAGE_DATA_URI;
  };

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
            <span className={styles.promoTag}>DIWALI FESTIVE SALE</span>
            <div
              className={styles.timerBadge}
              role="timer"
              aria-label="Sale ends in 2 days, 14 hours, and 38 minutes"
            >
              <span className={styles.clockIcon} aria-hidden="true">
                ⏳
              </span>
              <span className={styles.timerLabel}>Ends in:</span>
              <time className={styles.timeValue} dateTime="P2DT14H38M">
                02d : 14h : 38m
              </time>
            </div>
          </div>

          <h2 id="promo-heading" className={styles.heading}>
            Illuminate Your Celebrations with Festive Tech
          </h2>

          <p className={styles.description}>
            Capture cherished festive memories and elevate your everyday lifestyle.
            Save up to <strong>50% OFF</strong> on flagship smartphones, wireless
            audio, smart living, and curated festive gifting essentials.
          </p>

          <div
            className={styles.couponBox}
            role="group"
            aria-label="Promotional Discount Code"
          >
            <span className={styles.couponLabel}>Use Promo Code:</span>
            <code className={styles.couponCode}>DIWALI50</code>
          </div>

          <div className={styles.ctaRow}>
            <a href="#bestsellers" className={styles.primaryBtn}>
              <span>Shop Festive Deals</span>
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

        {/* Right Column: Visual Media & Discount Pill */}
        <div className={styles.promoImageWrapper}>
          <div className={styles.imageCard}>
            <img
              src={FESTIVE_PROMO_IMAGE_URL}
              alt="Person using a smartphone to capture glowing festive diyas during Diwali celebrations"
              className={styles.promoImage}
              loading="lazy"
              onError={handleImageError}
            />
            {/* Discount Badge */}
            <div
              className={styles.discountFloatingBadge}
              aria-label="Special offer: 50 percent off discount"
            >
              <span className={styles.discountNum}>50%</span>
              <span className={styles.discountTxt}>OFF</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromoBanner;
