import Layout from "./Layout/Layout.jsx";
import HomePage from "./Pages/Home/HomePage.jsx";
import { CategoryProvider } from "./ContextProvider/CategoryContext.jsx";

export function App() {
  return (
    <CategoryProvider>
      <Layout>
        <HomePage />
      </Layout>
    </CategoryProvider>
  );
}

