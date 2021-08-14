import React from "react";
import { Route, Switch } from "react-router-dom";

import StartPage from "../pages/start";
import CreationPage from "../pages/creation";
import PlayPage from "../pages/play";
import { TestPage } from "../engine/temp";

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
        <Route path="/play" location={{ id: "" }}>
          <PlayPage />
        </Route>
        <Route path="*">
          <TestPage />
        </Route>
      </Switch>
    </div>
  );
}
