import type { Category as CategoryAllTypes } from "src/App";
import { RadioInput } from "@components/ui";
import style from "../sidebar.module.css";
import clsx from "clsx";

interface CategoryProps {
  onChangeCategory?: (category: CategoryAllTypes) => void;
  selectedCategory?: CategoryAllTypes;
}

const categories = [
  { value: "sneakers", label: "Sneakers" },
  { value: "flats", label: "Flats" },
  { value: "sandals", label: "Sandals" },
  { value: "heels", label: "Heels" },
];

export const Category = ({
  onChangeCategory,
  selectedCategory,
}: CategoryProps) => {
  return (
    <div className={style.category}>
      <h3 className={style.categoryTitle}>Category</h3>
      <div className={style.categoryWrapper}>
        {categories.map((category) => (
          <RadioInput
            key={category.value}
            name="category"
            value={category.value}
            defaultChecked={selectedCategory === category.value}
            label={category.label}
            onChangeCategory={onChangeCategory}
          />
        ))}
      </div>
    </div>
  );
};
