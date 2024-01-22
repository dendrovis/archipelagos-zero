/** React Packages */
import { useState } from "react";

/** Styling  */
import Classes from "./HelpButton.module.css";
import { FaRegQuestionCircle } from "react-icons/fa";

/** Type */
import PropTypes from "prop-types";

/** Common Packages */
import * as data from "../common/data";
import * as constant from "../common/constant";

HelpButton.prototype = {
  tooltip: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

/**
 * Action to display game information
 * @param {*} props
 * @returns
 */
export default function HelpButton(props) {
  const [toggle, setToggle] = useState(false);

  function buttonClicked() {
    setToggle(!toggle);
  }

  return (
    <>
      <form onClick={buttonClicked}>
        <div className={Classes.wrapper + " " + Classes.float_icon_1_container}>
          <div className={Classes.icon + " " + Classes.help}>
            <div className={Classes.tooltip}>{props.tooltip}</div>
            <span>
              {
                //<IconContext.Provider value={{ color: "grey" }}>
              }
              <div>
                <FaRegQuestionCircle
                  size={`${props.size}px`}
                  className={Classes.float_icon_1}
                />
              </div>
              {
                //</IconContext.Provider>
              }
            </span>
          </div>
        </div>
      </form>
      {toggle ? (
        <div className={Classes.help_info_container}>
          <div className={Classes.help_info_subcontainer}>
            <h3 className={Classes.subtitle}>Help</h3>
            <pre />
            <div className={Classes.desc}>
              <ol>
                <li>{data.GLOBAL_HELP_DESC_1}</li>
                <li>{data.GLOBAL_HELP_DESC_2}</li>
                <li>{data.GLOBAL_HELP_DESC_3}</li>
                <li>{data.GLOBAL_HELP_DESC_4}</li>
                <li>{data.GLOBAL_HELP_DESC_5}</li>
                <li>{data.GLOBAL_HELP_DESC_6}</li>
              </ol>
              <div className={Classes.space}></div>
              <div>
                <h3 className={Classes.subsubtitle}>
                  {data.GLOBAL_HELP_SUBTITLE_2}
                </h3>
              </div>
              <pre></pre>
              <ul>
                <li>{data.GLOBAL_HELP_DESC_7}</li>
                <li>{data.GLOBAL_HELP_DESC_8}</li>
                <li>{data.GLOBAL_HELP_DESC_9}</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
