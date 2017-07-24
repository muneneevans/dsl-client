import React, { Component } from "react"  
import ChartScreen from "./ChartScreen"
import FacilityScreen from "./FacilityScreen"
import MapScreen from "./MapScreen"
import Dimensions from "react-dimensions"

class App extends Component{
    render(){
        return(                        
            <FacilityScreen
                containerWidth={this.props.containerWidth}
                containerHeight={this.props.containerHeight}
            />            
        );
    }
}


export default Dimensions()(App)