import { createContext, useContext, useState } from "react";

const CategoryContext = createContext({
  selectedCategory: "all",
  setSelectedCategory: () => {},
});

export const SECONDARY_CATEGORIES = [
  { id: "all", name: "All", hasIcon: true },
  { id: "smartphones", name: "Electronics" },
  { id: "mens-shirts", name: "Fashion" },
  { id: "kitchen-accessories", name: "Home & Kitchen" },
  { id: "beauty", name: "Beauty" },
  { id: "sports-accessories", name: "Sports" },
  { id: "fragrances", name: "Best Sellers", isHighlight: true },
];

export function CategoryProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
}
