import React from "react";
import { Route, Switch } from "react-router-dom";

import StartPage from "../pages/start";
import CreationPage from "../pages/creation";
import PlayPage from "../pages/play";
import DevPage from "../engine/temp";

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/" exact={true}>
          <StartPage />
        </Route>
        <Route path="/creation">
          <CreationPage />
        </Route>
        <Route path="/play">
          <PlayPage />
        </Route>
        <Route path="*">
          <DevPage />
        </Route>
      </Switch>
    </div>
  );
}
