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
		this.props.indicatorActions.fetchIndicatorGroups()
		this.props.indicatorActions.fetchPeriodTypes()
		this.props.commodityActions.fetchProducts()
		this.props.staffActions.fetchJobTypes()
		this.props.staffActions.fetchCadres()
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
					<Grid.Column padded>
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
									// this.props.indicatorActions.addWardIndicator(indicatorId)
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

export default connect(mapStateToProps, mapDispatchToProps)(WardDetailPage)
