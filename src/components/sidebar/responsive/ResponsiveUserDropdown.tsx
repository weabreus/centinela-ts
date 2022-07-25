import { Transition } from "@headlessui/react";
import { Menu } from "@headlessui/react";
import { useContext } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { getLoggedUser } from "../../../firestore/firestoreHelpers";
import { classNames } from "../../../helpers";
import AuthContextType from "../../../models/AuthContextType";
import AuthContext from "../../../store/auth-context";

const ResponsiveUserDropdown: React.FC = () => {
  const authCtx = useContext<AuthContextType>(AuthContext);
  const [info, setInfo] = useState<
    { docId: string; photo: string } | undefined
  >();

  if (info) {
    const userSnap = getLoggedUser("users", authCtx.id);
    userSnap.then((doc) => setInfo(doc));
  }

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <div className="flex items-center">
      {/* Profile dropdown */}
      <Menu as="div" className="ml-3 relative">
        <div>
          <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            <span className="sr-only">Open user menu</span>
            <img className="h-8 w-8 rounded-full" src={info?.photo} alt="" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {/* @ts-ignore */}
                {({ active }) => (
                  <span
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Ver perfil
                  </span>
                )}
              </Menu.Item>
              <Menu.Item>
                {/* @ts-ignore */}
                {({ active }) => (
                  <span
                    
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Ajustes
                  </span>
                )}
              </Menu.Item>
              <Menu.Item>
                {/* @ts-ignore */}
                {({ active }) => (
                  <span
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Notificaciones
                  </span>
                )}
              </Menu.Item>
            </div>
            <div className="py-1">
              <Menu.Item>
                {/* @ts-ignore */}
                {({ active }) => (
                  <span
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    App Escritorio
                  </span>
                )}
              </Menu.Item>
              <Menu.Item>
                {/* @ts-ignore */}
                {({ active }) => (
                  <span
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Ayuda
                  </span>
                )}
              </Menu.Item>
            </div>
            <div className="py-1">
              <Menu.Item>
                {/* @ts-ignore */}
                {({ active }) => (
                  <span
                    onClick={logoutHandler}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Logout
                  </span>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ResponsiveUserDropdown;
