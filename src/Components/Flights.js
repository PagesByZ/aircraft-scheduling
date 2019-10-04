import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "./Loading";
import * as actionCreators from "../Store/action/index";

class Flights extends Component {
  componentDidMount() {
    if (!this.props.loaded) {
      this.props.fetchFlights();
    }
  }

  DisplayFlights() {
    let flightsButton = this.props.flights.map(obj => {
      const clicked = () => {
        this.props.onAddFlight(obj);
      };
      return (
        <button
          className={"btnFlight " + "btn_" + obj.id}
          key={obj.id}
          onClick={clicked}
        >
          <div className="fDataInfoD margin-nested">
            <h4>{obj.id}</h4>
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
        </button>
      );
    });

    return flightsButton;
  }

  render() {
    const { loaded, loading, error, flights } = this.props;

    let flightsList = <Loading />;
    if (loaded && !loading && !error && flights) {
      flightsList = this.DisplayFlights();
    } else if (error && !loading) {
      flightsList = <p>There is something error.</p>;
    }

    return (
      <div className="posRel hidO rightD">
        <h1>Flights</h1>
        <div className="fHolderD cHolder autO">{flightsList}</div>
      </div>
    );
  }
}
const mapStateToProps = ({ flightReducer }) => {
  return {
    flights: flightReducer.data,
    loaded: flightReducer.loaded,
    loading: flightReducer.loading,
    error: flightReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFlights: () => dispatch(actionCreators.initFlightAsync()),
    onAddFlight: flight => dispatch(actionCreators.addFlight(flight))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Flights);
