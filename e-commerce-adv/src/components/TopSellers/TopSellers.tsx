import axios from "axios";
import { useEffect, useState } from "react";
import type { User } from "./types";
import { Loader } from "lucide-react";

export const TopSellers = () => {
  const [authors, setAuthors] = useState<User[]>([]);
const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetachUsers = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("https://randomuser.me/api/?results=5");
        setAuthors(res.data.results);
      
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetachUsers();
    return () => {};
  }, []);

  return (
    <div
      className="bg-slate-600 p-5 mt-5 rounded mr-2 border-1 w-full"
    >
      <h2 className="text-center font-bold mb-3 text-2xl">Top Sellers</h2>
      <ul className="flex flex-col items-baseline gap-2 ">
        {!isLoading && authors.map((author) => (
          <li key={author.id.value} className="flex items-center gap-2">
            <img className="w-10 h-10 rounded-full" src={author.picture.thumbnail} alt={author.name.first} />
            <p>{author.name.first}</p>
          </li>
        ))}
        {isLoading && <li className="flex items-center justify-center w-full min-h-50"><Loader size={50}/></li>}
      </ul>
    </div>
  );
};
