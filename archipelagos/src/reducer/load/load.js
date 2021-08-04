import { action } from "../../actions/index.js";

export const loadStartReducer = (state = 0) => {
  switch (action) {
    case action:
      return state + action.payload;

    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

/*
  const loadStartReducer = (state = 0, action) => {
    switch (action.type) {
      case "INCREMENT":
        return state + action.payload;
  
      case "DECREMENT":
        return state - 1;
      default:
        return state;
    }
  };
  
  export default counterReducer;
  
  */
