import { createContext, useContext, useState, type ReactNode } from "react";

export interface Blog {
  id: number;
  title: string;
  description: string;
  image: string;
  time: string;
}

interface BlogContextType {
  blogs: Blog[];
  addBlog: (blog: Blog) => void;
  updateBlog: (blog: Blog) => void;
  deleteBlog: (id: number) => void;
}


export const BlogContext = createContext<BlogContextType | null>(null);



export const BlogProvider = ({ children } : { children: ReactNode }) => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const addBlog = (blog: Blog) => {
        setBlogs((prevBlogs) => [...prevBlogs, blog]);
    };
    const updateBlog = (updatedBlog: Blog) => {
        setBlogs((prevBlogs) =>
            prevBlogs.map((blog) =>
                blog.id === updatedBlog.id ? updatedBlog : blog
            )
        );
    };
    const deleteBlog = (id: number) => {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
    };

    const contextValue = {
        blogs,
        addBlog,
        updateBlog,
        deleteBlog,
    };

    return (
        <BlogContext.Provider value={contextValue}>
            {children}
        </BlogContext.Provider>
    );
};


export const useBlogContext = () => {
    const context = useContext(BlogContext);
    if (!context) {
        throw new Error("useBlogContext must be used within a BlogProvider");
    }
    return context;
};