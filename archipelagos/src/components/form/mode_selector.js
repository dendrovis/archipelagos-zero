import React, { useState } from "react";
import Classes from "../../css/form/mode_selector.module.css";

/// Asset Package
import * as IMAGE from "../../assets/img/index";

/// DEBUG
import * as DEV from "../../config/debug";

export default function ModeSelector(props) {
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
