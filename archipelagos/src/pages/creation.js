import React, { useState } from "react";
import Classes from "../css/pages/creation.module.css";
import GlobalClasses from "../css/global.module.css";
import { IconContext } from "react-icons";
import { FaRegSun, FaRegQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import multi_mode_img from "../assets/img/png/multiplayer.png";
import single_mode_img from "../assets/img/png/singleplayer.png";
import { createPlayer, start } from "../engine/game";
import { useHistory } from "react-router-dom";
import {
  setPlayer,
  setPlayerName,
  setPlayerRep,
  setMode,
  getMode,
  getPlayer,
} from "../external/api/sessionStorage";

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

function SubmitButton() {
  const history = useHistory();
  const [validPlayer, setValid] = useState("hidden");

  function validate() {
    const checkPlayer = getPlayer(1);
    const checkMode = getMode();

    if (
      checkNull(checkPlayer, checkMode) &&
      checkValidPlayerName(checkPlayer.name) === "Valid Name" &&
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
    </div>
  );
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

function checkValidPlayerName(data) {
  /// check for empty data
  if (data.length === 0) return "hidden";
  /// a digit exist , 17 words exist , space exist, non-alpha-digit exist
  if (/\d|^\w{17}|\s|[^\w]/.test(data) === true) return "Please try again!";
  return "Valid Name";
}

function SelectPlayerMode() {
  function selectedMode(e) {
    //document.querySelector(`.${e.target.className}`).style.filter =
    //"grayscale(0)";
    if (e.target.alt === "single_player.png") {
      setMode(0);
    }
    if (e.target.alt === "multi_player.png") {
      setMode(1);
    }

    /*console.log(
      document.querySelector(`.${e.target.classList}`).style.filter = grayscale(0%);
    );*/

    console.log(e.target.className);
  }

  return (
    <div className={Classes.subsubtitleContainer}>
      <span className={Classes.imageAnchor}>
        <img
          id="single"
          onClick={selectedMode}
          className={Classes.defaultImage}
          src={single_mode_img}
          alt="single_player.png"
        />
      </span>
      <span className={Classes.imageAnchor}>
        <img
          id="multi"
          onClick={selectedMode}
          className={Classes.defaultImage}
          src={multi_mode_img}
          alt="multi_player.png"
        />
      </span>
    </div>
  );
}

function TextBox() {
  const [playerName, setName] = useState("hidden");
  function textHandler(e) {
    /// check for validation
    const validStatus = checkValidPlayerName(e.target.value);
    /// save into session if valid
    validStatus === "Valid Name"
      ? setPlayerName(e.target.value)
      : setPlayerName("");

    setName(validStatus);
  }

  if (playerName !== "hidden")
    return (
      <div>
        <input
          onChange={textHandler}
          id="playername"
          className={GlobalClasses.input_effect}
          type="text"
          placeholder=""
        />
        <div className={GlobalClasses.warning_text}>{playerName}</div>
      </div>
    );

  return (
    <div>
      <input
        onChange={textHandler}
        id="playername"
        className={GlobalClasses.input_effect}
        type="text"
        placeholder=""
      />

      <div className={GlobalClasses.hiddenbox}>hidden</div>
    </div>
  );
}

export default function Creation() {
  return (
    <div>
      <div>
        <h1 className={Classes.subtitle + " " + Classes.subtitleContainer}>
          Creation
        </h1>
      </div>
      {
        //====================Content=================================
      }
      <div className={GlobalClasses.input_container}>
        <div className={GlobalClasses.expand}>
          <label htmlFor="playername" className={GlobalClasses.label}>
            Player Name
          </label>
        </div>
        <TextBox />
        <div className={GlobalClasses.mode_container}>
          <div>
            <label
              className={GlobalClasses.wrapper + " " + GlobalClasses.label}
            >
              Player Mode
            </label>
          </div>
          <div className={Classes.subsubtitleContainer}>
            <span className={Classes.tooltip}>Single Player</span>
            <span className={Classes.tooltip}>Multi Player</span>
          </div>
          <SelectPlayerMode />
        </div>
        <SelectPlayerRep />
      </div>

      {
        //============================================================
      }
      <SubmitButton />

      <div
        className={
          GlobalClasses.wrapper + " " + GlobalClasses.float_icon_1_container
        }
      >
        <div className={GlobalClasses.icon + " " + GlobalClasses.help}>
          <div className={GlobalClasses.tooltip}>help</div>
          <span>
            {
              //<IconContext.Provider value={{ color: "grey" }}>
            }
            <div>
              <FaRegQuestionCircle
                size={"38px"}
                className={Classes.float_icon_1}
              />
            </div>
            {
              //</IconContext.Provider>
            }
          </span>
        </div>
      </div>
      <div
        className={
          GlobalClasses.wrapper + " " + GlobalClasses.float_icon_2_container
        }
      >
        <div className={GlobalClasses.icon + " " + GlobalClasses.help}>
          <div className={GlobalClasses.tooltip}>settings</div>
          <span>
            {
              //<IconContext.Provider value={{ color: "grey" }}>
            }
            <div>
              <FaRegSun size={"35px"} />
            </div>
            {
              //</IconContext.Provider>
            }
          </span>
        </div>
      </div>
    </div>
  );
}
