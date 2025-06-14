import { FaBookmark, FaEdit, FaTrash } from "react-icons/fa";
import type { Blog } from "../shared/BlogContext";

interface ArticleCardProps {
  article: Blog;
  onDelete: () => void;
  onEdit: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onDelete,
  onEdit,
}) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://placehold.co/150x150?text=No\nImage";
  };

  return (
    <div className="flex items-center p-4 w-full shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out max-w-[40rem] min-w-[20rem]">
      <img
        src={article.image || "https://placehold.co/150x150?text=No\nImage"}
        alt={article.title}
        className="w-36 h-24 object-cover rounded-lg shadow-md"
        onError={handleImageError}
      />
      <div className="ml-6 flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {article.title}
        </h3>
        <p className="text-sm text-gray-700">{article.description}</p>
        <div className="flex justify-between items-center mt-4 text-gray-600 ">
          <span className="text-xs">{article.time}</span>
          <div className="flex space-x-3">
            <FaBookmark className="text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer" />
            <FaEdit
              onClick={onEdit}
              className="text-blue-500 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
            />
            <FaTrash
              onClick={onDelete}
              className="text-red-500 hover:text-red-600 transition-colors duration-200 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
