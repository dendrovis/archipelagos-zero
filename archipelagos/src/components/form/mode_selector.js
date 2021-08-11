import React, { useRef } from "react";
import Classes from "../../css/form/mode_selector.module.css";

/// Asset Package
import * as IMAGE from "../../assets/img/index";

/// DEBUG
import * as DEV from "../../config/debug";

export default function ModeSelector() {
  const selectedElement = useRef(null);
  function selectedMode(e) {
    //document.querySelector(`.${e.target.className}`).style.filter =
    //"grayscale(0)";
    if (e.target.id === "single") {
      //setMode(0);
      if (DEV.DEBUG) console.log("Single");
    }
    if (e.target.id === "multi") {
      //setMode(1);
      if (DEV.DEBUG) console.log("Multi");
    }
    console.log(selectedElement.current);
    /*console.log("asdasd");
    console.log(e.target.id);
    console.log(document.querySelector(`#${e.target.id}`));
    document.querySelector(`#${e.target.id}`);*/

    /*console.log(
      document.querySelector(`.${e.target.classList}`).style.filter = grayscale(0%);
    );*/

    console.log(e.target.className);
  }
  return (
    <>
      <span className={Classes.imageAnchor}>
        <img
          ref={selectedElement}
          id="single"
          onClick={selectedMode}
          className={Classes.defaultImage + " " + Classes.selectedSingle}
          src={IMAGE.SINGLEPLAYER}
          alt={IMAGE.ALT_SINGLEPLAYER}
        />
      </span>
      <span className={Classes.imageAnchor}>
        <img
          ref={selectedElement}
          id="multi"
          onClick={selectedMode}
          className={Classes.defaultImage + " " + Classes.selectedMulti}
          src={IMAGE.MULTIPLAYER}
          alt={IMAGE.ALT_MULTIPLAYER}
        />
      </span>
    </>
  );
}
