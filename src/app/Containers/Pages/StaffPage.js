import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Grid, Segment } from "semantic-ui-react"

import * as staffSelectors from "../../Store/Staff/selectors"
import * as staffActions from "../../Store/Staff/actions"

import charts, { BarChart } from "../../Components/Charts/Nivo/BarChart"

class StaffPage extends Component {

	constructor(props) { super(props) }

	componentDidMount() {
		this.props.staffActions.fetchCountryJobTypes()
	}

	render() {
		return (
			<Grid>
				<Segment>
					{this.props.countryJobTypeSummary ? (
						<BarChart
							data={this.props.countryJobTypeSummary.barGraph.data}
							keys={this.props.countryJobTypeSummary.barGraph.keys}
							indexBy={this.props.countryJobTypeSummary.barGraph.indexBy}
							height={500}
							width={500} />
					) : (
						<Segment loading></Segment>
					)}
				</Segment>
			</Grid>
		)
	}
}

const mapStateToProps = state => {
	return {
		countryJobTypeSummary: staffSelectors.getCountryJobTypeSummaryGraphs(state.staffReducer)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		staffActions: bindActionCreators(staffActions, dispatch)
	}
}

const StaffPageContainer = connect(mapStateToProps, mapDispatchToProps)(StaffPage)

export default StaffPageContainer