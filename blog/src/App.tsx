import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import ArticleList from "./components/ArticleList";
import BlogForm from "./components/BlogForm";
import { Navigation } from "./components/Navigation";
import { PeopleToFollow } from "./components/PeopleToFollow";
import TopicsList from "./components/Topics";
import { TrendsList } from "./components/Trendslist";
import { Modal } from "./components/ui/Modal";
import { BlogProvider, type Blog } from "./shared/BlogContext";

const App = () => {
  const [openModal, setOpenModal] = useState(false);
  const [blogForEditing, setBlogForEditing] = useState<Blog | undefined>(
    undefined
  );

  const handleOpenNewPostModal = () => {
    setBlogForEditing(undefined);
    setOpenModal(true);
  };

  const handleOpenEditPostModal = (blog: Blog) => {
    setBlogForEditing(blog);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setBlogForEditing(undefined);
  };

  return (
    <div className="">
      <BlogProvider>
        <Navigation />
        <div className="flex justify-center mt-[var(--nav-bar-height)] pt-2">
          <section className="mx-auto p-6">
            <button
              onClick={handleOpenNewPostModal}
              className="bg-black text-white pl-4 pr-2 flex items-center py-2 gap-3 rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Create New Post <IoMdAdd className="" size={16} />
            </button>
          </section>
        </div>
        <main className="lg:flex px-3 ">
          <ArticleList onEdit={handleOpenEditPostModal} />
          <div className="lg:w-[30%] shrink-0">
            <PeopleToFollow />
            <TrendsList />
            <TopicsList />
          </div>
        </main>
        {openModal && (
          <Modal onClose={handleCloseModal}>
            <BlogForm
              existingBlog={blogForEditing}
              onClose={handleCloseModal}
            />
          </Modal>
        )}
      </BlogProvider>
    </div>
  );
};

export default App;
