import React, { useContext, useEffect, useState } from "react";
import { Home, User, Calendar, Settings, Menu, X } from "lucide-react";
import LocationAccess from "./Map";
import axios from "axios";
import { StationLocationContext } from "../context/stationLocation";
import Spinner from "../components/Spinner";

const Router = ({ children }) => children;
const Routes = ({ children }) => children;
const Route = ({ element }) => element;

const useNavigate = () => (path) => console.log(`Navigating to: ${path}`);

const ProfilePage = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Profile</h1>
    <p className="text-gray-600">
      Manage your profile information and preferences here.
    </p>
  </div>
);

const BookingsPage = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Bookings</h1>
    <p className="text-gray-600">
      View and manage your bookings and reservations.
    </p>
  </div>
);

const SettingsPage = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Settings</h1>
    <p className="text-gray-600">
      Configure your application settings and permissions.
    </p>
  </div>
);

const Sidebar = ({ isOpen, toggleSidebar, currentPage, setCurrentPage }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: "locationAccess",
      label: "Location",
      icon: Home,
      component: LocationAccess,
    },
    { id: "profile", label: "Profile", icon: User, component: ProfilePage },
    {
      id: "bookings",
      label: "Bookings",
      icon: Calendar,
      component: BookingsPage,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      component: SettingsPage,
    },
  ];

  const handleNavigation = (item) => {
    setCurrentPage(item);
    navigate(`/${item.id}`);
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40 sm:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`
        fixed top-0 left-0 h-lvh w-64 bg-green-100 shadow-lg transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:shadow-none
      `}
      >
        <div className="flex items-center justify-between p-4 ">
          <h1 className={`text-xl sm:text-2xl font-bold text-green-500`}>
            <span>ChargeWay</span>
          </h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-50 md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-4">
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage.id === item.id;

              return (
                <li className="" key={item.id}>
                  <button
                    onClick={() => handleNavigation(item)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200
                      ${
                        isActive
                          ? "bg-white text-green-700"
                          : "text-green-700 hover:bg-white"
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState({
    id: "locationAccess",
    label: "LocationAccess",
    icon: Home,
    component: LocationAccess,
  });
  const [loading, setLoading] = useState(false);
  const { stationData, UpdateStationData } = useContext(StationLocationContext);
  const VITE_LOCALHOST = import.meta.env.VITE_LOCALHOST;
  useEffect(() => {
    const responseData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${VITE_LOCALHOST}/station`);
        UpdateStationData(response.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    responseData();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const CurrentPageComponent = currentPage.component;

  return (
    <Router>
      <div className="">
        {loading ? (
          <div className="h-dvh flex flex-col justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex h-screen bg-gray-50">
            <Sidebar
              isOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />

            <div className="flex-1 flex flex-col md:ml-0">
              <header className="bg-green-500 shadow-sm px-4 py-3 md:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={toggleSidebar}
                      className="p-2 rounded-lg md:hidden"
                    >
                      <Menu size={24} className="text-white font-bold" />
                    </button>
                    <h1 className="text-lg font-bold text-white">
                      {currentPage.label}
                    </h1>
                  </div>
                </div>
              </header>
              <main className="flex-1 overflow-y-auto">
                <Routes>
                  <Route path="/" element={<CurrentPageComponent />} />
                </Routes>
              </main>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};

export default Dashboard;
