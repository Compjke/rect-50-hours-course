import { FaUser } from "react-icons/fa";

interface UserCardProps {
  name: string;
  following: boolean;
}

export const UserCard = ({ name, following }: UserCardProps) => {
  return (
    <li className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-3">
        <FaUser className="text-gray-500 text-xl" size={24} />
        <span className="text-gray-800 font-medium">{name}</span>
      </div>
        <button
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
            following ? "bg-black text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {following ? "Following" : "Follow"}
          </button>
    </li>
  );
};
