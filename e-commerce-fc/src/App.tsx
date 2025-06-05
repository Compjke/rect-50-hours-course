import { useEffect, useState } from "react";
import { Nav } from "./components/Navigation/Nav";
import { Products } from "./components/Products/Products";
import { Recommended } from "./components/Recomennded/Recommended";
import { SideBar } from "./components/Sidebar/SideBar";
import products from "./db/data";
import style from "./App.module.css";
import type { Product } from "./components/Card/Card";

export type CategoryType = "sneakers" | "flats" | "sandals" | "heels" | null;
export type ColorType =
  | "black"
  | "white"
  | "red"
  | "green"
  | "blue"
  | "yellow"
  | "purple";
export type PriceType = "low" | "medium" | "high";
export type CompanyType = "Nike" | "Adidas" | "Puma" | "Reebok" | "Vans" | null;
export type Category = CategoryType | ColorType | PriceType | CompanyType;

function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(null);
  const [query, setQuery] = useState<string>("");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      isSidebarExpanded ? "300px" : "60px"
    );
  }, [isSidebarExpanded]);

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleButtonFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.textContent === "All") {
      setSelectedCategory(null);
      return;
    }

    setSelectedCategory(
      e.currentTarget.textContent?.toLowerCase() as CompanyType
    );
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const filteredByQueryData = products.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const filteredData = (
    products: Product[],
    selected: Category,
    query: string
  ) => {
    let filteredProducts = products;
    if (query) {
      filteredProducts = filteredByQueryData;
    }
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, newPrice }) =>
          category.toLowerCase() === selected.toString().toLowerCase() ||
          color.toLowerCase() === selected.toString().toLowerCase() ||
          company.toLowerCase() === selected.toString().toLowerCase() ||
          newPrice.toString().toLowerCase() ===
            selected.toString().toLowerCase()
      );
    }
    return filteredProducts;
  };

  return (
    <>
      <Nav
        handleSearch={handleSearch}
        toggleMobileMenu={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <SideBar
        handleCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
        isExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
        toggleMobileMenu={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <div className={style.productsWrapper}>
        <Recommended
          selected={selectedCategory}
          onChangeCategory={handleButtonFilterClick}
        />
        <Products
          products={filteredData(products, selectedCategory, query) || []}
        />
      </div>
    </>
  );
}

export default App;
