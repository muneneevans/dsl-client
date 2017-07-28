import React, { Component } from "react"
import { connect } from 'react-redux'
import { Grid, Card, Header, Segment, Dimmer, Loader, Form, Input, Select} from 'semantic-ui-react'
import {bindActionCreators } from 'redux'

import * as facilitySelectors from "../Store/Facilities/reducer"
import * as facilityActions from "../Store/Facilities/actions"

import * as indicatorSelectors from "../Store/Indicators/reducer"
import * as indicatorActions from "../Store/Indicators/actions"

class IndicatorScreen extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.indicatorActions.fetchDataElements()
        this.props.facilityActions.fetchCountyIds()
    }

    handleEvent(event){
        event.preventDefault()
        alert(event.target.value)
    }

    render(){
        if(!this.props.countyCodes) return this.renderLoading()
        return(
            <Grid columns={2} divided padded stretched>
                <Grid.Column
                    computer={5}>
                    <Card fluid>
                        <Card.Content>
                            <Form>
                                <Form.Field>
                                    <label>County</label>
                                    <select                                        
                                        placeholder='select a county'>
                                        {
                                            this.props.countyCodes.map((county,i) =>(                                   
                                                <option key={i} value={i}
                                                        >
                                                    {county.name}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </Form.Field>
                                <Form.Field>
                                    <label>Data Element</label>                                    
                                    <select
                                        placeholder='select a data element'>
                                           {this.props.dataElementsIsFetched ? (
                                                this.props.dataElements.map((dataElement,i) => (
                                                    <option>{dataElement.dataelementname}</option>
                                                ))
                                           ):(
                                                <option>Loading</option>
                                           )}
                                    </select>
                                </Form.Field>
                            </Form>
                        </Card.Content>
                    </Card>
                </Grid.Column>            
            </Grid>
        );
    }

    renderLoading(){
        return(
            <Segment  size='large'>
                
            </Segment>         
        )
    }
}



const mapStateToProps = (state, ownProps) => {
    return {
        countyCodes: facilitySelectors.getCountyCodes(state),
        constituencyCodes: facilitySelectors.getCountyConstituencyCodes(state),
        constituencyCodesIsFetched: facilitySelectors.getCountyConstituencyCodesFetchStatus(state),
        wardCodesIsFetched: facilitySelectors.getWardCodesFetcchedstatus(state),
        wardCodes: facilitySelectors.getWardCodes(state),
        dataElementsIsFetched: indicatorSelectors.getDataElementFetchStatus(state),
        dataElements: indicatorSelectors.getDataElements(state)
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        facilityActions: bindActionCreators(facilityActions,dispatch),
        indicatorActions: bindActionCreators(indicatorActions,dispatch)
        // getCountyIds: () => dispatch(facilityActions.fetchCountyIds())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(IndicatorScreen)