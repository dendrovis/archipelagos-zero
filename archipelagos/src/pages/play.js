import React from "react";
import Classes from "../css/pages/play.module.css";
import { Link } from "react-router-dom";
import GlobalClasses from "../css/global.module.css";
import { IconContext } from "react-icons";
import Gamezone from "../components/layout/gamezone";
import {
  FaRegSun,
  FaRegQuestionCircle,
  FaRegChartBar,
  FaRegTimesCircle,
} from "react-icons/fa";
import dice1 from "../assets/img/png/dice_1.png";
import { playerRollDice } from "../engine/game";

export default function Play() {
  return (
    <div>
      <h1 className={Classes.subtitle + " " + Classes.subtitleContainer}>
        Lost Island
      </h1>
      <div className={Classes.canvas_container}>
        <Gamezone />
      </div>

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
      <div className={Classes.info_container}>
        <div>
          <h3 className={Classes.info_effect}>Instruction</h3>
        </div>
        <div className={Classes.info_desc}>Please roll the dice.</div>
      </div>

      <div className={Classes.playerinfo_container}>
        <div className={Classes.info_effect}>
          <h3>Name:</h3>
          <h3>PlayerName</h3>
        </div>
        <div className={Classes.rep}></div>
      </div>

      <div className={Classes.scoreboard_container}>
        <FaRegChartBar size={"58px"} className={Classes.scoreboard_icon} />
      </div>

      <div onClick={playerRollDice} className={Classes.dice_holder}>
        <img src={dice1} alt="dice_1.png" />
      </div>

      <div className={Classes.result_container}>
        <div>
          <span>
            <h1 className={Classes.subtitle + " " + Classes.subtitleContainer}>
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
    </div>
  );
}
