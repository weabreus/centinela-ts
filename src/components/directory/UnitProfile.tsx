import React, { useState } from "react";
import UnitDataType from "../../models/UnitDataType";
import Breadcrumb from "./Breadcrumb";
import ProfileTabs from "./ProfileTabs";
import UnitProfileFields from "./UnitProfileFields";
import UnitProfileHeader from "./UnitProfileHeader";

const UnitProfile: React.FC<{ selectedUnit: UnitDataType | null }> = ({
  selectedUnit,
}) => {
  const [activeTab, setActiveTab] = useState<string>("Residentes");
  
  return (
    <main className={`flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last min-h-[calc(100vh-89px)]`}>
      {/* Breadcrumb */}
      <Breadcrumb />

      <article className="pb-6">
        {/* Profile header */}
        <UnitProfileHeader selectedUnit={selectedUnit} />

        {/* Tabs */}
        <ProfileTabs
          tabs={[
            { name: "Residentes", current: activeTab === "Residentes" ? true : false },
            { name: "Vehiculos", current: activeTab === "Vehiculos" ? true : false },
            { name: "Visitantes Autorizados", current: activeTab === "Visitantes Autorizados" ? true : false },
            { name: "Mascotas", current: activeTab === "Mascotas" ? true : false },
          ]}

          setActiveTab={setActiveTab}
        />

        {/* Profile Fields */}
        <UnitProfileFields selectedUnit={selectedUnit!} activeTab={activeTab}/>
      </article>
    </main>
  );
};

export default UnitProfile;
