/* eslint-disable react-hooks/exhaustive-deps */
/// Styling
import Classes from "../../css/layout/gamezone.module.css";

/// Canvas Manager
import * as Canvas from "./canvasManager";

/// Logic
import * as Logic from "../../engine/_export";

/// Hooks
import { useRef, useEffect, useState, useCallback } from "react";

/// DEBUG
import * as DEV from "../../config/debug";

//const singleCtx

export default function CanvasUnit({ data, state }) {
  /// References
  const canvasFrameRef = useRef(null);

  /// State Track
  const rollUpdate = state.rollState;

  /// Callback Fn
  let timeOut;

  /// Configure Data
  const [canvasConfig, setCanvasConfig] = useState(null);

  /// Moving Unit Animation
  const delayLoop = ({
    index,
    context,
    start,
    stepSize,
    prevCellValue,
    offset,
  }) => {
    //!--- Cannot pass as timeout constant - resource release problem
    setTimeout(() => {
      Canvas.clear({ context: context });
      /// Draw Unit
      Canvas.drawUnit({
        context: context,
        start: start,
        stepSize: stepSize,
        cellValue: prevCellValue,
        playerRep: data.player1Rep,
        offset: offset,
      });
      if (index < data.dice1) {
        console.log("Unit Moving");
        delayLoop({
          index: (index += 1),
          context,
          start,
          stepSize,
          prevCellValue: (prevCellValue += 1),
          offset,
        });
      } else {
        console.log("Unit Move Stop");
        console.log("Is Jump Cell?");

        console.log();
      }
    }, 300);
  };

  /// Draw Unit and Animation
  const drawUnitNEffect = ({ context, start, stepSize }) => {
    const offset = stepSize / 2;
    /// Dice never roll before or else
    if (data.dice1 === -1) {
      console.log("Draw Unit Ini");
      Canvas.drawUnit({
        context: context,
        start: start,
        stepSize: stepSize,
        cellValue: data.cell1Pos,
        playerRep: data.player1Rep,
        offset: offset,
      });
    } else {
      console.log("Draw Unit Again");

      /// Get Prev Value
      const prevCellValue = data.cell1Pos - data.dice1 + 1;
      let index = 0;

      /// Execute Animation
      delayLoop({ index, context, start, stepSize, prevCellValue, offset });
    }
  };

  /// After Rendered (Once)
  useEffect(() => {
    if (DEV.DEBUG) console.log("Unit Render Once");
    const [canvasCtx, frameWidth] = Canvas.buildCanvas(canvasFrameRef);
    const [start, end, stepSize, stepCount] = Canvas.buildGrid(frameWidth);

    /// Save Canvas Configuration (To Be Used Later)
    setCanvasConfig(() => ({
      context: canvasCtx,
      start: start,
      end: end,
      stepSize: stepSize,
      stepCount: stepCount,
    }));
    /// Draw Unit & Effects
    drawUnitNEffect({
      context: canvasCtx,
      start: start,
      stepSize: stepSize,
    });
  }, []);

  /// Render Again
  useEffect(() => {
    console.log("Unit Render Again");
    if (rollUpdate > 0) {
      /// Draw Unit & Effects
      drawUnitNEffect({
        context: canvasConfig.context,
        start: canvasConfig.start,
        stepSize: canvasConfig.stepSize,
      });
    }
    return clearTimeout(timeOut);
  }, [rollUpdate, canvasConfig, drawUnitNEffect, timeOut]);

  return (
    <canvas
      ref={canvasFrameRef}
      className={Classes.canvas_unit}
      width="37.5vw"
      height="37.5vw"
    />
  );
}

