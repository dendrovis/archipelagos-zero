import * as DEV from "../config/debug";

export function checkValidPlayerName(data) {
  /// check for empty data
  if (data.length === 0) return "hidden";
  /// a digit exist , 17 words exist , space exist, non-alpha-digit exist
  if (/\d|^\w{17}|\s|[^\w]/.test(data) === true) return "Please try again!";
  return "Valid Name";
}

export function checkNull(input) {
  if (input.playerName === "") return false;
  if (DEV.DEBUG) console.log("Pass Name");
  if (input.playerRep === -1) return false;
  if (DEV.DEBUG) console.log("Pass Rep");
  if (input.playerMode === -1) return false;
  if (DEV.DEBUG) console.log("Pass Mode");
  return true;
}

export function normalisePlayerName(data) {
  return data[0].toUpperCase() + data.slice(1).toLowerCase();
}
