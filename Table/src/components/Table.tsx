import clsx from "clsx";
import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { BiSort } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { MdSort } from "react-icons/md";
import { data } from "../utils/data";

type Project = {
  client: string;
  country: string;
  email: string;
  project: string;
  progress: string;
  status: string;
  date: string;
  image: string;
};

const ProjectTable = () => {
  const [projects, setProjects] = useState<Project[]>(data);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    name: "",
    country: "",
    email: "",
    project: "",
    status: "",
  });
  const [statusDropdownVisible, setStatusDropdownVisible] = useState<
    number | null
  >(null);
  const [newProgress, setNewProgress] = useState<string>("");
  const [isProgressInputVisible, setIsProgressInputVisible] =
    useState<boolean>(false);

  const sortProjects = (key: keyof Project) => {
    const sortedProjects = [...projects];
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      sortedProjects.sort((a, b) => (a[key] > b[key] ? -1 : 1));
      setSortConfig({ key, direction: "descending" });
    } else {
      sortedProjects.sort((a, b) => (a[key] > b[key] ? 1 : -1));
      setSortConfig({ key, direction: "ascending" });
    }
    setProjects(sortedProjects);
  };

  const handleSortOptionClick = (key: keyof Project) => {
    sortProjects(key);
    setDropdownVisible(false);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleStatusChange = (index: number, newStatus: string) => {
    const updatedProjects = projects.map((project, i) => {
      if (i === index) {
        if (newStatus === "Completed") {
          return {
            ...project,
            status: newStatus,
            progress: "100%",
          };
        } else if (newStatus === "In Progress" && newProgress) {
          return {
            ...project,
            status: newStatus,
            progress: `${newProgress}%`,
          };
        }
        return project;
      }
      return project;
    });
    setProjects(updatedProjects);
    setStatusDropdownVisible(null);
    setIsProgressInputVisible(false);
    setNewProgress("");
  };

  const filteredProjects = projects.filter(
    (project) =>
      (searchQuery === "" ||
        Object.values(project).some((value) =>
          value.toLowerCase().includes(searchQuery.toLowerCase())
        )) &&
      (filters.name === "" ||
        project.client.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.country === "" ||
        project.country
          .toLowerCase()
          .includes(filters.country.toLowerCase())) &&
      (filters.email === "" ||
        project.email.toLowerCase().includes(filters.email.toLowerCase())) &&
      (filters.project === "" ||
        project.project
          .toLowerCase()
          .includes(filters.project.toLowerCase())) &&
      (filters.status === "" ||
        project.status.toLowerCase().includes(filters.status.toLowerCase()))
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = filteredProjects.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Enter" && newProgress) {
      handleStatusChange(index, "In Progress");
    }
  };
  return (
    <div className="p-4 w-[93%] ml-[5rem]">
      {/* Sorting */}
      <div className="flex items-center mb-5">
        <div className="relative">
          <button
            onClick={() => setDropdownVisible((prev) => !prev)}
            className="border border-gray-700 flex items-center justify-center text-white p-2 rounded"
          >
            <BiSort className="mr-[0.3rem]" />
            Sort
            <AiOutlineDown
              className={clsx("ml-2 transition-transform", dropdownVisible && "rotate-180")}
            />
          </button>
          {dropdownVisible && (
            <div className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-700 rounded shadow-lg">
              <button
                onClick={() => handleSortOptionClick("client")}
                className="block px-4 py-2 text-white w-full hover:bg-gray-700"
              >
                Name
              </button>
              <button
                onClick={() => handleSortOptionClick("country")}
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Country
              </button>
              <button
                onClick={() => handleSortOptionClick("date")}
                className="block px-4 py-2 text-white w-full hover:bg-gray-700"
              >
                Date
              </button>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="relative ml-4 w-full">
          <button
            onClick={() => setFiltersVisible((prev) => !prev)}
            className="border border-gray-700 flex items-center justify-center text-white p-2 rounded"
          >
            <MdSort className="mr-[0.3rem]" />
            Filters
            <AiOutlineDown className="ml-2" />
          </button>
          {filtersVisible && (
            <div className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-700 rounded shadow-lg p-4">
              <div className="mb-2">
                <label className="block text-white">Filter by Name:</label>
                <input
                  type="text"
                  name="name"
                  value={filters.name}
                  onChange={handleFilterChange}
                  className="bg-gray-900 text-white rounded p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block text-white">Filter by Country:</label>
                <input
                  type="text"
                  name="country"
                  value={filters.country}
                  onChange={handleFilterChange}
                  className="bg-gray-900 text-white rounded p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block text-white">Filter by Email:</label>
                <input
                  type="text"
                  name="email"
                  value={filters.email}
                  onChange={handleFilterChange}
                  className="bg-gray-900 text-white rounded p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block text-white">Filter by Project:</label>
                <input
                  type="text"
                  name="project"
                  value={filters.project}
                  onChange={handleFilterChange}
                  className="bg-gray-900 text-white rounded p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block text-white">Filter by Status:</label>
                <input
                  type="text"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="bg-gray-900 text-white rounded p-2 w-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Table */}
      <table className="min-w-full table-auto rounded border border-gray-700 text-white">
        <thead>
          <tr>
            <th className="px-5 py-3 text-left">Image</th>
            <th className="px-5 py-3 text-left">Name</th>
            <th className="px-5 py-3 text-left">Country</th>
            <th className="px-5 py-3 text-left">Email</th>
            <th className="px-5 py-3 text-left">Project Name</th>
            <th className="px-5 py-3 text-left">Task Progress</th>
            <th className="px-5 py-3 text-left">Status</th>
            <th className="px-5 py-3 text-left">Date</th>
            <th className="px-5 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProjects.map((project, index) => (
            <tr key={index} className="border border-gray-700">
              <td className="px-4 py-2">
                <img
                  src={project.image}
                  alt={project.client}
                  className="w-[3rem] h-[3rem] object-cover rounded-full"
                />
              </td>
              <td className="px-4 py-2">{project.client}</td>
              <td className="px-4 py-2">{project.country}</td>
              <td className="px-4 py-2">{project.email}</td>
              <td className="px-4 py-2">{project.project}</td>
              <td className="px-4 py-2">
                <div className="w-24 h-2 bg-gray-200 rounded relative">
                  <div
                    style={{ width: project.progress }}
                    className="absolute inset-0 h-full bg-green-500 rounded"
                  />
                </div>
              </td>
              <td className="px-4 py-2 w-[10rem]">
                <span
                  className={`bg-${
                    project.status === "Completed" ? "green" : "yellow"
                  }-500 p-1 rounded`}
                >
                  {project.status}
                </span>
              </td>
              <td className="px-4 py-2">{project.date}</td>
              <td className="px-4 py-2">
                <div className="relative">
                  <BsThreeDots
                    className="cursor-pointer"
                    onClick={() => {
                      setStatusDropdownVisible(index);
                      setIsProgressInputVisible(false); // Сброс состояния при открытии
                      setNewProgress(""); // Сброс значения прогресса
                    }}
                  />
                  {statusDropdownVisible === index && (
                    <div
                      className="absolute text-sm top-full right-0 mt-2 bg-gray-500 border border-gray-700 rounded shadow-lg z-20"
                      onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике внутри
                    >
                      <button
                        onClick={() => {
                          setIsProgressInputVisible(true);
                        }}
                        className="block px-4 py-2 text-white hover:bg-gray-400 w-full text-left"
                      >
                        In Progress
                      </button>
                      {isProgressInputVisible && (
                        <div className="px-4 py-2">
                          <label
                            htmlFor={`new-progress-${index}`}
                            className="block text-white"
                          >
                            New Progress (%):
                          </label>
                          <input
                            id={`new-progress-${index}`}
                            type="number"
                            min="0"
                            max="100"
                            value={newProgress}
                            onChange={(e) => setNewProgress(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="block w-full px-4 py-2 bg-gray-600 text-white border border-gray-700 rounded"
                          />
                          <button
                            onClick={() =>
                              handleStatusChange(index, "In Progress")
                            }
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Update Progress
                          </button>
                        </div>
                      )}
                      <button
                        onClick={() => handleStatusChange(index, "Completed")}
                        className="block px-4 py-2 text-white hover:bg-gray-400 w-full text-left"
                      >
                        Completed
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-gray-700 text-white rounded mr-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-gray-700 text-white rounded ml-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProjectTable;
