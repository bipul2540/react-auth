import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LogInPage } from "./pages/LogInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { UserInfoPage } from "./pages/UserInfoPage";

import { PrivatRoute } from "./auth/PrivateRoute";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <PrivatRoute path='/' exact>
          <UserInfoPage />
        </PrivatRoute>

        <Route path='/login'>
          <LogInPage />
        </Route>

        <Route path='/signup' >
          <SignUpPage />
        </Route>
      </Switch>
    </Router>
  );
};