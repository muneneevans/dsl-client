import React, { Component } from "react"
import { connect } from 'react-redux'
import { Grid, Card, Divider, Menu, Container } from 'semantic-ui-react'
import {bindActionCreators } from 'redux'

import * as facilitySelectors from "../Store/Facilities/reducer"
import * as facilityActions from "../Store/Facilities/actions"

class FacilityScreen extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.facilityActions.fetchCountyIds()
    }

    handleCountyClick(event){
        
    }
    
    render(){
        if(!this.props.countyIds) return this.renderLoading()
        return(
            <div>
                <h1> Facilities </h1>

                <Grid columns={2} centered padded>
                    <Grid.Row columns={2} padded centered textAlign='left'>
                        <Grid.Column centered>
                            <Card  padded textAlign='left'>
                                <Container className='ui padded vertical segment' textAlign='left'>                                                                      
                                    <p className='header' textAlign='left'>Counties</p>                                
                                </Container>            
                                {
                                    this.props.countyIds.map((county,i)=>(
                                        <Container 
                                            key={county.id}
                                            className='ui padded vertical segment' textAlign='left'
                                            onClick={()=>{                                            
                                                this.props.facilityActions.fetchCountyConstituencyCodes(county.id)
                                            }}
                                            >

                                            <p className='text-left' textAlign='left'>{ county.name}</p>
                                            {/*<Divider fitted></Divider>*/}
                                        </Container>                                                                    
                                    ))
                                }

                                
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Card   textAlign='left'>
                                <Container className='ui padded vertical segment' textAlign='left'>                                                                      
                                    <p className='header' textAlign='left'>Counties</p>                                
                                </Container>
                                {() =>{
                                    if(!this.props.constituencyCodes) return renderLoading()
                                
                                    this.props.constituencyCodes.map((constituency,i)=>(
                                        <Container 
                                            key={constituency.id}
                                            className='ui padded vertical segment' textAlign='left'
                                            onClick={()=>{}}
                                            >

                                            <p className='text-left' textAlign='left'>{ constituency.name}</p>
                                            {/*<Divider fitted></Divider>*/}
                                        </Container>                                                                    
                                    ))                                
                                }}
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }

    renderLoading(){
        return(
            <h4>Loading</h4>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        countyIds: facilitySelectors.getCountyIds(state),
        constituencyCodes: facilitySelectors.getCountyConstituencyCodes(state)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        facilityActions: bindActionCreators(facilityActions,dispatch)
        // getCountyIds: () => dispatch(facilityActions.fetchCountyIds())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FacilityScreen)


