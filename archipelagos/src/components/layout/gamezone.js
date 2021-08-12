import React from "react";
import Classes from "../../css/layout/gamezone.module.css";
import { useState, useRef, useEffect } from "react";
//mport { clearCanvas } from "../../engine/temp";
//import { getTurn } from "../external/api/sessionStorage";
/// Logic
import * as Logic from "../../engine/_export";

/// DEBUG
import * as DEV from "../../config/debug";
//import { clearCanvas } from "../../engine/temp";

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
        //DEV.DEBUG ? <CanvasFrame /> : <> </>
      }
      <CanvasBoard />
      <CanvasPlayer data={props.data} />
      <CanvasUnit data={props.data} rollState={props.rollState} />
      <CanvasHighlight data={props.data} rollState={props.rollState} />
    </>
  );
}

/// Highlight Layer
function CanvasHighlight(props) {
  const canvasFrameRef = useRef(null);
  //const turns = useRef(props.data.turns);

  /// Render
  useEffect(() => {
    if (props.rollState > 0) {
      if (DEV.DEBUG) console.log("Render Highlight");
      /// find previous cell by substract dice value
      const prevCellVal = props.data.cell1Pos - props.data.dice1;

      /// Set canvas Size
      const width = window.innerHeight;
      const canvasFrame = canvasFrameRef.current;
      canvasFrame.width = width;
      canvasFrame.height = width;
      const context = canvasFrame.getContext("2d");

      const stepCount = 12;
      const newStepCount = stepCount;
      const unitSize = width / 80;
      //const stepSize = width / stepCount;

      /// New Frame Size
      const newWidth = (width / stepCount) * newStepCount;
      const newStepSize = newWidth / newStepCount;
      //const end = newWidth - newStepSize * 2;
      const start = newStepSize;
      const offset = newStepSize / 2;

      /// get all middle position cell
      for (let index = prevCellVal + 1; index < props.data.cell1Pos; index++) {
        /// Convert to pos value & plot
        const pos = Logic.game.convertSingleCelltoBoardPos(index);
        const indexX = pos[0] + 1;
        const indexY = pos[1] + 1;
        context.fillStyle = "orange";
        context.beginPath();
        context.arc(
          start * indexX + offset,
          start * indexY + offset,
          unitSize,
          0,
          2 * Math.PI
        );
        context.fill();
      }
    }

    return () => {};
  }, [props.rollState]);

  return (
    <canvas
      ref={canvasFrameRef}
      className={Classes.canvas_cell_highlight}
      width="37.5vw"
      height="37.5vw"
    />
  );
}

/// Unit Layer
function CanvasUnit(props) {
  const canvasFrameRef = useRef(null);
  const turns = useRef(props.data.turns);
  //const [turn, setTurn] = useState()

  useEffect(() => {
    ///!===== TODO
    /// initial and rest
    if (props.rollState === 0) {
      if (DEV.DEBUG) console.log("Render Ini Unit");
    } else {
      if (DEV.DEBUG) console.log("Render Unit");
    }
    /// Set canvas Size
    const width = window.innerHeight;
    const canvasFrame = canvasFrameRef.current;
    canvasFrame.width = width;
    canvasFrame.height = width;
    const context = canvasFrame.getContext("2d");

    const stepCount = 12;
    const newStepCount = stepCount;
    const unitSize = width / 60;
    //const stepSize = width / stepCount;

    /// New Frame Size
    const newWidth = (width / stepCount) * newStepCount;
    const newStepSize = newWidth / newStepCount;
    //const end = newWidth - newStepSize * 2;
    const start = newStepSize;
    const offset = newStepSize / 2;
    const indexX = props.data.unit1Pos[0];
    const indexY = props.data.unit1Pos[1];

    if (props.data.playerCount === 1) {
      context.fillStyle = getColor(props.data.player1Rep);
      context.beginPath();
      context.arc(
        start * indexX + offset,
        start * indexY + offset,
        unitSize,
        0,
        2 * Math.PI
      );
      context.fill();
      context.strokeStyle = "#420303";
      context.lineWidth = 3;
      context.beginPath();
      context.arc(
        start * indexX + offset,
        start * indexY + offset,
        unitSize,
        0,
        2 * Math.PI
      );
      context.stroke();
      if (DEV.DEBUG) console.log("[Unit] New Position");
    } else {
      if (DEV.DEBUG) console.log("IN-DEV");
    }

    return () => {};
  }, [turns]);

  return (
    <canvas
      ref={canvasFrameRef}
      className={Classes.canvas_unit}
      width="37.5vw"
      height="37.5vw"
    />
  );
}

function getColor(choice) {
  switch (choice) {
    case 0:
      return "lightpink";

    case 1:
      return "lightgreen";

    case 2:
      return "lightblue";

    case 3:
      return "lightsalmon";

    default:
      if (DEV.DEBUG) console.log("[ERROR-Unit] Assigning Player Color");
      return "grey";
  }
}

