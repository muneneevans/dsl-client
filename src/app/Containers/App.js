import React, { Component } from "react"
import { Switch, Route, Link } from "react-router"
import ChartScreen from "./ChartScreen"
import FacilityScreen from "./FacilityScreen"
import IndicatorScreen from "./IndicatorsScreen"
import MapScreen from "./MapScreen"
import Dimensions from "react-dimensions"

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" >
                    <FacilityScreen
                        containerWidth={this.props.containerWidth}
                        containerHeight={this.props.containerHeight} />
                </Route>
                <Route path='/Maps' component={MapScreen}/>
            </Switch>

        );
    }
}


export default Dimensions()(App)