import { SideBar } from "./SideBar";
import Table from "./Table";
export const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 bg-gray-600">
        <Table />
      </div>
    </div>
  );
};
