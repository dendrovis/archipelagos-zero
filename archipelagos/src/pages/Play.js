/* eslint-disable react-hooks/exhaustive-deps */
/** React Packages */
import React, { useState, useEffect, createContext } from "react";
import { useHistory, useLocation } from "react-router-dom";

/** Styling */
import Classes from "./Play.module.css";
import GlobalClasses from "../common/global.module.css";
import { FaRegChartBar } from "react-icons/fa";

/** Component Packages */
import * as Component from "../components/index";

/** Common Packages */
import * as data from "../common/data";

/** Logic */
import * as Logic from "../engine/_export";

/** Debug */
import * as DEV from "../config/debug";

/** Provider */
import * as Provider from "../components/Dice";

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
      return <Component.LoadingForm />;
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
      return <Component.ErrorForm msg="Access Denied" />;
  }
}

function Content(props) {
  return (
    <div>
      <div>
        <h1 className={Classes.subtitle + " " + Classes.subtitleContainer}>
          {data.PLAY_PAGE_TITLE}
        </h1>
      </div>
      <Provider.RollingController>
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
        <Component.Dice
          data={props.data}
          endState={props.setEndState}
          setDiceRoll={props.setDiceRoll}
          //setRollStatus={props.setRollStatus}
          diceToggle={props.diceToggle}
          setRevert={props.setRevert}
          //rolling={props.rolling}
        />
      </Provider.RollingController>
      <>
        <Component.Overlay />
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
        <Component.GameZone
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
            {data.GLOBAL_GAMEOVER_TITLE}
          </h1>
        </div>
        <span>
          <Component.SubmitButton
            event={restartGame}
            text={data.GLOBAL_GAMEOVER_BTNTEXT_1}
          />
        </span>
        <div className={GlobalClasses.space}></div>
        <span>
          <Component.SubmitButton
            event={endGame}
            text={data.GLOBAL_GAMEOVER_BTNTEXT_2}
          />
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
