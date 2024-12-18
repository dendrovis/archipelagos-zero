/** React Packages */
import { useState } from "react";

/** Styling */
import Classes from "./PlayerNameTextBox.module.css";

/** Provider */
import * as logic from "../engine/_export";

/** Debug */
import * as DEV from "../config/debug";

export default function PlayerNameTextBox(props) {
  //const contextValue = useContext(PlayerNameContext);
  const [playerName, setName] = useState("hidden");
  const input = (
    <input
      onChange={textHandler}
      id="playername"
      className={Classes.input_effect}
      type="text"
      placeholder=""
    />
  );

  function textHandler(e) {
    /// Check for validation
    const validStatus = logic.validation.checkValidPlayerName(e.target.value);

    /// Save into Object if valid or else reset default
    setName(validStatus);
    if (validStatus === "Valid Name") {
      props.input.playerName = e.target.value;
    } else {
      props.input.playerName = "";
    }

    if (DEV.DEBUG) console.log(props.input);
  }

  return (
    <div>
      {input}
      {playerName !== "hidden" ? (
        <div className={Classes.warning_text}>{playerName}</div>
      ) : (
        <div className={Classes.hiddenbox}>hidden</div>
      )}
    </div>
  );
}
