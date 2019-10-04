import * as actionTypes from "./actionTypes";
import axios from "axios";

const initFlight = data => {
  return {
    type: actionTypes.INIT_FLIGHT
  };
};
const flightSuccess = data => {
  return {
    type: actionTypes.FETCH_FLIGHT_SUCCESS,
    payload: { data }
  };
};
const flightFail = error => {
  return {
    type: actionTypes.FETCH_FLIGHT_FAIL,
    payload: { error }
  };
};
export const initFlightAsync = params => {
  return (dispatch, getState) => {
    //TODO# HERE MAKE ASYNC CALLS.
    dispatch(initFlight());
    axios("https://infinite-dawn-93085.herokuapp.com/flights")
      .then(response => {
        const { data } = response.data;
        const newData = [];
        data.forEach(element => {
          const sec = 1 * element["arrivaltime"] - element["departuretime"] * 1;
          const min = sec / 60;
          const totalMin = min + 20;
          const totalPercent = (totalMin * 100) / 1440;
          newData.push(
            Object.assign(element, {
              totalMin,
              totalPercent: parseFloat(totalPercent.toFixed(2))
            })
          );
        });
        dispatch(flightSuccess(data));
      })
      .catch(err => {
        dispatch(flightFail(err));
      });
  };
};

// export const selectedFlight = id => {
//   return {
//     type: actionTypes.SELECTED_FLIGHT,
//     payload: {
//       id
//     }
//   };
// };
// export const deselectedFlight = id => {
//   return {
//     type: actionTypes.DE_SELECTED_FLIGHT,
//     payload: {
//       id
//     }
//   };
// };
// export const clearSelectedFlight = () => {
//   return {
//     type: actionTypes.CLEAR_SELECTED_FLIGHT
//   };
// };
