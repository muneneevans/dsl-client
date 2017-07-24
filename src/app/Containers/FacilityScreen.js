import React, { Component } from "react"
import { connect } from 'react-redux'
import { Grid, Header, Segment, Dimmer, Loader} from 'semantic-ui-react'
import {bindActionCreators } from 'redux'

import * as facilitySelectors from "../Store/Facilities/reducer"
import * as facilityActions from "../Store/Facilities/actions"

class FacilityScreen extends Component{
    constructor(props){
        super(props)
        console.log(props.containerWidth)
    }

    componentDidMount(){
        this.props.facilityActions.fetchCountyIds()
        this.props.facilityActions.fetchFacilityTypes()
    }

    handleCountyClick(event){
        
    }
    
    render(){
        if(!this.props.countyCodes) return this.renderLoading()
        return(
           <Grid columns='equal' divided padded stretched>
               <Grid.Column stretched>
                   <Grid.Column>
                       <Header as='h2'  textAlign='center'>
                           Counties
                       </Header>
                       <Grid.Column >
                           <Segment.Group>
                                {
                                    this.props.countyCodes.map((county,i) =>(                                   
                                        <Segment key={i}
                                                onClick={() =>{
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

                <Grid.Column stretched>
                   <Grid.Column stretched>
                        <Header as='h2'  textAlign='center'>
                            Constituencies
                        </Header>
                       <Grid.Column stretched>         
                           <Segment.Group>                                   
                                {this.props.constituencyCodesIsFetched ? (
                                    this.props.constituencyCodes.map((constituency, i) => (
                                        <Segment key={i}
                                            onClick={()=>{
                                                this.props.facilityActions.fetchConstituencyWardCodes(constituency.id)
                                            }}
                                            >
                                            {constituency.name}
                                        </Segment>
                                    ))
                                ) : (
                                    <Segment  loading>
                                        <Segment color='grey'/>
                                        <Segment color='grey'/>
                                        <Segment color='grey'/>
                                        <Segment color='grey'/>
                                    </Segment>                 
                                )}
                            </Segment.Group>
                       </Grid.Column>
                   </Grid.Column>
                </Grid.Column>
                
                <Grid.Column stretched>
                   <Grid.Column stretched>
                        <Header as='h2'  textAlign='center'>
                           Wards
                       </Header>
                       <Grid.Column stretched>
                           <Segment.Group>
                                {this.props.wardCodesIsFetched ? (
                                    this.props.wardCodes.map((ward, i) => (
                                        <Segment 
                                            key={i}
                                            onClick={()=>{
                                                alert(ward.id)
                                            }}                                   
                                            >
                                            {ward.name}
                                        </Segment>
                                    ))
                                ) : (
                                    <Segment loading>
                                        <Segment color='grey'/>
                                        <Segment color='grey'/>
                                        <Segment color='grey'/>
                                        <Segment color='grey'/>                                
                                    </Segment>                 
                                )}
                            </Segment.Group>
                       </Grid.Column>
                   </Grid.Column>
                </Grid.Column>

           </Grid>
        )
    }

    renderLoading(){
        return(
            <Segment  size='large'>
                
            </Segment>         
        )
    }

    renderSkeletonListItems(){
        return(
            <Grid stackable loading>
                <Segment color='grey'/>
                <Segment color='grey'/>
                <Segment color='grey'/>
                <Segment color='grey'/>
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
        facilityActions: bindActionCreators(facilityActions,dispatch)
        // getCountyIds: () => dispatch(facilityActions.fetchCountyIds())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FacilityScreen)


