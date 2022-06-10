import { Menu } from "@headlessui/react";
import UserButton from "./UserButton";
import UserMenu from "./UserMenu";



const UserDropdown: React.FC = () => {
  return (
    <Menu as="div" className="px-3 relative inline-block text-left">
      <UserButton />
      <UserMenu />
    </Menu>
  );
}

export default UserDropdown;
