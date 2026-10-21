import { useState, useRef, useEffect } from "react";
import styles from "./NavBar.module.css";
import { useCategory, SECONDARY_CATEGORIES } from "../ContextProvider/CategoryContext.jsx";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const accountMenuRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const { selectedCategory, setSelectedCategory } = useCategory();

  // Scroll listener: hide navbars when scrolling down, show when scrolling up, always show at top
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at page top
      if (currentScrollY <= 15) {
        setNavVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Small delta threshold (8px) to prevent flickering / bounce
      const diff = currentScrollY - lastScrollY.current;
      if (Math.abs(diff) < 8) return;

      if (diff > 0 && currentScrollY > 70) {
        // Scrolling down -> hide (unless menus are currently open)
        if (!mobileMenuOpen && !accountMenuOpen) {
          setNavVisible(false);
        }
      } else if (diff < 0) {
        // Scrolling up -> reveal
        setNavVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen, accountMenuOpen]);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event) {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setAccountMenuOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setAccountMenuOpen(false);
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setAccountMenuOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setAccountMenuOpen(false);
    }, 160);
  };

  const toggleAccountMenu = () => {
    setAccountMenuOpen((prev) => !prev);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    // Smoothly scroll to the featured products section
    const section = document.getElementById("featured");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`${styles.header} ${navVisible ? "" : styles.headerHidden}`}>
      {/* 1. Main Navigation Bar */}
      <nav className={styles.navbar} aria-label="Main Navigation">
        <div className={styles.navContainer}>
          {/* Brand / Logo Area */}
          <div className={styles.navBrandArea}>
            <a href="/" className={styles.logo} aria-label="ShopEase Home">
              <div className={styles.logoIcon} aria-hidden="true">
                <svg
                  width="20"
                  height="20"
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
            </a>
          </div>

          {/* Search Bar — Positioned in the MIDDLE (No search icon on left) */}
          <div className={styles.navSearchArea}>
            <form
              className={styles.searchForm}
              role="search"
              aria-label="Search ShopEase"
              onSubmit={handleSearchSubmit}
            >
              <div className={styles.searchContainer}>
                <input
                  type="text"
                  placeholder="Search products, brands, categories..."
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search products"
                  id="main-nav-search"
                />

                <button
                  type="submit"
                  className={styles.searchButton}
                  aria-label="Submit search"
                  title="Search"
                >
                  <span>Search</span>
                  <svg
                    className={styles.searchBtnArrow}
                    width="14"
                    height="14"
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
                </button>
              </div>
            </form>
          </div>

          {/* Actions Cluster (Account, Returns, Cart) */}
          <div className={styles.navActions}>
            {/* Account & Lists Dropdown */}
            <div
              className={styles.dropdownContainer}
              ref={accountMenuRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`${styles.navItem} ${accountMenuOpen ? styles.navItemActive : ""}`}
                onClick={toggleAccountMenu}
                aria-haspopup="true"
                aria-expanded={accountMenuOpen}
                aria-label="Account and Lists"
                id="account-lists-button"
              >
                <div className={styles.navItemTextCol}>
                  <span className={styles.navItemSubtext}>Hello, Sign In</span>
                  <span className={styles.navItemMainText}>
                    Account &amp; Lists
                    <svg
                      className={`${styles.chevron} ${accountMenuOpen ? styles.chevronOpen : ""}`}
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m1 1 4 4 4-4" />
                    </svg>
                  </span>
                </div>
              </button>

              {/* Account & Lists Dropdown Popover */}
              {accountMenuOpen && (
                <div
                  className={styles.dropdownPopover}
                  role="region"
                  aria-labelledby="account-lists-button"
                >
                  <div className={styles.popoverCaret} aria-hidden="true" />

                  {/* Header Callout */}
                  <div className={styles.popoverHeader}>
                    <div className={styles.popoverGreeting}>
                      <span className={styles.popoverGreetingTitle}>Your ShopEase Account</span>
                      <span className={styles.popoverGreetingSubtitle}>Access orders, lists, and personalized perks</span>
                    </div>
                    <a href="#signin" className={styles.signInButton}>
                      Sign In
                    </a>
                    <p className={styles.registerPrompt}>
                      New to ShopEase?{" "}
                      <a href="#register" className={styles.registerLink}>
                        Create an account
                      </a>
                    </p>
                  </div>

                  {/* Two Categories: Your Account & Your Lists */}
                  <div className={styles.popoverGrid}>
                    {/* Category: Your Account */}
                    <div className={styles.popoverCategory}>
                      <h3 className={styles.categoryTitle}>Your Account</h3>
                      <ul className={styles.categoryList}>
                        <li>
                          <a href="#account" className={styles.popoverLink}>
                            Your Account
                          </a>
                        </li>
                        <li>
                          <a href="#orders" className={styles.popoverLink}>
                            Orders
                          </a>
                        </li>
                        <li>
                          <a href="#recommendations" className={styles.popoverLink}>
                            Recommendations
                          </a>
                        </li>
                        <li>
                          <a href="#settings" className={styles.popoverLink}>
                            Account Settings
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className={styles.categoryDivider} aria-hidden="true" />

                    {/* Category: Your Lists */}
                    <div className={styles.popoverCategory}>
                      <h3 className={styles.categoryTitle}>Your Lists</h3>
                      <ul className={styles.categoryList}>
                        <li>
                          <a href="#create-list" className={styles.popoverLink}>
                            Create a List
                          </a>
                        </li>
                        <li>
                          <a href="#your-lists" className={styles.popoverLink}>
                            Your Lists
                          </a>
                        </li>
                        <li>
                          <a href="#saved-items" className={styles.popoverLink}>
                            Saved Items
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Returns & Orders Button */}
            <a
              href="#orders"
              className={styles.navItem}
              aria-label="Returns and Orders"
            >
              <div className={styles.navItemTextCol}>
                <span className={styles.navItemSubtext}>Returns</span>
                <span className={styles.navItemMainText}>&amp; Orders</span>
              </div>
            </a>

            {/* Shopping Cart Button */}
            <a
              href="#cart"
              className={`${styles.navItem} ${styles.cartButton}`}
              aria-label="Shopping Cart, 3 items"
            >
              <div className={styles.cartIconWrapper} aria-hidden="true">
                <svg
                  className={styles.cartIcon}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="8" cy="21" r="1.5" />
                  <circle cx="19" cy="21" r="1.5" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
                <span className={styles.cartBadge}>3</span>
              </div>
              <span className={styles.cartLabel}>Cart</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className={styles.mobileMenuToggle}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span className={`${styles.hamburgerBar} ${mobileMenuOpen ? styles.barOpen1 : ""}`} />
              <span className={`${styles.hamburgerBar} ${mobileMenuOpen ? styles.barOpen2 : ""}`} />
              <span className={`${styles.hamburgerBar} ${mobileMenuOpen ? styles.barOpen3 : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className={styles.mobileNav} role="region" aria-label="Mobile Navigation Menu">
            {/* Mobile Search Input */}
            <form
              className={styles.mobileSearchForm}
              role="search"
              aria-label="Mobile Search"
              onSubmit={handleSearchSubmit}
            >
              <div className={styles.mobileSearchContainer}>
                <input
                  type="text"
                  placeholder="Search products..."
                  className={styles.mobileSearchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search products"
                />
                <button
                  type="submit"
                  className={styles.mobileSearchButton}
                  aria-label="Submit search"
                >
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
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </button>
              </div>
            </form>

            {/* User Account Callout */}
            <div className={styles.mobileUserCallout}>
              <div className={styles.mobileUserAvatar} aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className={styles.mobileUserInfo}>
                <span className={styles.mobileGreeting}>Hello, Sign In</span>
                <a href="#signin" className={styles.mobileSignInLink}>Sign in to your account</a>
              </div>
            </div>

            {/* Mobile Categories: Quick Department Navigation */}
            <div className={styles.mobileSection}>
              <h4 className={styles.mobileSectionHeading}>Browse Categories</h4>
              <ul className={styles.mobileLinks}>
                {SECONDARY_CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button
                      type="button"
                      className={`${styles.mobileCategoryBtn} ${selectedCategory === cat.id ? styles.mobileCategoryBtnActive : ""}`}
                      onClick={() => {
                        handleCategoryClick(cat.id);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <span>{cat.name}</span>
                      {selectedCategory === cat.id && <span className={styles.activeCheck}>✓</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Categories: Your Account */}
            <div className={styles.mobileSection}>
              <h4 className={styles.mobileSectionHeading}>Your Account</h4>
              <ul className={styles.mobileLinks}>
                <li><a href="#account" onClick={() => setMobileMenuOpen(false)}>Your Account</a></li>
                <li><a href="#orders" onClick={() => setMobileMenuOpen(false)}>Orders</a></li>
                <li><a href="#recommendations" onClick={() => setMobileMenuOpen(false)}>Recommendations</a></li>
                <li><a href="#settings" onClick={() => setMobileMenuOpen(false)}>Account Settings</a></li>
              </ul>
            </div>

            {/* Mobile Categories: Your Lists */}
            <div className={styles.mobileSection}>
              <h4 className={styles.mobileSectionHeading}>Your Lists</h4>
              <ul className={styles.mobileLinks}>
                <li><a href="#create-list" onClick={() => setMobileMenuOpen(false)}>Create a List</a></li>
                <li><a href="#your-lists" onClick={() => setMobileMenuOpen(false)}>Your Lists</a></li>
                <li><a href="#saved-items" onClick={() => setMobileMenuOpen(false)}>Saved Items</a></li>
              </ul>
            </div>

            {/* Mobile Orders & Cart */}
            <div className={styles.mobileSection}>
              <h4 className={styles.mobileSectionHeading}>Orders &amp; Cart</h4>
              <ul className={styles.mobileLinks}>
                <li><a href="#orders" onClick={() => setMobileMenuOpen(false)}>Returns &amp; Orders</a></li>
                <li><a href="#cart" onClick={() => setMobileMenuOpen(false)}>Shopping Cart (3 items)</a></li>
              </ul>
            </div>
          </div>
        )}
      </nav>

      {/* 2. Secondary Sticky Category Bar Directly Below Main Navbar */}
      <div className={styles.secondaryBar} role="navigation" aria-label="Secondary Category Navigation">
        <div className={styles.secondaryContainer}>
          <ul className={styles.secondaryList} role="menubar">
            {SECONDARY_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <li key={cat.id} role="none">
                  <button
                    type="button"
                    role="menuitem"
                    className={`${styles.categoryBtn} ${isActive ? styles.categoryBtnActive : ""} ${cat.isHighlight ? styles.categoryBtnHighlight : ""}`}
                    onClick={() => handleCategoryClick(cat.id)}
                    aria-current={isActive ? "page" : undefined}
                    aria-label={`Filter by ${cat.name}`}
                  >
                    {cat.hasIcon && (
                      <svg
                        className={styles.allIcon}
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                      </svg>
                    )}
                    {cat.isHighlight && (
                      <span className={styles.highlightBadge} aria-hidden="true">★</span>
                    )}
                    <span>{cat.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className={styles.secondaryPromo} aria-hidden="true">
            <span className={styles.promoBadge}>Offer</span>
            <span className={styles.promoText}>Free Express Delivery over ₹499</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
