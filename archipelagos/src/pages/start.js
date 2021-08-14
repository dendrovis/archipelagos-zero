/// REACT Package
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

/// Asset Package
import * as IMAGE from "../assets/img/index";

/// Styling
import Classes from "../css/pages/start.module.css";
import GlobalClasses from "../css/global.module.css";

/// Storage Control
import * as Storage from "../external/api/sessionStorage";

/// Component Package
import * as Component from "../components/component";

/// Static Package
import * as STATIC from "../static/_export";

/// DEBUG
import * as DEV from "../config/debug";

export default function Start() {
  const history = useHistory(); // Create router as object

  /// Execute after render finish
  useEffect(() => {
    Storage.clearAll();
    if (DEV.DEBUG) console.log("[useEffect] Initialize");
  }, []); //[] run one time since did'nt find any var to update

  /// Navigation to Next Page
  function goCreation() {
    if (DEV.DEBUG) console.log("[onClick] Go to Creation Page");
    history.push("/creation");
  }

  return (
    <>
      <>
        <CoverSection />
        <div className={GlobalClasses.space}></div>
        <ActionSection event={goCreation} />
      </>
      <>
        <OverlaySection />
      </>
    </>
  );
}

function CoverSection() {
  return (
    <div>
      <div className={Classes.logoContainer}>
        <img className={Classes.logo} src={IMAGE.LOGO} alt={IMAGE.ALT_LOGO} />
      </div>
      <h1 className={Classes.title + " " + Classes.titleContainer}>
        {STATIC.DATA.START_PAGE_TITLE}
      </h1>
      <h2 className={Classes.subtitle + " " + Classes.subtitleContainer}>
        {STATIC.DATA.START_PAGE_SUBTITLE}
      </h2>
    </div>
  );
}

function ActionSection(props) {
  return (
    <div className={GlobalClasses.buttonContainer}>
      <Component.Button.Text
        event={props.event}
        text={STATIC.DATA.START_PAGE_BTNTEXT}
      />
    </div>
  );
}

function OverlaySection() {
  return (
    <>
      <Component.Button.Help
        tooltip={STATIC.DATA.GLOBAL_HELP_TOOLTIP}
        size={STATIC.CONSTANT.SCALE_FLOAT_ICON}
      />
      <Component.Button.Settings
        tooltip={STATIC.DATA.GLOBAL_SETTINGS_TOOLTIP}
        size={STATIC.CONSTANT.SCALE_FLOAT_ICON}
      />
      <div className={GlobalClasses.version}>{DEV.VERSION}</div>
    </>
  );
}
