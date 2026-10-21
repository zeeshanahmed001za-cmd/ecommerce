import { useState } from "react";
import styles from "./CategoryBar.module.css";

const categories = [
  { id: "all", name: "All Products", count: "120+" },
  { id: "beauty", name: "Beauty & Care", count: "35+" },
  { id: "fragrances", name: "Fragrances", count: "24+" },
  { id: "furniture", name: "Home & Furniture", count: "48+" },
  { id: "groceries", name: "Daily Essentials", count: "60+" },
  { id: "electronics", name: "Tech & Gadgets", count: "45+" },
  { id: "accessories", name: "Fashion Accessories", count: "30+" },
];

function CategoryBar({ onSelectCategory, selectedCategory = "all" }) {
  const [activeCategory, setActiveCategory] = useState(selectedCategory);

  const handleClick = (categoryId) => {
    setActiveCategory(categoryId);
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    }
  };

  return (
    <section
      className={styles.categoryBar}
      id="categories"
      aria-label="Product Categories"
    >
      <div className={styles.headerRow}>
        <div>
          <span className={styles.eyebrow}>POPULAR DEPARTMENTS</span>
          <h2 className={styles.title}>Shop By Category</h2>
        </div>
        <a href="#featured" className={styles.viewAllLink}>
          Explore All Categories
          <svg
            width="16"
            height="16"
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
      </div>

      <nav aria-label="Categories">
        <ul className={styles.categoryList}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <li key={cat.id}>
                <button
                  type="button"
                  className={`${styles.categoryCard} ${isActive ? styles.categoryCardActive : ""}`}
                  onClick={() => handleClick(cat.id)}
                  aria-pressed={isActive}
                >
                  <span className={styles.iconCircle}>{cat.icon}</span>
                  <div className={styles.info}>
                    <span className={styles.categoryName}>{cat.name}</span>
                    <span className={styles.itemCount}>{cat.count} items</span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
}

export default CategoryBar;
