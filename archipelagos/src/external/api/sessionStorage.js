import { DEBUG } from "../../config/debug";
import Player from "../../engine/player";

export function countRecord() {
  let count = 0;
  for (let index = 0; index < 99; index++) {
    if (sessionStorage.getItem(`score_record${index}`) === null) break;
    count++;
  }
  return count;
}

export function getRank(mode) {
  let arr = [];
  let rank = -1;
  for (let index = mode; index >= 0; index--) {
    arr.push(sessionStorage.getItem(`player${index}_cell_pos`));
  }
  /// reverse since player id is assign opp [3,2,1] -> [1,2,3]
  const playerCell = arr.reverse()[0];

  const sortedArr = arr.sort();

  sortedArr.forEach((value, index) => {
    if (value === playerCell) {
      rank = index + 1;
    }
  });
  return rank;
}

export function setRecord(rank, turn, mode, count) {
  const dataJSON = {
    rank: rank,
    turn: turn,
    playerNum: mode,
    date: Date.now(),
  };
  sessionStorage.setItem(`score_record${count}`, JSON.stringify(dataJSON));
}

export function getRecord() {
  let arr = [];
  for (let index = 0; index < 99; index++) {
    if (sessionStorage.getItem(`score_record${index}`) === null) break;
    arr.push(sessionStorage.getItem(`score_record${index}`));
  }
}

export function setPlayer(player) {
  if (DEBUG) console.log("[Session] Set Player");
  sessionStorage.setItem(`player${player.id}_id`, `${player.id}`);
  sessionStorage.setItem(`player${player.id}_name`, `${player.name}`);
  sessionStorage.setItem(`player${player.id}_rep`, `${player.rep}`);
}

export function getPlayer(id) {
  if (DEBUG) console.log("[Session] Get Player");
  return new Player(
    sessionStorage.getItem(`player${id}_name`),
    sessionStorage.getItem(`player${id}_rep`),
    sessionStorage.getItem(`player${id}_id`)
  );
}

export function setMode(mode) {
  if (DEBUG) console.log("[Session] Set Mode");
  sessionStorage.setItem(`player_mode`, `${mode}`);
}

export function getMode() {
  if (DEBUG) console.log("[Session] Get Mode");
  return sessionStorage.getItem(`player_mode`) === ""
    ? -1
    : Number(sessionStorage.getItem(`player_mode`));
}

export function iniGame(id, iniDiceValue) {
  if (DEBUG) console.log("[Session] Ini Game");
  sessionStorage.setItem(`player${id}_cell_pos`, `90`);
  sessionStorage.setItem(`player${id}_dice_pos`, `${iniDiceValue}`);
  sessionStorage.setItem(`turn_count`, `0`);
  switch (id) {
    case 1:
      sessionStorage.setItem(`player${id}_unit_posX`, `0`);
      sessionStorage.setItem(`player${id}_unit_posY`, `900`);
      break;
    case 2:
      sessionStorage.setItem(`player${id}_unit_posX`, `0`);
      sessionStorage.setItem(`player${id}_unit_posY`, `900`);
      break;
    case 3:
      sessionStorage.setItem(`player${id}_unit_posX`, `0`);
      sessionStorage.setItem(`player${id}_unit_posY`, `900`);
      break;
    case 4:
      sessionStorage.setItem(`player${id}_unit_posX`, `0`);
      sessionStorage.setItem(`player${id}_unit_posY`, `900`);
      break;
    default:
      if (DEBUG) console.log("[Error-Session] Ini Game");
  }
}

export function getPlayerUnitPos(id) {
  return [
    Number(sessionStorage.getItem(`player${id}_unit_posX`)),
    Number(sessionStorage.getItem(`player${id}_unit_posY`)),
  ];
}

export function getPlayerCellPos(id) {
  return Number(sessionStorage.getItem(`player${id}_cell_pos`, `1`));
}

export function updateUnitPos(id, coord) {
  console.log(coord);
  sessionStorage.setItem(`player${id}_unit_posX`, `${coord[0]}`);
  sessionStorage.setItem(`player${id}_unit_posY`, `${coord[1]}`);
}

export function updateCellPos(id, newCell) {
  sessionStorage.setItem(`player${id}_cell_pos`, `${newCell}`);
}

export function updateTurn(newTurn) {
  sessionStorage.setItem(`turn_count`, `${newTurn}`);
}

export function getTurn(newTurn) {
  return Number(sessionStorage.getItem(`turn_count`));
}

export function clearAll() {
  sessionStorage.clear();
}
