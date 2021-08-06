import React from "react";
import Classes from "../../css/layout/gamezone.module.css";
import { useState, useRef, useEffect } from "react";
import { FaDrawPolygon } from "react-icons/fa";
import { clearCanvas } from "../../engine/temp";
//import { getTurn } from "../external/api/sessionStorage";

export default function Gamezone(props) {
  const [triggerOnce, setOnce] = useState(false);
  //const [updateTurn, setTurn] = useState(0);

  const contextVal = ".gamezone_canvas__3Spmj";

  function renderCircle() {
    console.log(`Rendered: ${props.coord}`);
    const offset = 20;
    const move_x = props.coord[0]; //200; //100 per move
    const move_y = props.coord[1]; //900;
    console.log(`${props.coord}`);
    var c = document.querySelector(contextVal);
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(10 + offset + move_x, 10 + offset + move_y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "darkblue";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(55 + offset + move_x, 10 + offset + move_y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "darkblue";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(10 + offset + move_x, 55 + offset + move_y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "darkblue";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(55 + offset + move_x, 55 + offset + move_y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "darkblue";
    ctx.fill();
  }

  function clearCanvas() {
    const context = document.querySelector(contextVal).getContext("2d");
    context.clearRect(
      0,
      0,
      document.querySelector(contextVal).width,
      document.querySelector(contextVal).height
    );
  }

  /// Fire after render
  /*useEffect(() => {
    if (!triggerOnce) {
      console.log("Initialize");
      renderCircle([0, 900]);
      setOnce(true);
    }

    console.log("executed clean up");
    return () => {
      console.log("useEffect clean up");
    };
  });*/
  console.log("Executed clean up2");

  useEffect(() => {
    console.log("Re-render");
    if (undefined !== props.coord) {
      console.log("Update Canvas");
      const coord = props.coord;
      clearCanvas();
      renderCircle(coord);
    }

    return () => {
      console.log("useEffect clean up2");
    };
  });

  return (
    <div>
      <canvas className={Classes.canvas} width="1000" height="1000" />
    </div>
  );
}
