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
  const delayLoop = ({
    index,
    context,
    start,
    stepSize,
    cellValue,
    reverse,
  }) => {
    //!--- Cannot pass as timeout constant - resource release problem
    setTimeout(() => {
      /// Draw Highlight
      if (index < data.dice1) {
        if (DEV.DEBUG) console.log("Unit Highlighting");
        /// Check if highlight is beyond max compute new cell value
        let drawCellValue = -1;
        let finalValue = false;
        if (cellValue > 100) {
          drawCellValue = 100 - (cellValue - 100); //+ 1 because reverse to 99 instead of 100
          finalValue = true;
        } else {
          drawCellValue = cellValue;
        }

        Canvas.drawHighlight({
          context: context,
          start: start,
          stepSize: stepSize,
          cellValue: drawCellValue,
          finalValue: finalValue,
        });

        delayLoop({
          index: (index += 1),
          context,
          start,
          stepSize,
          cellValue: (cellValue += 1),
          reverse,
        });
      } else if (index === data.dice1) {
        let drawCellValue = -1;
        if (cellValue > 100) {
          drawCellValue = 100 - (cellValue - 100); //+ 1 because reverse to 99 instead of 100
        } else {
          drawCellValue = cellValue;
        }
        Canvas.drawHighlight({
          context: context,
          start: start,
          stepSize: stepSize,
          cellValue: drawCellValue,
          finalValue: true,
        });
        if (DEV.DEBUG) console.log("Unit Highlight Stop");
        if (DEV.DEBUG) console.log("Is Jump Cell?");
        const jumpCellValue = Logic.game.getJumpCell(data.cell1Pos);
        if (jumpCellValue !== -1) {
          if (DEV.DEBUG) console.log("Yes");

          if (DEV.DEBUG) console.log(`To ${jumpCellValue}`);
          Canvas.drawHighlight({
            context: context,
            start: start,
            stepSize: stepSize,
            cellValue: jumpCellValue,
            finalValue: true,
          });
        } else {
          if (DEV.DEBUG) console.log("No");
        }
      }
    }, 150);

    /// Set State Roll Dice Animation Finish
  };

  /// Draw Highlight and Animation
  const drawHighLightNEffect = ({ context, start, stepSize }) => {
    /// Dice never roll before or else
    if (data.dice1 === -1) {
      /// No Highlight
    } else {
      if (DEV.DEBUG) console.log("Draw Highlight");
      /// Check if beyond 100
      if (DEV.DEBUG) console.log(data.cell1Pos);

      /// Get Prev Value
      let prevCellValue;
      if (!state.isReverted) {
        prevCellValue = data.cell1Pos - data.dice1;
      } else {
        prevCellValue = 100 - (data.cell1Pos + data.dice1 - 100);
      }
      let index = 0;

      /// Execute Animation
      delayLoop({
        index,
        context,
        start,
        stepSize,
        cellValue: prevCellValue,
        reverse: state.isReverted,
      });
    }
  };

  /// After Rendered (Once)
  useEffect(() => {
    if (DEV.DEBUG) console.log("Highlight Render Setup");
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
    if (DEV.DEBUG) console.log("Highlight Render Again");

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
