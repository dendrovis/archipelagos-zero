/** React Packages */
import { useState } from "react";
import { useHistory } from "react-router-dom";

/** Styling */
import Classes from "./Creation.module.css";
import GlobalClasses from "../common/global.module.css";

/** Component Package */
import * as Component from "../components/index";

/** Common Packages */
import * as data from "../common/data";

/** DEBUG */
import * as DEV from "../config/debug";

/** Logic */
import * as Logic from "../engine/_export";

/**
 * Consist of the user inputs components
 * @returns {JSX.Element}
 */
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
        <Component.Overlay />
      </>
    </>
  );
}

function TitleSection() {
  return (
    <div>
      <h1 className={Classes.subtitle + " " + Classes.subtitleContainer}>
        {data.CREATION_PAGE_TITLE}
      </h1>
    </div>
  );
}

function PlayerNameSection(props) {
  return (
    <>
      <div className={GlobalClasses.expand}>
        <label htmlFor="playername" className={GlobalClasses.label}>
          {data.CREATION_PAGE_SUBTITLE_1}
        </label>
      </div>
      <Component.PlayerNameTextBox input={props.input} />
    </>
  );
}

function PlayerModeSection(props) {
  return (
    <div className={GlobalClasses.mode_container}>
      <div>
        <label className={GlobalClasses.wrapper + " " + GlobalClasses.label}>
          {data.CREATION_PAGE_SUBTITLE_2}
        </label>
      </div>
      <div className={Classes.subsubtitleContainer}>
        <Component.ModeSelectorForm input={props.input} />
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
      <Component.RepresentorForm input={props.input} />
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
        <Component.SubmitButton
          event={validate}
          text={data.CREATION_PAGE_BTNTEXT}
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
