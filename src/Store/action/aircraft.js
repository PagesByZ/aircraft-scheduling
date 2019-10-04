import * as actionTypes from "./actionTypes";
import axios from "axios";

export const initRotation = (ident, date) => {
  return {
    type: actionTypes.INIT_ROTATION,
    payload: {
      date,
      ident
    }
  };
};

const initAircraft = () => {
  return {
    type: actionTypes.INIT_AIRCRAFT
  };
};
const aircraftSuccess = data => {
  return {
    type: actionTypes.FETCH_AIRCRAFT_SUCCESS,
    payload: { data }
  };
};
const aircraftFail = error => {
  return {
    type: actionTypes.FETCH_AIRCRAFT_FAIL,
    payload: { error }
  };
};
export const initAircraftAsync = () => {
  return (dispatch, getState) => {
    //TODO# HERE MAKE ASYNC CALLS.
    dispatch(initAircraft());
    axios("https://infinite-dawn-93085.herokuapp.com/aircrafts")
      .then(response => {
        const { data } = response.data;
        const newData = [];
        data.forEach(obj => {
          newData.push(Object.assign(obj, { rotationByDate: [] }));
        });
        console.log(newData);
        dispatch(aircraftSuccess(newData));
      })
      .catch(err => {
        dispatch(aircraftFail(err));
      });
  };
};

export const addFlight = flight => {
  return {
    type: actionTypes.ADD_FLIGHT,
    payload: {
      flight
    }
  };
};
export const removeFlight = flight => {
  return {
    type: actionTypes.REMOVE_FLIGHT,
    payload: {
      flight
    }
  };
};
