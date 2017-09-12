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

import CountyForm from "../Components/Forms/CountyForm"
import ConstituencyForm from "../Components/Forms/ConstituencyForm"
import WardForm from "../Components/Forms/WardForm"
import FacilityTypeForm from "../Components/Forms/FacilityTypeForm"
import KephLevelForm from "../Components/Forms/KephLevelForm"
import FacilityList from "../Components/FacilityList"
// import BarChart from "../Components/BarChart"
import BarChart from "../Components/Charts/BarChart"
import PieChart from "../Components/PieChart"
import LineChart from "../Components/Charts/LineChart"
import StackedBarChart from "../Components/Charts/StackedBarChart"
import MapChart from "../Components/Charts/MapChart"

class FacilityScreen extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.commonActions.fetchCountyIds()
        this.props.commonActions.changeLevel(levels.COUNTY)
        this.props.facilityActions.changeFacilityInformationType(facilityInformationType.SUMMARY)
        this.props.facilityActions.fetchFacilityTypes()
        this.props.facilityActions.fetchFacilityKephLevels()
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

    handleFacilityTypeChange(id){
        alert(id)
    }
    handleKephLevelChange(id){
        this.props.facilityActions.changeFacilityFilter({
            keph_level_id: id
        })
    }

    getData() {
        //check level and 
        switch (this.props.currentLevel) {
            case levels.COUNTY:
                switch (this.props.currentFacilityInformationType) {
                    case facilityInformationType.SUMMARY:

                        this.props.facilityActions.fetchCountySummary(this.props.currentId)
                        break

                    case facilityInformationType.LIST:
                        this.props.facilityActions.fetchFacilities(levels.COUNTY, this.props.currentId)
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
                        this.props.facilityActions.fetchConstituencySummary(this.props.currentId)
                        break

                    case facilityInformationType.LIST:
                        this.props.facilityActions.fetchFacilities(levels.CONSTITUENCY, this.props.currentId)
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
                        this.props.facilityActions.fetchWardSummary(this.props.currentId)
                        break

                    case facilityInformationType.LIST:
                        this.props.facilityActions.fetchFacilities(levels.WARD, this.props.currentId)
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

    getSummary() {
        switch (this.props.currentLevel) {
            case levels.COUNTY:
                return {
                    fetchStatus: this.props.countySummaryIsFetched,
                    summaryChartData: this.props.countySummaryChartData
                }
            case levels.CONSTITUENCY:
                return {
                    fetchStatus: this.props.constituencySummaryIsFetched,
                    summaryChartData: this.props.constituencySummaryChartData
                }
            case levels.WARD:
                return {
                    fetchStatus: this.props.wardSummaryIsFetched,
                    summaryChartData: this.props.wardSummaryChartData
                }
            default:
                break;
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
                        {/* <BarChart                            
                            countySummaryIsFetched={this.props.countySummaryIsFetched}
                            countySummaryChartData={this.props.countySummaryChartData} /> */}
                        {
                            this.getSummary().fetchStatus ? (
                                <Grid>
                                    <Grid.Row stretched centered>
                                        <Segment>
                                            {/* <StackedBarChart
                                                title="facilities Summary"
                                                dataExists={this.props.countySummaryIsFetched}
                                                data={this.getSummary().summaryChartData.facilitiesSummary}
                                                width={800}
                                                height={400}
                                            /> */}
                                            <BarChart
                                                data={this.getSummary().summaryChartData.facilitiesSummary}
                                                width={800} height={400}
                                                title="Number of facilities"
                                                xLabel='Constituencies' yLabel='Number of facilities'
                                            />

                                        </Segment>
                                    </Grid.Row>
                                    <Grid.Row columns={2}>
                                        <Grid.Column width={8}>
                                            <Segment>
                                                <StackedBarChart
                                                    title='Number of beds'
                                                    dataExists={this.props.countySummaryIsFetched}
                                                    data={this.getSummary().summaryChartData.bedsSummary}
                                                    width={400}
                                                    height={400}
                                                />
                                            </Segment>
                                        </Grid.Column>
                                        <Grid.Column width={8}>
                                            <Segment>
                                                <PieChart
                                                    title="Number of cots"
                                                    data={this.getSummary().summaryChartData.cotsSummary}
                                                    width={400}
                                                    height={400} />
                                            </Segment>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            ) : (
                                    <Segment loading size="large"></Segment>
                                )
                        }
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
                    <MapChart
                        height={500}
                        width={500}/>
                )
            }
        ]

        if (!this.props.countyCodes) return this.renderLoading()

        return (
            <div>
                <Grid columns='equal' padded stretched>
                    <Grid.Column stretched computer={4} mobile={16}>
                        <Grid.Column>
                            <Grid.Row>
                                <Header as='h2' textAlign='center'>
                                    Level
                                </Header>
                                <Grid.Column >
                                    <Tab menu={{ secondary: true, pointing: true }} panes={levelPanes} />
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row >
                                <Header as='h2' textAlign='center'>
                                    Facility Types
                                </Header>
                                <FacilityTypeForm
                                    facilityTypes={this.props.facilityTypes} 
                                    submitAction={this.handleFacilityTypeChange}/>
                            </Grid.Row>

                            <Grid.Row >
                                <Header as='h2' textAlign='center'>
                                    Keph Levels
                                </Header>
                                <KephLevelForm
                                    kephLevels={this.props.kephLevels} 
                                    submitAction={this.handleKephLevelChange.bind(this)}/>
                            </Grid.Row>
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

        facilityTypes: facilitySelectors.getFacilityTypes(state),
        kephLevels: facilitySelectors.getKephLevelsOptions(state),

        countySummaryIsFetched: facilitySelectors.getCountySummaryFetchStatus(state),
        countySummaryChartData: facilitySelectors.getCountySummaryXYData(state),

        constituencySummaryIsFetched: facilitySelectors.getConstituencySummaryFetchStatus(state),
        constituencySummaryChartData: facilitySelectors.getConstituencySummaryChartData(state),

        wardSummaryIsFetched: facilitySelectors.getWardSummaryFetchStatus(state),
        wardSummaryChartData: facilitySelectors.getWardSummaryChartData(state),

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


