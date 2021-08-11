import React from "react";
import Classes from "../../css/form/error.module.css";

/// Asset Package
import * as IMAGE from "../../assets/img/index";

export default function Error(props) {
  return (
    <div>
      <div className={Classes.containerAlign}>
        <img
          src={IMAGE.ERROR}
          alt={IMAGE.ALT_ERROR}
          className={Classes.errorImg}
        />
      </div>
      <div className={Classes.containerAlign}>
        <h2>{props.msg}</h2>
      </div>
    </div>
  );
}
