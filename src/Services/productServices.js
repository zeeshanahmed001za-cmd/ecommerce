const API_URL = "https://fakestoreapi.com/products";

export async function getProducts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch Products");
  }
  const products = await response.json();
  return products;
}
