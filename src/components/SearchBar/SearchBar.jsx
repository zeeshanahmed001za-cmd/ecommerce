import { useState } from "react";
import styles from "./search.module.css";

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }
  return (
    <>
      <input
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search Products..."
        className={styles.searchInput}
      />
    </>
  );
}
