/** Asset Package */
import * as IMAGE from "../assets/img/index";

/** Styling */
import Classes from "./Start.module.css";

/** Common Packages */
import data from "../common/data";

/**
 * Cover section of the content
 * @returns {JSX.Element}
 */
export default function Cover() {
  return (
    <div>
      <div className={Classes.logoContainer}>
        <img className={Classes.logo} src={IMAGE.LOGO} alt={IMAGE.ALT_LOGO} />
      </div>
      <h1 className={Classes.title + " " + Classes.titleContainer}>
        {data.START_PAGE_TITLE}
      </h1>
      <h2 className={Classes.subtitle + " " + Classes.subtitleContainer}>
        {data.START_PAGE_SUBTITLE}
      </h2>
    </div>
  );
}
