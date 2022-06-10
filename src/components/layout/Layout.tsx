import { useState } from "react";
import PageTitle from "../../models/PageTitle";
import VisitDataType from "../../models/VisitDataType";
import Navbar from "../navbar/Navbar";
import ResponsiveSidebar from "../sidebar/responsive/ResponsiveSidebar";
import Sidebar from "../sidebar/Sidebar";

const Layout: React.FC<{
  title: PageTitle ;
  setVisits: React.Dispatch<VisitDataType[]>;
  children?: React.ReactNode;
}> = ({ setVisits, title, children }) => {

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <>
      <div className="min-h-full">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="lg:pl-64 flex flex-col">
          <ResponsiveSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <main className="flex-1">
            <Navbar setVisits={setVisits} title={title} />
            {children}
            {/* Website content */}
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
