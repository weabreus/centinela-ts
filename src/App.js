import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/layout/Layout";
import AuthPage from "./pages/AuthPage";
import BuildingsPage from "./pages/buildings/BuildingsPage";
import EditVisitsPage from "./pages/visits/EditVisitsPage";
import ProfilePage from "./pages/ProfilePage";
import UsersPage from "./pages/UsersPage";
import VisitsPage from "./pages/visits/VisitsPage";
import AuthContext from "./store/auth-context";
import CreateBuildingsPage from "./pages/buildings/CreateBuildingsPage";
import EditBuildingsPage from "./pages/buildings/EditBuildingsPage";
import UnitsPage from "./pages/units/UnitsPage";
import CreateUnitsPage from "./pages/units/CreateUnitsPage";
import EditUnitsPage from "./pages/units/EditUnitsPage";
import ComplexesPage from "./pages/complexes/ComplexesPage";
import CreateComplexPage from "./pages/complexes/CreateComplexPage";
import EditComplexPage from "./pages/complexes/EditComplexPage";
import VehiclesPage from "./pages/vehicles/VehiclesPage";
import CreateVehiclePage from "./pages/vehicles/CreateVehiclePage";
import EditVehiclePage from "./pages/vehicles/EditVehiclePage";
import CreateResidentPage from "./pages/residents/CreateResidentPage";
import EditResidentPage from "./pages/residents/EditResidentPage";
import { useState } from "react";

function App() {
  const authCtx = useContext(AuthContext);
  const [title, setTitle] = useState("");

  return (
    <Switch>
      {!authCtx.isLoggedIn && (
        <Route path="/auth">
          <AuthPage />
        </Route>
      )}

      {authCtx.isLoggedIn && (
        <Layout title={title}>
          <Route path="/" exact>
            <VisitsPage setTitle={setTitle}/>
          </Route>
          <Route path="/profile" exact>
            <ProfilePage />
          </Route>
          <Route path="/directory" exact>
            <UsersPage setTitle={setTitle}/>
          </Route>
          <Route path="/editvisit/:id" exact>
            <EditVisitsPage setTitle={setTitle}/>
          </Route>
          <Route path="/buildings" exact>
            <BuildingsPage setTitle={setTitle}/>
          </Route>
          <Route path="/createbuilding" exact>
            <CreateBuildingsPage setTitle={setTitle}/>
          </Route>
          <Route path="/editbuilding/:id" exact>
            <EditBuildingsPage setTitle={setTitle}/>
          </Route>
          <Route path="/units" exact>
            <UnitsPage setTitle={setTitle}/>
          </Route>
          <Route path="/createunit" exact>
            <CreateUnitsPage setTitle={setTitle}/>
          </Route>
          <Route path="/editunit/complexes/:pathComplex/buildings/:pathBuilding/units/:id" exact>
            <EditUnitsPage setTitle={setTitle}/>
          </Route>
          <Route path="/complexes" exact>
            <ComplexesPage setTitle={setTitle}/>
          </Route>
          <Route path="/createcomplex" exact>
            <CreateComplexPage setTitle={setTitle}/>
          </Route>
          <Route path="/editcomplex/:id" exact>
            <EditComplexPage setTitle={setTitle}/>
          </Route>
          <Route path="/vehicles" exact>
            <VehiclesPage setTitle={setTitle}/>
          </Route>
          <Route path="/createvehicle" exact>
            <CreateVehiclePage setTitle={setTitle}/>
          </Route>
          <Route path="/editvehicle/:id" exact>
            <EditVehiclePage setTitle={setTitle}/>
          </Route>
          <Route path="/createresident" exact>
            <CreateResidentPage setTitle={setTitle}/>
          </Route>
          <Route path="/editresident/:id" exact>
            <EditResidentPage setTitle={setTitle}/>
          </Route>
        </Layout>
      )}

      {!authCtx.isLoggedIn && <Redirect to="/auth" />}
    </Switch>
  );
}

export default App;
