import React, { useState, useContext } from "react";
import AuthContext from "../../../store/auth-context";

import { Menu } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
import db from "../../../firestore/FirestoreConfig";
import { doc, getDoc } from "firebase/firestore";

function UserButton() {
  const [info, setInfo] = useState([]);
  const authCtx = useContext(AuthContext);
  const userRef = doc(db, "users", authCtx.id);

  if (info.length === 0) {
    getDoc(userRef).then((doc) => {
      if (doc.exists) {
        setInfo(doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
   }


  return (
    <div>
      <Menu.Button className="mt-1 group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-800">
        <span className="flex w-full justify-between items-center">
          <span className="flex min-w-0 items-center justify-between space-x-3">
            <img
              className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
              src={info.photo}
              alt=""
            />
            <span className="flex-1 flex flex-col min-w-0">
              <span className="text-gray-900 text-sm font-medium truncate">
                {info.name}
              </span>
              <span className="text-gray-500 text-sm truncate">
                {info.social}
              </span>
            </span>
          </span>
          <SelectorIcon
            className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        </span>
      </Menu.Button>
    </div>
  );
}

export default UserButton;
