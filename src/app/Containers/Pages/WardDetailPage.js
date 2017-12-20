import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Grid, Segment, Tab, Header, Button, Card } from "semantic-ui-react"
import { Bar, Line, HeatMap } from "nivo"


import * as commonActions from "../../Store/Common/actions"
import * as commonSelectors from "../../Store/Common/selectors"
import * as indicatorSelectors from "../../Store/Indicators/selectors"
import * as indicatorActions from "../../Store/Indicators/actions"
import * as commodityActions from "../../Store/Commodities/actions"
import * as commoditySelectors from "../../Store/Commodities/selectors"
import * as staffSelectors from "../../Store/Staff/selectors"
import * as staffActions from "../../Store/Staff/actions"

import Banner from "../../Components/Banner"
import IndicatorGroupsForm from "../../Components/Forms/IndicatorGroupsForm"
import PeriodForm from "../../Components/Forms/PeriodForm"
import YearForm from "../../Components/Forms/YearForm"
import ProductsForm from "../../Components/Forms/ProductsForm"
import StaffForm from "../../Components/Forms/StaffForm"
import FacilityIndicatorCheckList from "../../Components/Widgets/FacilityIndicatorCheckList"
import FacilityStaffCheckList from "../../Components/Widgets/FacilityStaffCheckList"
import FacilityCommoditiesChekList from "../../Components/Widgets/FacilityCommoditiesChekList"

class WardDetailPage extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.commonActions.fetchWardDetails(this.props.match.params.id)
		this.props.indicatorActions.fetchIndicatorGroups()
		this.props.indicatorActions.fetchPeriodTypes()
		this.props.staffActions.fetchJobTypes()
		this.props.staffActions.fetchCadres()
	}

	renderLoading() {
		return <Segment size="massive" loading />
	}

	render() {
		return this.props.wardDetails ? (
			<Grid>
				<Grid.Row columns={1} stretched>
					<Grid.Column computer={16}>
						<Banner title={this.props.wardDetails.name} />
					</Grid.Column>
				</Grid.Row>

				<Grid.Row columns={4} className="ui large info message">
					<Grid.Column tablet={8} mobile={16} computer={4}>
						<Segment>
							<Header as="h3">Indicators</Header>
							<IndicatorGroupsForm
								indicatorGroups={this.props.indicatorGroups}
								indicatorGroupIndicators={this.props.indicatorGroupIndicators}
								handleIndicatorGroupChange={indicatorGroupId => {
									this.props.indicatorActions.fetchIndicatorGroupIndicators(
										indicatorGroupId
									)
								}}
								submitAction={indicatorId => {
									this.props.indicatorActions.addWardIndicator(indicatorId)
								}}
							/>
						</Segment>
					</Grid.Column>

					<Grid.Column tablet={8} mobile={16} computer={4}>
						<Segment>
							<Header as="h3">Period</Header>
							<PeriodForm
								periodTypes={this.props.periodTypes}
								handlePeriodTypeChange={periodTypeId => {
									this.props.indicatorActions.setFacilityPeriodType(
										periodTypeId
									)
								}}
							/>
							<YearForm
								submitAction={year => {
									this.props.indicatorActions.setFacilityYear(year)
								}}
							/>
						</Segment>
					</Grid.Column>

					<Grid.Column tablet={8} mobile={16} computer={4}>
						<Segment>
							<Header as="h3">Commodities</Header>
							<ProductsForm
								products={this.props.facilityProducts}
								// submitAction={this.handleProductChange.bind(this)}
							/>
						</Segment>
					</Grid.Column>

					<Grid.Column tablet={8} mobile={16} computer={4}>
						<Segment>
							<Header as="h3">Staff</Header>
							<StaffForm
								cadres={this.props.cadres}
								jobTypes={this.props.jobTypes}
								submitAction={jobTypeId => {
									this.props.staffActions.addSelectedFacilityJobType(jobTypeId)
								}}
							/>
						</Segment>
					</Grid.Column>
				</Grid.Row>

				<Grid.Row columns={3}>
					<Grid.Column tablet={8} mobile={16} computer={8}>
						<Segment vertical>
							<FacilityIndicatorCheckList
								facilityIndicators={this.props.wardIndicators}
								removeAction={indicatorId => {
									this.props.indicatorActions.removeWardIndicator(indicatorId)
								}}
							/>
						</Segment>
					</Grid.Column>
					<Grid.Column tablet={4} mobile={16} computer={4}>
						<Segment vertical>
							<FacilityCommoditiesChekList
								commodities={undefined}
								removeAction={id => {
									this.props.staffActions.removeSelectedFacilityJobType(id)
								}}
							/>
						</Segment>
					</Grid.Column>
					<Grid.Column tablet={4} mobile={16} computer={4}>
						<Segment vertical>
							<FacilityStaffCheckList
								jobTypes={this.props.selectedFacilityJobTypes}
								removeAction={id => {
									this.props.staffActions.removeSelectedFacilityJobType(id)
								}}
							/>
						</Segment>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		) : (
			<div> No ward</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		wardDetails: commonSelectors.getCurrentWardDetails(state.commonReducer),

		indicatorGroups: indicatorSelectors.getIndicatorGroupsOptions(state),
		indicatorGroupIndicators: indicatorSelectors.getIndicatorGroupIndicatorsOptions(
			state
		),
		wardIndicators: indicatorSelectors.getWardIndicators(
			state.indicatorReducer
		),

		periodTypes: indicatorSelectors.getPeriodTypeOptions(state),

		jobTypes: staffSelectors.getJobTypeOptions(state),
		cadres: staffSelectors.getCadreOptions(state)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		commonActions: bindActionCreators(commonActions, dispatch),
		indicatorActions: bindActionCreators(indicatorActions, dispatch),
		commodityActions: bindActionCreators(commodityActions, dispatch),
		staffActions: bindActionCreators(staffActions, dispatch)
	}
}

const WardDetailContainer = connect(mapStateToProps, mapDispatchToProps)(
	WardDetailPage
)
export default WardDetailContainer
