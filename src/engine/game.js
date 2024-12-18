//import PropTypes from "prop-types";
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
import { DEBUG } from "../config/debug";
import { renderCircle } from "./temp";

/// Asset Package
import * as IMAGE from "../assets/img/index";

/// DEBUG
import * as DEV from "../config/debug";

export const createRecord = {};
/*
initialize.prototype = {
  player1_name: PropTypes.string,
  player2_name: PropTypes.string,
  player3_name: PropTypes.string,
  player4_name: PropTypes.string,

  player1_rep: PropTypes.number,
  player2_rep: PropTypes.number,
  player3_rep: PropTypes.number,
  player4_rep: PropTypes.number,

  player1_cell_pos: PropTypes.number,
  player2_cell_pos: PropTypes.number,
  player3_cell_pos: PropTypes.number,
  player4_cell_pos: PropTypes.number,

  player1_dice_pos: PropTypes.number,
  player2_dice_pos: PropTypes.number,
  player3_dice_pos: PropTypes.number,
  player4_dice_pos: PropTypes.number,

  player1_unit_pos: PropTypes.array,
  player2_unit_pos: PropTypes.array,
  player3_unit_pos: PropTypes.array,
  player4_unit_pos: PropTypes.array,

  score_record: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  turn_num: PropTypes.number,
  player_num: PropTypes.number,
};*/

const DUMMY_PLAYER = {
  name: "Dante",
  rep: 2, // 0  1 2 3 (RGBY)
  mode: 0, // 0 1 2 3 (1-4 player)
  // id 1-4
};

/// Create Player
export function createPlayer() {
  //test();
  if (DEBUG) console.log("Created New Player");

  const checkPlayer = getPlayer(1);
  const checkMode = getMode();

  /*/// Verify Inputs
  if (
    !checkNull(checkPlayer, checkMode) ||
    !checkValidPlayerName(checkPlayer.name)
  )
    return;

  if (DEBUG) console.log("Verify Success");*/

  /// Normalise data
  const playerName = normalisePlayerName(checkPlayer.name);

  /// Save to Session
  setPlayer(new Player(playerName, checkPlayer.rep, 1));
  setMode(checkMode);
}

function test() {
  setPlayer(new Player(DUMMY_PLAYER.name, DUMMY_PLAYER.rep, 1));
  setMode(DUMMY_PLAYER.mode);
}
export { test };

function normalisePlayerName(data) {
  return data[0].toUpperCase() + data.slice(1).toLowerCase();
}

/*function checkValidPlayerName(data) {
  if (DEBUG) console.log("Check Valid Player Name");
  /// check for empty data
  if (data.length === 0) return false;
  if (DEBUG) console.log("Not Empty");
  /// a digit exist , 17 words exist , space exist, non-alpha-digit exist
  if (/\d|^\w{17}|\s|[^\w]/.test(data) === true) return false;
  if (DEBUG) console.log("Valid Player Name");
  return true;
}*/

/*function checkNull(player, mode) {
  if (DEBUG) console.log("Check Null");
  if (player.name === "") return false;
  if (DEBUG) console.log("Name Pass");
  if (player.rep === -1) return false;
  if (DEBUG) console.log("Representor Pass");
  if (mode === -1) return false;
  if (DEBUG) console.log("Mode Pass");
  return true;
}*/

function initialize(isRender) {
  if (DEBUG) console.log("Initialize");

  /// Get Current Player
  if (DEBUG) console.log(getPlayer(1));
  const curPlayer = getPlayer(1);

  /// Get Mode
  if (DEBUG) console.log(getMode());
  const curMode = getMode();

  /// Populate AI Player
  if (curMode > 0) {
    let generateName = "";
    let generateRep = -1;
    for (let i = curMode + 1, index = 1; i > 1; i--, index++) {
      // Generate Unique Random Name with Correct Requirement
      do {
        generateName = String(require("human-names").allRandom());
      } while (generateName.length > 16);

      // Generate Unique Random Representor
      if (curPlayer.rep + index >= 4) {
        generateRep = curPlayer.rep + index - 4;
      } else {
        generateRep = curPlayer.rep + index;
      }

      // Set New Player
      setPlayer(new Player(generateName, generateRep, i));
    }
  }
  /// Initial State Game
  for (let index = 1; index <= 4; index++) {
    if (curMode + 1 >= index) {
      iniGame(index, generateDiceRandomValue());
    }
  }

  if (isRender) renderCircle(getPlayerUnitPos(1));
}

export function start(isRender) {
  if (DEBUG) console.log("Start Game");
  initialize(isRender);
}

export function turn() {
  if (DEBUG) console.log("Turn");
  const newTurn = getTurn() + 1;
  /// Get Current Turn and Increment it
  updateTurn(newTurn);
  /// Check and run if it is AI player turn
  //if (getMode() !== 0 && newTurn % 4 !== 0) runAIPlayer();
}

export function isEndGame(cell) {
  /// Check if end condition is met -
  if (cell !== 99) return false;

  /// Gather all data for the record & save into record
  setRecord(getRank(), getTurn() + 1, getMode(), countRecord());
  return true;
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
    //const curUnitPos = getPlayerUnitPos(1);

    /// find the new position
    const newUnitPos = getAllCellFixedCoord(curCellPos + moveCount);

    /// update the new unit and cell pos
    updateCellPos(1, curCellPos + moveCount);
    updateUnitPos(1, newUnitPos[0]);

    await renderCircle(newUnitPos[0]);

    /// Check for JumpRules
    jumpRule(1, curCellPos + moveCount);

    /// check end condition
    isEndGame(getPlayerCellPos(1));
  }

  /// Update Turns
  turn();
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

