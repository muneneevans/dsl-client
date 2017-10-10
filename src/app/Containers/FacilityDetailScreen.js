import React, { Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { Grid, Segment, Tab, Header } from "semantic-ui-react"
import { match } from "react-router"

import * as indicatorSelectors from "../Store/Indicators/selectors"
import * as indicatorActions from "../Store/Indicators/actions"
import * as facilitySelectors from "../Store/Facilities/selectors"
import * as facilityActions from "../Store/Facilities/actions"

import DataElementsForm from "../Components/Forms/DataElementsForm"
import BarChart from "../Components/Charts/BarChart"
import YearForm from "../Components/Forms/YearForm"
import IndicatorGroupsForm from "../Components/Forms/IndicatorGroupsForm"
import PeriodForm from "../Components/Forms/PeriodForm"

class FacilityDetailScreen extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.indicatorActions.fetchDataElements()
        this.props.facilityActions.fetchfacilityDetails(this.props.match.params.id)
        this.props.indicatorActions.fetchIndicatorGroups()
        this.props.indicatorActions.fetchPeriodTypes()
    }

    handleIndicatorGroupChange(indicatorGroupId){
        this.props.indicatorActions.fetchIndicatorGroupIndicators(indicatorGroupId)
    }
    handleIndicatorChange(indicatorId){
        
    }

    handlePeriodChange(year){
        
    }

    handlePeriodTypeChange(periodTypeId){
        
    }

    handleDataElementChange(dataElementId) {
        this.props.indicatorActions.fetchFacilityDataElementDataValues(this.props.match.params.id, dataElementId)
    }


    renderLoading() {
        return (
            <Segment size='large' loading />
        )
    }

    render() {
        return (
            this.props.facilityDetailsIsFetched ? (
                <Grid padded stretched>
                    <Grid.Column stretched computer={4} mobile={4}>
                        <Grid.Row>
                            {
                                this.props.facilityDetailsIsFetched ? (
                                    <Header as='h2'>{this.props.facilityDetails.name}</Header>
                                ) : (
                                        <Header as='h3'>{this.props.match.params.id}</Header>
                                    )
                            }
                        </Grid.Row>
                        <Grid.Row>
                            <Header as='h3' textAlign='center'>Indicators</Header>
                            {
                                this.props.dataElementsIsFetched ? (
                                    <Segment>
                                        <IndicatorGroupsForm
                                            indicatorGroups={this.props.indicatorGroups}
                                            indicatorGroupIndicators={this.props.indicatorGroupIndicators}                                            
                                            submitAction={this.handleIndicatorChange.bind(this)} 
                                            handleIndicatorGroupChange={this.handleIndicatorGroupChange.bind(this)}
                                            />
                                    </Segment>
                                ) : (
                                        <div>
                                            {this.renderLoading()}
                                        </div>
                                    )
                            }
                        </Grid.Row>
                        <Grid.Row>
                            <Header as='h3' textAlign='center'>Period</Header>
                            <PeriodForm 
                                periodTypes={this.props.periodTypes} 
                                handlePeriodTypeChange = {this.handlePeriodTypeChange.bind(this)}/>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column stretched computer={12}>
                        {
                            this.props.facilityDataElementDataValuesIsFetched ? (
                                <Segment>
                                    <BarChart
                                        data={this.props.facilityDataElementDataValues}
                                        width={800} height={400}
                                        title="data element"
                                        xLabel='data elemtns' yLabel='value'

                                    />
                                </Segment>
                            ) : (
                                    <div>
                                        {this.renderLoading()}
                                    </div>
                                )
                        }
                    </Grid.Column>
                </Grid>
            ) : (
                    <Grid>
                        {this.renderLoading()}
                    </Grid>
                )
        )
    }
}



const mapStateToProps = (state, ownProps) => {
    return {
        facilityDetailsIsFetched: facilitySelectors.getFacilityDetailFetchStatus(state),
        facilityDetails: facilitySelectors.getFaciliyDetails(state),

        indicatorGroups: indicatorSelectors.getIndicatorGroupsOptions(state),

        indicatorGroupIndicators: indicatorSelectors.getIndicatorGroupIndicatorsOptions(state),

        periodTypes: indicatorSelectors.getPeriodTypeOptions(state),

        dataElementsIsFetched: indicatorSelectors.getDataElementsFetchStatus(state),
        dataElements: indicatorSelectors.getDataElements(state),

        facilityDataElementDataValuesIsFetched: indicatorSelectors.getFacilityDataElementDataValuesFetchStatus(state),
        facilityDataElementDataValues: indicatorSelectors.getFacilityDataElementDataValues(state)

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        indicatorActions: bindActionCreators(indicatorActions, dispatch),
        facilityActions: bindActionCreators(facilityActions, dispatch)
    }
}

const FacilityDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FacilityDetailScreen)

export default FacilityDetailContainer