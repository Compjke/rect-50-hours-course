import { FiHeart, FiShoppingCart, FiMenu } from "react-icons/fi";
import { AiOutlineUserAdd } from "react-icons/ai";
import clsx from "clsx";
import style from "./nav.module.css";
import type { ChangeEvent } from "react";

const profileIcons = [
  { icon: <FiHeart />, label: "Wishlist" },
  { icon: <FiShoppingCart />, label: "Cart" },
  { icon: <AiOutlineUserAdd />, label: "Profile" },
];

interface NavProps {
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  toggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

export const Nav = ({
  handleSearch,
  toggleMobileMenu,
  isMobileMenuOpen,
}: NavProps) => {
  return (
    <>
      <nav className={clsx(style.navbar_container, "container")}>
        <button className={style.burgerMenu} onClick={toggleMobileMenu}>
          <FiMenu />
        </button>
        <input
          type="text"
          placeholder="Search products..."
          className={style.search_input}
          onChange={handleSearch}
        />
        <div className={style.profile_icons}>
          {profileIcons.map((item, index) => (
            <a href="#" key={index} className={style.icon}>
              {item.icon}
            </a>
          ))}
        </div>
      </nav>
      <hr />
    </>
  );
};
