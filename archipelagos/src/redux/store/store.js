import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import allReducers from "../reducer/index";

/**
 * Initialization states
 * @returns a createStore Object
 */
export default function configureStore(initialState = {}) {
  return createStore(allReducers, initialState, applyMiddleware(thunk));
}
