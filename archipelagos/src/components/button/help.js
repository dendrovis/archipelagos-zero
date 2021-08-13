import React, { useState } from "react";
import Classes from "../../css/button/help.module.css";
import { FaRegQuestionCircle } from "react-icons/fa";
import PropTypes from "prop-types";

/// Static Package
import * as STATIC from "../../static/_export";

Help.prototype = {
  tooltip: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

export default function Help(props) {
  const [toggle, setToggle] = useState(false);

  function buttonClicked() {
    setToggle(!toggle);
    console.log("Clicked");
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
                <li>{STATIC.DATA.GLOBAL_HELP_DESC_1}</li>
                <li>{STATIC.DATA.GLOBAL_HELP_DESC_2}</li>
                <li>{STATIC.DATA.GLOBAL_HELP_DESC_3}</li>
                <li>{STATIC.DATA.GLOBAL_HELP_DESC_4}</li>
                <li>{STATIC.DATA.GLOBAL_HELP_DESC_5}</li>
                <li>{STATIC.DATA.GLOBAL_HELP_DESC_6}</li>
              </ol>
              <div className={Classes.space}></div>
              <div>
                <h3 className={Classes.subsubtitle}>
                  {STATIC.DATA.GLOBAL_HELP_SUBTITLE_2}
                </h3>
              </div>
              <pre></pre>
              <ul>
                <li>{STATIC.DATA.GLOBAL_HELP_DESC_7}</li>
                <li>{STATIC.DATA.GLOBAL_HELP_DESC_8}</li>
                <li>{STATIC.DATA.GLOBAL_HELP_DESC_9}</li>
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
