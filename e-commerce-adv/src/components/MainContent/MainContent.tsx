import axios from "axios";
import { Tally3 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { RingLoader } from "react-spinners";
import { useFilterContext } from "../../shared/context/FilterContext";
import { debounce } from "../../utils/debounce";
import { ProductCard } from "../ProdCard/ProductCar";
import type { Product } from "../Sidebar/types";

type Filter = "all" | "cheap" | "expensive" | "popular";
const BASE_URL = "https://dummyjson.com";
const ITEMS_PER_PAGE = 8;

export const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilterContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, keyword]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async (url: string) => {
      setIsLoading(true);
      try {
        const res = await axios.get(url);
        setProducts(res.data.products);
        setTotalItems(res.data.total);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const debouncedFetchProducts = debounce((url) => {
      fetchProducts(url as string);
    }, 1000);

    let url = `${BASE_URL}/products?limit=${ITEMS_PER_PAGE}&skip=${
      (currentPage - 1) * ITEMS_PER_PAGE
    }`;

    if (searchQuery || keyword) {
      url = `${BASE_URL}/products/search?q=${
        searchQuery || keyword
      }&limit=${ITEMS_PER_PAGE}&skip=${(currentPage - 1) * ITEMS_PER_PAGE}`;
      debouncedFetchProducts(url);
      return;
    }
    if (selectedCategory) {
      url = `${selectedCategory.url}?limit=${ITEMS_PER_PAGE}&skip=${
        (currentPage - 1) * ITEMS_PER_PAGE
      }`;
    }

    fetchProducts(url);
  }, [searchQuery, currentPage, keyword, selectedCategory]);

  const handleChangeFilter = (filter: Filter) => {
    setFilter(filter);
    setDropdownOpen(false);
  };

  const getFilteredProducts = () => {
    let filtered = products;

    // Фильтрация по цене
    if (minPrice) {
      filtered = filtered.filter((product) => product.price >= minPrice);
    }
    if (maxPrice) {
      filtered = filtered.filter((product) => product.price <= maxPrice);
    }

    // Сортировка
    switch (filter) {
      case "cheap":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "expensive":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "popular":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  };

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPages = () => {
    const pages: number[] = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);
    if (currentPage - 2 < 1) {
      endPage = Math.min(totalPages, endPage + (2 - currentPage + 1));
    }
    if (currentPage + 2 > totalPages) {
      startPage = Math.max(1, startPage - (currentPage + 2 - totalPages));
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <section className="xl:w-3/4 lg:w-3/4 w-full p-5 h-full overflow-auto flex flex-col justify-between">
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div
            className="relative my-5 min-w-40"
            ref={dropdownRef}
            id="dropdown"
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen(!dropdownOpen);
            }}
          >
            <button className="border px-4 py-2 rounded-full flex items-center w-full">
              <Tally3 className="mr-2" />
              {filter === "all"
                ? "Filter"
                : filter[0].toUpperCase() + filter.substring(1)}
            </button>
            {dropdownOpen && (
              <div className="absolute top-12 right-0 bg-slate-300 border rounded-md w-full text-slate-600 flex flex-col items-center p-2">
                <button
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleChangeFilter("all")}
                >
                  All
                </button>
                <button
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleChangeFilter("cheap")}
                >
                  Cheap
                </button>
                <button
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleChangeFilter("expensive")}
                >
                  Expensive
                </button>
                <button
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleChangeFilter("popular")}
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>
        {isLoading && (
          <div className="flex justify-center items-center text-amber-300 h-100">
            <RingLoader size={"20vw"} color="#690576" />
          </div>
        )}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
          {!isLoading &&
            getFilteredProducts().map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          {!isLoading && getFilteredProducts().length === 0 && (
            <div className="flex justify-center items-center">
              No products found
            </div>
          )}
        </div>
      </div>
      {!isLoading && getFilteredProducts().length > 0 && (
        <div className="flex flex-col justify-between items-center sm:flex-row mt-5 gap-2">
          {totalItems > ITEMS_PER_PAGE && (
            <button
              className="border px-4 py-2 rounded-full flex items-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:bg-gray-200 hover:text-blue-600 hover:border-blue-500 hover:scale-105 transition-all disabled:hover:bg-transparent disabled:hover:text-inherit disabled:hover:border-inherit disabled:hover:scale-100"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          )}
          <div className="text-sm flex justify-center flex-wrap gap-2">
            {totalPages > 1 &&
              getPages().map((page) => (
                <button
                  key={page}
                  className={`border px-4 py-2 rounded-full flex items-center cursor-pointer hover:bg-gray-200 hover:text-blue-600 hover:border-blue-500 hover:scale-105 transition-all ${
                    page === currentPage
                      ? "bg-gray-200 text-blue-600 border-blue-500"
                      : ""
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
          </div>
          {totalItems > ITEMS_PER_PAGE && (
            <button
              className="border px-4 py-2 rounded-full flex items-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:bg-gray-200 hover:text-blue-600 hover:border-blue-500 hover:scale-105 transition-all disabled:hover:bg-transparent disabled:hover:text-inherit disabled:hover:border-inherit disabled:hover:scale-100"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          )}
        </div>
      )}
    </section>
  );
};
