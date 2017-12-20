import React, { Component } from "react"
import { Switch, Route, Link } from "react-router"
import { HashRouter } from "react-router-dom"
import Dimensions from "react-dimensions"
import SiteHeader from "../Components/Header"

import ChartPage from "./Pages/ChartPage"
import FacilityPage from "./Pages/FacilityPage"
import IndicatorPage from "./Pages/IndicatorsPage"
import MapPage from "./Pages/MapPage"
import FacilityDetailPage from "./Pages/FacilityDetailPage"
import DashBoardPage from "./Pages/DashBoardPage"
import WardDetailPage from './Pages/WardDetailPage'
// import ChartPage from "./ChartPage"

class App extends Component {
	render() {
		return (
			<div>
				<SiteHeader />
				<HashRouter>
					<Switch>
						<Route exact path="/">
							<DashBoardPage
								containerWidth={this.props.containerWidth}
								containerHeight={this.props.containerHeight}
							/>
						</Route>
						<Route path="/maps" component={MapPage} />
						<Route path="/dashboard" component={DashBoardPage} />
						<Route path="/charts" component={ChartPage} />
						<Route path="/facilities/:id" component={FacilityDetailPage} />
						<Route path="/facilities" component={FacilityPage} />
						<Route path="/wards/:id" component={WardDetailPage} />
					</Switch>
				</HashRouter>
			</div>
		)
	}
}

export default Dimensions()(App)
