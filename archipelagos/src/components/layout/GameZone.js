import React from "react";
import Classes from "../../css/layout/gamezone.module.css";
import { useState, useRef, useEffect, createContext, useContext } from "react";
/// Logic
import * as Logic from "../../engine/_export";

/// Components
import CanvasBoard from "./CanvasBoard";
import CanvasUnit from "./CanvasUnit";
import CanvasPlayer from "./CanvasPlayer";
import CanvasHighlight from "./CanvasHighlight";
/// DEBUG
import * as DEV from "../../config/debug";

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

  /// State Track
  const rollUpdate = state.rollState;
  const [canvasConfig, setCanvasConfig] = useState(null);
  const [canvasContext, setCanvasContext] = useState(null);

  /*useEffect(() => {
    console.log("Rolled");
    if (rollUpdate > 0) {
      drawUnitNEffect({
        context: canvasContext,
        start: canvasConfig.start,
        stepSize: canvasConfig.stepSize,
        data: data,
        state: setCanvasContext,
      });
    }

    return () => {};
  }, [rollUpdate]);*/

  /*function fire() {
    console.log("Restore");
    const context = canvasState;
    context.restore();
    setCanvasState(() => context);
  }*/

  return (
    <>
      <CanvasBoard />
      <CanvasPlayer data={data} />
      <CanvasHighlight data={data} state={state} />
      <CanvasUnit data={data} state={state} />

      {/*<button className={Classes.canvas_board} onClick={fire}>
        Restore
      </button>*/}
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

class Shape {
  constructor(ctx, type, id) {
    this.ctx = ctx;
    this.type = type;
    this.id = id;
    this.draw();
  }
  draw() {
    if (this.type === "circle") {
      this.drawCircle();
    } else {
      this.drawRect();
    }
  }

  drawCircle() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawRect() {
    this.ctx.save();
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(10, 10, 150, 80);
    this.ctx.restore();
  }

  changeRect() {
    this.ctx.save();
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(10, 10, 10, 20);
    this.ctx.restore();
  }

  print() {
    console.log(this);
  }
}

/// Proof canvas
function TextCanvas() {
  /// References
  const canvasFrameRef = useRef(null);
  const [ctx, setContext] = useState(null);
  let testobj = null;

  useEffect(() => {
    setContext(canvasFrameRef.current.getContext("2d"));
    return () => {};
  }, []);

  /// Draw a circle
  const circle = () => {
    const c = new Shape(ctx, "circle", "circle-1");
    c.print();
  };

  /// Filled a rect
  const rect = () => {
    const r = new Shape(ctx, "rect", "rect-1");
    r.print();
    testobj = new Shape(ctx, "rect", "rect-1");
  };

  /// Remove the rect
  const clear = () => {
    ctx.clearRect(0, 0, window.innerHeight, window.innerHeight);
  };

  const changeShape = () => {
    testobj = new Shape(ctx, "rect", "rect-1");
  };

  return (
    <>
      <canvas
        ref={canvasFrameRef}
        className={Classes.canvas_board}
        width="1000px"
        height="1000px"
      />

      <button onClick={circle}>Circle</button>
      <button onClick={rect}>Rect</button>
      <button onClick={clear}>Clear</button>
      <button onClick={changeShape}>Change</button>
    </>
  );
}
