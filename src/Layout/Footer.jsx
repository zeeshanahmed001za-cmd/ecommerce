import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.section}>
        <h3>ShopEase</h3>
        <p>Your one-stop shop for quality products at great prices.</p>
      </div>

      <div className={styles.section}>
        <h4>Quick Links</h4>
        <a href="/">Home</a>
        <a href="/shop">Shop</a>
        <a href="/contact">Contact</a>
      </div>

      <div className={styles.section}>
        <h4>Contact Us</h4>
        <p>Email: support@shopease.com</p>
        <p>Phone: +91 98765 43210</p>
      </div>

      <div className={styles.copyright}>
        <p>© 2026 ShopEase. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
