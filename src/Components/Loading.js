import React, {Component} from "react"
import loadimg from "../loading.gif"

class Loading extends Component {
    render() {
        return (
            <div className="posRel hidO loadD">
                <div className="posAbs hidO loadD-1">
                    <img src={loadimg} />
                </div>
            </div>
        )
    }
}

export default Loading