import { useState } from 'react';
import { FaHome, FaInfoCircle, FaPhone } from 'react-icons/fa';
import { GoProjectSymlink } from 'react-icons/go';
import { SiCoursera } from 'react-icons/si';
import { randomDefaultIndex } from '../utils/utils';
import { About } from './About';
import { Card } from './Card';
import { Contact } from './Contact';

const tabs = [
  {
    id: 'home',
    icon: <FaHome />,
    label: 'Home',
    content: (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] content-center justify-center gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card
            key={index}
            title="Amazing Card"
            description="This is a cool-looking card component using React and Tailwind CSS."
            image={`https://picsum.photos/400/300?random=${randomDefaultIndex + index}`}
          />
        ))}
      </div>
    ),
  },
  {
    id: 'about',
    icon: <FaInfoCircle />,
    label: 'About',
    content: <About />,
  },
  {
    id: 'projects',
    icon: <GoProjectSymlink />,
    label: 'Projects',
    content: (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]  gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card
            key={index}
            title="Amazing Card"
            description="This is a cool-looking card component using React and Tailwind CSS."
            image={`https://picsum.photos/400/300?random=${randomDefaultIndex + index}`}
          />
        ))}
      </div>
    ),
  },
  {
    id: 'courses',
    icon: <SiCoursera />,
    label: 'Courses',
    content: (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] content-center justify-center gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card
            key={index}
            title="Amazing Card"
            description="This is a cool-looking card component using React and Tailwind CSS."
            image={`https://picsum.photos/400/300?random=${randomDefaultIndex + index}`}
          />
        ))}
      </div>
    ),
  },
  {
    id: 'contact',
    icon: <FaPhone />,
    label: 'Contact',
    content: <Contact />,
  },
];

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="p-4 mt-[3rem]">
      <div className="flex border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`flex-1 text-center py-2 px-4 font-medium text-sm cursor-pointer hover:bg-sky-100 ${
              activeTab === tab.id ? 'border-b-2 ' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <div className="flex items-center justify-center space-x-2">
              {tab.icon}
              <span>{tab.label}</span>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-4 p-4 rounded-lg ">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};
