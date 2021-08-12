/// REACT Package
import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";

/// Styling
import Classes from "../css/pages/play.module.css";
import GlobalClasses from "../css/global.module.css";

import { Link } from "react-router-dom";

import Gamezone from "../components/layout/gamezone";

import {
  FaRegSun,
  FaRegQuestionCircle,
  FaRegChartBar,
  FaRegTimesCircle,
  FaTruckLoading,
} from "react-icons/fa";
import dice1 from "../assets/img/png/dice_1.png";
import { playerRollDice } from "../engine/tempgame";

import {
  getPlayer,
  getPlayerUnitPos,
  getPlayerCellPos,
} from "../external/api/sessionStorage";

/// Asset Package
import * as IMAGE from "../assets/img/index";

/// Storage Control
import * as Storage from "../external/api/sessionStorage";

/// Component Package
import * as Component from "../components/component";

/// Static Package
import * as STATIC from "../static/_export";

/// Logic
import * as Logic from "../engine/_export";

/// DEBUG
import * as DEV from "../config/debug";

function GameOverOverlay() {
  return (
    <div className={Classes.gameover_container}>
      <div>
        <h1
          className={
            Classes.subtitle +
            " " +
            Classes.subtitleContainer +
            " " +
            Classes.gameover_title
          }
        >
          Game Over
        </h1>
      </div>
      <span>
        <div className={GlobalClasses.buttonContainer}>
          <Link to="/play">
            <button
              className={
                GlobalClasses.btnEffect + " " + GlobalClasses.customButton
              }
            >
              Restart
            </button>
          </Link>
        </div>
      </span>
      <div className={GlobalClasses.space}></div>
      <span>
        <div className={GlobalClasses.buttonContainer}>
          <Link to="/">
            <button
              className={
                GlobalClasses.btnEffect + " " + GlobalClasses.customButton
              }
            >
              End
            </button>
          </Link>
        </div>
      </span>
    </div>
  );
}

function GameBoardController() {
  const history = useHistory();
  const [endGame, setEndGame] = useState(false);
  const [player1pos, setPlayer1Pos] = useState([0, 900]);

  //function restart() {}

  async function rollDice() {
    console.log("Roll Dice");

    playerRollDice();
    //render new update

    //setPlayer1Pos((value) => (value = getPlayerUnitPos()));

    setPlayer1Pos(getPlayerUnitPos(1));
    console.log("CURRENT VALUE");
    console.log(getPlayerCellPos(1));
    // check if condition if met
    if (getPlayerCellPos(1) === 99) {
      console.log("Successfully EndGame");
      setEndGame(true);
    }
  }

  //function endController() {}
  if (endGame)
    return (
      <div>
        {/*
        <div className={Classes.canvas_container}>
          <Gamezone />
        </div>
        <div onClick={rollDice} className={Classes.dice_holder}>
          <img src={dice1} alt="dice_1.png" />
        </div>*/}

        {<GameOverOverlay />}
        {/*
        <div className={Classes.info_container}>
          <div>
            <h3 className={Classes.info_effect}>Instruction</h3>
          </div>
          <div className={Classes.info_desc}>Please roll the dice.</div>
        </div>*/}
      </div>
    );
  else {
    return (
      <div>
        <div className={Classes.canvas_container}>
          <Gamezone coord={player1pos} />
        </div>
        <div onClick={rollDice} className={Classes.dice_holder}>
          <img src={dice1} alt="dice_1.png" />
        </div>

        <div className={Classes.info_container}>
          <div>
            <h3 className={Classes.info_effect}>Instruction</h3>
          </div>
          <div className={Classes.info_desc}>Please roll the dice.</div>
        </div>
      </div>
    );
  }
}

