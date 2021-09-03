/** Styling */
import Classes from "./SettingButton.module.css";
import { FaRegSun } from "react-icons/fa";

/**
 * Action that display the settings of the application
 * @param {*} props
 * @returns
 */
export default function SettingButton(props) {
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
