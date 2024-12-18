/** React Packages */
import { useState } from "react";

/** Styling */
import Classes from "./ModeSelectorForm.module.css";

/** Asset Packages */
import * as IMAGE from "../assets/img/index";

/** Debug */
import * as DEV from "../config/debug";

/**
 * Allow multiple choice to select a representation
 * @param {*} props
 * @returns {JSX.Element}
 */
export default function ModeSelectorForm(props) {
  const [selectSingle, setSingleToggle] = useState(false);
  const [selectMulti, setMultiToggle] = useState(false);

  function selectedMode(e) {
    if (e.target.id === "single") {
      if (DEV.DEBUG) console.log("[Click] Single");
      if (selectSingle) {
        props.input.playerMode = -1;
        setSingleToggle(false);
      } else {
        props.input.playerMode = 0;
        setMultiToggle(false);
        setSingleToggle(true);
      }
    } else if (e.target.id === "multi") {
      if (DEV.DEBUG) console.log("[Click] Multi");
      if (selectMulti) {
        props.input.playerMode = -1;
        setMultiToggle(false);
      } else {
        props.input.playerMode = 1;
        setSingleToggle(false);
        setMultiToggle(true);
      }
    }
    if (DEV.DEBUG) console.log(props.input);
  }
  return (
    <>
      <span className={Classes.imageAnchor}>
        <img
          id="single"
          onClick={selectedMode}
          className={Classes.defaultImageSingle}
          src={IMAGE.SINGLEPLAYER}
          alt={IMAGE.ALT_SINGLEPLAYER}
          style={{
            "--filterSingleValue": selectSingle
              ? "grayscale(0%)"
              : "grayscale(100%)",
          }}
        />
      </span>
      <span className={Classes.imageAnchor}>
        <img
          id="multi"
          onClick={selectedMode}
          className={Classes.defaultImageMulti}
          src={IMAGE.MULTIPLAYER}
          alt={IMAGE.ALT_MULTIPLAYER}
          style={{
            "--filterMultiValue": selectMulti
              ? "grayscale(0%)"
              : "grayscale(100%)",
          }}
        />
      </span>
    </>
  );
}
