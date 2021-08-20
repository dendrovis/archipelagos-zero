/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Classes from "../../css/layout/gamezone.module.css";
import {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
  useLayoutEffect,
} from "react";
/// Logic
import * as Logic from "../../engine/_export";

/// DEBUG
import * as DEV from "../../config/debug";

import * as Game from "./index";

/// Canvas Manager
import * as Canvas from "./canvasManager";

const HighlightContext = createContext();

function HighLightController(props) {
  const [isHighlighted, setHighLight] = useState(0);

  return (
    <HighlightContext.Provider value={[isHighlighted, setHighLight]}>
      {props.children}
    </HighlightContext.Provider>
  );
}

export default function GameZone({ data, state }) {
  //const [isHighlighted, setHighLight] = useState(0);
  const [isLoaded, setLoad] = useState(false);
  if (DEV.DEBUG) console.log("Load Game Zone");
  const canvasFrameRef = useRef(null);

  useEffect(() => {
    /// Build Canvas
    const canvasCtx = Canvas.getCanvasContext({ ref: canvasFrameRef });
    const frameWidth = window.innerHeight;
    Canvas.setCanvasDimension({
      ref: canvasFrameRef,
      width: frameWidth,
      height: frameWidth,
    });

    /// Build Grid
    const stepCount = 12;
    const stepSize = frameWidth / stepCount;
    const end = stepSize * 10;
    const start = stepSize;

    /// Draw Board
    drawCanvasBoard({
      context: canvasCtx,
      start: start,
      end: end,
      stepSize: stepSize,
      stepCount: stepCount,
    });

    /// Save Context
    canvasCtx.save();

    /// Draw Unit
    //drawUnit()
  }, []);

  return (
    <>
      <canvas
        ref={canvasFrameRef}
        className={Classes.canvas_board}
        width="37.5vw"
        height="37.5vw"
      />
      {
        //DEV.DEBUG ? <CanvasFrame /> : <> </>
      }
      {/*  <HighLightController>
        <Game.CanvasBoard
          context={this.canvasCtx}
          start={this.start}
          stepSize={this.stepSize}
        />
      </HighLightController>*/}
      {
        /*<CanvasPlayer data={data} />
      <CanvasUnit
        data={data}
        state={{ rollState: state.rollState, isHighlighted: isHighlighted }}
        //rollState={props.rollState}
        //highlightVal={isHighlighted}
      />
      <CanvasHighlight
        data={data}
        state={{
          ...state,
          isHighlighted: isHighlighted,
          setHighlight: setHighLight,
        }
      }

      
        /*rollState={props.rollState}
        highlightState={setHighLight}
        isReverted={props.isReverted}
        setRevert={props.setRevert}*/
        ///>*/
      }
    </>
  );
}

//=======================================================

function drawCanvasBoard({ context, start, end, stepSize, stepCount }) {
  const jumpList = Logic.game.getJumpList();
  Canvas.fillCanvasGrid({ context: context, start: start, end: end });
  Canvas.drawSnakeNLadder({
    context: context,
    start: start,
    end: end,
    stepSize: stepSize,
    jumpList: jumpList,
  });
  Canvas.drawCanvasGrid({
    context: context,
    start: start,
    end: end,
    stepSize: stepSize,
    stepCount: stepCount,
  });
  Canvas.drawCanvasCellNum({
    context: context,
    start: start,
    end: end,
    stepSize: stepSize,
    stepCount: stepCount,
  });
}

/// Highlight Layer
function CanvasHighlight(props) {
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
const jumpVal = { val: [] };

/// Unit Layer
function CanvasUnit(props) {
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
