import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Grid, Segment, Tab, Header, Button, Card } from "semantic-ui-react"
import { Bar, Line, HeatMap } from "nivo"
import { match } from "react-router"

import * as indicatorSelectors from "../../Store/Indicators/selectors"
import * as indicatorActions from "../../Store/Indicators/actions"
import * as facilitySelectors from "../../Store/Facilities/selectors"
import * as facilityActions from "../../Store/Facilities/actions"
import * as commodityActions from "../../Store/Commodities/actions"
import * as commoditySelectors from "../../Store/Commodities/selectors"
import * as staffSelectors from "../../Store/Staff/selectors"
import * as staffActions from "../../Store/Staff/actions"

import DataElementsForm from "../../Components/Forms/DataElementsForm"
import BarChart from "../../Components/Charts/BarChart"
import YearForm from "../../Components/Forms/YearForm"
import IndicatorGroupsForm from "../../Components/Forms/IndicatorGroupsForm"
import PeriodForm from "../../Components/Forms/PeriodForm"
import ProductsForm from "../../Components/Forms/ProductsForm"
import StaffForm from "../../Components/Forms/StaffForm"
import FacilityIndicatorCheckList from "../../Components/Widgets/FacilityIndicatorCheckList"
import FacilityStaffCheckList from "../../Components/Widgets/FacilityStaffCheckList"
import FacilityCommoditiesChekList from "../../Components/Widgets/FacilityCommoditiesChekList"
import FacilityIndicatorWidget from "../../Components/Widgets/FacilityIncidatorWidget"
import FacilityStaffGraphWidget from "../../Components/Widgets/FacilityStaffGraphWidget"
import FacilityCommoditiesGraphWidget from "../../Components/Widgets/FacilityCommoditiesGraphWidget"
class FacilityDetailScreen extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.indicatorActions.fetchDataElements()
		this.props.facilityActions.fetchfacilityDetails(this.props.match.params.id)
		this.props.indicatorActions.fetchIndicatorGroups()
		this.props.indicatorActions.fetchPeriodTypes()
		this.props.commodityActions.fetchProducts()
		this.props.commodityActions.fetchFacilityProducts(
			this.props.match.params.id
		)
		this.props.staffActions.fetchJobTypes()
		this.props.staffActions.fetchCadres()
	}

	componentWillUnmount() {
		this.props.indicatorActions.clearFacilityIndicatorData()
		this.props.staffActions.clearFacilityStaffData()
		this.props.commodityActions.clearFacilityProductsData()
	}

	renderLoading() {
		return <Segment size="large" loading />
	}

	render() {
		return this.props.facilityDetailsIsFetched ? (
			<Grid padded>
				<Grid.Row>
					{this.props.facilityDetailsIsFetched ? (
						<Header as="h2">{this.props.facilityDetails.name}</Header>
					) : (
						<Header as="h3">{this.props.match.params.id}</Header>
					)}
				</Grid.Row>

				<Grid.Row columns={4} className="ui large info message">
					<Grid.Column tablet={8} mobile={16} computer={4}>
						<Segment>
							<Header as="h3">Indicators</Header>
							<IndicatorGroupsForm
								indicatorGroups={this.props.indicatorGroups}
								indicatorGroupIndicators={this.props.indicatorGroupIndicators}
								submitAction={indicatorId => {
									this.props.indicatorActions.addFacilityIndicator(indicatorId)
								}}
								handleIndicatorGroupChange={indicatorGroupId => {
									this.props.indicatorActions.fetchIndicatorGroupIndicators(
										indicatorGroupId
									)
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
								facilityIndicators={this.props.facilityIndicators}
								removeAction={id => {
									this.props.indicatorActions.removeFacilityIndicator(id)
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

				<Grid.Row>
					<Grid.Column>
						<Segment>
							<Button
								primary
								fluid
								onClick={() => {
									this.props.indicatorActions.fetchFacilityIndicatorValues(
										this.props.facilityDetails.id,
										this.props.facilityIndicators,
										this.props.facilityPeriodType,
										this.props.facilityYear
									)
									this.props.commodityActions.fetchFacilityYearProducts(
										this.props.match.params.id,
										this.props.facilityYear
									)
									this.props.staffActions.fetchAllFacilityStaff(
										this.props.match.params.id
									)
									this.props.staffActions.fetchFacilitySelectedStaff(
										this.props.match.params.id,
										this.props.selectedFacilityJobTypes
									)
								}}
							>
                Update
							</Button>
						</Segment>
					</Grid.Column>
				</Grid.Row>

				<Grid.Row stretched centered columns={1}>
					<Grid.Column>
						{this.props.facilityIndicatorDataValuesMapData ? (
							<FacilityIndicatorWidget
								barGraph={
									this.props.facilityIndicatorDataValuesMapData.barGraph
								}
								heatMap={this.props.facilityIndicatorDataValuesMapData.barGraph}
								lineGraph={
									this.props.facilityIndicatorDataValuesMapData.lineGraph
								}
								radarGraph={
									this.props.facilityIndicatorDataValuesMapData.barGraph
								}
								height={500}
								width={1500}
							/>
						) : (
							<div>{this.renderLoading()}</div>
						)}
					</Grid.Column>

					<Grid.Column>
						{this.props.facilityStaffGraphData ? (
							<FacilityStaffGraphWidget
								barGraph={this.props.facilityStaffGraphData.barGraph}
								heatMap={this.props.facilityStaffGraphData.barGraph}
								lineGraph={this.props.facilityStaffGraphData.lineGraph}
								radarGraph={this.props.facilityStaffGraphData.barGraph}
								height={500}
								width={1500}
							/>
						) : (
							<div>{this.renderLoading()}</div>
						)}
					</Grid.Column>

					<Grid.Column>
						{this.props.facilityYearProducts ? (
							<FacilityCommoditiesGraphWidget
								barGraph={this.props.facilityYearProducts}
								height={500}
							/>
						) : (
							<div>{this.renderLoading()}</div>
						)}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		) : (
			<Grid>{this.renderLoading()}</Grid>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		facilityDetailsIsFetched: facilitySelectors.getFacilityDetailFetchStatus(
			state
		),
		facilityDetails: facilitySelectors.getFaciliyDetails(state),

		indicatorGroups: indicatorSelectors.getIndicatorGroupsOptions(state),
		indicatorGroupIndicators: indicatorSelectors.getIndicatorGroupIndicatorsOptions(
			state
		),

		products: commoditySelectors.getProductOptions(state),
		facilityProducts: commoditySelectors.getFacilityProductOptions(state),
		facilityYearProducts: commoditySelectors.getFacilityYearProductGraphs(
			state
		),

		periodTypes: indicatorSelectors.getPeriodTypeOptions(state),

		facilityIndicators: indicatorSelectors.getFacilityIndicators(state),
		facilityPeriodType: indicatorSelectors.getFacilityPeriodType(state),
		facilityYear: indicatorSelectors.getFacilityYear(state),
		facilityIndicatorDataVailues: indicatorSelectors.getFacilityIndicatorDataValues(
			state
		),
		facilityIndicatorDataValuesMapData: indicatorSelectors.getFacilityIndicatorDataValuesMapData(
			state
		),

		facilityStaffGraphData: staffSelectors.getFacilityStaffGraphData(state),
		jobTypes: staffSelectors.getJobTypeOptions(state),
		cadres: staffSelectors.getCadreOptions(state),

		selectedFacilityJobTypes: staffSelectors.getSelectedFacilityJobTypes(state),
		selectedFacilityJobTypeDataValues: staffSelectors.getFacilitySelectedJobTypeDataValues(
			state
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		indicatorActions: bindActionCreators(indicatorActions, dispatch),
		facilityActions: bindActionCreators(facilityActions, dispatch),
		commodityActions: bindActionCreators(commodityActions, dispatch),
		staffActions: bindActionCreators(staffActions, dispatch)
	}
}

const FacilityDetailContainer = connect(mapStateToProps, mapDispatchToProps)(
	FacilityDetailScreen
)

export default FacilityDetailContainer
