/** Component Package */
import * as Component from "./index";

/** Styling */
import GlobalClasses from "../common/global.module.css";

/** Common Packages */
import constant from "../common/constant";
import data from "../common/data";

/** Debug */
import * as DEV from "../config/debug";

export default function Overlay() {
  return (
    <>
      <Component.Help
        tooltip={data.GLOBAL_HELP_TOOLTIP}
        size={constant.SCALE_FLOAT_ICON}
      />
      <Component.Settings
        tooltip={data.GLOBAL_SETTINGS_TOOLTIP}
        size={constant.SCALE_FLOAT_ICON}
      />
      <div className={GlobalClasses.version}>{DEV.VERSION}</div>
    </>
  );
}
