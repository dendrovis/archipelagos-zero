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

export default function CanvasHighlight({ data, state }) {
  /// References
  const canvasFrameRef = useRef(null);

  /// State Track
  const rollUpdate = state.rollState;

  /// Callback Fn
  let timeOut;

  /// Configure Data
  const [canvasConfig, setCanvasConfig] = useState(null);

  /// Moving Unit Animation
  const delayLoop = ({ index, context, start, stepSize, cellValue }) => {
    //!--- Cannot pass as timeout constant - resource release problem
    setTimeout(() => {
      /// Draw Highlight
      if (index < data.dice1) {
        console.log("Unit Highlighting");
        Canvas.drawHighlight({
          context: context,
          start: start,
          stepSize: stepSize,
          cellValue: cellValue,
          finalValue: false,
        });
        delayLoop({
          index: (index += 1),
          context,
          start,
          stepSize,
          cellValue: (cellValue += 1),
        });
      } else if (index === data.dice1) {
        /// Final Value
        Canvas.drawHighlight({
          context: context,
          start: start,
          stepSize: stepSize,
          cellValue: cellValue,
          finalValue: true,
        });
      } else {
        console.log("Unit Highlight Stop");
      }
    }, 150);

    /// Set State Roll Dice Animation Finish
  };

  /// Draw Highlight and Animation
  const drawHighLightNEffect = ({ context, start, stepSize }) => {
    /// Dice never roll before or else
    if (data.dice1 === -1) {
      console.log("Draw Unit Ini");
      /// No Highlight
    } else {
      console.log("Draw Highlight Again");
      /// Draw Highlight

      /// Get Prev Value
      const prevCellValue = data.cell1Pos - data.dice1 + 1;
      let index = 0;

      /// Execute Animation
      delayLoop({ index, context, start, stepSize, cellValue: prevCellValue });
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

    /// Draw HighLight & Effects
    drawHighLightNEffect({
      context: canvasCtx,
      start: start,
      stepSize: stepSize,
    });
  }, []);

  /// Render Again
  useEffect(() => {
    console.log("Unit Render Again");

    if (rollUpdate > 0) {
      Canvas.clear({ context: canvasConfig.context });
      /// Draw Unit & Effects
      drawHighLightNEffect({
        context: canvasConfig.context,
        start: canvasConfig.start,
        stepSize: canvasConfig.stepSize,
      });
    }
    return clearTimeout(timeOut);
  }, [rollUpdate, canvasConfig, drawHighLightNEffect, timeOut]);

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
/// Highlight Layer
function CanvasHighlight2(props) {
  const canvasFrameRef = useRef(null);
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
      if (!props.isReverted) {
        if (DEV.DEBUG) console.log("[HIGHLIGHT] Non-Revert Mode");
        for (
          let index = prevCellVal + 1;
          index <= props.data.cell1Pos;
          index++
        ) {
          /// Convert to pos value & plot
          const pos = Logic.game.convertSingleCelltoBoardPos(index);
          const indexX = pos[0] + 1;
          const indexY = pos[1] + 1;
          context.fillStyle = "orange";
          context.beginPath();
          if (index < props.data.cell1Pos) {
            context.arc(
              start * indexX + offset,
              start * indexY + offset,
              unitSize,
              0,
              2 * Math.PI
            );
            context.fill();
          } else {
            context.lineWidth = 3;
            context.strokeStyle = "orange";
            context.arc(
              start * indexX + offset,
              start * indexY + offset,
              unitSize + 20,
              0,
              2 * Math.PI
            );
            context.stroke();
          }
        }
      } else {
        if (DEV.DEBUG) console.log("[HIGHLIGHT] Revert Mode");
        for (let index = props.data.cell1Pos; index <= 100; index++) {
          /// Convert to pos value & plot
          const pos = Logic.game.convertSingleCelltoBoardPos(index);
          const indexX = pos[0] + 1;
          const indexY = pos[1] + 1;
          context.fillStyle = "orange";
          context.beginPath();
          if (index > props.data.cell1Pos) {
            context.arc(
              start * indexX + offset,
              start * indexY + offset,
              unitSize,
              0,
              2 * Math.PI
            );
            context.fill();
          } else {
            context.lineWidth = 3;
            context.strokeStyle = "orange";
            context.arc(
              start * indexX + offset,
              start * indexY + offset,
              unitSize + 20,
              0,
              2 * Math.PI
            );
            context.stroke();
          }
        }

        props.setRevert(false);
      }

      props.highlightState((val) => (val = val + 1));
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


*/