/// check if coord [x,y] within cell range return a BOOLEAN
/*function isWithinCellRange(coord) {
  const unitRadius = 15;
}*/

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

export function moveDice() {}

/// Return a randomize value between 1-6
function generateDiceRandomValue(isPlayer) {
  if (DEBUG) console.log("Roll Dice");
  return Math.floor(Math.random() * 6) + 1;
}

function rollDice() {
  const diceValue = generateDiceRandomValue();
  if (DEBUG) console.log(`Roll Dice Value : ${diceValue}`);
  /// Check if it is player turn -> return if not player turn
  /// Generate Random Dice Value
  return diceValue;
}

export function playerRollDice() {
  if (DEBUG) console.log("Player Rolled Dice");
  /// Check if it is player turn -> return if not player turn
  /// Generate Random Dice Value
  moveUnit(rollDice(), true);
}

export function playerAction() {}

export function runAIPlayer() {
  for (let index = getMode(), playerID = 2; index <= 0; index--, playerID++) {
    /// Roll Dice
    moveUnit(rollDice(), false);
  }
}

export function running() {}

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
      if (DEBUG) console.log("Rules Not Executed");
      //Nothing Happen
      break;
  }
  if (isSnakeOrLadderCell) {
    if (DEBUG) console.log("Snake and Ladder Happen");
    updateCellPos(id, cellPos);
    updateUnitPos(id, getAllCellFixedCoord(cellPos)[id]);
    if (DEBUG)
      console.log(
        `New Cell Value After Rule Update ${getAllCellFixedCoord(cellPos)[id]}`
      );
    renderCircle(getPlayerUnitPos(id));
  }
}

export { moveUnit };

//!===========================================================

export const iniGameData = {
  unit1Pos: [1, 10],
  unit2Pos: [1, 10],
  unit3Pos: [1, 10],
  unit4Pos: [1, 10],
  cell1Pos: 1, //1,
  cell2Pos: 1,
  cell3Pos: 1,
  cell4Pos: 1,
  offset: [-1, -1],
  playerCount: -1,
  dice1: -1,
  dice2: -1,
  dice3: -1,
  dice4: -1,
  player1Name: "Player 1",
  player2Name: "Player 2",
  player3Name: "Player 3",
  player4Name: "Player 4",
  player1Rep: -1,
  player2Rep: -1,
  player3Rep: -1,
  player4Rep: -1,
  scoreList: [],
  turns: 0,
};

export const getDiceData = {
  ini: randomDiceValue(),
  data: [
    IMAGE.DICE_1_1,
    IMAGE.DICE_1_2,
    IMAGE.DICE_1_3,
    IMAGE.DICE_1_4,
    IMAGE.DICE_1_5,
    IMAGE.DICE_1_6,
  ],
  meta: [
    IMAGE.ALT_DICE_1_1,
    IMAGE.ALT_DICE_1_2,
    IMAGE.ALT_DICE_1_3,
    IMAGE.ALT_DICE_1_4,
    IMAGE.ALT_DICE_1_5,
    IMAGE.ALT_DICE_1_6,
  ],
};

function randomDiceValue() {
  const min = 0;
  const max = 6;
  const val = Math.floor(Math.random() * max + min);
  if (DEV.DEBUG) console.log(`Roll Value: ${val + 1}`);
  return val;
}

export { randomDiceValue };

function fixedJumpCells() {
  /// start to end
  return [
    [3, 51],
    [6, 27],
    [20, 70],
    [25, 5],
    [34, 1],
    [36, 55],
    [47, 19],
    [63, 95],
    [65, 52],
    [68, 98],
    [87, 57],
    [91, 61],
    [99, 69],
  ];
}

function convertCellListtoBoardPos(dataList) {
  const newArr = [];
  dataList.forEach((coord) => {
    const tempArrS = [];
    const tempArrE = [];
    tempArrS.push((coord[0] - 1) % 10);
    tempArrS.push(10 - Math.ceil(coord[0] / 10));
    tempArrE.push((coord[1] - 1) % 10);
    tempArrE.push(10 - Math.ceil(coord[1] / 10));
    newArr.push([tempArrS, tempArrE]);
  });
  if (DEV.DEBUG) console.log(`Converted: ${newArr}`);

  return newArr;
}

export function convertSingleCelltoBoardPos(data) {
  const arr = [];
  arr.push(Math.abs(Math.ceil(data - 1 + 0.1)) % 10);
  arr.push(10 - Math.ceil(data / 10 + 0.1));
  if (DEV.DEBUG) console.log(`Converted: ${data} to ${arr}`);
  return arr;
}

export function getJumpList() {
  return convertCellListtoBoardPos(fixedJumpCells());
}

export { fixedJumpCells, convertCellListtoBoardPos };

export function getJumpCell(cellValue) {
  /// get the jumplist
  const jumpCellsList = fixedJumpCells();
  let newPosVal = -1;
  jumpCellsList.forEach((jumpTarget) => {
    /// get jump source
    if (cellValue === jumpTarget[0]) {
      newPosVal = jumpTarget[1];
    }
  });
  return newPosVal;
}
