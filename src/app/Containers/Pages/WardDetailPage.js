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

import WardFacilitySummaryWidget from "../../Components/Widgets/Ward/WardFacilitySummaryWidget"
import WardIndicatorWidget from "../../Components/Widgets/Ward/WardIndicatorWidget"
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
									this.props.indicatorActions.setWardPeriodType(periodTypeId)
								}}
							/>
							<YearForm
								submitAction={year => {
									this.props.indicatorActions.setWardYear(year)
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
									this.props.staffActions.addWardJobType(jobTypeId)
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
								jobTypes={this.props.wardJobTypes}
								removeAction={id => {
									this.props.staffActions.removeWardJobType(id)
								}}
							/>
						</Segment>
					</Grid.Column>
				</Grid.Row>

				<Grid.Row>
					<Grid.Column>
						<Segment>
							<Button
								primary
								fluid
								onClick={() => {
									// alert('asd')
									this.props.indicatorActions.fetchWardIndicatorDataValues(
										this.props.match.params.id,
										this.props.wardIndicators,
										this.props.wardPeriodType,
										this.props.wardYear
									)
									this.props.facilityActions.fetchWardSummary(
										this.props.match.params.id
									)
								}}
							>
								Update
							</Button>
						</Segment>
					</Grid.Column>
				</Grid.Row>

				<Grid.Row stretched centered columns={2}>
					<Grid.Column>
						{this.props.wardFacilitysummaryGraph ? (
							<WardFacilitySummaryWidget
								barGraph={
									this.props.wardFacilitysummaryGraph.bedsSummary.barGraph
								}
								height={700}
								width={1500}
								title="Number of beds in facility"
							/>
						) : (
							<div>{this.renderLoading()}</div>
						)}
					</Grid.Column>
					<Grid.Column>
						{this.props.wardFacilitysummaryGraph ? (
							<WardFacilitySummaryWidget
								barGraph={
									this.props.wardFacilitysummaryGraph.cotsSummary.barGraph
								}
								height={700}
								width={1500}
								title="Number of cots per facility"
							/>
						) : (
							<div>{this.renderLoading()}</div>
						)}
					</Grid.Column>
				</Grid.Row>

				<Grid.Row stretched centered columns={1}>
					<Grid.Column >
						{this.props.wardIndicatorDataValues ? (
							<WardIndicatorWidget
								barGraph={this.props.wardIndicatorDataValues.barGraph}
								heatMap = {this.props.wardIndicatorDataValues.barGraph}
								radarGraph ={this.props.wardIndicatorDataValues.barGraph}
								height={500}
							/>
						):(
							<div>{this.renderLoading()}</div>
						)}
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
		wardIndicatorDataValues: indicatorSelectors.getWardIndicatorDataValues(
			state.indicatorReducer
		),

		periodTypes: indicatorSelectors.getPeriodTypeOptions(state),
		wardPeriodType: indicatorSelectors.getWardPeriodType(
			state.indicatorReducer
		),
		wardYear: indicatorSelectors.getWardYear(state.indicatorReducer),

		jobTypes: staffSelectors.getJobTypeOptions(state),
		cadres: staffSelectors.getCadreOptions(state),
		wardJobTypes: staffSelectors.getWardJobTypes(state.staffReducer),

		wardFacilitysummaryGraph: facilitySelectors.getWardSummaryGraphData(
			state.facilityReducer
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		commonActions: bindActionCreators(commonActions, dispatch),
		indicatorActions: bindActionCreators(indicatorActions, dispatch),
		commodityActions: bindActionCreators(commodityActions, dispatch),
		staffActions: bindActionCreators(staffActions, dispatch),
		facilityActions: bindActionCreators(facilityActions, dispatch)
	}
}

const WardDetailContainer = connect(mapStateToProps, mapDispatchToProps)(
	WardDetailPage
)
export default WardDetailContainer
