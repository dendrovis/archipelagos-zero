/**@summary 1st file where JS Engine will find*/

/** React Packages */
import { StrictMode } from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

/** App Component */
import App from "./App";

/** Default Styling */
import "./common/index.css";

/** Render from root element */
render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root")
);
