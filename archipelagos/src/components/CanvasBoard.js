/** React Packages */
import { useRef, useEffect } from "react";

/** Styling */
import Classes from "./GameZone.module.css";

/** Provider */
import * as Canvas from "../engine/canvasManager";
import * as Logic from "../engine/_export";

/**
 * Represent background frame of the game board
 * @returns {JSX.Element}
 */
export default function CanvasBoard() {
  /// References
  const canvasFrameRef = useRef(null);

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

  /// After Rendered (Once)
  useEffect(() => {
    const [canvasCtx, frameWidth] = Canvas.buildCanvas(canvasFrameRef);
    const [start, end, stepSize, stepCount] = Canvas.buildGrid(frameWidth);

    /// Draw Board
    drawCanvasBoard({
      context: canvasCtx,
      start: start,
      end: end,
      stepSize: stepSize,
      stepCount: stepCount,
    });
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
