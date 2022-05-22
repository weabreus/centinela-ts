import React, { useContext } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/layout/Layout";
import AuthPage from "./pages/AuthPage";
import BuildingsPage from './pages/buildings/BuildingsPage';
import EditVisitsPage from './pages/visits/EditVisitsPage';
import ProfilePage from './pages/ProfilePage';
import UsersPage from './pages/UsersPage';
import VisitsPage from "./pages/visits/VisitsPage";
import AuthContext from './store/auth-context';
import CreateBuildingsPage from './pages/buildings/CreateBuildingsPage';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Switch>
      {!authCtx.isLoggedIn && (
        <Route path="/auth">
          <AuthPage />
        </Route>
      )}

      {authCtx.isLoggedIn && 
      <Layout>
        <Route path="/visits" exact>
          <VisitsPage />
        </Route>
        <Route path="/profile" exact>
          <ProfilePage />
        </Route>
        <Route path="/directory" exact>
          <UsersPage />
        </Route>
        <Route path="/editvisit/:id" exact>
          <EditVisitsPage />
        </Route>
        <Route path="/buildings" exact>
          <BuildingsPage />
        </Route>
        <Route path="/createbuilding" exact>
          <CreateBuildingsPage />
        </Route>
      </Layout>}
      
      {!authCtx.isLoggedIn && <Redirect to="/auth" />}
    </Switch>
  );
}

export default App;
