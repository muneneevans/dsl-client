import React, { Component } from "react"
import { connect } from 'react-redux'
import { Grid, Header, Segment, Dimmer, Loader, Tab, Menu } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'

import * as commonSelectors from "../Store/Common/selectors"
import * as commonActions from "../Store/Common/actions"
import { levels } from "../Store/Common/dataTypes"

import * as facilitySelectors from "../Store/Facilities/selectors"
import * as facilityActions from "../Store/Facilities/actions"
import { facilityInformationType } from "../Store/Facilities/dataTypes"

import CountyForm from "../Components/CountyForm"
import ConstituencyForm from "../Components/ConstituencyForm"
import WardForm from "../Components/WardForm"
import FacilityList from "../Components/FacilityList"
import BarChart from "../Components/BarChart"

class FacilityScreen extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.commonActions.fetchCountyIds()
        this.props.commonActions.changeLevel(levels.COUNTY)
        this.props.facilityActions.changeFacilityInformationType(facilityInformationType.SUMMARY)
    }

    handleDataTabChange(e, data) {
        switch (data.activeIndex) {
            case 0:
                this.props.facilityActions.changeFacilityInformationType(facilityInformationType.SUMMARY)
                break
            case 1:
                this.props.facilityActions.changeFacilityInformationType(facilityInformationType.LIST)
                break
            case 2:
                this.props.facilityActions.changeFacilityInformationType(facilityInformationType.MAP)
                break
            default:
                break
        }
        setTimeout(() => { this.getData() }, 1500)
    }

    handleCountyChange(id) {
        this.props.commonActions.changeLevel(levels.COUNTY)
        this.props.commonActions.changeCurrentId(id)
        setTimeout(() => { this.getData() }, 1500)
    }

    handleConstituencyChange(id) {
        this.props.commonActions.changeLevel(levels.CONSTITUENCY)
        this.props.commonActions.changeCurrentId(id)
        setTimeout(() => { this.getData() }, 1500)
    }

    handleWardChange(id) {
        this.props.commonActions.changeLevel(levels.WARD)
        this.props.commonActions.changeCurrentId(id)
        setTimeout(() => { this.getData() }, 1500)
    }

    getData() {
        //check level and 
        switch (this.props.currentLevel) {
            case levels.COUNTY:
                switch (this.props.currentFacilityInformationType) {
                    case facilityInformationType.SUMMARY:
                        alert('county summary')
                        this.props.facilityActions.fetchCountySummary(this.props.currentId)
                        break

                    case facilityInformationType.LIST:
                        this.props.facilityActions.fetchCountyFacilities(this.props.currentId)
                        break

                    case facilityInformationType.MAP:
                        alert('fetch county map')
                        break

                    default:
                        break
                }
                break

            case levels.CONSTITUENCY:
                switch (this.props.currentFacilityInformationType) {
                    case facilityInformationType.SUMMARY:
                        alert('fetch constituency summary')
                        break

                    case facilityInformationType.LIST:
                        this.props.facilityActions.fetchConstituencyFacilities(this.props.currentId)
                        break

                    case facilityInformationType.MAP:
                        alert('fetch constituency map')
                        break

                    default:
                        break
                }
                break

            case levels.WARD:
                switch (this.props.currentFacilityInformationType) {
                    case facilityInformationType.SUMMARY:
                        alert('fetch ward summary')
                        break

                    case facilityInformationType.LIST:
                        this.props.facilityActions.fetchWardFacilities(this.props.currentId)
                        break

                    case facilityInformationType.MAP:
                        alert('fetch ward map')
                        break
                    default:
                        break
                }
                break

            default:
                break
        }
    }


    render() {
        const levelPanes = [
            {
                menuItem: 'Counties', render: () => (
                    <Tab.Pane attached={true}>
                        <CountyForm
                            countyCodes={this.props.countyCodes}
                            submitAction={this.handleCountyChange.bind(this)}
                        />
                    </Tab.Pane>)
            },
            {
                menuItem: 'Constituencies', render: () => (
                    <Tab.Pane attached={true}>
                        <ConstituencyForm
                            countyCodes={this.props.countyCodes}
                            fetchCountyConstituencyCodes={this.props.commonActions.fetchCountyConstituencyCodes}
                            constituencyCodesIsFetched={this.props.constituencyCodesIsFetched}
                            constituencyCodes={this.props.constituencyCodes}
                            fetchConstituencyWardCodes={this.props.commonActions.fetchConstituencyWardCodes}
                            fetchConstituencyFacilities={this.props.facilityActions.fetchConstituencyFacilities}
                            submitAction={this.handleConstituencyChange.bind(this)} />
                    </Tab.Pane>)
            },
            {
                menuItem: 'Wards', render: () => (
                    <Tab.Pane attached={true}>
                        <WardForm
                            countyCodes={this.props.countyCodes}
                            fetchCountyConstituencyCodes={this.props.commonActions.fetchCountyConstituencyCodes}
                            constituencyCodesIsFetched={this.props.constituencyCodesIsFetched}
                            constituencyCodes={this.props.constituencyCodes}
                            fetchConstituencyWardCodes={this.props.commonActions.fetchConstituencyWardCodes}
                            wardCodesIsFetched={this.props.wardCodesIsFetched}
                            wardCodes={this.props.wardCodes}
                            fetchWardFacilities={this.props.facilityActions.fetchWardFacilities}
                            submitAction={this.handleWardChange.bind(this)} />
                    </Tab.Pane>)

            },
        ]

        const dataPanes = [
            {
                menuItem: 'Summary', render: () => (
                    <Tab.Pane attached={false}>
                        <BarChart
                            countySummaryIsFetched={this.props.countySummaryIsFetched}
                            countySummaryChartData={this.props.countySummaryChartData} />
                    </Tab.Pane>
                )
            },
            {
                menuItem: "Facilities List",
                render: () => (
                    <FacilityList
                        facilitiesIsFetched={this.props.facilitiesIsFetched}
                        facilities={this.props.facilities} />
                )
            },
            {
                menuItem: 'Map View',
                render: () => (
                    <FacilityList
                        facilitiesIsFetched={this.props.facilitiesIsFetched}
                        facilities={this.props.facilities} />
                )
            }
        ]

        if (!this.props.countyCodes) return this.renderLoading()

        return (
            <div>
                <Grid columns='equal' padded stretched>
                    <Grid.Column stretched computer={4} mobile={16}>
                        <Grid.Column>
                            <Header as='h2' textAlign='center'>
                                Level
                            </Header>
                            <Grid.Column >
                                <Tab menu={{ secondary: true, pointing: true }} panes={levelPanes} />
                            </Grid.Column>
                        </Grid.Column>
                    </Grid.Column>

                    <Grid.Column stretched>
                        <Grid.Column stretched>
                            <Header as='h2' textAlign='center'>
                                Facilities
                            </Header>
                            <Grid.Column >
                                <Tab menu={{ secondary: true, color: 'green' }} panes={dataPanes} onTabChange={this.handleDataTabChange.bind(this)} />
                            </Grid.Column>
                        </Grid.Column>
                    </Grid.Column>



                </Grid>
            </div>
        )
    }

    renderLoading() {
        return (
            <Segment loading size='large'>
            </Segment>
        )
    }

}


const mapStateToProps = (state, ownProps) => {
    return {
        countyCodes: commonSelectors.getCountyCodes(state),

        constituencyCodesIsFetched: commonSelectors.getCountyConstituencyCodesFetchStatus(state),
        constituencyCodes: commonSelectors.getCountyConstituencyCodes(state),
        currentLevel: commonSelectors.getCurrentLevel(state),
        currentId: commonSelectors.getCurrentId(state),
        wardCodesIsFetched: commonSelectors.getWardCodesFetcchedstatus(state),
        wardCodes: commonSelectors.getWardCodes(state),

        facilitiesIsFetched: facilitySelectors.getFaciltiesFecthStatus(state),
        facilities: facilitySelectors.getFacilties(state),

        countySummaryIsFetched: facilitySelectors.getCountySummaryFetchStatus(state),
        countySummaryChartData: facilitySelectors.getCountySummaryChartData(state),
        currentFacilityInformationType: facilitySelectors.getCurrentFacilityInformationType(state)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        commonActions: bindActionCreators(commonActions, dispatch),
        facilityActions: bindActionCreators(facilityActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FacilityScreen)


