import React from 'react';
import { HomeIcon, ViewListIcon, OfficeBuildingIcon } from "@heroicons/react/outline";
import { Link, useLocation } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navigation() {
  const location = useLocation();

  const navigation = [
    { key: "Visitas", href: "/visits", icon: HomeIcon, current: (location.pathname === "/visits" ? true : false) },
    { key: "Directorio", href: "/directory", icon: ViewListIcon, current: (location.pathname === "/directory" ? true : false) },
    { key: "Edificios", href: "/buildings", icon: OfficeBuildingIcon, current: (location.pathname === "/buildings" ? true : false) },
    { key: "Unidades", href: "/units", icon: HomeIcon, current: (location.pathname === "/units" ? true : false) },

    
  ];

  
  return (
    <nav className="px-3 mt-6">
      <div className="space-y-1">
        {navigation.map((item) => (
          <Link to={item.href}>
            <span
              key={item.key}
              className={classNames(
                item.current
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              )}
              aria-current={item.current ? "page" : undefined}
            >
              <item.icon
                className={classNames(
                  item.current
                    ? "text-gray-500"
                    : "text-gray-400 group-hover:text-gray-500",
                  "mr-3 flex-shrink-0 h-6 w-6"
                )}
                aria-hidden="true"
              />
              {item.key}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;
