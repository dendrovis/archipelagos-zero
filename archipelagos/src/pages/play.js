import React, { useState, useEffect, useRef } from "react";
import Classes from "../css/pages/play.module.css";
import { Link } from "react-router-dom";
import GlobalClasses from "../css/global.module.css";
import { IconContext } from "react-icons";
import Gamezone from "../components/layout/gamezone";
import { useHistory } from "react-router-dom";
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

export default function Play() {
  const [playername, setPlayerName] = useState("Nameless");
  const [playerrep, setPlayeRep] = useState("No Rep");

  useEffect(() => {
    const playerInfo = { player: getPlayer() };
    console.log(playerInfo());
    //setPlayerName((name) => (name = playerInfo.name));

    return () => {
      //setPlayeRep(playerInfo.rep);
    };
  }, []);

  return (
    <div>
      <h1 className={Classes.subtitle + " " + Classes.subtitleContainer}>
        Lost Island
      </h1>

      <GameBoardController />
      <div
        className={
          GlobalClasses.wrapper +
          " " +
          GlobalClasses.float_icon_1_container +
          " " +
          Classes.sticky_float
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
          GlobalClasses.wrapper +
          " " +
          GlobalClasses.float_icon_2_container +
          " " +
          Classes.sticky_float
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

      <ScoreBoardController />
      <div className={Classes.playerinfo_container}>
        <div className={Classes.info_effect}>
          <h3>Name:</h3>
          <h3>{playername}</h3>
        </div>
        <div className={Classes.rep}></div>
      </div>
    </div>
  );
}
