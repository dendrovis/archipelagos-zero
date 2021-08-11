import React from "react";
import Classes from "../../css/button/text.module.css";

export default function Text(props) {
  return (
    <button
      onClick={props.event}
      className={Classes.btnEffect + " " + Classes.customButton}
    >
      {props.text}
    </button>
  );
}
