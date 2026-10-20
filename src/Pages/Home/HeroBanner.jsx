import styles from "./HeroBanner.module.css";

function HeroBanner() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <p className={styles.eyebrow}>NEW ARRIVALS</p>

        <h1>Better Products for a Brighter You</h1>

        <p className={styles.description}>
          Discover quality products, modern styles and great prices — all in one
          place.
        </p>

        <button className={styles.shopButton}>Shop Now →</button>
      </div>
    </section>
  );
}

export default HeroBanner;