/*
const jumpVal = { val: [] };

/// Unit Layer
function CanvasUnit2(props) {
  const canvasFrameRef = useRef(null);
  const [isJump, setJump] = useState(false);

  /// Jump Effect
  useEffect(() => {
    if (isJump) {
      if (DEV.DEBUG) console.log("Render Jump Unit");
      if (DEV.DEBUG) console.log(`Get Jump Store: ${jumpVal.val}`);
      /// Set canvas Size
      const width = window.innerHeight;
      const canvasFrame = canvasFrameRef.current;
      canvasFrame.width = width;
      canvasFrame.height = width;
      const context = canvasFrame.getContext("2d");
      /// Clear canvas
      context.clearRect(0, 0, width, width);

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
      const indexX = jumpVal.val[0][0] + 1;
      const indexY = jumpVal.val[0][1] + 1;
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
      /// Bigger line
      context.strokeStyle = "orange";
      context.beginPath();
      context.arc(
        start * indexX + offset,
        start * indexY + offset,
        unitSize + 20,
        0,
        2 * Math.PI
      );
      context.stroke();
      if (DEV.DEBUG) console.log("Render Jump Unit Finished");

      jumpVal.val = [];
      setJump(false);
    }

    return () => {};
  }, [isJump]);

  /// Normal Effect
  useEffect(() => {
    let x;
    let y;
    if (props.highlightVal === 0) {
      console.log("Run First Unit");
      x = props.data.unit1Pos[0];
      y = props.data.unit1Pos[1];
    } else {
      console.log("Run Non-First Unit");
      x = props.data.unit1Pos[0] + 1;
      y = props.data.unit1Pos[1] + 1;
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
    const indexX = x;
    const indexY = y;
    context.fillStyle = getColor(props.data.player1Rep);
    context.beginPath();
    /// initial and rest
    if (props.data.playerCount === 1) {
      if (props.highlightVal === 0) {
        if (DEV.DEBUG) console.log("Render Ini Unit");
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
      } else {
        if (DEV.DEBUG) console.log("Render Unit");
        /// find previous cell by substract dice value
        const prevCellVal = props.data.cell1Pos - props.data.dice1;
        /// get all middle position cell
        for (
          let index = prevCellVal + 1;
          index <= props.data.cell1Pos;
          index++
        ) {
          setTimeout(() => {
            /// Clear canvas
            context.clearRect(0, 0, width, width);
            /// Convert to pos value & plot
            const pos = Logic.game.convertSingleCelltoBoardPos(index);
            const indexX = pos[0] + 1;
            const indexY = pos[1] + 1;
            //context.fillStyle = "orange";
            context.fillStyle = getColor(props.data.player1Rep);
            context.beginPath();
            context.lineWidth = 3;
            if (index < props.data.cell1Pos) {
              context.arc(
                start * indexX + offset,
                start * indexY + offset,
                unitSize,
                0,
                2 * Math.PI
              );
            } else {
              context.arc(
                start * indexX + offset,
                start * indexY + offset,
                unitSize,
                0,
                2 * Math.PI
              );
            }
            context.fill();
            context.stroke();

            if (DEV.DEBUG) console.log(`Cur Pos: ${props.data.cell1Pos}`);
            if (DEV.DEBUG) console.log(`I Pos: ${index}`);

            /// IF last step check Jump
            if (props.data.cell1Pos === index) {
              setTimeout(() => {
                const jumpCellsList = Logic.game.fixedJumpCells();
                jumpCellsList.forEach((jumpTarget) => {
                  /// get jump source
                  if (props.data.cell1Pos === jumpTarget[0]) {
                    const newPosVal = Logic.game.convertSingleCelltoBoardPos(
                      jumpTarget[1]
                    );
                    if (DEV.DEBUG)
                      console.log(
                        `Jumping to Cell ${jumpTarget[1]} at ${newPosVal}`
                      );
                    props.data.cell1Pos = jumpTarget[1];
                    jumpVal.val.push(newPosVal);
                    if (DEV.DEBUG)
                      console.log(`Current Jump Store: ${jumpVal.val}`);
                    setJump(true);
                  }
                });
              }, 300);
            }
          }, 200);
        }
      }

      if (DEV.DEBUG) console.log("[Unit] New Position");
    } else {
      if (DEV.DEBUG) console.log("IN-DEV");
    }

    return () => {};
  }, [props.highlightVal]);

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
}*/
