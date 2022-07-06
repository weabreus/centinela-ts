import React from "react";
import { classNames } from "../../helpers";

const ProfileTabs: React.FC<{tabs: {name: string, current: boolean}[], setActiveTab?: React.Dispatch<React.SetStateAction<string>>}> = ({tabs, setActiveTab}) => {
  return (
    <div className="mt-6 sm:mt-2 2xl:mt-5">
      <div className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab ? setActiveTab(tab.name): ""}
                className={classNames(
                  tab.current
                    ? "border-blue-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default ProfileTabs;
