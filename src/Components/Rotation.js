import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "./Loading";
import * as actionCreators from "../Store/action/index";
import { element } from "prop-types";

class Rotation extends Component {
  ShowRotation() {
    const { flights } = this.props.currentRotation;

    const list = flights.map(obj => {
      const clicked = () => {
        this.props.removeFlight(obj);
      };
      return (
        <div className="rotFlightD posRel" key={obj.id}>
          <h4>Flight: {obj.id}</h4>
          <span className="flightMsgS posAbs remove-btn" onClick={clicked}>
            Click to Remove from Rotation
          </span>
          <div className="fDataInfoD posRel hidO">
            {/* <div className="leftFDID">
              <span>{obj.origin}</span>
              <span>{obj.readable_departure}</span>
            </div>
            <div className="centerFDID"></div>
            <div className="rightFDID">
              <span>{obj.destination}</span>
              <span>{obj.readable_arrival}</span>
            </div> */}
            <div className="flex-row space-around">
              <span>
                <b>Origin:</b> {obj.origin}
              </span>
              <span>
                <b>Dest: </b> {obj.destination}
              </span>
            </div>
            <div className="flex-row space-around">
              <span>{obj.readable_departure}</span>
              <span>{obj.readable_arrival}</span>
            </div>
          </div>
        </div>
      );
    });

    return list;
  }

  render() {
    const { loaded, loading, error, currentRotation } = this.props;
    let rotationList = <Loading />;
    if (!loading && loaded && !error && !currentRotation) {
      rotationList = (
        <h2 style={{ textAlign: "center", margin: "80px" }}>
          Please Select Aircraft
        </h2>
      );
    } else if (loaded && currentRotation) {
      console.log("len: ", currentRotation.flights.length);
      if (currentRotation.flights.length > 0) {
        rotationList = this.ShowRotation();
      } else {
        rotationList = (
          <h2 style={{ textAlign: "center", margin: "80px" }}>
            Empty, there is no flight.!
          </h2>
        );
      }
    }

    return (
      <div className="posRel hidO centerD">
        <h1>Rotation {this.props.currentAircraft}</h1>
        <div className="fHolderD cHolder autO">{rotationList}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ aircraftReducer }) => {
  return {
    currentRotation: aircraftReducer.selectedRotation,
    currentAircraft: aircraftReducer.selectedAircraft,
    loaded: aircraftReducer.loaded,
    loading: aircraftReducer.loading,
    error: aircraftReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRotation: date => dispatch(actionCreators.initRotation(date)),
    removeFlight: id => dispatch(actionCreators.removeFlight(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rotation);
