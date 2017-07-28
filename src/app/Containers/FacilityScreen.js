import React, { Component } from "react"
import { connect } from 'react-redux'
import { Grid, Header, Segment, Dimmer, Loader, Tab, Menu } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'

import * as facilitySelectors from "../Store/Facilities/reducer"
import * as facilityActions from "../Store/Facilities/actions"

import CountyForm from "../Components/CountyForm"

class FacilityScreen extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.facilityActions.fetchCountyIds()
        // this.props.facilityActions.fetchFacilityTypes()
        // this.props.facilityActions.fetchFacilityKephLevels()
    }

    handleCountyClick(event) {

    }



    render() {
        const panes = [
            {
                menuItem: 'Counties', render: () => 
                    <Tab.Pane attached={false}>
                        <CountyForm countyCodes={this.props.countyCodes} fetchCountyConstituencyCodes={this.props.facilityActions.fetchCountyConstituencyCodes} />
                    </Tab.Pane>
            },
            { menuItem: 'Constituencies', render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane> },
            { menuItem: 'Wards', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> },
        ]

        if (!this.props.countyCodes) return this.renderLoading()

        return (
            <div>
                <Grid columns='equal' divided padded stretched>
                    <Grid.Column stretched computer={4}>
                        <Grid.Column>
                            <Header as='h2' textAlign='center'>
                                Level
                            </Header>
                            <Grid.Column >
                                <Tab menu={{ secondary: true, pointing: true}} panes={panes} />

                                <Segment.Group>
                                    {
                                        this.props.countyCodes.map((county, i) => (
                                            <Segment key={i}
                                                onClick={() => {
                                                    this.props.facilityActions.fetchCountyConstituencyCodes(county.id)
                                                }}>
                                                {county.name}
                                            </Segment>
                                        ))
                                    }
                                </Segment.Group>
                            </Grid.Column>
                        </Grid.Column>
                    </Grid.Column>

                    <Grid.Column 
                        stretched
                        computer={6}>
                        <Grid.Column stretched>
                            <Header as='h2' textAlign='center'>
                                Constituencies
                            </Header>
                            <Grid.Column stretched>
                                <Segment.Group>
                                    {this.props.constituencyCodesIsFetched ? (
                                        this.props.constituencyCodes.map((constituency, i) => (
                                            <Segment key={i}
                                                onClick={() => {
                                                    this.props.facilityActions.fetchConstituencyWardCodes(constituency.id)
                                                }}
                                            >
                                                {constituency.name}
                                            </Segment>
                                        ))
                                    ) : (
                                            <Segment loading>
                                                <Segment color='grey' />
                                                <Segment color='grey' />
                                                <Segment color='grey' />
                                                <Segment color='grey' />
                                            </Segment>
                                        )}
                                </Segment.Group>
                            </Grid.Column>
                        </Grid.Column>
                    </Grid.Column>

                    <Grid.Column 
                        stretched
                        computer={6}>
                        <Grid.Column stretched>
                            <Header as='h2' textAlign='center'>
                                Wards
                        </Header>
                            <Grid.Column stretched>
                                <Segment.Group>
                                    {this.props.wardCodesIsFetched ? (
                                        this.props.wardCodes.map((ward, i) => (
                                            <Segment
                                                key={i}
                                                onClick={() => {
                                                    alert(ward.id)
                                                }}
                                            >
                                                {ward.name}
                                            </Segment>
                                        ))
                                    ) : (
                                            <Segment loading>
                                                <Segment color='grey' />
                                                <Segment color='grey' />
                                                <Segment color='grey' />
                                                <Segment color='grey' />
                                            </Segment>
                                        )}
                                </Segment.Group>
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
        countyCodes: facilitySelectors.getCountyCodes(state),
        constituencyCodes: facilitySelectors.getCountyConstituencyCodes(state),
        constituencyCodesIsFetched: facilitySelectors.getCountyConstituencyCodesFetchStatus(state),
        wardCodesIsFetched: facilitySelectors.getWardCodesFetcchedstatus(state),
        wardCodes: facilitySelectors.getWardCodes(state)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        facilityActions: bindActionCreators(facilityActions, dispatch)
        // getCountyIds: () => dispatch(facilityActions.fetchCountyIds())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FacilityScreen)