/// Player Layer
function CanvasPlayer(props) {
  const canvasFrameRef = useRef(null);

  useEffect(() => {
    const unitSize = 25;

    /// Set canvas Size
    const width = window.innerHeight;
    const canvasFrame = canvasFrameRef.current;
    canvasFrame.width = width;
    canvasFrame.height = width;
    const context = canvasFrame.getContext("2d");
    const stepCount = 12;
    const stepSize = width / stepCount;
    const offset = stepSize / 2;

    /// Dice Holders
    context.fillStyle = "#420303";
    /// Player 1 Holder
    context.beginPath();
    context.arc(
      9 * stepSize + offset, // X
      11 * stepSize + offset, // Y
      unitSize,
      0,
      2 * Math.PI
    );
    context.fill();

    /// Player 2 Holder
    context.beginPath();
    context.arc(
      0 * stepSize + offset, // X
      9 * stepSize + offset, // Y
      unitSize,
      0,
      2 * Math.PI
    );
    context.fill();

    /// Player 3 Holder
    context.beginPath();
    context.arc(
      2 * stepSize + offset, // X
      0 * stepSize + offset, // Y
      unitSize,
      0,
      2 * Math.PI
    );
    context.fill();

    /// Player 4 Holder
    context.beginPath();
    context.arc(
      11 * stepSize + offset, // X
      2 * stepSize + offset, // Y
      unitSize,
      0,
      2 * Math.PI
    );
    context.fill();

    /// Config
    let choice = -1;
    let playerChoice = "";

    for (let index = 0; index < 4; index++) {
      if (index === 0) {
        choice = props.data.player1Rep;
      }
      if (index === 1) {
        choice = props.data.player2Rep;
      }
      if (index === 2) {
        choice = props.data.player3Rep;
      }
      if (index === 3) {
        choice = props.data.player4Rep;
      }

      switch (choice) {
        case 0:
          playerChoice = "lightpink";
          break;
        case 1:
          playerChoice = "lightgreen";
          break;
        case 2:
          playerChoice = "lightblue";
          break;
        case 3:
          playerChoice = "lightsalmon";
          break;

        default:
          if (DEV.DEBUG) console.log("[ERROR] Assigning Player Color");
          playerChoice = "grey";
          break;
      }

      context.fillStyle = playerChoice;

      if (index === 0) {
        /// Player 1 Rep
        context.beginPath();
        context.arc(
          2 * stepSize + offset, // X
          11 * stepSize + offset, // Y
          unitSize,
          0,
          2 * Math.PI
        );
        context.fill();
      }
      if (index === 1) {
        /// Player 2 Rep
        context.beginPath();
        context.arc(
          0 * stepSize + offset, // X
          2 * stepSize + offset, // Y
          unitSize,
          0,
          2 * Math.PI
        );
        context.fill();
      }
      if (index === 2) {
        /// Player 3 Rep
        context.beginPath();
        context.arc(
          9 * stepSize + offset, // X
          0 * stepSize + offset, // Y
          unitSize,
          0,
          2 * Math.PI
        );
        context.fill();
      }
      if (index === 3) {
        /// Player 4 Rep
        context.beginPath();
        context.arc(
          11 * stepSize + offset, // X
          9 * stepSize + offset, // Y
          unitSize,
          0,
          2 * Math.PI
        );
        context.fill();
      }
    }

    context.fillStyle = "#000000";

    /// Player 1 Name
    const textOffset = offset + 14;
    context.font = "40px Arial";
    context.textAlign = "center";
    context.fillText(
      props.data.player1Name,
      6 * stepSize,
      11 * stepSize + textOffset
    );

    /// Player 3 Name
    context.font = "40px Arial";
    context.textAlign = "center";
    context.fillText(
      props.data.player3Name,
      6 * stepSize,
      0 * stepSize + textOffset
    );

    /// Player 2 Name
    context.save();
    context.translate(100, 300);
    context.rotate(-0.5 * Math.PI);
    context.fillText(
      props.data.player2Name,
      -2 * stepSize,
      0 * stepSize - textOffset
    );

    /// Player 4 Name
    context.rotate(1 * Math.PI);
    context.fillText(
      props.data.player4Name,
      2 * stepSize,
      -11 * stepSize + textOffset + 25
    );

    return null;
  }, []);

  return (
    <canvas
      ref={canvasFrameRef}
      className={Classes.canvas_player}
      width="37.5vw"
      height="37.5vw"
    />
  );
}

/// Base Board Layer
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

    /// Set Canvas Style Config
    context.lineWidth = 2;
    context.strokeStyle = "#420303";
    context.fillStyle = "#ffffff";
    context.font = "20px Arial";

    /// Draw Rectangle
    context.rect(start, start, end, end);
    context.fill();

    /// Generate Cells with Jump
    const listJumpCoord = Logic.game.convertCellListtoBoardPos(
      Logic.game.fixedJumpCells()
    );

    listJumpCoord.forEach((coord, index) => {
      if (DEV.DEBUG) console.log(coord);
      //const startX, startY, endX, endY;
      const stepStartX = coord[0][0] + 1;
      const stepStartY = coord[0][1] + 1;
      const stepEndX = coord[1][0] + 1;
      const stepEndY = coord[1][1] + 1;
      //if (index === 2) {
      context.fillStyle = "#74B641";
      context.fillRect(
        start * stepStartX,
        start * stepStartY,
        newStepSize,
        newStepSize
      ); // last 2 arg is width and height
      context.fillStyle = "#FF4747";
      context.fillRect(
        start * stepEndX,
        start * stepEndY,
        newStepSize,
        newStepSize
      );
      const startX = start * stepStartX + newStepSize / 2;
      const startY = start * stepStartY + newStepSize / 2;
      const endX = start * stepEndX + newStepSize / 2;
      const endY = start * stepEndY + newStepSize / 2;

      context.beginPath();
      const grad = context.createLinearGradient(startX, startY, endX, endY);
      grad.addColorStop(0, "#74B641");
      grad.addColorStop(1, "#FF4747");
      context.strokeStyle = grad;
      context.lineWidth = 7;
      context.moveTo(startX, startY);
      context.lineTo(endX, endY);
      context.stroke();
      //}

      //}
    });

    context.beginPath();
    context.strokeStyle = "#420303";
    context.lineWidth = 2;

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
