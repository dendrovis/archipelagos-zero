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
