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
  let intervalFn;

  /// Configure Data
  const [canvasConfig, setCanvasConfig] = useState(null);
  //const [update, setUpdate] = useState(false);

  const delayLoop = ({
    index,
    context,
    start,
    stepSize,
    prevCellValue,
    offset,
  }) => {
    timeOut = setTimeout(() => {
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
      console.log("hahaha");
      if (index <= data.dice1) {
        console.log("hello");
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
      }
    }, 1000);

    /*for (
        let index = 0, ;
        index <= data.dice1;
        index++, prevCellValue++
      ) {
        
        
      }*/
  };

  const drawUnitNEffect = ({ context, start, stepSize }) => {
    const offset = stepSize / 2;
    /// dice never roll before
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
    if (DEV.DEBUG) console.log("Unit Render Again");
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
