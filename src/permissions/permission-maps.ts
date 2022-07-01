export const ROLES = {
  superadmin: "superadmin",
  admin: "admin",
  staff: "staff",
};

export const SCOPES = {
  visits: "can-visits",
  directory: "can-directory",
  complexes: "can-complexes",
  buildings: "can-buildings",
  units: "can-units",
  vehicles: "can-vehicles",
  visitors: "can-visitors",
};

export const PERMISSIONS = {
  [ROLES.superadmin]: [
    SCOPES.visits,
    SCOPES.directory,
    SCOPES.complexes,
    SCOPES.buildings,
    SCOPES.units,
    SCOPES.vehicles,
    SCOPES.visitors
  ],
  
  [ROLES.admin]: [
    SCOPES.visits,
    SCOPES.directory,
    SCOPES.complexes,
    SCOPES.buildings,
    SCOPES.units,
    SCOPES.vehicles,
    SCOPES.visitors
  ],

  [ROLES.staff]: [
    SCOPES.visits,
    SCOPES.directory,
    SCOPES.visitors
  ],

};
