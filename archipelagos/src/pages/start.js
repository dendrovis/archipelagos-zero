import React from "react";
import { Link } from "react-router-dom";
import image from "../assets/img/png/logo.png";
import Classes from "../css/pages/start.module.css";
import GlobalClasses from "../css/global.module.css";
import { IconContext } from "react-icons";
import { FaRegSun, FaRegQuestionCircle } from "react-icons/fa";
import { iniPlayer } from "../external/api/sessionStorage";
import { clearAll } from "../external/api/sessionStorage";
export default function Start() {
  function start() {
    clearAll();
    iniPlayer(false);
  }

  return (
    <div>
      <div>
        <div className={Classes.logoContainer}>
          <img className={Classes.logo} src={image} alt="archipelogos.png" />
        </div>
        <h1 className={Classes.title + " " + Classes.titleContainer}>
          Archipelagos
        </h1>
        <h2 className={Classes.subtitle + " " + Classes.subtitleContainer}>
          Snake {"&"} Ladder Game
        </h2>
        <div className={GlobalClasses.space}></div>
        <div className={GlobalClasses.buttonContainer}>
          <Link to="/creation">
            <button
              onClick={start}
              className={
                GlobalClasses.btnEffect + " " + GlobalClasses.customButton
              }
            >
              Start Game
            </button>
          </Link>
        </div>
      </div>
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
