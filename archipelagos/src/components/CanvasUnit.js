/* eslint-disable react-hooks/exhaustive-deps */
/// Styling
import Classes from "../../css/layout/gamezone.module.css";

/// Canvas Manager
import * as Canvas from "./canvasManager";

/// Logic
import * as Logic from "../../engine/_export";

/// Hooks
import { useRef, useEffect, useState, useContext } from "react";

/// DEBUG
import * as DEV from "../../config/debug";

import { RollingContext } from "../../pages/play";

//const singleCtx

export default function CanvasUnit({ data, state }) {
  /// References
  const canvasFrameRef = useRef(null);

  /// State Track
  const rollUpdate = state.rollState;
  //const setRollStatus = state.setRollStatus;
  /// Context State
  const [rollStatus, setRollState] = useContext(RollingContext);
  console.log(`Running Canvas Unit Controller \n RollStatus: ${rollStatus}`);

  /// Callback Fn
  let timeOut;

  /// Configure Data
  const [canvasConfig, setCanvasConfig] = useState(null);

  /// Moving Unit Animation
  /*const delayLoop = ({
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
      let drawCellValue = -1;
      if (prevCellValue > 100) {
        drawCellValue = 100 - (prevCellValue - 100); //+ 1 because reverse to 99 instead of 100
      } else {
        drawCellValue = prevCellValue;
      }

      /// Draw Unit
      Canvas.drawUnit({
        context: context,
        start: start,
        stepSize: stepSize,
        cellValue: drawCellValue,
        playerRep: data.player1Rep,
        offset: offset,
      });

      if (index < data.dice1) {
        if (DEV.DEBUG) console.log(`Unit Moving ${drawCellValue}`);

        delayLoop({
          index: (index += 1),
          context,
          start,
          stepSize,
          prevCellValue: (prevCellValue += 1),
          offset,
        });
      } else {
        if (DEV.DEBUG) console.log("Unit Move Stop");
        if (DEV.DEBUG) console.log("Is Jump Cell?");
        const jumpCellValue = Logic.game.getJumpCell(data.cell1Pos);
        ///  After Unit is clear draw the cell
        if (jumpCellValue === prevCellValue) {
          if (DEV.DEBUG) console.log(`To ${jumpCellValue}`);
          data.cell1Pos = jumpCellValue;
          Canvas.drawUnit({
            context: context,
            start: start,
            stepSize: stepSize,
            cellValue: jumpCellValue,
            playerRep: data.player1Rep,
            offset: offset,
          });
          console.log("Final Draw2");
          setRollState(false);

          //setRollState(false);
        }

        ///  If it is a Jump Cell Loop once to clear the Unit
        else if (jumpCellValue !== -1) {
          if (DEV.DEBUG) console.log("Yes");
          delayLoop({
            index: index,
            context,
            start,
            stepSize,
            prevCellValue: jumpCellValue,
            offset,
          });
        } else {
          if (DEV.DEBUG) console.log("No");
          console.log("Final Draw2");
          setRollState(false);
        }
      }
    }, 300);
  };*/

  /// Draw Unit and Animation
  const drawUnitNEffect = ({ context, start, stepSize }) => {
    const offset = stepSize / 2;
    /// Dice never roll before or else
    if (data.dice1 === -1) {
      if (DEV.DEBUG) console.log("Draw Unit Ini");
      Canvas.drawUnit({
        context: context,
        start: start,
        stepSize: stepSize,
        cellValue: data.cell1Pos,
        playerRep: data.player1Rep,
        offset: offset,
      });
    }
    const drawAgain = () => {
      setRollState(false);
      if (DEV.DEBUG) console.log("Draw Unit Again");

      /// Get Prev Value
      let prevCellValue;
      if (!state.isReverted) {
        prevCellValue = data.cell1Pos - data.dice1;
      } else {
        prevCellValue = 100 - (data.cell1Pos + data.dice1 - 100);
      }
      let index = 0;

      //delayLoop({ index, context, start, stepSize, prevCellValue, offset });
      console.log("RUNNN");
      /// The time interval must be
      const interval = setInterval(() => {
        index++;
        console.log(index);
        if (index >= 3) {
          clearInterval(interval);
        }
      }, 300);
    };

    //const dice = React.useMemo(drawAgain, [rollStatus]);
    /*
    else if (rollStatus) {
      setRollState(false);
      if (DEV.DEBUG) console.log("Draw Unit Again");

      /// Get Prev Value
      let prevCellValue;
      if (!state.isReverted) {
        prevCellValue = data.cell1Pos - data.dice1;
      } else {
        prevCellValue = 100 - (data.cell1Pos + data.dice1 - 100);
      }
      let index = 0;

      //delayLoop({ index, context, start, stepSize, prevCellValue, offset });
      console.log("RUNNN");
      /// The time interval must be
      const interval = setInterval(() => {
        index++;
        console.log(index);
        if (index >= 3) {
          clearInterval(interval);
        }
      }, 300);

      //!----- set false without rerun that part
    } else {
      console.log("It has being BLOCK");
    }*/
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
//26.30
