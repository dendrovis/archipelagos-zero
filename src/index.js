/**@summary 1st file where JS Engine will find*/

/** React Packages */
import { StrictMode } from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

/** Redux */
import { Provider } from "react-redux";
import * as store from "./redux/store/index";

/** App Component */
import App from "./App";

/** Default Styling */
import "./common/index.css";

/** Render from root element */
render(
  <StrictMode>
    <Provider store={store.autoStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
