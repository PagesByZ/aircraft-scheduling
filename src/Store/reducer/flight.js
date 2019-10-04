import * as actionTypes from "../action/actionTypes";
import { updateObject } from "../../asset/utility";

const initialState = {
  loaded: false,
  loading: false,
  error: null,
  data: null
};

//TODO: this is main reducer.
const flightReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.INIT_FLIGHT:
      return initFlight(state, payload);

    case actionTypes.FETCH_FLIGHT_SUCCESS:
      return flightSuccess(state, payload);

    case actionTypes.FETCH_FLIGHT_FAIL:
      return flightFail(state, payload);

    default:
      return state;
  }
};
// const clearSelectedFlight = (state, payload) => {
//   window.localStorage.removeItem("flights");
//   return updateObject(state, {
//     selected: []
//   });
// };

/*--- CASES ARE HERE DEFINED */

// Case createFlight
const initFlight = (state, payload) => {
  return updateObject(state, {
    loading: true
  });
};
const flightSuccess = (state, payload) => {
  return updateObject(state, {
    loading: false,
    loaded: true,
    data: payload.data
  });
};
const flightFail = (state, payload) => {
  return updateObject(state, {
    loaded: false,
    loading: false,
    error: payload.error
  });
};

// const selectedFlight = (state, payload) => {
//   let localStorageNutrition = JSON.parse(localStorage.getItem("flights"));
//   if (!localStorageNutrition) {
//     window.localStorage.setItem("flights", JSON.stringify([]));
//     localStorageNutrition = JSON.parse(localStorage.getItem("flights"));
//   }

//   const foundNutrtion = state.data.find(obj => {
//     return obj.id === payload.id;
//   });

//   localStorageNutrition.push(foundNutrtion);
//   window.localStorage.setItem("flights", JSON.stringify(localStorageNutrition));
//   const selected = localStorageNutrition;
//   return updateObject(state, {
//     selected: selected
//   });
// };
// const deSelectedFlight = (state, payload) => {
//   const localStorageNutrition = JSON.parse(localStorage.getItem("flights"));
//   const updateLocalStorageNutrition = localStorageNutrition.filter(element => {
//     return payload.id !== element.id;
//   });
//   window.localStorage.setItem(
//     "flights",
//     JSON.stringify(updateLocalStorageNutrition)
//   );

//   return updateObject(state, {
//     selected: updateLocalStorageNutrition
//   });
// };
export default flightReducer;
