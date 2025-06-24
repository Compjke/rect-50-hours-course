import axios from "axios";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useFilterContext } from "../../shared/context/FilterContext";
import style from "./style.module.css";
import type { Categories, Tag } from "./types";
const keywordsArr: Tag[] = [
  "beauty",
  "mascara",
  "eyeshadow",
  "face powder",
  "lipstick",
  "nail polish",
  "fragrances",
  "perfumes",
  "furniture",
  "beds",
  "sofas",
  "bedside tables",
  "office chairs",
  "bathroom",
  "groceries",
  "fruits",
  "meat",
  "pet supplies",
  "cat food",
  "dog food",
  "dairy",
  "seafood",
  "vegetables",
  "condiments",
  "desserts",
  "beverages",
];

export const Sidebar = () => {
  const [categories, setCategories] = useState<Categories[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [keywords, _setKeywords] = useState(() => {
    return keywordsArr.sort();
  });
  const {
    keyword,
    maxPrice,
    minPrice,
    searchQuery,
    selectedCategory,
    setKeyword,
    setMaxPrice,
    setMinPrice,
    setSearchQuery,
    setSelectedCategory,
    resetFilters,
  } = useFilterContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://dummyjson.com/products/categories"
        );
        if (res.data) setCategories(res.data);
      } catch (err) {
        console.error("error", err);
      }
    };
    fetchData();
    return () => {};
  }, []);

  return (
    <aside className="w-1/3 min-w-64 flex lg:w-1/5 bg-slate-600 p-5 h-screen flex-col gap-5 fixed top-0">
      <h1 className="text-2xl font-bold mb-10 mt-4 text-center">React Store</h1>
      <input
        type="search"
        className="w-full ring-1 ring-blur-500/90 px-2 py-2 font-medium text-sm sm:md-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-300 focus:ring-slate-400"
        placeholder="Search product..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="flex justify-center items-center gap-2">
        <input
          type="number"
          placeholder="Min"
          className="border focus:ring-2 rounded w-full px-4 py-2"
          value={minPrice ?? ""}
          onChange={(e) => {
            const value = e.target.value
              ? parseFloat(e.target.value)
              : undefined;

            setMinPrice(value);
          }}
        />
        <input
          type="number"
          placeholder="Max"
          className="border rounded w-full px-4 py-2"
          value={maxPrice ?? ""}
          onChange={(e) => {
            const value = e.target.value
              ? parseFloat(e.target.value)
              : undefined;
            setMaxPrice(value);
          }}
        />
      </div>
      {/* Categories */}{" "}
      <div
        className={`overflow-auto relative border-zinc-600 border   rounded overflow-y-scroll ${style["scrollbar-styled"]}`}
      >
        <h3 className="text-xl font-semibold  pb-2 sticky top-0 z-2 bg-slate-600">
          Categories
        </h3>
        <ul className={`flex flex-col   gap-2 `}>
          {categories.map((category) => (
            <li key={category.slug} className="flex items-center gap-2">
              <label
                title={category.name}
                className="flex items-center gap-2 w-full"
              >
                <input
                  className="w-4 h-4 accent-slate-800"
                  type="radio"
                  name="category"
                  value={category.slug}
                  onChange={() => setSelectedCategory(category)}
                  checked={selectedCategory?.slug === category.slug}
                />
                <span className="w-1/2 text-left truncate">
                  {category.name}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      {/* Keywords */}
      <div
        className={`relative border-zinc-600 border  rounded overflow-y-scroll ${style["scrollbar-styled"]}`}
      >
        <h3 className="text-xl font-semibold  pb-2 sticky top-0 z-2 bg-slate-600">
          Tags
        </h3>
        <ul className="flex flex-wrap gap-2">
          {keywords.map((tag) => (
            <li key={tag} className="flex items-center ">
              <button
                className={clsx(
                  "border rounded  px-2 py-1  text-slate-700 cursor-pointer hover:bg-fuchsia-300 transition",
                  keyword === tag ? "bg-fuchsia-400" : "bg-sky-200"
                )}
                onClick={() => {
                  if (keyword === tag) {
                    setKeyword(undefined);
                  } else {
                    setKeyword(tag);
                  }
                }}
              >
                {tag[0].toUpperCase() + tag.substring(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={resetFilters}
        className="border rounded  px-2 py-1 bg-cyan-950 text-shadow-violet-400 cursor-pointer hover:bg-cyan-700 transition"
      >
        Reset filters
      </button>
    </aside>
  );
};
