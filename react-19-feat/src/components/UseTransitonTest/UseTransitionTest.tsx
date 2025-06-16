import { useState, useTransition } from 'react';
import { Home } from './Home';
import { Posts } from './Posts';
import { Contact } from './Contact';
import clsx from 'clsx';

type Tab = 'home' | 'posts' | 'users';

const posts = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  title: `Post Title ${i + 1}`,
  content: `This is the content of post ${i + 1}.`,
}));

export const UseTransitionTest = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isPending, startTransition] = useTransition();
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'posts':
        return <Posts isPending={isPending} posts={posts} />;
      case 'users':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === 'posts') {
      startTransition(() => {});
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 border rounded-lg shadow-md dark:bg-slate-800 dark:border-slate-700">
      <h2 className="text-2xl font-bold dark:text-slate-300">
        UseTransitionTest
      </h2>
      <div className="flex gap-2">
        <button
          className={clsx(
            'py-2 px-4 rounded transition',
            activeTab === 'home'
              ? 'bg-blue-500 text-white scale-110'
              : 'bg-gray-200',
          )}
          onClick={() => handleTabChange('home')}
        >
          Home
        </button>
        <button
          className={clsx(
            'py-2 px-4 rounded transition',
            activeTab === 'posts'
              ? 'bg-blue-500 text-white scale-110'
              : 'bg-gray-200',
          )}
          onClick={() => handleTabChange('posts')}
        >
          Posts
        </button>
        <button
          className={clsx(
            'py-2 px-4 rounded transition',
            activeTab === 'users'
              ? 'bg-blue-500 text-white scale-110'
              : 'bg-gray-200',
          )}
          onClick={() => handleTabChange('users')}
        >
          Users
        </button>
      </div>
      {renderContent()}
    </div>
  );
};
