import { combineReducers } from "redux";

import aircraft from "./aircraft";
import flight from "./flight";

const rootReducer = combineReducers({
  aircraftReducer: aircraft,
  flightReducer: flight
});

export default rootReducer;
