/// Styling
import Classes from "../../css/layout/gamezone.module.css";

/// Canvas Manager
import * as Canvas from "./canvasManager";

/// Hooks
import { useRef, useEffect } from "react";

export default function CanvasPlayer({ data }) {
  /// References
  const canvasFrameRef = useRef(null);

  function drawPlayerGUI({ context, stepSize }) {
    /// Group Required Data
    const playerRepList = [
      data.player1Rep,
      data.player2Rep,
      data.player3Rep,
      data.player4Rep,
    ];
    const playerNameList = [
      data.player1Name,
      data.player2Name,
      data.player3Name,
      data.player4Name,
    ];
    /// Drawing
    Canvas.drawPlayerDiceHolder({ context: context, stepSize: stepSize });
    Canvas.drawPlayerRep({
      context: context,
      stepSize: stepSize,
      playerRepList: playerRepList,
    });
    Canvas.drawPlayerName({
      context: context,
      stepSize: stepSize,
      playerNameList: playerNameList,
    });
  }

  /// After Rendered (Once)
  useEffect(() => {
    const [canvasCtx, frameWidth] = Canvas.buildCanvas(canvasFrameRef);
    const [, , stepSize] = Canvas.buildGrid(frameWidth);

    /// Draw Player GUI
    drawPlayerGUI({
      context: canvasCtx,
      stepSize: stepSize,
    });
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
