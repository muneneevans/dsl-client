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

class FacilityDetailScreen extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.indicatorActions.fetchDataElements()
        this.props.facilityActions.fetchfacilityDetails(this.props.match.params.id)
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
                            <Header as='h3' textAlign='center'>Data Elements</Header>
                            {
                                this.props.dataElementsIsFetched ? (
                                    <DataElementsForm
                                        dataElements={this.props.dataElements}
                                        submitAction={this.handleDataElementChange.bind(this)} />

                                ) : (
                                        <div>
                                            {this.renderLoading()}
                                        </div>
                                    )
                            }
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
                   <div>
                       {this.renderLoading()}
                   </div>
                )
        )
    }
}



const mapStateToProps = (state, ownProps) => {
    return {
        facilityDetailsIsFetched: facilitySelectors.getFacilityDetailFetchStatus(state),
        facilityDetails: facilitySelectors.getFaciliyDetails(state),

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