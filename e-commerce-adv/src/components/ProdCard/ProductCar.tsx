import { Link } from "react-router";
import type { Product } from "../Sidebar/types";



export const ProductCard = ({ id, title, thumbnail, price }: Product) => {
  return (
    <Link to={`/product/${id}`} className="flex p-4 border rounded hover:shadow-blue-600 hover:shadow-md hover:scale-105 transition bg-slate-500/20">
      <div className="w-full flex flex-col items-center  justify-between">
        <img className="h-32 w-32 object-cover" src={thumbnail} alt={title} width={200} height={200} />
        <h3>{title}</h3>
        <div>{price}</div>
      </div>
    </Link>
  );
};
