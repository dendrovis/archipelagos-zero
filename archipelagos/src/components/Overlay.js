/** Component Package */
import * as Component from "./index";

/** Styling */
import GlobalClasses from "../common/global.module.css";

/** Common Packages */
import * as constant from "../common/constant";
import * as data from "../common/data";

/** Debug */
import * as DEV from "../config/debug";

export default function Overlay() {
  return (
    <>
      <Component.HelpButton
        tooltip={data.GLOBAL_HELP_TOOLTIP}
        size={constant.SCALE_FLOAT_ICON}
      />
      <Component.SettingButton
        tooltip={data.GLOBAL_SETTINGS_TOOLTIP}
        size={constant.SCALE_FLOAT_ICON}
      />
      <div className={GlobalClasses.version}>{DEV.VERSION}</div>
    </>
  );
}
