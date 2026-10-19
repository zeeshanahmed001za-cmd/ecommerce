import { SearchBar } from "../SearchBar/SearchBar";
import styles from "./Navbar.module.css";
export function NavBar() {
  return (
    <>
      <nav className={styles.navigationBar}>
        <h2 className={styles.navigationBar}>E-shopee</h2>
        <SearchBar />
        <ul className={styles.navLinks}>
          <li>Home</li>
          <li>Pricing</li>
          <li>
            <button>Get Started</button>
          </li>
        </ul>
      </nav>
    </>
  );
}
