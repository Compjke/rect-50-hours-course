import { MessageCircle, ThumbsUp } from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "My First Blog",
    author: "Jnon Doe",
    likes: 10,
    comments: 5,
  },
  {
    id: 2,
    title: "My Second Blog",
    author: "Jnon Doe",
    likes: 10,
    comments: 5,
  },
  {
    id: 3,
    title: "My Third Blog",
    author: "Jnon Doe",
    likes: 10,
    comments: 5,
  },
];
export const PopularBlogs = () => {
  return (
    <div className="border p-5 rounded bg-violet-400 shadow-xs shadow-blue-200">
      <h2 className="font-bold text-2xl mb-3 text-neutral-600">
        Popular Blogs
      </h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id} className="mb-3">
            <div className="flex justify-between items-center">
              <h5 className="font-bold mb-2 text-slate-800 text-xl">
                {blog.title}
              </h5>
            </div>
            <p className="text-neutral-200 text-xs">
              Published by {blog.author}
            </p>
            <div className="flex items-center mt-2">
              <MessageCircle size={16} />
              <span className="text-gray-600 ml-1 mr-5">{blog.comments}</span>
              <ThumbsUp size={16} />
              <span className="text-gray-600 ml-1">{blog.likes}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
