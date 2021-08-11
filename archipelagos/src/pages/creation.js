/// REACT Package
import React, { useState, useEffect, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

/// Styling
import Classes from "../css/pages/creation.module.css";
import GlobalClasses from "../css/global.module.css";

import { IconContext } from "react-icons";
import { FaRegSun, FaRegQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import multi_mode_img from "../assets/img/png/multiplayer.png";
import single_mode_img from "../assets/img/png/singleplayer.png";
import { createPlayer, start } from "../engine/game";

import {
  setPlayer,
  setPlayerName,
  setPlayerRep,
  setMode,
  getMode,
  getPlayer,
} from "../external/api/sessionStorage";

/// Asset Package
import * as IMAGE from "../assets/img/index";

/// Storage Control
import * as Storage from "../external/api/sessionStorage";

/// Component Package
import * as Component from "../components/component";

/// Static Package
import * as STATIC from "../static/_export";

/// DEBUG
import * as DEV from "../config/debug";

function bundleCreateFn() {
  createPlayer();
  start(false);
}

function checkNull(player, mode) {
  console.log(`${player.rep}  || ${mode}`);
  if (player.name === "") return false;
  console.log("Pass");
  if (player.rep === "") return false;
  console.log("Pass");
  if (mode === -1) return false;
  console.log("Pass");
  return true;
}

function SelectPlayerRep() {
  function selectedRep(e) {
    setPlayerRep(e.target.id);
  }

  return (
    <div>
      <label className={GlobalClasses.wrapper + " " + GlobalClasses.label}>
        Player Represent
      </label>
      <div>
        <span
          id="0"
          onClick={selectedRep}
          className={Classes.rep + " " + Classes.rep_1}
        />
        <span
          id="1"
          onClick={selectedRep}
          className={Classes.rep + " " + Classes.rep_2}
        />
        <span
          id="2"
          onClick={selectedRep}
          className={Classes.rep + " " + Classes.rep_3}
        />
        <span
          id="3"
          onClick={selectedRep}
          className={Classes.rep + " " + Classes.rep_4}
        />
      </div>
    </div>
  );
}

let iniField = {
  playerName: "",
  playerMode: -1,
  playerRep: -1,
};

//const PlayerNameContext = React.createContext();
//export { PlayerNameContext };

export default function Creation() {
  //const inputField = useContext(2);
  //const inputField = useRef(inputIni);
  //let inputField;
  //const [inputField, setInputUpdate] = useState(inputIni);
  const inputField = iniField; // Singleton Object

  /*useEffect(() => {
    if (update === 0) {
      if (DEV.DEBUG) console.log("Initialize");
      inputField = inputIni;
    }
    if (DEV.DEBUG) console.log(inputField);
  }, [update]);*/
  if (DEV.DEBUG) console.log("Initialize");
  if (DEV.DEBUG) console.log(inputField);

  return (
    <>
      <>
        <TitleSection />
        <div className={GlobalClasses.input_container}>
          <PlayerNameSection input={inputField} />

          <PlayerModeSection input={inputField} />

          <PlayerRepresentorSection />
        </div>
        <ActionSection />
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
      {/*<div className={Classes.subsubtitleContainer}>
        <span className={Classes.tooltip}>{STATIC.DATA.CREA}</span>
        <span className={Classes.tooltip}>Multi Player</span>
      </div>*/}
      <div className={Classes.subsubtitleContainer}>
        <Component.Form.ModeSelector input={props.input} />
      </div>
    </div>
  );
}

function PlayerRepresentorSection() {
  return <div></div>;
}

function ActionSection() {
  const history = useHistory();
  const [validPlayer, setValid] = useState("hidden");

  function validate() {
    const checkPlayer = getPlayer(1);
    const checkMode = getMode();

    if (
      checkNull(checkPlayer, checkMode) &&
      //checkValidPlayerName(checkPlayer.name) === "Valid Name" &&
      checkMode === 0
    ) {
      console.log("Success");
      bundleCreateFn();
      history.push("/play");
    }
    if (checkMode !== 0) {
      setValid("Multiplayer Not Supported Yet");
    } else {
      setValid("Please try again!");
    }
  }

  if (validPlayer !== "hidden")
    return (
      <div className={GlobalClasses.buttonContainer}>
        <button
          onClick={validate}
          className={GlobalClasses.btnEffect + " " + GlobalClasses.customButton}
        >
          Play
        </button>

        <div className={GlobalClasses.warning_text}>{validPlayer}</div>
        <SelectPlayerRep />
      </div>
    );

  return (
    <div className={GlobalClasses.buttonContainer}>
      <button
        onClick={validate}
        className={GlobalClasses.btnEffect + " " + GlobalClasses.customButton}
      >
        Play
      </button>

      <div className={GlobalClasses.hiddenbox}>{validPlayer}</div>
      <SelectPlayerRep />
    </div>
  );
}
