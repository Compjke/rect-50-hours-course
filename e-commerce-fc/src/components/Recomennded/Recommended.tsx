import type { Category, CompanyType } from "src/App";
import style from "./recommended.module.css";
import clsx from "clsx";
interface RecommendedProps {
  onChangeCategory?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selected: Category; // Optional prop for handling selected category
}

const companies: CompanyType[] = ["Nike", "Adidas", "Puma", "Reebok", "Vans"];

export const Recommended = ({
  onChangeCategory,
  selected,
}: RecommendedProps) => {
  return (
    <div className={style.recommendedSection}>
      <h2 className={style.recommendedTitle}>Recommended for you</h2>
      <div className={style.recommendedButtons}>
        {companies.map((company) => (
          <button
            key={company}
            className={clsx(style.recommendedButton, {
              [style.active]: selected?.toLocaleLowerCase() === company?.toLowerCase(),
            })}
            onClick={onChangeCategory}
          >
            {company}
          </button>
        ))}
        <button className={clsx(style.recommendedButton, {
          [style.active]: selected === null,
        })} onClick={onChangeCategory}>
          All
        </button>
      </div>
    </div>
  );
};
