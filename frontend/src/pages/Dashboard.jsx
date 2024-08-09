// import { useSelector } from "react-redux"
// import { Outlet } from "react-router-dom"

// import Sidebar from "../components/core/Dashboard/Sidebar"

// function Dashboard() {
//   const { loading: profileLoading } = useSelector((state) => state.profile)
//   const { loading: authLoading } = useSelector((state) => state.auth)

//   if (profileLoading || authLoading) {
//     return (
//       <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//         <div className="spinner"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="relative flex min-h-[calc(100vh-3.5rem)]">
//       <Sidebar />
//       <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
//         <div className="mx-auto w-11/12 max-w-[1000px] py-10">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dashboard


import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Sidebar from "../components/core/Dashboard/Sidebar";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open by default
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:w-64 md:translate-x-0`}
      >
        <Sidebar />
        {/* Toggle Icon - Mobile View */}
        <div
          className={`absolute top-1/2 left-full transform -translate-y-1/2 cursor-pointer z-20 ${
            isSidebarOpen ? "hidden" : "block"
          } md:hidden`}
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faArrowRight} className="text-white text-xl" />
        </div>
        {/* Toggle Icon - Mobile View (when sidebar is closed) */}
        <div
          className={`absolute top-1/2 -right-4 transform -translate-y-1/2 cursor-pointer z-20 ${
            isSidebarOpen ? "block" : "hidden"
          } md:hidden`}
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-white text-xl" />
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-1 overflow-auto transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "md:ml-0 ml-0" : "md:ml-0 ml-0"
        }`}
      >
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
