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
import WardIndicatorWidget from "../../Components/Widgets/Ward/WardIndicatorWidget"
import WardFacilityIndicatorWidget from "../../Components/Widgets/Ward/WardFacilityIndicatorWidget"
import { bindActionCreators } from "redux"

class WardDetailPage extends Component {
	componentDidMount() {
		this.props.commonActions.fetchConstituencyDetails(
			this.props.match.params.id
		)
		this.props.indicatorActions.fetchIndicatorGroups()
		this.props.indicatorActions.fetchPeriodTypes()
		this.props.commodityActions.fetchProducts()
		this.props.staffActions.fetchJobTypes()
		this.props.staffActions.fetchCadres()
	}

	renderLoading() {
		return <Segment size="massive" loading />
	}

	render() {
		return this.props.constituencyDetails ? (
			<Grid>
				<Grid.Row columns={1} stretched>
					<Grid.Column computer={16}>
						<Banner
							title={this.props.constituencyDetails.name + " CONSTITUENCY"}
						/>
					</Grid.Column>
				</Grid.Row>

				<Grid.Row columns={4} className="ui large info message">
					<Grid.Column tablet={8} mobile={16} computer={4}>
						<Segment padded>
							<Header as="h3"> Indicators</Header>
							<IndicatorGroupsForm
								indicatorGroups={this.props.indicatorGroups}
								indicatorGroupIndicators={this.props.indicatorGroupIndicators}
								handleIndicatorGroupChange={indicatorGroupId => {
									this.props.indicatorActions.fetchIndicatorGroupIndicators(
										indicatorGroupId
									)
								}}
								submitAction={indicatorId => {
									this.props.indicatorActions.addConstituencyIndicator(
										indicatorId
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
									this.props.indicatorActions.setConstituencyPeriodType(
										periodTypeId
									)
								}}
							/>
							<YearForm
								submitAction={year => {
									this.props.indicatorActions.setConstituencyYear(year)
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
								facilityIndicators={this.props.constituencyIndicators}
								removeAction={indicatorId => {
									this.props.indicatorActions.removeConstituencyIndicator(
										indicatorId
									)
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
									this.props.indicatorActions.fetchConstituencyIndicatorDataValues(
										this.props.match.params.id,
										this.props.constituencyIndicators,
										this.props.constituencyPeriodType,
										this.props.constituencyYear
									)
									this.props.indicatorActions.fetchConstitutencyWardIndicatorDataValues(
										this.props.match.params.id,
										this.props.constituencyIndicators,
										this.props.constituencyPeriodType,
										this.props.constituencyYear
									)
									// this.props.facilityActions.fetchWardSummary(
									// 	this.props.match.params.id
									// )
									// this.props.facilityActions.fetchWardFacilityTypesSummary(
									// 	this.props.match.params.id
									// )
									// this.props.facilityActions.fetchWardKephLevelsSummary(
									// 	this.props.match.params.id
									// )
									// this.props.indicatorActions.fetchWardFacilityIndicatorDataValues(
									// 	this.props.match.params.id,
									// 	this.props.wardIndicators,
									// 	this.props.wardPeriodType,
									// 	this.props.wardYear
									// )
								}}
							>
								Update
							</Button>
						</Segment>
					</Grid.Column>
				</Grid.Row>

				<Grid.Row stretched centered columns={1}>
					<Grid.Column>
						{this.props.constituencyIndicatorGraph ? (
							<WardIndicatorWidget
								title="Indicator Performance"
								barGraph={this.props.constituencyIndicatorGraph.barGraph}
								heatMap={this.props.constituencyIndicatorGraph.barGraph}
								radarGraph={this.props.constituencyIndicatorGraph.barGraph}
								height={500}
							/>
						) : (
							<div>{this.renderLoading()}</div>
						)}
					</Grid.Column>
				</Grid.Row>

				<Grid.Row stretched centered columns={1}>
					<Grid.Column>
						{this.props.constituencyWardIndicatorGraph ? (
							<WardFacilityIndicatorWidget
								graph={this.props.constituencyWardIndicatorGraph}
								height={500}
							/>
						) : (
							<div>{this.renderLoading()}</div>
						)}
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
		),

		indicatorGroups: indicatorSelectors.getIndicatorGroupsOptions(state),
		indicatorGroupIndicators: indicatorSelectors.getIndicatorGroupIndicatorsOptions(
			state
		),
		constituencyIndicators: indicatorSelectors.getConstituencyIndicators(
			state.indicatorReducer
		),
		constituencyIndicatorGraph: indicatorSelectors.getConstituencyIndicatorGraph(
			state.indicatorReducer
		),
		constituencyWardIndicatorGraph: indicatorSelectors.getConstituencyWardIndicatorGraph(
			state.indicatorReducer
		),

		periodTypes: indicatorSelectors.getPeriodTypeOptions(state),
		constituencyPeriodType: indicatorSelectors.getConstituencyPeriodType(
			state.indicatorReducer
		),
		constituencyYear: indicatorSelectors.getConstituencyYear(
			state.indicatorReducer
		),

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

export default connect(mapStateToProps, mapDispatchToProps)(WardDetailPage)
