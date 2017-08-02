import React, { Component } from "react"
import { connect } from 'react-redux'
import { Grid, Header, Segment, Dimmer, Loader, Tab, Menu } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'

import * as commonSelectors from "../Store/Common/selectors"
import * as commonActions from "../Store/Common/actions"

import * as facilitySelectors from "../Store/Facilities/selectors"
import * as facilityActions from "../Store/Facilities/actions"

import CountyForm from "../Components/CountyForm"
import ConstituencyForm from "../Components/ConstituencyForm"
import WardForm from "../Components/WardForm"
import FacilityList  from "../Components/FacilityList"

class FacilityScreen extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.commonActions.fetchCountyIds()
    }

    handleCountyClick(event) {

    }

    render() {
        const panes = [
            {
                menuItem: 'Counties', render: () =>
                    <Tab.Pane attached={false}>
                        <CountyForm 
                            countyCodes={this.props.countyCodes} 
                            fetchCountyConstituencyCodes={this.props.commonActions.fetchCountyConstituencyCodes} 
                            fetchCountyFacilities={this.props.facilityActions.fetchCountyFacilities}/>
                    </Tab.Pane>
            },
            {
                menuItem: 'Constituencies', render: () =>
                    <Tab.Pane attached={false}>
                        <ConstituencyForm
                            countyCodes={this.props.countyCodes}
                            fetchCountyConstituencyCodes={this.props.commonActions.fetchCountyConstituencyCodes}
                            constituencyCodesIsFetched={this.props.constituencyCodesIsFetched}
                            constituencyCodes={this.props.constituencyCodes}
                            fetchConstituencyWardCodes={this.props.commonActions.fetchConstituencyWardCodes}
                            fetchConstituencyFacilities={this.props.facilityActions.fetchConstituencyFacilities}/>
                   </Tab.Pane>
            },
            { 
                menuItem: 'Wards', render: () => 
                    <Tab.Pane attached={false}>
                        <WardForm
                            countyCodes={this.props.countyCodes}
                            fetchCountyConstituencyCodes={this.props.commonActions.fetchCountyConstituencyCodes}
                            constituencyCodesIsFetched={this.props.constituencyCodesIsFetched}
                            constituencyCodes={this.props.constituencyCodes}
                            fetchConstituencyWardCodes={this.props.commonActions.fetchConstituencyWardCodes}
                            wardCodesIsFetched={this.props.wardCodesIsFetched}
                            wardCodes={this.props.wardCodes}
                            fetchWardFacilities={this.props.facilityActions.fetchWardFacilities}/>
                   </Tab.Pane>
                
            },
        ]

        if (!this.props.countyCodes) return this.renderLoading()

        return (
            <div>
                <Grid columns='equal'  padded stretched>
                    <Grid.Column 
                        stretched 
                        computer={4} 
                        mobile={16}>
                        <Grid.Column>
                            <Header as='h2' textAlign='center'>
                                Level
                            </Header>
                            <Grid.Column >
                                <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
                            </Grid.Column>
                        </Grid.Column>
                    </Grid.Column>

                    <Grid.Column
                        stretched
                        >
                        <Grid.Column stretched>
                            <Header as='h2' textAlign='center'>
                                Facilities
                            </Header>
                            <Grid.Column stretched>
                                <FacilityList
                                    facilitiesIsFetched={this.props.facilitiesIsFetched}
                                    facilities={this.props.facilities}/>
                            </Grid.Column>
                        </Grid.Column>
                    </Grid.Column>

                   

                </Grid>
            </div>
        )
    }

    renderLoading() {
        return (
            <Segment size='large'>

            </Segment>
        )
    }

    renderSkeletonListItems() {
        return (
            <Grid stackable loading>
                <Segment color='grey' />
                <Segment color='grey' />
                <Segment color='grey' />
                <Segment color='grey' />
            </Grid>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        countyCodes: commonSelectors.getCountyCodes(state),

        constituencyCodesIsFetched: commonSelectors.getCountyConstituencyCodesFetchStatus(state),
        constituencyCodes: commonSelectors.getCountyConstituencyCodes(state),

        wardCodesIsFetched: commonSelectors.getWardCodesFetcchedstatus(state),
        wardCodes: commonSelectors.getWardCodes(state),

        facilitiesIsFetched: facilitySelectors.getFaciltiesFecthStatus(state),
        facilities: facilitySelectors.getFacilties(state)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        commonActions: bindActionCreators(commonActions, dispatch),
        facilityActions: bindActionCreators(facilityActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FacilityScreen)


