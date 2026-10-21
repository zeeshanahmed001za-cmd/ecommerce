import { useState } from "react";
import styles from "./Newsletter.module.css";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className={styles.newsletterSection} aria-label="Newsletter Signup">
      <div className={styles.card}>
        <div className={styles.content}>
          <span className={styles.tag}>EXCLUSIVE PERKS</span>
          <h2 className={styles.title}>Join the ShopEase Club & Get 15% Off</h2>
          <p className={styles.subtitle}>
            Subscribe for early access to flash sales, exclusive discount drops, and product
            curations delivered right to your inbox.
          </p>

          {submitted ? (
            <div className={styles.successMessage} role="status">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>Thank you for joining! Check your inbox for your 15% discount code.</span>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <svg
                  className={styles.mailIcon}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  className={styles.input}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email Address for newsletter"
                />
                <button type="submit" className={styles.submitButton}>
                  Subscribe
                </button>
              </div>
              <p className={styles.privacyNote}>
                🔒 We respect your privacy. No spam, ever. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
