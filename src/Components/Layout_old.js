import React, {Component} from "react"
import Loading from "./Loading"

class Layout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            test: true,
            acn: "",
            aloading: false,
            floading: false,
            aircraft: [],
            flights: [],
            utilized: 0,
            firstClick: true,
            rotation: []
        }

        this.UpdateACN = this.UpdateACN.bind(this)
        this.AddToRotation = this.AddToRotation.bind(this)
    }

    UpdateACN(val) {
        console.log("UACN CALLED" + val)
        this.setState({
            acn: val
        })
        this.DisplayAircraft = this.DisplayAircraft.bind(this)
    }

    componentDidMount() {
        console.log("component mounted")
        let mod_this = this
        this.setState({
            aloading: true,
            floading: true
        })
        fetch("https://infinite-dawn-93085.herokuapp.com/aircrafts")
        .then(function(response) {
            if (response.ok) {
                return response.json()
            }
          })
          .then(function(myJson) {
              mod_this.setState({
                  aircraft: myJson,
                  aloading: false
              })

              return fetch("https://infinite-dawn-93085.herokuapp.com/flights")
          })
          .then(function(response) {
            if (response.ok) {
                return response.json()
            }
          })
          .then(function(myJson) {
              console.log(myJson)
              mod_this.setState({
                  flights: myJson,
                  floading: false
              },() => {
                  console.log("DONEEEE")
              })
          })
    }

    DisplayAircraft() {
        let ac = this.state.aircraft
        console.log(ac)
        return (
            <div className="acD posRel hidO selected">
                {
                    <h2>{ac.data[0].ident}</h2>
                }
                <span>Utilization ({this.state.utilized}%)</span>
            </div>
        )
    }

    AddToRotation(ev, t) {
        const {flights, rotation} = this.state
        let flightData = flights.data
        var y = flightData.find(x => x.id = t)
        console.log(y)
        console.log(rotation)
        this.setState((prevState) => {
            return {
                rotation: [...prevState.rotation, y],
                firstClick: false
            }
        })
    }

    FindFromArray(array, key, value) {
        return array.filter(function (element) {
            return element[key] == value;
        }).shift();
    }

    DisplayFlights() {
        console.log("display flight")
        let fl = this.state.flights
        let fld = fl.data
        let btnArr = fld.map((obj) => {
            return (
                <button className={"btnFlight " + "btn_" + obj.id} key={obj.id} onClick={(e) => this.AddToRotation(e, obj.id)}>
                    <span>{obj.id}</span>
                </button>
            )
        })

        return btnArr
    }

    ShowRotation() {
        let fld = this.state.rotation
        let rotBtn = fld.map((obj) => {
            return (
                <button className={"btnFlight " + "btn2_" + obj.id} key={obj.id}>
                    <span>{obj.id}</span>
                </button>
            )
        })

        return rotBtn
    }

    render() {
        const {aircraft, flights} = this.state;
        return (
            <div>
                <div className="mainD posRel hidO">
                    <div className="posRel hidO topD">

                    </div>
                    <div className="posRel hidO bottomD container">
                        <div className="posRel hidO leftD">
                            <h1>Aircrafts</h1>
                            {
                                !aircraft || aircraft.length <= 0 || this.state.aloading ?
                                <Loading /> :
                                this.DisplayAircraft()
                            }
                        </div>
                        <div className="posRel hidO centerD">
                            {
                                !aircraft || aircraft.length <= 0 || this.state.aloading ?
                                <Loading /> :
                                <div>
                                    <h1>Rotation {aircraft.data[0].ident}</h1>
                                    <div className="posRel autO rotD">
                                    {
                                        this.ShowRotation()
                                    }
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="posRel hidO rightD">
                            <h1>Flights</h1>
                            <div className="fHolderD cHolder autO">
                            {
                                !flights || flights.length <= 0 || this.state.floading ?
                                <Loading /> :
                                this.DisplayFlights()
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Layout