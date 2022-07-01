import {
  HomeIcon,
  ViewListIcon,
  OfficeBuildingIcon,
  ViewGridIcon,
  TruckIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import PermissionsGate from "../../../permissions/PermissionGate";
import AuthContext from "../../../store/auth-context";
import NavLink from "./NavLink";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navigation: React.FC = () => {
  const location = useLocation();
  const authCtx = useContext(AuthContext);

  return (
    <nav className="px-3 mt-6">
      <div className="space-y-1">
        <PermissionsGate scopes={["can-visits"]}>
          <NavLink
            linkInfo={{
              key: "Visitas",
              href: "/",
              // @ts-ignore
              icon: HomeIcon,
              current: location.pathname === "/" ? true : false,
            }}
          />
        </PermissionsGate>

        <PermissionsGate scopes={["can-directory"]}>
          <NavLink
            linkInfo={{
              key: "Directorio",
              href: "/directory",
              // @ts-ignore
              icon: ViewListIcon,
              current: location.pathname === "/directory" ? true : false,
            }}
          />
        </PermissionsGate>

        <PermissionsGate scopes={["can-complexes"]}>
          <NavLink
            linkInfo={{
              key: "Complejos",
              href: "/complexes",
              // @ts-ignore
              icon: ViewGridIcon,
              current: location.pathname === "/complexes" ? true : false,
            }}
          />
        </PermissionsGate>

        <PermissionsGate scopes={["can-buildings"]}>
          <NavLink
            linkInfo={{
              key: "Edificios",
              href: "/buildings",
              // @ts-ignore
              icon: OfficeBuildingIcon,
              current: location.pathname === "/buildings" ? true : false,
            }}
          />
        </PermissionsGate>

        <PermissionsGate scopes={["can-units"]}>
          <NavLink
            linkInfo={{
              key: "Unidades",
              href: "/units",
              // @ts-ignore
              icon: HomeIcon,
              current: location.pathname === "/units" ? true : false,
            }}
          />
        </PermissionsGate>


        <PermissionsGate scopes={["can-vehicles"]}>
        <NavLink
          linkInfo={{
            key: "Vehiculos",
            href: "/vehicles",
            // @ts-ignore
            icon: TruckIcon,
            current: location.pathname === "/vehicles" ? true : false,
          }}
        />
        </PermissionsGate>

        <PermissionsGate scopes={["can-visitors"]}>
        <NavLink
          linkInfo={{
            key: "Visitantes",
            href: "/visitors",
            // @ts-ignore
            icon: UserGroupIcon,
            current: location.pathname === "/visitors" ? true : false,
          }}
        />
        </PermissionsGate>
      </div>
    </nav>
  );
};

export default Navigation;
