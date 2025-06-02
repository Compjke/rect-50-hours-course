import clsx from "clsx";
import style from "./radio-input.module.css";

import type { Category, CategoryType } from "src/App";

interface RadioInputProps {
  name?: string;
  value: string | number;
  defaultChecked?: boolean;
  label: string;
  color?: string;
  onChangeCategory?: (category: Category) => void;
}

export const RadioInput = ({
  name = "category",
  value,
  defaultChecked,
  label,
  color,
  onChangeCategory,
}: RadioInputProps) => {
  return (
    <label className={style.labelCategory}>
      <input
        className={clsx(style.visuallyHidden)}
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        onChange={() => onChangeCategory?.(value as CategoryType)}
      />
      <span
        className={style.checkMark}
        style={{ "--circle-color": color } as React.CSSProperties}
      >
        {label}
      </span>
    </label>
  );
};
