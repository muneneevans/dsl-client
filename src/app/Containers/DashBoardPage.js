import React, { Component } from "react"
import { Button, Form, Grid, Header, Image, Message, Segment, Card } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import * as commonSelectors from "../Store/Common/selectors"
import * as commonActions from "../Store/Common/actions"
import * as facilitySelectors from "../Store/Facilities/selectors"
import * as facilityActions from "../Store/Facilities/actions"

import CountyForm from "../Components/Forms/CountyForm"
import FacilityTypesWidget from "../Components/FacilityTypesWidget"

class DashBoardPage extends Component {

    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.commonActions.fetchCountyIds()
        this.props.facilityActions.fetchCountrySummary()
        this.props.facilityActions.fetchCountryFacilityTypeSummary()
        this.props.facilityActions.fetchFacilityTypes()
    }

    render() {
        return (
            <Grid
                style={{ height: '100%' }}
                verticalAlign='top' padded>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Card>
                            <Card.Content header='County Form' />
                            <Card.Content extra>
                                <CountyForm countyCodes={this.props.counties} />
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row >
                    <Grid.Column padded>
                        <FacilityTypesWidget
                            data={this.props.countryFacilityTypesSummary}
                            keys={this.props.facilityTypes}
                            indexBy='county_name'
                            width={1500}
                            height={1000} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        counties: commonSelectors.getCountyOptions(state),
        countyNames: commonSelectors.getCountyNames(state),

        countryFacilityTypesSummary: facilitySelectors.getCountryFacilityTypesSummary(state),

        facilityTypes: facilitySelectors.getFacilityTypesNames(state)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        commonActions: bindActionCreators(commonActions, dispatch),
        facilityActions: bindActionCreators(facilityActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardPage)
