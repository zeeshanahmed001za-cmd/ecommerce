import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer} aria-label="Site Footer">
      <div className={`container ${styles.footerContainer}`}>
        {/* Top 4 Columns */}
        <div className={styles.grid}>
          {/* Brand Col */}
          <div className={styles.brandCol}>
            <div className={styles.logoRow}>
              <div className={styles.logoIcon}>
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
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <span className={styles.logoText}>ShopEase</span>
            </div>

            <p className={styles.brandTagline}>
              Your modern destination for premium gadgets, lifestyle goods, and everyday
              essentials. Designed for effortless shopping.
            </p>

            <div className={styles.socialRow}>
              <a href="#twitter" aria-label="Twitter / X" className={styles.socialLink}>
                𝕏
              </a>
              <a href="#instagram" aria-label="Instagram" className={styles.socialLink}>
                IG
              </a>
              <a href="#facebook" aria-label="Facebook" className={styles.socialLink}>
                FB
              </a>
              <a href="#linkedin" aria-label="LinkedIn" className={styles.socialLink}>
                IN
              </a>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div className={styles.col}>
            <h4 className={styles.colHeading}>Departments</h4>
            <ul className={styles.linkList}>
              <li><a href="#categories">Tech & Electronics</a></li>
              <li><a href="#categories">Home & Living</a></li>
              <li><a href="#categories">Beauty & Fragrances</a></li>
              <li><a href="#categories">Fashion & Accessories</a></li>
              <li><a href="#deals" className={styles.saleLink}>Clearance Sale (Up to 50%)</a></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className={styles.col}>
            <h4 className={styles.colHeading}>Customer Care</h4>
            <ul className={styles.linkList}>
              <li><a href="#track">Track Your Order</a></li>
              <li><a href="#shipping">Shipping & Delivery</a></li>
              <li><a href="#returns">Returns & Exchanges</a></li>
              <li><a href="#support">Help Center & FAQs</a></li>
              <li><a href="#contact">Contact Support</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div className={styles.col}>
            <h4 className={styles.colHeading}>Reach Us</h4>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>✉️</span>
              <div>
                <p className={styles.contactLabel}>Email Support</p>
                <a href="mailto:support@shopease.com" className={styles.contactVal}>
                  support@shopease.com
                </a>
              </div>
            </div>

            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📞</span>
              <div>
                <p className={styles.contactLabel}>Helpline (Toll-Free)</p>
                <span className={styles.contactVal}>+91 98765 43210</span>
              </div>
            </div>

            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>⏰</span>
              <div>
                <p className={styles.contactLabel}>Hours</p>
                <span className={styles.contactVal}>Mon – Sun: 9AM – 9PM IST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © 2026 <strong>ShopEase, Inc.</strong> All rights reserved. Crafted with care for modern
            shoppers.
          </p>

          <div className={styles.paymentBadges}>
            <span className={styles.badgePill}>UPI</span>
            <span className={styles.badgePill}>VISA</span>
            <span className={styles.badgePill}>MasterCard</span>
            <span className={styles.badgePill}>RuPay</span>
            <span className={styles.badgePill}>NetBanking</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
