import React from "react";
import Classes from "../../css/layout/gamezone.module.css";
import { useState, useRef, useEffect } from "react";
import { FaDrawPolygon } from "react-icons/fa";
import { clearCanvas } from "../../engine/temp";
//import { getTurn } from "../external/api/sessionStorage";

/// DEBUG
import * as DEV from "../../config/debug";

export default function Gamezone(props) {
  /*const draw = (ctx) => {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(50, 100, 20, 0, 2 * Math.PI);
    ctx.fill();
  };*/

  // const [triggerOnce, setOnce] = useState(false);
  // //const [updateTurn, setTurn] = useState(0);

  // const contextVal = ".gamezone_canvas__3Spmj";

  // function renderCircle() {
  //   console.log(`Rendered: ${props.coord}`);
  //   const offset = 20;
  //   const move_x = props.coord[0]; //200; //100 per move
  //   const move_y = props.coord[1]; //900;
  //   console.log(`${props.coord}`);
  //   var c = document.querySelector(contextVal);
  //   var ctx = c.getContext("2d");
  //   ctx.beginPath();
  //   ctx.arc(10 + offset + move_x, 10 + offset + move_y, 20, 0, 2 * Math.PI);
  //   ctx.fillStyle = "darkblue";
  //   ctx.fill();
  //   ctx.beginPath();
  //   ctx.arc(55 + offset + move_x, 10 + offset + move_y, 20, 0, 2 * Math.PI);
  //   ctx.fillStyle = "darkblue";
  //   ctx.fill();
  //   ctx.beginPath();
  //   ctx.arc(10 + offset + move_x, 55 + offset + move_y, 20, 0, 2 * Math.PI);
  //   ctx.fillStyle = "darkblue";
  //   ctx.fill();
  //   ctx.beginPath();
  //   ctx.arc(55 + offset + move_x, 55 + offset + move_y, 20, 0, 2 * Math.PI);
  //   ctx.fillStyle = "darkblue";
  //   ctx.fill();
  // }

  // function clearCanvas() {
  //   const context = document.querySelector(contextVal).getContext("2d");
  //   context.clearRect(
  //     0,
  //     0,
  //     document.querySelector(contextVal).width,
  //     document.querySelector(contextVal).height
  //   );
  // }

  // /// Fire after render
  // /*useEffect(() => {
  //   if (!triggerOnce) {
  //     console.log("Initialize");
  //     renderCircle([0, 900]);
  //     setOnce(true);
  //   }

  //   console.log("executed clean up");
  //   return () => {
  //     console.log("useEffect clean up");
  //   };
  // });*/
  // console.log("Executed clean up2");

  // useEffect(() => {
  //   console.log("Re-render");
  //   if (undefined !== props.coord) {
  //     console.log("Update Canvas");
  //     const coord = props.coord;
  //     clearCanvas();
  //     renderCircle(coord);
  //   }

  //   return () => {
  //     console.log("useEffect clean up2");
  //   };
  // });

  if (DEV.DEBUG) console.log("Load Game Zone");

  return (
    <>
      {
        //<canvas className={Classes.canvas} width="1000" height="1000" />
        //<canvas className={Classes.canvas_board} />
        //<canvas className={Classes.canvas_player} />
        //<canvas className={Classes.canvas_cell_highlight} />
        //<canvas className={Classes.canvas_unit} />
      }
      {!DEV.DEBUG ? <CanvasFrame /> : <> </>}
      <CanvasBoard />

      {/*<canvas className={Classes.canvas_board} />
      <canvas className={Classes.canvas_grid} />
      <canvas className={Classes.canvas_player} />
      <canvas className={Classes.canvas_cell_highlight} />
      <canvas className={Classes.canvas_unit} />*/}
    </>
  );
}

function CanvasBoard() {
  const canvasFrameRef = useRef(null);

  useEffect(() => {
    /// Set canvas Size
    const width = window.innerHeight;
    const canvasFrame = canvasFrameRef.current;
    canvasFrame.width = width;
    canvasFrame.height = width;
    const context = canvasFrame.getContext("2d");

    const stepCount = 12;
    const newStepCount = stepCount;
    //const stepSize = width / stepCount;

    /// New Frame Size
    const newWidth = (width / stepCount) * newStepCount;
    const newStepSize = newWidth / newStepCount;
    const end = newWidth - newStepSize * 2;
    const start = newStepSize;

    /*context.fillStyle = "#ff0";
    context.beginPath();
    context.arc(50, 50, width / 40, 0, 2 * Math.PI);
    context.fill();*/

    /// Set Canvas Style Config
    context.lineWidth = 2;
    context.strokeStyle = "#420303";
    context.fillStyle = "#ffffff";
    context.font = "20px Arial";

    /// Draw Rectangle
    context.rect(start, start, end, end);
    context.fill();

    /// Vertical and Horizontal Frame
    for (let index = 1; index < newStepCount; index++) {
      context.moveTo(newStepSize * index, start);
      context.lineTo(newStepSize * index, end + newStepSize); // weird...
      context.stroke();

      context.moveTo(start, newStepSize * index);
      context.lineTo(end + newStepSize, newStepSize * index);
      context.stroke();
    }

    context.fillStyle = "#420303";

    /// Populate Cell Content
    let cellIndex = 100;
    let cellOffsetX = 5;
    let cellOffsetY = 25;
    /// Y-Axis
    for (let indexY = 1; indexY < newStepCount - 1; indexY++) {
      /// X-Axis
      for (let indexX = 1; indexX < newStepCount - 1; indexX++) {
        context.fillText(
          String(cellIndex),
          end + newStepSize - start * indexX + cellOffsetX,
          start * indexY + cellOffsetY
        );
        cellIndex--;
      }
    }

    return null;
  }, []);
  return (
    <canvas
      ref={canvasFrameRef}
      className={Classes.canvas_board}
      width="37.5vw"
      height="37.5vw"
    />
  );
}

function CanvasFrame() {
  const canvasFrameRef = useRef(null);

  useEffect(() => {
    /// Set canvas Size
    const width = window.innerHeight;
    const canvasFrame = canvasFrameRef.current;
    canvasFrame.width = width;
    canvasFrame.height = width;
    const context = canvasFrame.getContext("2d");

    /// Initialize
    const stepCount = 12;
    const stepSize = width / stepCount;

    /// Set Canvas Style Config
    context.lineWidth = 2;
    context.strokeStyle = "pink";
    context.globalAlpha = 0.5;

    /// Vertical and Horizontal Frame
    for (let index = 1; index < stepCount; index++) {
      context.moveTo(stepSize * index, 0);
      context.lineTo(stepSize * index, width);
      context.stroke();

      context.moveTo(0, stepSize * index);
      context.lineTo(width, stepSize * index);
      context.stroke();
    }
    return null;
  }, []);
  return (
    <canvas
      ref={canvasFrameRef}
      className={Classes.canvas_frame}
      width="37.5vw"
      height="37.5vw"
    />
  );
}
