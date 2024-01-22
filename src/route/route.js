/**
 * React Packages
 */
import { Route, Switch } from "react-router-dom";

/**
 * Pages Components
 */
import * as Pages from "../pages/index";

/**
 * Consist of all possible routing components
 * @returns {JSX.Element} Pages Components
 */
export default function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/" exact={true}>
          <Pages.Start />
        </Route>
        <Route path="/creation">
          <Pages.Creation />
        </Route>
        <Route path="/play" location={{ id: "" }}>
          <Pages.Play />
        </Route>
        <Route path="*">
          <Pages.PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}
