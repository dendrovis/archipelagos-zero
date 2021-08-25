/* eslint-disable react-hooks/exhaustive-deps */
/// REACT Package
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

/// Styling
import Classes from "../css/pages/play.module.css";
import GlobalClasses from "../css/global.module.css";

import { FaRegChartBar } from "react-icons/fa";

/// Component Package
import * as Component from "../components/component";

/// Static Package
import * as STATIC from "../static/_export";

/// Logic
import * as Logic from "../engine/_export";

/// DEBUG
import * as DEV from "../config/debug";

export default function Play(props) {
  const curGameData = Logic.game.iniGameData;
  const [isLoaded, setLoad] = useState(0); //control loading in state
  const [isEndGame, setEndGame] = useState(false); //control game end state
  const [isDiceRolled, setRoll] = useState(0);
  const [isReverted, setRevert] = useState(false);
  //const [rolling, setRollStatus] = useState(false);
  const prevData = useLocation().state;
  if (DEV.DEBUG) console.log(`Creation Object: ${JSON.stringify(prevData)}`);
  if (DEV.DEBUG) console.log(prevData);
  const { state } = useLocation();
  const history = useHistory();
  if (DEV.DEBUG) console.log(state);

  useEffect(() => {
    if (isDiceRolled > 0) {
      if (DEV.DEBUG) console.log("Dice Rolled");
    }
    return () => {};
  }, [isDiceRolled]);

  useEffect(() => {
    if (isEndGame) {
      if (DEV.DEBUG) console.log("GAME OVER");
    }
    return () => {};
  }, [isEndGame]);

  useEffect(() => {
    setTimeout(() => {
      if (state === undefined) {
        if (DEV.DEBUG) console.log("No Player Info");
        setLoad(-1);
        setTimeout(() => {
          history.push({ pathname: "/" });
        }, 250);
      } else {
        curGameData.player1Name = state.playerName;
        curGameData.playerCount = state.playerMode + 1;
        curGameData.player1Rep = state.playerRep;
        setLoad(1);
      }
    }, 500);
    return null; //clean up
  }, []);

  switch (isLoaded) {
    case 0:
      return <Component.Form.Loading />;
    case 1:
      return (
        <Content
          setRevert={setRevert}
          data={curGameData}
          endState={isEndGame}
          setEndState={setEndGame}
          setDiceRoll={setRoll}
          //setRollStatus={setRollStatus}
          //rolling={rolling}
          diceToggle={isDiceRolled}
          rollState={isDiceRolled}
          isReverted={isReverted}
        />
      );
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
        <BoardFrame
          data={props.data}
          rollState={props.rollState}
          isReverted={props.isReverted}
          setRevert={props.setRevert}
          setDiceRoll={props.setRoll}
          //setRollStatus={props.setRollStatus}
        />
      </div>
      <Dice
        data={props.data}
        endState={props.setEndState}
        setDiceRoll={props.setDiceRoll}
        //setRollStatus={props.setRollStatus}
        diceToggle={props.diceToggle}
        setRevert={props.setRevert}
        //rolling={props.rolling}
      />
      <>
        <OverlaySection />
        <ScoreBoardController />
        {props.endState ? <GameOverOverlay /> : <></>}
      </>
    </div>
  );
}

function BoardFrame(props) {
  return (
    <>
      <div className={Classes.canvas_container}>
        <Component.Layout.GameZone
          data={props.data}
          state={{
            rollState: props.rollState,
            isReverted: props.isReverted,
            setRevert: props.setRevert,
            setRollStatus: props.setRollStatus,
          }}
        />
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
      <div className={GlobalClasses.version}>{DEV.VERSION}</div>
    </>
  );
}

function Dice(props) {
  const dice = { rolVal: -1 };
  const { data, meta, ini } = Logic.game.getDiceData;
  const [index, setIndex] = useState(ini);
  const [rolling, setRollStatus] = useState(false);

  function rollDice() {
    const time = 100;
    const timeout = 500;

    if (DEV.DEBUG) console.log("[Click] Dice");

    setRollStatus(true);
    //props.setRollStatus(true);
    const rollingDice = setInterval(function (time) {
      if (DEV.DEBUG) console.log("Rolling...");
      const val = Logic.game.randomDiceValue();
      setIndex((curVal) => val);
      dice.rolVal = val + 1; //index
    }, time);

    setTimeout(() => {
      if (DEV.DEBUG) console.log("Roll End");
      clearInterval(rollingDice);
      setRollStatus(false);
      props.data.dice1 = dice.rolVal;
      props.data.turns++;
      props.data.cell1Pos = props.data.cell1Pos + dice.rolVal;
      props.data.unit1Pos = Logic.game.convertSingleCelltoBoardPos(
        props.data.cell1Pos
      );
      /// Handling End State and Beyond End Value
      if (props.data.cell1Pos === 100) {
        props.endState((val) => !val);
      } else if (props.data.cell1Pos > 100) {
        props.data.cell1Pos = 100 - (props.data.cell1Pos - 100);
        props.setRevert((val) => true);
        if (DEV.DEBUG)
          console.log(`[Cell > 100] Revert ${props.data.cell1Pos}`);
      }
      props.setDiceRoll((val) => val + 1);
      if (DEV.DEBUG) console.log(`[Rolled] Obj Value ${dice.rolVal + 1}`);
      if (DEV.DEBUG) console.log(props.data);
    }, timeout);
  }

  function pending() {
    console.log("Pending");
  }

  return (
    <div onClick={rolling ? pending : rollDice} className={Classes.dice_holder}>
      <img className={Classes.diceSize} src={data[index]} alt={meta[index]} />
    </div>
  );
}

function GameOverOverlay() {
  const history = useHistory();

  function restartGame() {
    //history.goBack();
    history.go(0);
    //history.push("/play");
  }

  function endGame() {
    history.push("/");
  }

  return (
    <div className={Classes.gameover_bg}>
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
            {STATIC.DATA.GLOBAL_GAMEOVER_TITLE}
          </h1>
        </div>
        <span>
          <div className={GlobalClasses.buttonContainer}>
            <Component.Button.Text
              event={restartGame}
              text={STATIC.DATA.GLOBAL_GAMEOVER_BTNTEXT_1}
            />
          </div>
        </span>
        <div className={GlobalClasses.space}></div>
        <span>
          <div className={GlobalClasses.buttonContainer}>
            <Component.Button.Text
              event={endGame}
              text={STATIC.DATA.GLOBAL_GAMEOVER_BTNTEXT_2}
            />
          </div>
        </span>
      </div>
    </div>
  );
}

function ScoreBoardController() {
  const [toggleShow, setToggle] = useState(false);

  function toggleScoreBoard() {
    /// get Score Info
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
          </div>
          <div className={Classes.table_outercontainer}>
            <table className={Classes.table_container}>
              <tbody className={Classes.table_innercontainer}>
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
                  <td>2021-08-13</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>47</td>
                  <td>1</td>
                  <td>2021-08-12</td>
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
