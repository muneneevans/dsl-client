require('babel-polyfill')
import React, { Component } from "react"
import { connect } from 'react-redux'
import { autoBind } from "react-autobind"
import * as mapActions from "../../Store/Maps/actions"
import * as mapSelectors from "../../Store/Maps/reducer"
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client" ;
import MapChart from "../../Components/Charts/MapChart"
import VertiChart from "../../Components/Charts/ReactVis/VerticalBarChart"
class MapScreen extends Component{
    //code here

    constructor(props) {
        super(props);
        // autoBind(this);
    }




    componentDidMount() {
        // this.props.fetchCountyMap();
    }

    render(){
        return(
           <VertiChart/>
        )
    }

   renderLoading() {
    return (
      <p>Loading...</p>
    );
  }
}




const mapStateToProps = (state, ownProps) => {
    return ({
        kenyaCountyMap: mapSelectors.getKenyaCountyMap(state)
    })
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        fetchCountyMap: () => dispatch( mapActions.fetchCountyMap())
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)
