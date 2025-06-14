import { FaSearch } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";

export const Navigation = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-50 shadow-md  h-(--nav-bar-height) items-center">
      <div className="container mx-auto max-w-4x flex justify-between h-full items-center">
        <div className="flex justify-center items-center  rounded-full bg-gray-700 p-2 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:shadow-lg">
          <FaSearch className="text-slate-300" size={24} />
          <input
            type="search"
            className="bg-transparent border-none outline-none text-slate-300 placeholder:text-slate-500 pl-2"
            placeholder="Search..."
          />
        </div>
        <div className="flex justify-center items-center  rounded-full bg-gray-700 p-2 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:shadow-lg">
          <FaCircleUser className="text-slate-300" size={24} />
        </div>
      </div>
    </nav>
  );
};
