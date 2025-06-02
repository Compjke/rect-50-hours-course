import type { Category as CategoryType } from "src/App";
import { ColorPicker } from "./Colors/ColorPicker";
import { Price } from "./Price/Price";
import { Category } from "./Category/Category";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import style from "./sidebar.module.css";
interface SideBarProps {
  handleCategoryChange: (category: CategoryType) => void;
  selectedCategory: CategoryType;
  isExpanded: boolean;
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

export const SideBar = ({
  handleCategoryChange,
  selectedCategory,
  isExpanded,
  toggleMobileMenu,
  toggleSidebar,
  isMobileMenuOpen,
}: SideBarProps) => {
  return (
    <>
      <aside
        className={`${style.sidebar} ${
          isExpanded ? style.expanded : style.collapsed
        }`}
      >
        <button className={style.toggleButton} onClick={toggleSidebar}>
          {isExpanded ? (
            <FiChevronLeft color="inherit" />
          ) : (
            <FiChevronRight color="inherit" />
          )}
        </button>
        <h2
          className={`${style.sidebarTitle} ${!isExpanded ? style.hidden : ""}`}
        >
          Filter Products
        </h2>
        <div
          className={`${style.filterContent} ${
            !isExpanded ? style.hidden : ""
          }`}
        >
          <Category onChangeCategory={handleCategoryChange} />
          <Price onChangeCategory={handleCategoryChange} />
          <ColorPicker onChangeCategory={handleCategoryChange} />
        </div>
      </aside>

      <div
        className={`${style.mobileMenu} ${isMobileMenuOpen ? style.open : ""}`}
      >
        <h2 className={style.sidebarTitle}>Filter Products</h2>
        <Category onChangeCategory={handleCategoryChange} />
        <Price onChangeCategory={handleCategoryChange} />
        <ColorPicker onChangeCategory={handleCategoryChange} />
        <button className={style.closeButton} onClick={toggleMobileMenu}>
          <MdClose size={30} color="red" />
        </button>
      </div>
    </>
  );
};
