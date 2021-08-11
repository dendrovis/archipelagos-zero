import React from "react";
import Classes from "../../css/button/help.module.css";
import { FaRegQuestionCircle } from "react-icons/fa";
import PropTypes from "prop-types";

Help.prototype = {
  tooltip: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

export default function Help(props) {
  return (
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
  );
}
