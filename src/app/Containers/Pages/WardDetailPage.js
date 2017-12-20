import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Grid, Segment, Tab, Header, Button, Card } from "semantic-ui-react"
import { Bar, Line, HeatMap } from "nivo"
import { match } from "react-router"

import * as commonActions from "../../Store/Common/actions"
import * as commonSelectors from "../../Store/Common/selectors"

import Banner from "../../Components/Banner"

class WardDetailPage extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.commonActions.fetchWardDetails(this.props.match.params.id)
	}

	renderLoading() {
		return <Segment size="massive" loading />
	}

	render() {
		return this.props.wardDetails ? (
			<Grid stretched padded columns={1}>
				<Grid.Row columns={1}>
					<Banner title={this.props.wardDetails.name} />
				</Grid.Row>
			</Grid>
		) : (
			<div> No ward</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		wardDetails: commonSelectors.getCurrentWardDetails(state.commonReducer)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		commonActions: bindActionCreators(commonActions, dispatch)
	}
}

const WardDetailContainer = connect(mapStateToProps, mapDispatchToProps)(
	WardDetailPage
)
export default WardDetailContainer
