import image from "../assets/img/jpg/board_1.jpg";
import Classes from "../css/temp.module.css";
import {
  test,
  start,
  createPlayer,
  playerRollDice,
  turn,
} from "../engine/game.js";
import { clearAll } from "../external/api/sessionStorage";

export function renderCircle(coord) {
  console.log(`Rendered: ${coord}`);
  const offset = 20;
  const move_x = coord[0]; //200; //100 per move
  const move_y = coord[1]; //900;
  console.log(`${coord}`);
  var c = document.querySelector(".temp_canvas__BKeCj");
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.arc(10 + offset + move_x, 10 + offset + move_y, 20, 0, 2 * Math.PI);
  ctx.fillStyle = "darkblue";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(55 + offset + move_x, 10 + offset + move_y, 20, 0, 2 * Math.PI);
  ctx.fillStyle = "darkblue";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(10 + offset + move_x, 55 + offset + move_y, 20, 0, 2 * Math.PI);
  ctx.fillStyle = "darkblue";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(55 + offset + move_x, 55 + offset + move_y, 20, 0, 2 * Math.PI);
  ctx.fillStyle = "darkblue";
  ctx.fill();
}
/*
export function computedRenderCircle() {
  var c = document.querySelector(".temp_canvas__BKeCj");
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.arc(0, 0, 20, 0, 2 * Math.PI);
  ctx.fillStyle = "darkblue";
  ctx.fill();
}*/

export function clearCanvas() {
  const context = document
    .querySelector(".temp_canvas__BKeCj")
    .getContext("2d");
  context.clearRect(
    0,
    0,
    document.querySelector(".temp_canvas__BKeCj").width,
    document.querySelector(".temp_canvas__BKeCj").height
  );
}

export default function DevPage() {
  return (
    <div>
      {" "}
      <div>
        <button onClick={test}>test</button>
        <button onClick={createPlayer}>play</button>
        <button onClick={start}>loadPlayPage</button>
        <button onClick={playerRollDice}>rollDice</button>
        <button onClick={turn}>turn</button>
        <button onClick={clearAll}>resetstorage</button>
      </div>
      <pre />
      <div>
        {
          // <button onClick={renderCircle}>renderCircle</button>
        }

        <button onClick={clearCanvas}>clearCanvas</button>
      </div>
      <div>
        <canvas className={Classes.canvas} width="1000" height="1000" />
      </div>
      <img src={image} alt="temp" width="200" height="200"></img>
    </div>
  );
}
