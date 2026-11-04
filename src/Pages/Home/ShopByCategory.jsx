import styles from "./ShopByCategory.module.css";

const CATEGORIES = [
  {
    id: "electronics",
    name: "Electronics",
    slug: "electronics",
    image: "/images/categories/electronics.jpg",
    alt: "Electronics collection featuring laptop, smartphone, headphones, and earbuds",
  },
  {
    id: "fashion",
    name: "Fashion",
    slug: "fashion",
    image: "/images/categories/fashion.jpg",
    alt: "Fashion apparel featuring hoodie, denim jeans, sneakers, and watch",
  },
  {
    id: "home-kitchen",
    name: "Home & Kitchen",
    slug: "home-kitchen",
    image: "/images/categories/home-kitchen.jpg",
    alt: "Home and kitchen collection featuring cookware pots, kettle, and air fryer",
  },
  {
    id: "beauty-personal-care",
    name: "Beauty & Personal Care",
    slug: "beauty-personal-care",
    image: "/images/categories/beauty-personal-care.jpg",
    alt: "Beauty and personal care products featuring fragrance, skincare, and cosmetics",
  },
  {
    id: "sports-fitness",
    name: "Sports & Fitness",
    slug: "sports-fitness",
    image: "/images/categories/sports-fitness.jpg",
    alt: "Sports and fitness gear featuring dumbbells, yoga mat, water bottle, and jump rope",
  },
  {
    id: "books-stationery",
    name: "Books & Stationery",
    slug: "books-stationery",
    image: "/images/categories/books-stationery.jpg",
    alt: "Books and stationery items featuring notebooks, books, pencils, and pen",
  },
];

function ShopByCategory() {
  return (
    <section
      className={styles.shopByCategory}
      id="categories"
      aria-labelledby="shop-by-category-title"
    >
      <div className={styles.sectionHeader}>
        <div className={styles.headerInfo}>
          <p className={styles.sectionEyebrow}>Shop Your Favorites</p>
          <h2 id="shop-by-category-title" className={styles.sectionTitle}>
            Shop by Category
          </h2>
        </div>
      </div>

      <div className={styles.categoryGrid} role="list">
        {CATEGORIES.map((category) => (
          <a
            key={category.id}
            href={`#shop-${category.slug}`}
            className={styles.categoryCard}
            aria-label={`Shop ${category.name}`}
            data-category={category.slug}
            role="listitem"
          >
            <div className={styles.cardHeader}>
              <h3 className={styles.categoryTitle}>{category.name}</h3>
            </div>
            <div className={styles.imageSurface}>
              <img
                src={category.image}
                alt={category.alt}
                className={styles.categoryImage}
                width="1024"
                height="558"
                loading="lazy"
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default ShopByCategory;
