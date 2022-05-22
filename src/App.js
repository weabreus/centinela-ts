import React, { useContext } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/layout/Layout";
import AuthPage from "./pages/AuthPage";
import BuildingsPage from './pages/BuildingsPage';
import EditVisitsPage from './pages/EditVisitsPage';
import ProfilePage from './pages/ProfilePage';
import UsersPage from './pages/UsersPage';
import VisitsPage from "./pages/VisitsPage";
import AuthContext from './store/auth-context';

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
      </Layout>}
      
      {!authCtx.isLoggedIn && <Redirect to="/auth" />}
    </Switch>
  );
}

export default App;
