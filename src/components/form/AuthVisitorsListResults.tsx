import { useEffect, useState } from "react";
import Select from "react-select/dist/declarations/src/Select";
import { createAuthorizedVisitorDirectory } from "../../firestore/controllers/VisitsController";
import { classNames } from "../../helpers";
import Directory from "../../models/DirectoryType";
import UnitInputType from "../../models/UnitInputType";
import VisitorDataType from "../../models/VisitorDataType";



const AuthVisitorsListResults: React.FC<{
  authorizedVisitors: Directory<VisitorDataType>;
  visitorName: React.RefObject<HTMLInputElement>;
  visitorID: React.RefObject<HTMLInputElement>;
  unit: React.RefObject<Select<UnitInputType>>;
}> = ({ authorizedVisitors, visitorName, visitorID, unit }) => {

  

  const visitorTypeChangeHandler = (type: string) => {

    const directory: any = createAuthorizedVisitorDirectory(unit.current?.getValue().at(0)?.authorizedVisitors, type);

    setCurrentAuthVisitors(directory);
    if (type === "visitor") {
      setVisitorsTab(true)
      setServicesTab(false)
    } else {
      setVisitorsTab(false)
      setServicesTab(true)
    }
  };

  const [currentAuthVisitors, setCurrentAuthVisitors] = useState<Directory<VisitorDataType>>(authorizedVisitors);
  const [visitorsTab, setVisitorsTab] = useState<boolean>(true);
  const [servicesTab, setServicesTab] = useState<boolean>(false);

  const tabs = [
    { name: "Visitantes", type: "visitor", current: visitorsTab },
    { name: "Servicios", type: "services", current: servicesTab },
  ];

  useEffect(() => {
    tabs[0].current = visitorsTab;
    tabs[1].current = servicesTab;
  }, [tabs, visitorsTab, servicesTab])

  return (
    <nav className="h-fit overflow-y-auto" aria-label="Directory">
      <h3 className="font-medium text-gray-900 pb-6">Visitantes Autorizados</h3>
      <div className="border-b border-gray-200">
        <div className="px-6">
          <nav className="-mb-px flex space-x-6" x-descriptions="Tab component">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => visitorTypeChangeHandler(tab.type)}
                className={classNames(
                  tab.current
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
                )}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
      {Object.keys(currentAuthVisitors)
        .sort()
        .map((letter) => (
          <div key={JSON.stringify(letter)} className="relative">
            <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
              <h3>{letter}</h3>
            </div>
            <ul className="relative z-0 divide-y divide-gray-200">
              {currentAuthVisitors[letter].map((person: VisitorDataType) => (
                <li key={JSON.stringify(person.id)} className="bg-white">
                  <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        alt=""
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span
                        onClick={() => {
                          visitorName.current!.value = person.name;
                          visitorID.current!.value = person.identification;
                        }}
                        className="focus:outline-none"
                      >
                        {/* Extend touch target to entire panel */}
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="text-sm font-medium text-gray-900">
                          {person.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {person.identification}
                        </p>
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </nav>
  );
};

export default AuthVisitorsListResults;
