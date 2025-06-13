import { FaHome, FaSearch, FaUser } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { Panel, PanelResizeHandle } from 'react-resizable-panels';

export const SideBar = () => {
  return (
    <>
      <Panel
        defaultSize={5}
        minSize={5} 
        maxSize={20} 
        className="bg-slate-800 h-screen flex flex-col justify-between"
      >
        <ul className="p-4 flex flex-col gap-5 items-center  h-full">
          <li className=" cursor-pointer ">
            <div className="flex items-center">
              <FaHome
                size={24}
                className="text-white text-2xl hover:text-slate-500 hover:scale-110 transition-colors "
              />
            </div>
          </li>
          <li className=" cursor-pointer ">
            <div className="flex items-center">
              <FaUser
                size={24}
                className="text-white text-2xl  hover:text-slate-500  hover:scale-110 transition-colors"
              />
            </div>
          </li>
          <li className=" cursor-pointer ">
            <div className="flex items-center">
              <FaSearch
                size={24}
                className="text-white text-2xl hover:text-slate-500 hover:scale-110 transition-colors "
              />
            </div>
          </li>
        </ul>
        <ul className="flex flex-col gap-2 items-center mb-4">
          <li className="text-white text-xs text-center  hover:cursor-pointer">
            <IoMdSettings
              size={24}
              className="text-white text-2xl hover:text-slate-500 hover:scale-110 transition-colors "
            />
          </li>
          <li className="text-white text-xs text-center  hover:cursor-pointer">
            <FaUser
              size={24}
              className="text-white text-2xl hover:text-slate-500 hover:scale-110 transition-colors "
            />
          </li>
        </ul>
      </Panel>
      <PanelResizeHandle className="w-2 bg-slate-400 hover:bg-slate-300 transition-colors" />
      {/* <Panel minSize={67} className="bg-transparent" /> Прозрачная панель для остального пространства */}
    </>
  );
};
