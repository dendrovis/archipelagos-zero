import React from "react";
import Classes from "../../css/button/settings.module.css";
import { FaRegSun } from "react-icons/fa";

export default function Settings(props) {
  return (
    <div className={Classes.wrapper + " " + Classes.float_icon_2_container}>
      <div className={Classes.icon + " " + Classes.help}>
        <div className={Classes.tooltip}>{props.tooltip}</div>
        <span>
          {
            //<IconContext.Provider value={{ color: "grey" }}>
          }
          <div>
            <FaRegSun size={`${props.size}px`} />
          </div>
          {
            //</IconContext.Provider>
          }
        </span>
      </div>
    </div>
  );
}
