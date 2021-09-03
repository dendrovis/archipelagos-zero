/** React Packages */
import React, { useState, useContext, createContext } from "react";

/** Styling */
import Classes from "./Dice.module.css";

/** Logic */
import * as Logic from "../engine/_export";

/** Debug */
import * as DEV from "../config/debug";

export const RollingContext = createContext(null);

/// Control dice roll function
export function RollingController({ children }) {
  const [rollStatus, setRollState] = useState(false);
  console.log(`Running Roll Controller \n RollStatus: ${rollStatus}`);

  return (
    <RollingContext.Provider value={[rollStatus, setRollState]}>
      {children}
    </RollingContext.Provider>
  );
}

export default function Dice(props) {
  const dice = { rolVal: -1 };
  const { data, meta, ini } = Logic.game.getDiceData;
  const [index, setIndex] = useState(ini);
  //const [rolling, setRollStatus] = useState(false);

  /// Context State
  const [rollStatus, setRollState] = useContext(RollingContext);
  console.log(`Running Dice Controller\nRollStatus: ${rollStatus}`);

  const rollDice = React.useCallback(() => {
    if (rollStatus) {
      console.log("Blocked", rollStatus);
      return null;
    }

    const time = 100;
    const timeout = 1000;

    if (DEV.DEBUG) console.log("[Click] Dice");
    setRollState(true);
    //setRollStatus(true);
    //props.setRollStatus(true);
    const rollingDice = setInterval(function (time) {
      if (DEV.DEBUG) console.log("Rolling...");
      const val = Logic.game.randomDiceValue();
      setIndex((curVal) => val);
      dice.rolVal = val + 1; //index
    }, time);

    /// Block for the time being
    setTimeout(() => {
      if (DEV.DEBUG) console.log("Roll End");
      clearInterval(rollingDice);
      //setRollStatus(false);
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
      console.log("Rolled Dice");
      if (DEV.DEBUG) console.log(`[Rolled] Obj Value ${dice.rolVal + 1}`);
      if (DEV.DEBUG) console.log(props.data);
    }, timeout);
  }, [rollStatus]);

  function pending() {
    console.log("Pending");
  }

  return (
    <button onClick={rollDice} className={Classes.dice_holder} disabled="true">
      <div

      //onClick={rollStatus || rolling ? pending : rollDice}
      >
        <img className={Classes.diceSize} src={data[index]} alt={meta[index]} />
      </div>
    </button>
  );
}
