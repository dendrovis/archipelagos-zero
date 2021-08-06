import Player from "./player";
import {
  setPlayer,
  getPlayer,
  setMode,
  getMode,
  iniGame,
  getTurn,
  updateTurn,
  getPlayerUnitPos,
  getPlayerCellPos,
  updateUnitPos,
  updateCellPos,
  countRecord,
  setRecord,
  getRank,
} from "../external/api/sessionStorage";

export function playerRollDice() {
  console.log("Player Rolled Dice");
  /// Check if it is player turn -> return if not player turn
  /// Generate Random Dice Value
  moveUnit(rollDice(), true);
}

export function isEndGame(cell) {
  /// Check if end condition is met -
  if (cell !== 99) return false;

  /// Gather all data for the record & save into record
  setRecord(getRank(), getTurn() + 1, getMode(), countRecord());
  return true;
}

export function turn() {
  console.log("Turn");
  const newTurn = getTurn() + 1;
  /// Get Current Turn and Increment it
  updateTurn(newTurn);
  /// Check and run if it is AI player turn
  //if (getMode() !== 0 && newTurn % 4 !== 0) runAIPlayer();
}

async function moveUnit(moveCount, isPlayer) {
  /// Check if position met the expected, if false return
  let curCellPos = -1;

  if (isPlayer) {
    /// get current cell position
    curCellPos = getPlayerCellPos(1);

    /// Check if new Pos cell is more than 99
    if (curCellPos + moveCount > 99) {
      /// Find offset
      const offRangeCount = curCellPos + moveCount - 99;
      curCellPos = 99 - offRangeCount;
      moveCount = 0;
      console.log(`Overshoot new value ${curCellPos}`);
    }

    /// get current unit position
    const curUnitPos = getPlayerUnitPos(1);

    /// find the new position
    const newUnitPos = getAllCellFixedCoord(curCellPos + moveCount);

    /// update the new unit and cell pos
    updateCellPos(1, curCellPos + moveCount);
    updateUnitPos(1, newUnitPos[0]);
    console.log("Run UPDATE NEW POS");

    //await renderCircle(newUnitPos[0]);

    /// Check for JumpRules
    jumpRule(1, curCellPos + moveCount);

    /// check end condition
    isEndGame(getPlayerCellPos(1));
  }

  /// Update Turns
  turn();
}

//========================================== Internal

function rollDice() {
  const diceValue = generateDiceRandomValue();
  console.log(`Roll Dice Value : ${diceValue}`);
  /// Check if it is player turn -> return if not player turn
  /// Generate Random Dice Value
  return diceValue;
}

/// Return a randomize value between 1-6
function generateDiceRandomValue(isPlayer) {
  console.log("Roll Dice");
  return Math.floor(Math.random() * 6) + 1;
}

/// find the all prefix pos of the cell [topleft,topright,btm-right,btm-left]
function getAllCellFixedCoord(cellNum) {
  //const offset = 20;
  const refCoord = getTopLeftCellCoord(cellNum);
  return [
    /*[refCoord[0] + 10 + offset, refCoord[1] + 10 + offset],
      [refCoord[0] + 55 + offset, refCoord[1] + 10 + offset],
      [refCoord[0] + 10 + offset, refCoord[1] + 55 + offset],
      [refCoord[0] + 55 + offset, refCoord[1] + 55 + offset],*/
    [refCoord[0], refCoord[1]],
    [refCoord[0], refCoord[1]],
    [refCoord[0], refCoord[1]],
    [refCoord[0], refCoord[1]],
  ];
}

/// return a [x,y]
function getTopLeftCellCoord(cellNum) {
  /// check if single digit
  console.log(`${cellNum / 10} -> ${Math.ceil(cellNum / 10)}`);

  /// Find Divider
  const y = 1000 - Math.ceil(cellNum / 10 + 0.1) * 100;
  /// Find Remainder
  const x = (cellNum % 10) * 100;
  console.log(`${cellNum}`);
  console.log(`new coord ${x}, ${y}`);
  return [x, y];
}

function jumpRule(id, cellPos) {
  const offset = -1; // start from 0
  const checkPos = cellPos + 1;
  let isSnakeOrLadderCell = false;
  console.log(`offset cell value is ${cellPos}`);
  switch (checkPos) {
    case 3:
      isSnakeOrLadderCell = true;
      cellPos = 51 + offset;
      break;
    case 6:
      isSnakeOrLadderCell = true;
      cellPos = 27 + offset;
      break;
    case 20:
      isSnakeOrLadderCell = true;
      cellPos = 70 + offset;
      break;
    case 25:
      isSnakeOrLadderCell = true;
      cellPos = 5 + offset;
      break;
    case 34:
      isSnakeOrLadderCell = true;
      cellPos = 1 + offset;
      break;
    case 36:
      isSnakeOrLadderCell = true;
      cellPos = 55 + offset;
      break;
    case 47:
      isSnakeOrLadderCell = true;
      cellPos = 19 + offset;
      break;
    case 63:
      isSnakeOrLadderCell = true;
      cellPos = 95 + offset;
      break;
    case 65:
      isSnakeOrLadderCell = true;
      cellPos = 52 + offset;
      break;
    case 68:
      isSnakeOrLadderCell = true;
      cellPos = 98 + offset;
      break;
    case 87:
      isSnakeOrLadderCell = true;
      cellPos = 57 + offset;
      break;
    case 91:
      isSnakeOrLadderCell = true;
      cellPos = 61 + offset;
      break;
    case 99:
      isSnakeOrLadderCell = true;
      cellPos = 69 + offset;
      break;
    default:
      console.log("Rules Not Executed");
      //Nothing Happen
      break;
  }
  if (isSnakeOrLadderCell) {
    console.log("Snake and Ladder Happen");
    updateCellPos(id, cellPos);
    updateUnitPos(id, getAllCellFixedCoord(cellPos)[id]);

    console.log(
      `New Cell Value After Rule Update ${getAllCellFixedCoord(cellPos)[id]}`
    );
    //renderCircle(getPlayerUnitPos(id));
  }
}
