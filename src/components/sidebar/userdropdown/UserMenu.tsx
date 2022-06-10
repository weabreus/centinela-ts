import { useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import AuthContext from "../../../store/auth-context";
import AuthContextType from "../../../models/AuthContextType";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const UserMenu: React.FC = () => {
  const authCtx = useContext<AuthContextType>(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
        <div className="py-1">
          <Link to="/profile">
            <Menu.Item>
              {({ active }) => (
                <span
                  key={"usermenuprofile"}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Ver perfil
                </span>
              )}
            </Menu.Item>
          </Link>
        </div>
        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <span
                key={"usermenulogout"}
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
  );
};

export default UserMenu;
