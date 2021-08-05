import React from "react";
import Classes from "../css/pages/creation.module.css";
import GlobalClasses from "../css/global.module.css";
import { IconContext } from "react-icons";
import { FaRegSun, FaRegQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import multi_mode_img from "../assets/img/png/multiplayer.png";
import single_mode_img from "../assets/img/png/singleplayer.png";

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
          <label for="playername" className={GlobalClasses.label}>
            Player Name
          </label>
        </div>
        <input
          id="playername"
          className={GlobalClasses.input_effect}
          type="text"
          placeholder=""
        />
        <div className={GlobalClasses.warning_text}>Please try again!</div>
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

          <div className={Classes.subsubtitleContainer}>
            <span className={Classes.imageAnchor}>
              <img
                className={Classes.defaultImage}
                src={single_mode_img}
                alt="single_player.png"
              />
            </span>
            <span className={Classes.imageAnchor}>
              <img
                className={Classes.defaultImage}
                src={multi_mode_img}
                alt="multi_player.png"
              />
            </span>
          </div>
        </div>
        <div>
          <label className={GlobalClasses.wrapper + " " + GlobalClasses.label}>
            Player Represent
          </label>
          <div>
            <span className={Classes.rep + " " + Classes.rep_1} />
            <span className={Classes.rep + " " + Classes.rep_2} />
            <span className={Classes.rep + " " + Classes.rep_3} />
            <span className={Classes.rep + " " + Classes.rep_4} />
          </div>
        </div>
      </div>

      {
        //============================================================
      }
      <div className={GlobalClasses.buttonContainer}>
        <Link to="/play">
          <button
            className={
              GlobalClasses.btnEffect + " " + GlobalClasses.customButton
            }
          >
            Play
          </button>
        </Link>
        <div className={GlobalClasses.warning_text}>Please try again!</div>
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