function ScoreBoardController() {
  const [toggleShow, setToggle] = useState(false);

  function toggleScoreBoard() {
    /// get Score Info
    ///
    setToggle(!toggleShow);
  }

  if (toggleShow)
    return (
      <div>
        <div
          onClick={toggleScoreBoard}
          className={Classes.scoreboard_container}
        >
          <FaRegChartBar size={"58px"} className={Classes.scoreboard_icon} />
        </div>

        <div className={Classes.result_container}>
          <div>
            <span>
              <h1
                className={Classes.subtitle + " " + Classes.subtitleContainer}
              >
                Scoreboard
              </h1>
            </span>
            {/*<span>
        <button className={Classes.closeButton}>
          <FaRegTimesCircle
            size={"38px"}
            className={Classes.float_icon_1}
          />
        </button>
      </span>*/}
          </div>
          <div className={Classes.table_outercontainer}>
            <table className={Classes.table_container}>
              <tbody>
                <tr>
                  <th>Rank</th>
                  <th>Turn</th>
                  <th># of Player</th>
                  <th>Completed Date</th>
                </tr>
                <tr>
                  <td>1</td>
                  <td>32</td>
                  <td>1</td>
                  <td>2021-08-06</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>47</td>
                  <td>1</td>
                  <td>2021-08-06</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>29</td>
                  <td>1</td>
                  <td>2021-08-05</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <div onClick={toggleScoreBoard} className={Classes.scoreboard_container}>
        <FaRegChartBar size={"58px"} className={Classes.scoreboard_icon} />
      </div>
    </div>
  );
}

export default function Play(props) {
  const curGameData = Logic.game.iniGameData;
  const [playername, setPlayerName] = useState("Nameless");
  const [playerrep, setPlayeRep] = useState("No Rep");
  const [initialVal, setInitialValue] = useState(null);
  const [isLoaded, setLoad] = useState(0);
  //const { state } = props.location;
  const { state } = useLocation();
  const history = useHistory();
  console.log(state);

  //state.playerName

  useEffect(() => {
    setTimeout(() => {
      if (state === undefined) {
        if (DEV.DEBUG) console.log("No Player Info");
        setLoad(-1);
        setTimeout(() => {
          history.push({ pathname: "/" });
        }, 1000);
      } else {
        curGameData.player1Name = state.playerName;
        curGameData.playerCount = state.playerMode + 1;
        curGameData.player1Rep = state.playerRep;
        setLoad(1);
        console.log(curGameData);
      }
    }, 2000);
    return null; //clean up
  }, []);

  switch (isLoaded) {
    case 0:
      return <Component.Form.Loading />;
    case 1:
      return <Content data={curGameData} />;
    default:
      return <Component.Form.Error msg="Access Denied" />;
  }
}

function Content(props) {
  return (
    <div>
      <div>
        <h1 className={Classes.subtitle + " " + Classes.subtitleContainer}>
          {STATIC.DATA.PLAY_PAGE_TITLE}
        </h1>
      </div>
      <div>
        <BoardFrame />
      </div>
      <Dice data={props.data} />

      {
        //<GameBoardController />
      }
      <>
        <OverlaySection />
      </>
      {/* <ScoreBoardController />
<div className={Classes.playerinfo_container}>
<div className={Classes.info_effect}>
  <h3>Name:</h3>
  <h3>{playername}</h3>
</div>
<div className={Classes.rep}></div>
</div>*/}
    </div>
  );
}

function BoardFrame() {
  return (
    <>
      <div className={Classes.canvas_container}>
        <Component.Layout.Gamezone />
      </div>
    </>
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

function Dice(props) {
  const { data, meta, ini } = Logic.game.getDiceData;
  const [index, setIndex] = useState(ini);
  const [rolling, setRollStatus] = useState(false);

  /*useEffect(() => {
    if (rolling) {
      let count = 1;
    }

    return () => {};
  }, [rolling]);*/

  function rollDice() {
    const time = 100;
    const timeout = 3000;

    if (DEV.DEBUG) console.log("[Click] Dice");

    setRollStatus(true);
    const rollingDice = setInterval(function (time) {
      if (DEV.DEBUG) console.log("Rolling...");
      setIndex(Logic.game.randomDiceValue());
    }, time);

    setTimeout(() => {
      if (DEV.DEBUG) console.log("Roll End");
      clearInterval(rollingDice);
      setRollStatus(false);
      props.data.dice1 = index + 1;
      props.data.turns++;
      if (DEV.DEBUG) console.log(props.data);
    }, timeout);
  }

  function pending() {
    if (DEV.DEBUG) console.log("Pending");
  }

  return (
    <div onClick={rolling ? pending : rollDice} className={Classes.dice_holder}>
      <img src={data[index]} alt={meta[index]} />
    </div>
  );
}
