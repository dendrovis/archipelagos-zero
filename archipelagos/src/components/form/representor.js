import React, { useState } from "react";
import Classes from "../../css/form/representor.module.css";
/// DEBUG
import * as DEV from "../../config/debug";

export default function Representor(props) {
  const [selectRep1, setRep1] = useState(false);
  const [selectRep2, setRep2] = useState(false);
  const [selectRep3, setRep3] = useState(false);
  const [selectRep4, setRep4] = useState(false);
  function selectedRep(e) {
    console.log(e.target.id);
    switch (Number(e.target.id)) {
      case 0:
        if (selectRep1) {
          props.input.playerRep = -1;
          setRep1(!selectRep1);
        } else {
          props.input.playerRep = 0;
          setRep1(!selectRep1);
          setRep2(selectRep1);
          setRep3(selectRep1);
          setRep4(selectRep1);
        }
        break;
      case 1:
        if (selectRep2) {
          props.input.playerRep = -1;
          setRep2(!selectRep2);
        } else {
          props.input.playerRep = 1;
          setRep1(selectRep2);
          setRep2(!selectRep2);
          setRep3(selectRep2);
          setRep4(selectRep2);
        }
        break;
      case 2:
        if (selectRep3) {
          props.input.playerRep = -1;
          setRep3(!selectRep3);
        } else {
          props.input.playerRep = 2;
          setRep1(selectRep3);
          setRep2(selectRep3);
          setRep3(!selectRep3);
          setRep4(selectRep3);
        }
        break;
      case 3:
        if (selectRep4) {
          setRep4(!selectRep4);
        } else {
          props.input.playerRep = 3;
          setRep1(selectRep4);
          setRep2(selectRep4);
          setRep3(selectRep4);
          setRep4(!selectRep4);
        }
        break;

      default:
        if (DEV.DEBUG) console.log("[ERROR] SELECT REP");
        break;
    }

    if (DEV.DEBUG) console.log(props.input);
  }
  return (
    <div>
      <span
        id="0"
        onClick={selectedRep}
        className={Classes.rep + " " + Classes.rep_1}
        style={{ "--selectedRep1": selectRep1 ? "solid" : "none" }}
      />
      <span
        id="1"
        onClick={selectedRep}
        className={Classes.rep + " " + Classes.rep_2}
        style={{ "--selectedRep2": selectRep2 ? "solid" : "none" }}
      />
      <span
        id="2"
        onClick={selectedRep}
        className={Classes.rep + " " + Classes.rep_3}
        style={{ "--selectedRep3": selectRep3 ? "solid" : "none" }}
      />
      <span
        id="3"
        onClick={selectedRep}
        className={Classes.rep + " " + Classes.rep_4}
        style={{ "--selectedRep4": selectRep4 ? "solid" : "none" }}
      />
    </div>
  );
}
