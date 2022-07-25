import Logo from "./Logo";
import UserDropdown from "./userdropdown/UserDropdown";
import Navigation from "./navigation/Navigation";
import ResponsiveSidebar from "./responsive/ResponsiveSidebar";
import ResponsiveNavbar from "./responsive/ResponsiveNavbar";
import React from "react";

const Sidebar: React.FC<{
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({sidebarOpen, setSidebarOpen}) => {
  return (
    <div>
      <ResponsiveSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:pt-2 lg:pb-2 lg:bg-gray-100">
        <Logo />
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className=" h-0 flex-1 flex flex-col overflow-y-auto">
          {/* User account dropdown */}
          <UserDropdown />
          {/* Sidebar Search */}
          {/* <SearchBar /> */}
          {/* Navigation */}
          <Navigation />
        </div>
      </div>
      {/* Main column */}
      <ResponsiveNavbar setSidebarOpen={setSidebarOpen} />
    </div>
  );
};

export default Sidebar;
