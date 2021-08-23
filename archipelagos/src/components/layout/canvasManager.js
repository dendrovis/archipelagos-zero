/// Logic
import * as Logic from "../../engine/_export";

/// DEBUG
import * as DEV from "../../config/debug";

export function getCanvasContext({ ref }) {
  return ref.current.getContext("2d");
}

export function setCanvasDimension({ ref, width, height }) {
  ref.current.width = width;
  ref.current.height = height;
}

export function drawSnakeNLadder({ context, start, end, stepSize, jumpList }) {
  jumpList.forEach((coord, index) => {
    if (DEV.DEBUG) console.log(coord);
    //const startX, startY, endX, endY;
    const stepStartX = coord[0][0] + 1;
    const stepStartY = coord[0][1] + 1;
    const stepEndX = coord[1][0] + 1;
    const stepEndY = coord[1][1] + 1;
    //if (index === 2) {
    context.fillStyle = "#74B641";
    context.fillRect(
      start * stepStartX,
      start * stepStartY,
      stepSize,
      stepSize
    ); // last 2 arg is width and height
    context.fillStyle = "#FF4747";
    context.fillRect(start * stepEndX, start * stepEndY, stepSize, stepSize);
    const startX = start * stepStartX + stepSize / 2;
    const startY = start * stepStartY + stepSize / 2;
    const endX = start * stepEndX + stepSize / 2;
    const endY = start * stepEndY + stepSize / 2;

    context.beginPath();
    const grad = context.createLinearGradient(startX, startY, endX, endY);
    grad.addColorStop(0, "#74B641");
    grad.addColorStop(1, "#FF4747");
    context.strokeStyle = grad;
    context.lineWidth = 7;
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
  });
}

export function fillCanvasGrid({ context, start, end }) {
  context.fillStyle = "#ffffff";
  context.rect(start, start, end, end);
  context.fill();
}

export function drawCanvasGrid({ context, start, end, stepSize, stepCount }) {
  context.beginPath();
  context.strokeStyle = "#420303";
  context.lineWidth = 2;

  /// Vertical and Horizontal Frame
  for (let index = 1; index < stepCount; index++) {
    context.moveTo(stepSize * index, start);
    context.lineTo(stepSize * index, end + stepSize); // weird...
    context.stroke();

    context.moveTo(start, stepSize * index);
    context.lineTo(end + stepSize, stepSize * index);
    context.stroke();
  }
}

export function drawCanvasCellNum({
  context,
  start,
  end,
  stepSize,
  stepCount,
}) {
  context.font = "20px Arial";
  context.fillStyle = "#420303";

  /// Populate Cell Content
  let cellIndex = 100;
  let cellOffsetX = 5;
  let cellOffsetY = 25;
  /// Y-Axis
  for (let indexY = 1; indexY < stepCount - 1; indexY++) {
    /// X-Axis
    for (let indexX = 1; indexX < stepCount - 1; indexX++) {
      context.fillText(
        String(cellIndex),
        end + stepSize - start * indexX + cellOffsetX,
        start * indexY + cellOffsetY
      );
      cellIndex--;
    }
  }
}

export function drawUnit({
  context,
  start,
  stepSize,
  cellValue,
  playerRep,
  offset,
}) {
  const [indexX, indexY] = Logic.game.convertSingleCelltoBoardPos(cellValue);
  const unitSize = stepSize / 6;
  context.fillStyle = getColor(playerRep);
  context.beginPath();
  context.arc(
    start * (indexX + 1) + offset,
    start * (indexY + 1) + offset,
    unitSize,
    0,
    2 * Math.PI
  );
  context.fill();
  context.strokeStyle = "#420303";
  context.lineWidth = 3;
  context.beginPath();
  context.arc(
    start * (indexX + 1) + offset,
    start * (indexY + 1) + offset,
    unitSize,
    0,
    2 * Math.PI
  );
  context.stroke();
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

export { getColor };

export function drawPlayerDiceHolder({ context, stepSize }) {
  const offset = stepSize / 2;
  const unitSize = stepSize / 4;
  const playerDicePosList = [
    [9, 11],
    [0, 9],
    [2, 0],
    [11, 2],
  ];
  context.fillStyle = "#420303";
  playerDicePosList.forEach((XYIndex) => {
    context.beginPath();
    context.arc(
      XYIndex[0] * stepSize + offset, // X
      XYIndex[1] * stepSize + offset, // Y
      unitSize,
      0,
      2 * Math.PI
    );
    context.fill();
  });
}

export function drawPlayerName({ context, stepSize, playerNameList }) {
  const offset = stepSize / 2;
  context.font = "40px Arial";
  context.textAlign = "center";
  context.fillStyle = "black";
  const playerNamePosList = [
    [6, 11],
    [-2, 0],
    [6, 1],
    [2, -10],
  ];
  let fineAdjustment = 0;
  playerNamePosList.forEach((XYIndex, index) => {
    if (index === 0) {
      fineAdjustment = 15;
    } else if (index === 1) {
      context.translate(100, 300);
      context.rotate(-0.5 * Math.PI);
      fineAdjustment = -90;
    } else if (index === 2) {
      fineAdjustment += 25;
    } else if (index === 3) {
      context.translate(100, 300);
      context.rotate(+0.5 * Math.PI);
      fineAdjustment += 25;
    }
    context.fillText(
      playerNameList[index],
      XYIndex[0] * stepSize,
      XYIndex[1] * stepSize + offset + fineAdjustment
    );
    if (index === 1) {
      context.rotate(+0.5 * Math.PI);
      context.translate(-100, -300);
    } else if (index === 3) {
      context.rotate(-0.5 * Math.PI);
      context.translate(-100, -300);
    }
  });
}

export function drawPlayerRep({ context, stepSize, playerRepList }) {
  const offset = stepSize / 2;
  const unitSize = stepSize / 4;

  const playerRepPosList = [
    [2, 11],
    [0, 2],
    [9, 0],
    [11, 9],
  ];

  playerRepPosList.forEach((XYIndex, index) => {
    context.fillStyle = getColor(playerRepList[index]);
    context.beginPath();
    context.arc(
      XYIndex[0] * stepSize + offset, // X
      XYIndex[1] * stepSize + offset, // Y
      unitSize,
      0,
      2 * Math.PI
    );
    context.fill();
  });
}

/// Build Canvas
export const buildCanvas = (ref) => {
  const canvasCtxRef = getCanvasContext({ ref: ref });
  const frameWidth = window.innerHeight;
  setCanvasDimension({
    ref: ref,
    width: frameWidth,
    height: frameWidth,
  });
  return [canvasCtxRef, frameWidth];
};

/// Build Grid
export const buildGrid = (frameWidth) => {
  const stepCount = 12;
  const stepSize = frameWidth / stepCount;
  const end = stepSize * 10;
  const start = stepSize;
  return [start, end, stepSize, stepCount];
};

export const clear = ({ context }) => {
  context.clearRect(0, 0, window.innerHeight, window.innerHeight);
};
