import { typeValue } from "../common/constant.js";

/// This are action that loading , intermediate dispatch
/// START PAGE
export const load_start_page = () => {
  return {
    type: typeValue.LOAD_START_PAGE,
  };
};

/// CREATION PAGE
export const load_creation_page = () => {
  return {
    type: typeValue.LOAD_CREATION_PAGE,
  };
};

/// PLAY PAGE
export const load_play_page = () => {
  return {
    type: typeValue.LOAD_PLAY_PAGE,
  };
};
/// Global
export const load_settings = () => {
  return {
    type: typeValue.LOAD_SETTINGS,
  };
};
export const load_score = () => {
  return {
    type: typeValue.LOAD_SCORE,
  };
};
export const load_result = () => {
  return {
    type: typeValue.LOAD_RESULT,
  };
};

/// This are action that interact-able in the page, this action comes directly from the user
/// START PAGE
export const start_game = () => {
  return {
    type: typeValue.START_GAME,
  };
};

/// CREATION PAGE
export const play_game = () => {
  return {
    type: typeValue.PLAY_GAME,
  };
};
export const save_player_name = () => {
  return {
    type: typeValue.SAVE_PLAYER_NAME,
  };
};
export const save_player_mode = () => {
  return {
    type: typeValue.SAVE_PLAYER_MODE,
  };
};
export const save_representor = () => {
  return {
    type: typeValue.SAVE_REPRESENTOR,
  };
};
export const generate_player_name = () => {
  return {
    type: typeValue.GENERATE_PLAYER_NAME,
  };
};

/// PLAY PAGE
export const roll_dice = () => {
  return {
    type: typeValue.ROLL_DICE,
  };
};
export const move_unit = () => {
  return {
    type: typeValue.MOVE_UNIT,
  };
};
export const back_start = () => {
  return {
    type: typeValue.BACK_START,
  };
};
export const show_score = () => {
  return {
    type: typeValue.SHOW_SCORE,
  };
};

/// Global
export const restart_game = () => {
  return {
    type: typeValue.RESTART_GAME,
  };
};
export const end_game = () => {
  return {
    type: typeValue.END_GAME,
  };
};
export const show_help = () => {
  return {
    type: typeValue.SHOW_HELP,
  };
};
export const show_settings = () => {
  return {
    type: typeValue.SHOW_SETTINGS,
  };
};
export const show_loading = () => {
  return {
    type: typeValue.SHOW_LOADING,
  };
};
export const show_error = () => {
  return {
    type: typeValue.SHOW_ERROR,
  };
};
export const close_overlay = () => {
  return {
    type: typeValue.CLOSE_OVERLAY,
  };
};
