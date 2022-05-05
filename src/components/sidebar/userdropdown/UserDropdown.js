import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import UserButton from "./UserButton";
import UserMenu from "./UserMenu";



function UserDropdown() {
  return (
    <Menu as="div" className="px-3 relative inline-block text-left">
      <UserButton />
      <UserMenu />
    </Menu>
  );
}

export default UserDropdown;
