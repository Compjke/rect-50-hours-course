import type { Category, ColorType } from "src/App";
import { RadioInput } from "@components/ui";
import styleCommon from "../sidebar.module.css";
import style from "./color-picker.module.css";
import clsx from "clsx";

interface ColorPickerProps {
  onChangeCategory?: (category: Category) => void; // Optional prop for handling category changes
}
type Colors = {
  name: string;
  value: ColorType;
};

const colors: Colors[] = [
  { name: "Black", value: "black" },
  { name: "White", value: "white" },
  { name: "Red", value: "red" },
  { name: "Green", value: "green" },
  { name: "Blue", value: "blue" },
  { name: "Yellow", value: "yellow" },
];

export const ColorPicker = ({ onChangeCategory }: ColorPickerProps) => {
  return (
    <div className={styleCommon.category}>
      <h3 className={styleCommon.categoryTitle}>Color</h3>
      <div className={styleCommon.categoryWrapper}>
        <RadioInput
          color="linear-gradient(90deg,rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%)"
          name="category"
          value="all"
          label="All"
          onChangeCategory={() => onChangeCategory?.(null)}
        />
        {colors.map((color) => (
          <RadioInput
            color={color.value}
            key={color.value}
            name="category"
            value={color.value}
            label={color.name}
            onChangeCategory={() => onChangeCategory?.(color.value)}
          />
        ))}
      </div>
    </div>
  );
};
