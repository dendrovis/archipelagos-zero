/** React Package */
import { useHistory } from "react-router-dom";

/** Styling */
import GlobalClasses from "../common/global.module.css";

/** Component Package */
import * as Component from "../components/index";

/** Common Packages */
import data from "../common/data";

/** Debug */
import * as DEV from "../config/debug";

/**
 * Content of the start page
 * @returns {JSX.Element} Start Page Content Component
 */
export default function Start() {
  const history = useHistory();

  /// Navigation to Next Page
  const goCreation = () => {
    if (DEV.DEBUG) console.log("[onClick] Go to Creation Page");
    history.push("/creation");
  };

  return (
    <>
      <Component.Cover />
      <div className={GlobalClasses.space} />
      <Component.SubmitButton
        event={goCreation}
        text={data.START_PAGE_BTNTEXT}
      />
      <Component.Overlay />
    </>
  );
}
