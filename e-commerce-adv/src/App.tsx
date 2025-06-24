import { Route, Routes } from "react-router";
import { MainContent } from "./components/MainContent/MainContent";
import { PopularBlogs } from "./components/PopularBlogs/PopularBlogs";
import { ProductDetails } from "./components/ProdDetails/ProductDetails";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { TopSellers } from "./components/TopSellers/TopSellers";
import { FilterProvider } from "./shared/context/FilterContext";

export const App = () => {
  return (
    <FilterProvider>
      <div className="flex ">
        <Sidebar />
        <div className=" flex justify-between flex-wrap ml-[20%] w-[80%]">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="product/:id" element={<ProductDetails />} />
          </Routes>
          <div className=" w-50 flex-col flex gap-5 mr-4">
            <TopSellers />
            <PopularBlogs />
          </div>
        </div>
      </div>
    </FilterProvider>
  );
};
