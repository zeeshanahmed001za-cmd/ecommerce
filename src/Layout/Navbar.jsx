import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <h2 className={styles.logo}>ShopEase</h2>

      <ul className={styles.navLinks}>
        <li>Home</li>
        <li>Shop</li>
        <li>Contact</li>
      </ul>

      <div className={styles.cart}>
        <span>🛒</span>
        <span>Cart</span>
      </div>
    </nav>
  );
}

export default Navbar;
