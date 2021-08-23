import React from "react";

export default function Canvashighlight() {
  return <div>CanvasHighlight</div>;
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
