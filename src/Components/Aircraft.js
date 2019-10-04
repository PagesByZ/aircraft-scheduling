import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "./Loading";
import * as actionCreators from "../Store/action/index";

class Aircraft extends Component {
  componentDidMount() {
    //# HERE FETCH AIRCRAFTS
    if (!this.props.loaded) {
      this.props.fetchAircrafts();
    }
  }

  DisplayAircraft() {
    const { aircrafts, selectedRotation } = this.props;

    return aircrafts.map((obj, index) => {
      return (
        <div
          className={`acD posRel hidO ${
            obj.ident === this.props.selectedAircraft ? "selected" : " "
          }`}
          key={obj.ident + obj.base}
          onClick={() => this.props.fetchRotation(obj.ident, this.props.date)}
        >
          {<h2>{obj.ident}</h2>}
          <span>
            Utilization{" "}
            {selectedRotation ? (
              <b>{selectedRotation.utilization.toFixed(2)}%</b>
            ) : (
              "none"
            )}
          </span>
        </div>
      );
    });
  }

  render() {
    const { loaded, loading, error, aircrafts } = this.props;

    let aircraftList = <Loading />;
    if (loaded && !loading && !error && aircrafts) {
      aircraftList = this.DisplayAircraft();
    } else if (error && !loading) {
      aircraftList = <p>There is something error.</p>;
    }

    return (
      <div className="posRel hidO leftD">
        <h1>Aircrafts</h1>
        {aircraftList}
      </div>
    );
  }
}

const mapStateToProps = ({ aircraftReducer }) => {
  return {
    aircrafts: aircraftReducer.data,
    loaded: aircraftReducer.loaded,
    loading: aircraftReducer.loading,
    error: aircraftReducer.error,
    selectedAircraft: aircraftReducer.selectedAircraft,
    selectedRotation: aircraftReducer.selectedRotation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAircrafts: () => dispatch(actionCreators.initAircraftAsync()),
    fetchRotation: (ident, date) =>
      dispatch(actionCreators.initRotation(ident, date))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Aircraft);
