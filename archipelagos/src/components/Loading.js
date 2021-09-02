import React from "react";
import Classes from "../../css/form/loading.module.css";

/// Asset Package
import * as IMAGE from "../../assets/img/index";

export default function Loading() {
  return (
    <div>
      <div className={Classes.containerAlign}>
        <img
          src={IMAGE.LOADING}
          alt={IMAGE.ALT_LOADING}
          className={Classes.loadingGif}
        />
      </div>
    </div>
  );
}
