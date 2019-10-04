import React, { Component } from "react";
import Loading from "./Loading";
import Flights from "./Flights";
import Aircraft from "./Aircraft";
import Rotation from "./Rotation";
import { DatePicker, message } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import * as actionCreators from "../Store/action/index";

class Layout extends Component {
  state = {
    date: moment().format()
  };

  onChange = date => {
    this.setState({
      date: date.format()
    });
    if (this.props.aircraftLoaded && this.props.aircraftSelected) {
      const updatedDate = date.format();
      this.props.fetchRotation(this.props.aircraftSelected, updatedDate);
    } else {
      message.warning("Please First Select Aircraft");
    }
  };
  render() {
    const { aircraft, flights } = this.state;
    return (
      <div>
        <div className="mainD posRel hidO">
          <div
            className="posRel hidO topD "
            style={{
              textAlign: "center",
              margin: "20px"
            }}
          >
            <h2>Select Date For Rotation</h2>
            <DatePicker
              allowClear={false}
              onChange={this.onChange}
              defaultValue={moment()}
            />
          </div>
          <div className="posRel hidO bottomD container">
            <Aircraft date={this.state.date} />
            <Rotation date={this.state.date} />
            <Flights />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ aircraftReducer }) => {
  return {
    aircraftSelected: aircraftReducer.selectedAircraft,
    aircraftLoaded: aircraftReducer.loaded
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchRotation: (ident, date) =>
      dispatch(actionCreators.initRotation(ident, date))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
