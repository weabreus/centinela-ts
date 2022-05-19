import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import ResponsiveSidebar from "../sidebar/responsive/ResponsiveSidebar";
import Sidebar from "../sidebar/Sidebar";

function Layout(props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="min-h-full">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        <div className="lg:pl-64 flex flex-col">
          <ResponsiveSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
          <main className="flex-1">
          <Navbar />
          {props.children}
          {/* Website content */}
          </main>
          
        </div>
      </div>
    </>
  );
}

export default Layout;