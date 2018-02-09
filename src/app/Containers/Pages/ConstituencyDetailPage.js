import { connect } from "react-redux"
import React, { Component } from "react"
import { Grid, Segment, Tab, Header, Button, Card } from "semantic-ui-react"

import * as commonActions from "../../Store/Common/actions"
import * as commonSelectors from "../../Store/Common/selectors"
import * as indicatorSelectors from "../../Store/Indicators/selectors"
import * as indicatorActions from "../../Store/Indicators/actions"
import * as commodityActions from "../../Store/Commodities/actions"
import * as commoditySelectors from "../../Store/Commodities/selectors"
import * as staffSelectors from "../../Store/Staff/selectors"
import * as staffActions from "../../Store/Staff/actions"
import * as facilityActions from "../../Store/Facilities/actions"
import * as facilitySelectors from "../../Store/Facilities/selectors"

import Banner from "../../Components/Banner"
import IndicatorGroupsForm from "../../Components/Forms/IndicatorGroupsForm"
import PeriodForm from "../../Components/Forms/PeriodForm"
import YearForm from "../../Components/Forms/YearForm"
import ProductsForm from "../../Components/Forms/ProductsForm"
import StaffForm from "../../Components/Forms/StaffForm"

import FacilityIndicatorCheckList from "../../Components/Widgets/FacilityIndicatorCheckList"
import FacilityStaffCheckList from "../../Components/Widgets/FacilityStaffCheckList"
import FacilityCommoditiesChekList from "../../Components/Widgets/FacilityCommoditiesChekList"
import { bindActionCreators } from "redux"

class WardDetailPage extends Component {
	componentDidMount() {
		this.props.commonActions.fetchConstituencyDetails(
			this.props.match.params.id
		)
	}
	render() {
		console.log(this.props.constituencyDetials)
		return this.props.constituencyDetails ? (
			<Grid>
				<Grid.Row columns={1} stretched>
					<Grid.Column computer={16}>
						<Banner title={this.props.constituencyDetails.name} />
					</Grid.Column>
				</Grid.Row>
			</Grid>
		) : (
			<Grid>
				<Grid.Row columns={1} stretched>
					<Grid.Column computer={16}>
						<Banner title="No constituency" />
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

const mapStateToProps = state => {
	return {
		constituencyDetails: commonSelectors.getConstituencyDetails(
			state.commonReducer
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		commonActions: bindActionCreators(commonActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(WardDetailPage)
