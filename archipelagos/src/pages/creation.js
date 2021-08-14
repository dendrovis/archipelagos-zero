/// REACT Package
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

/// Styling
import Classes from "../css/pages/creation.module.css";
import GlobalClasses from "../css/global.module.css";

/// Storage Control
//import * as Storage from "../external/api/sessionStorage";

/// Component Package
import * as Component from "../components/component";

/// Static Package
import * as STATIC from "../static/_export";

/// DEBUG
import * as DEV from "../config/debug";

/// Logic
import * as Logic from "../engine/_export";

export default function Creation() {
  const inputField = Logic.field.iniField; // Singleton Object
  if (DEV.DEBUG) console.log("Initialize");
  if (DEV.DEBUG) console.log(inputField);

  return (
    <>
      <>
        <TitleSection />
        <div className={GlobalClasses.input_container}>
          <PlayerNameSection input={inputField} />
          <PlayerModeSection input={inputField} />
          <PlayerRepresentorSection input={inputField} />
        </div>
        <ActionSection input={inputField} />
      </>
      <>
        <OverlaySection />
      </>
    </>
  );
}

function TitleSection() {
  return (
    <div>
      <h1 className={Classes.subtitle + " " + Classes.subtitleContainer}>
        {STATIC.DATA.CREATION_PAGE_TITLE}
      </h1>
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

function PlayerNameSection(props) {
  return (
    <>
      <div className={GlobalClasses.expand}>
        <label htmlFor="playername" className={GlobalClasses.label}>
          {STATIC.DATA.CREATION_PAGE_SUBTITLE_1}
        </label>
      </div>
      <Component.Textbox.PlayerName input={props.input} />
    </>
  );
}

function PlayerModeSection(props) {
  return (
    <div className={GlobalClasses.mode_container}>
      <div>
        <label className={GlobalClasses.wrapper + " " + GlobalClasses.label}>
          {STATIC.DATA.CREATION_PAGE_SUBTITLE_2}
        </label>
      </div>
      <div className={Classes.subsubtitleContainer}>
        <Component.Form.ModeSelector input={props.input} />
      </div>
    </div>
  );
}

function PlayerRepresentorSection(props) {
  return (
    <>
      <label className={GlobalClasses.wrapper + " " + GlobalClasses.label}>
        Player Represent
      </label>
      <Component.Form.Representor input={props.input} />
    </>
  );
}

function ActionSection(props) {
  const history = useHistory();
  const [validPlayer, setValid] = useState("hidden");

  function validate() {
    if (
      Logic.validation.checkNull(props.input) &&
      Logic.validation.checkValidPlayerName(props.input.playerName) ===
        "Valid Name" &&
      props.input.playerMode === 0
    ) {
      if (DEV.DEBUG) console.log("Success");
      props.input.playerName = Logic.validation.normalisePlayerName(
        props.input.playerName
      );
      const initialVal = props.input;
      history.push({ pathname: "/play", state: initialVal });
    }
    if (props.input.playerMode === 1) {
      if (DEV.DEBUG) console.log("In-Prog");
      setValid("Multiplayer Not Supported Yet");
    } else {
      if (DEV.DEBUG) console.log("Fail");
      setValid("Please try again!");
    }
  }

  return (
    <>
      <div className={GlobalClasses.buttonContainer}>
        <Component.Button.Text
          event={validate}
          text={STATIC.DATA.CREATION_PAGE_BTNTEXT}
        />
        {validPlayer !== "hidden" ? (
          <div className={GlobalClasses.warning_text}>{validPlayer}</div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
