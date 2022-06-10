import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  HomeIcon,
  OfficeBuildingIcon,
  TruckIcon,
  ViewGridIcon,
  ViewListIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Link, useLocation } from "react-router-dom";
import Logo from "../Logo";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ResponsiveSidebar: React.FC<{
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({sidebarOpen, setSidebarOpen}) => {
  const location = useLocation();

  const navigation = [
    {
      key: "Visitas",
      href: "/visits",
      icon: HomeIcon,
      current: location.pathname === "/visits" ? true : false,
    },
    {
      key: "Directorio",
      href: "/directory",
      icon: ViewListIcon,
      current: location.pathname === "/directory" ? true : false,
    },
    {
      key: "Complejos",
      href: "/complexes",
      icon: ViewGridIcon,
      current: location.pathname === "/complexes" ? true : false,
    },
    {
      key: "Edificios",
      href: "/buildings",
      icon: OfficeBuildingIcon,
      current: location.pathname === "/buildings" ? true : false,
    },
    {
      key: "Unidades",
      href: "/units",
      icon: HomeIcon,
      current: location.pathname === "/units" ? true : false,
    },
    {
      key: "Vehiculos",
      href: "/vehicles",
      icon: TruckIcon,
      current: location.pathname === "/vehicles" ? true : false,
    },
  ];

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 flex z-40">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <Logo />
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2">
                  <div className="space-y-1">
                    {navigation.map((item) => (
                      <Link key={item.key} to={item.href}>
                        <span
                          className={classNames(
                            item.current
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                            "group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
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
              </div>
            </Dialog.Panel>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ResponsiveSidebar;
