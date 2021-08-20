import React, { useRef, useEffect } from "react";
import Classes from "../../css/layout/gamezone.module.css";

/// Logic
import * as Logic from "../../engine/_export";

/// DEBUG
import * as DEV from "../../config/debug";

export default function CanvasBoard({ context, start, stepSize }) {
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

/*
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
}*/
/*
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
*/
