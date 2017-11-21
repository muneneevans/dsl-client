import React, { Component } from "react"
import { Button, Form, Grid, Header, Image, Message, Segment, Card } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import * as commonSelectors from "../../Store/Common/selectors"
import * as commonActions from "../../Store/Common/actions"
import * as facilitySelectors from "../../Store/Facilities/selectors"
import * as facilityActions from "../../Store/Facilities/actions"
import * as sharedSelectors from "../../Store/Shared/selectors"

import {levels} from "../../Store/Common/dataTypes"

import CountyForm from "../../Components/Forms/CountyForm"
import FacilityTypesWidget from "../../Components/FacilityTypesWidget"
import FacilityBedsWidget from "../../Components/FacilityBedsWidget"
import MapChart from "../../Components/Charts/MapChart"

class DashBoardPage extends Component {

    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.commonActions.changeLevel(levels.COUNTRY)
        this.props.commonActions.fetchCountyIds()
        this.props.facilityActions.fetchCountrySummary()
        this.props.facilityActions.fetchCountryFacilityTypeSummary()
        this.props.facilityActions.fetchFacilityTypes()
        this.props.facilityActions.fetchFacilityKephLevels()
        this.props.facilityActions.fetchCountryKephLevelsSummary()
        this.props.facilityActions.fetchCountryBedsSummary()
        this.props.facilityActions.fetchCountrySummary()
    }

    handleCountyChange(countyId) {
        this.props.commonActions.changeLevel(levels.COUNTY)
        this.props.facilityActions.fetchCountyFacilityTypeSummary(countyId)
        this.props.facilityActions.fetchCountyKephLevelsSummary(countyId)
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
                                <CountyForm countyCodes={this.props.counties}
                                    submitAction={this.handleCountyChange.bind(this)} />
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row >
                    <Grid.Column >
                        <FacilityTypesWidget
                            data={this.props.countryFacilityTypesSummary}
                            keys={this.props.facilityTypes}
                            indexBy={this.props.countryFacilityTypesSummary}
                            width={1500}
                            height={800} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row >
                    <Grid.Column >
                        <FacilityTypesWidget
                            data={this.props.countryKephLevelsSummary}
                            keys={this.props.kephLevels}
                            indexBy='county_name'
                            width={1100}
                            height={1000} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row width={6}>
                    <Grid.Column width={5}>
                        <FacilityBedsWidget data={this.props.countryBedsSummary}
                            width={500}
                            height={600} />
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <FacilityBedsWidget data={this.props.countryCotsSummary}
                            width={500}
                            height={600} />
                    </Grid.Column>
                    <Grid.Column width={6} verticalAlign='middle'>
                        <MapChart
                            height={700}
                            width={600}
                            data={this.props.countryMapSummary} />
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

        countryFacilityTypesSummary: sharedSelectors.getCurrentFacilityTypeSummary(state),
        countryKephLevelsSummary: facilitySelectors.getCountryKephLevelsSummary(state),
        countryMapSummary: facilitySelectors.getCountrySummaryMapData(state),
        countrySummary: facilitySelectors.getCountrySummary(state),
        countryBedsSummary: facilitySelectors.getCountryBedsSummary(state),
        countryCotsSummary: facilitySelectors.getCountryCotsSummary(state),

        countyFacilityTypeSummary: facilitySelectors.getCountyFacilityTypesSummary(state),
        countyKephLevelsSummary: facilitySelectors.getCountyKephLevelsSummary(state),

        facilityTypes: facilitySelectors.getFacilityTypesNames(state),
        kephLevels: facilitySelectors.getKephLevelsNames(state)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        commonActions: bindActionCreators(commonActions, dispatch),
        facilityActions: bindActionCreators(facilityActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardPage)
