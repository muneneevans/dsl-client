import React, { Component } from "react"
import { Switch, Route, Link } from "react-router"
import { HashRouter } from "react-router-dom"
import Dimensions from "react-dimensions"

import ChartScreen from "./Pages/ChartScreen"
import FacilityScreen from "./Pages/FacilityScreen"
import IndicatorScreen from "./Pages/IndicatorsScreen"
import MapScreen from "./Pages/MapScreen"
import FacilityDetailScreen from "./Pages/FacilityDetailScreen"
import DashBoardPage from "./Pages/DashBoardPage"
// import ChartScreen from "./ChartScreen"

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" >
                        <DashBoardPage
                            containerWidth={this.props.containerWidth}
                            containerHeight={this.props.containerHeight} />
                    </Route>
                    <Route path='/maps' component={MapScreen} />
                    <Route path='/dashboard' component={DashBoardPage} />
                    <Route path='/charts' component={ChartScreen} />
                    <Route path="/facilities/:id" component={FacilityDetailScreen} />
                    <Route path='/facilities' component={FacilityScreen} />
                </Switch>
            </HashRouter>

        );
    }
}


export default Dimensions()(App)