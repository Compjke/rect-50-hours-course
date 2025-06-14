import { useBlogContext, type Blog } from "../shared/BlogContext";
import ArticleCard from "./Article";

interface ArticleListProps {
  onEdit: (blog: Blog) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ onEdit }) => {
  const { blogs, deleteBlog } = useBlogContext();

  return (
    <div className="lg:flex-1 p-6">
      <div className="lg:grid lg:grid-cols-[repeat(auto-fit,minmax(30rem,1fr))] gap-6 justify-items-center">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <ArticleCard
              key={blog.id}
              article={blog}
              onDelete={() => deleteBlog(blog.id)}
              onEdit={() => onEdit(blog)}
            />
          ))
        ) : (
          <p className="text-gray-500 mt-10">No articles available</p>
        )}
      </div>
    </div>
  );
};

export default ArticleList;
