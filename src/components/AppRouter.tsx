import { BrowserRouter, Switch, Route } from "react-router-dom";
import { EditScreen } from "./screens/EditScreen";
import { LoginScreen } from "./screens/LoginScreen";

export const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/edit">
        <EditScreen />
      </Route>
      <Route path="/">
        <LoginScreen />
      </Route>
    </Switch>
  </BrowserRouter>
);
