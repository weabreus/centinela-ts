import React, { cloneElement } from "react";
import AuthContext from "../store/auth-context";
import { PERMISSIONS } from "./permission-maps";
import useGetRole from "./useGetRole";

const hasPermission: (props: {
  permissions: string[];
  scopes: string[];
}) => boolean = ({ permissions, scopes }) => {
  const scopesMap: { [k: string]: boolean } = {};
  scopes.forEach((scope) => {
    scopesMap[scope] = true;
  });

  return permissions.some((permission) => scopesMap[permission]);
};

const PermissionsGate: React.FC<{children: any, scopes: string[] }> = ({ children, scopes = [] }) => {
  const role = useGetRole(AuthContext);
  const permissions = PERMISSIONS[role];

  const permissionGranted = hasPermission({ permissions, scopes });
    console.log(permissionGranted);
  if (!permissionGranted) return <></>;

  return <>{children}</>;
};

export default PermissionsGate;
