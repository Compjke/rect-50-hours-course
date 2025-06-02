import type { Category } from "src/App";
import { RadioInput } from "@components/ui";
import styleCommon from "../sidebar.module.css";
import style from "./price.module.css";
import clsx from "clsx";

interface PriceProps {
  onChangeCategory?: (category: Category) => void; // Optional prop for handling category changes
}

const prices = [
  { value: 50, label: "$0 - $50" },
  { value: 100, label: "$51 - $100" },
  { value: 200, label: "$101 - $200" },
  { value: 201, label: "$201 and above" },
];

export const Price = ({ onChangeCategory }: PriceProps) => {
  return (
    <div className={styleCommon.category}>
      <h3 className={styleCommon.categoryTitle}>Price</h3>
      <div className={styleCommon.categoryWrapper}>
        {prices.map((price) => (
          <RadioInput
            key={price.value}
            value={price.value}
            label={price.label}
            onChangeCategory={onChangeCategory}
          />
        ))}
      </div>
    </div>
  );
};
