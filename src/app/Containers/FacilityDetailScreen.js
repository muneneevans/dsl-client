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


class FacilityDetailScreen extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.indicatorActions.fetchDataElements()
        this.props.facilityActions.fetchfacilityDetails(this.props.match.params.id)
    }

    render() {
        return (
            this.props.dataElementsIsFetched ? (
                <Grid padded stretched>
                    <Grid.Column stretched computer={4} mobile={4}>
                        <Grid.Row>
                            <Header as='h2'>{this.props.match.params.id}</Header>
                        </Grid.Row>
                        <Grid.Row>
                            <Header as='h2' textAlign='center'>Data Elements</Header>
                            <DataElementsForm
                                dataElements={this.props.dataElements} />
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column>

                    </Grid.Column>
                </Grid>
            ) : (
                <Segment size='large' loading/>
            )
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        facilityDetailsIsFetched: facilitySelectors.getFacilityDetailFetchStatus(state),
        facilityDetails: facilitySelectors.getFaciliyDetails(state),
        dataElementsIsFetched: indicatorSelectors.getDataElementsFetchStatus(state),
        dataElements: indicatorSelectors.getDataElements(state)

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