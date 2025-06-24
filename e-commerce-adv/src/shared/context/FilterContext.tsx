import { createContext, useContext, useState, type ReactNode } from "react";
import type { Categories, Tag } from "../../components/Sidebar/types";

interface FilterContextProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: Categories | null;
  setSelectedCategory: (category: Categories | null) => void;
  minPrice: number | undefined;
  setMinPrice: (price?: number) => void;
  maxPrice: number | undefined;
  setMaxPrice: (price?: number) => void;
  keyword: Tag | undefined;
  setKeyword: (k?: Tag) => void;
  resetFilters : () => void
}

export const FilterContext = createContext<FilterContextProps | null>(null);




export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<Categories | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [keyword, setKeyword] = useState<Tag | undefined>();

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword(undefined);
  };
  return (
    <FilterContext
      value={{
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyword,
        setKeyword,
        resetFilters : handleResetFilters
      }}
    >
      {children}
    </FilterContext>
  );
};


export const useFilterContext = () => {
  const context = useContext(FilterContext);
  // console.log(context)
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};