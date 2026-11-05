import { useState, useRef, useEffect } from "react";
import AstraLogo from "../Components/AstraLogo.jsx";
import styles from "./Footer.module.css";

const languageOptions = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "hi", label: "हिन्दी" },
  { code: "ja", label: "日本語" },
];

const currencyOptions = [
  { code: "INR", label: "₹ INR - Indian Rupee" },
  { code: "USD", label: "$ USD - US Dollar" },
  { code: "EUR", label: "€ EUR - Euro" },
  { code: "GBP", label: "£ GBP - British Pound" },
  { code: "JPY", label: "¥ JPY - Japanese Yen" },
];

const countryOptions = [
  { code: "IN", label: "India" },
  { code: "US", label: "United States" },
  { code: "GB", label: "United Kingdom" },
  { code: "DE", label: "Germany" },
  { code: "CA", label: "Canada" },
  { code: "AU", label: "Australia" },
  { code: "JP", label: "Japan" },
];

function Footer() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedCurrency, setSelectedCurrency] = useState("₹ INR - Indian Rupee");
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [openDropdown, setOpenDropdown] = useState(null); // 'lang' | 'curr' | 'country' | null

  const dropdownContainerRef = useRef(null);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleBackToTopKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleScrollToTop();
    }
  };

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <footer className={styles.footer} aria-label="Site Footer">
      {/* 1. Back-to-Top Row */}
      <div
        role="button"
        tabIndex={0}
        onClick={handleScrollToTop}
        onKeyDown={handleBackToTopKeyDown}
        className={styles.backToTop}
        aria-label="Back to Top"
      >
        <span className={styles.backToTopText}>Back to Top</span>
      </div>

      {/* 2. Main Footer Content */}
      <div className={styles.mainContent}>
        <div className={`container ${styles.mainContainer}`}>
          <div className={styles.columnGrid}>
            {/* Column 1 – Get to Know Us */}
            <div className={styles.column}>
              <h3 className={styles.columnHeading}>Get to Know Us</h3>
              <ul className={styles.linkList}>
                <li>
                  <a href="#careers">Careers</a>
                </li>
                <li>
                  <a href="#blog">Blog</a>
                </li>
                <li>
                  <a href="#about">About Astra</a>
                </li>
              </ul>
            </div>

            {/* Column 2 – Make Money with Us */}
            <div className={styles.column}>
              <h3 className={styles.columnHeading}>Make Money with Us</h3>
              <ul className={styles.linkList}>
                <li>
                  <a href="#sell-products">Sell Products on Astra</a>
                </li>
                <li>
                  <a href="#sell-apps">Sell Apps on Astra</a>
                </li>
                <li>
                  <a href="#affiliate">Become an Affiliate</a>
                </li>
                <li>
                  <a href="#advertise">Advertise Your Products</a>
                </li>
                <li>
                  <a href="#self-publish">Self-Publish with Us</a>
                </li>
              </ul>
            </div>

            {/* Column 3 – Let Us Help You */}
            <div className={styles.column}>
              <h3 className={styles.columnHeading}>Let Us Help You</h3>
              <ul className={styles.linkList}>
                <li>
                  <a href="#account">Your Account</a>
                </li>
                <li>
                  <a href="#orders">Your Orders</a>
                </li>
                <li>
                  <a href="#shipping-rates">Shipping Rates and Policies</a>
                </li>
                <li>
                  <a href="#returns">Returns &amp; Replacements</a>
                </li>
                <li>
                  <a href="#manage-content">Manage Your Content and Devices</a>
                </li>
                <li>
                  <a href="#help">Help</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Brand and Preferences Row */}
      <div className={styles.brandPreferencesRow}>
        <div className={`container ${styles.brandContainer}`}>
          {/* Logo and Brand Name */}
          <div className={styles.brandIdentity}>
            <div className={styles.logoIcon}>
              <AstraLogo size={22} />
            </div>
            <span className={styles.logoText}>Astra</span>
          </div>

          {/* Preferences Dropdowns */}
          <div
            className={styles.preferencesGroup}
            ref={dropdownContainerRef}
            role="toolbar"
            aria-label="Localization and Currency Preferences"
          >
            {/* Language Selector */}
            <div className={styles.dropdownWrapper}>
              <button
                type="button"
                className={`${styles.dropdownButton} ${
                  openDropdown === "lang" ? styles.dropdownActive : ""
                }`}
                onClick={() => toggleDropdown("lang")}
                aria-haspopup="listbox"
                aria-expanded={openDropdown === "lang"}
                aria-label="Select Language"
              >
                <svg
                  className={styles.dropdownIcon}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span className={styles.dropdownValue}>{selectedLanguage}</span>
                <svg
                  className={`${styles.chevronIcon} ${
                    openDropdown === "lang" ? styles.chevronRotated : ""
                  }`}
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {openDropdown === "lang" && (
                <ul className={styles.dropdownMenu} role="listbox">
                  {languageOptions.map((opt) => (
                    <li
                      key={opt.code}
                      role="option"
                      aria-selected={selectedLanguage === opt.label}
                      className={`${styles.dropdownOption} ${
                        selectedLanguage === opt.label ? styles.optionSelected : ""
                      }`}
                      onClick={() => {
                        setSelectedLanguage(opt.label);
                        setOpenDropdown(null);
                      }}
                    >
                      <span>{opt.label}</span>
                      {selectedLanguage === opt.label && (
                        <span className={styles.checkIcon}>✓</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Currency Selector */}
            <div className={styles.dropdownWrapper}>
              <button
                type="button"
                className={`${styles.dropdownButton} ${
                  openDropdown === "curr" ? styles.dropdownActive : ""
                }`}
                onClick={() => toggleDropdown("curr")}
                aria-haspopup="listbox"
                aria-expanded={openDropdown === "curr"}
                aria-label="Select Currency"
              >
                <svg
                  className={styles.dropdownIcon}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <circle cx="12" cy="12" r="2" />
                  <path d="M6 12h.01M18 12h.01" />
                </svg>
                <span className={styles.dropdownValue}>{selectedCurrency}</span>
                <svg
                  className={`${styles.chevronIcon} ${
                    openDropdown === "curr" ? styles.chevronRotated : ""
                  }`}
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {openDropdown === "curr" && (
                <ul className={styles.dropdownMenu} role="listbox">
                  {currencyOptions.map((opt) => (
                    <li
                      key={opt.code}
                      role="option"
                      aria-selected={selectedCurrency === opt.label}
                      className={`${styles.dropdownOption} ${
                        selectedCurrency === opt.label ? styles.optionSelected : ""
                      }`}
                      onClick={() => {
                        setSelectedCurrency(opt.label);
                        setOpenDropdown(null);
                      }}
                    >
                      <span>{opt.label}</span>
                      {selectedCurrency === opt.label && (
                        <span className={styles.checkIcon}>✓</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Country / Region Selector */}
            <div className={styles.dropdownWrapper}>
              <button
                type="button"
                className={`${styles.dropdownButton} ${
                  openDropdown === "country" ? styles.dropdownActive : ""
                }`}
                onClick={() => toggleDropdown("country")}
                aria-haspopup="listbox"
                aria-expanded={openDropdown === "country"}
                aria-label="Select Country or Region"
              >
                <svg
                  className={styles.dropdownIcon}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className={styles.dropdownValue}>{selectedCountry}</span>
                <svg
                  className={`${styles.chevronIcon} ${
                    openDropdown === "country" ? styles.chevronRotated : ""
                  }`}
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {openDropdown === "country" && (
                <ul className={styles.dropdownMenu} role="listbox">
                  {countryOptions.map((opt) => (
                    <li
                      key={opt.code}
                      role="option"
                      aria-selected={selectedCountry === opt.label}
                      className={`${styles.dropdownOption} ${
                        selectedCountry === opt.label ? styles.optionSelected : ""
                      }`}
                      onClick={() => {
                        setSelectedCountry(opt.label);
                        setOpenDropdown(null);
                      }}
                    >
                      <span>{opt.label}</span>
                      {selectedCountry === opt.label && (
                        <span className={styles.checkIcon}>✓</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Subtle Copyright / Brand note */}
        <div className={styles.subBrandRow}>
          <p className={styles.copyrightText}>
            © 2026 <strong>Astra, Inc.</strong> All rights reserved. Designed for effortless modern shopping.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
