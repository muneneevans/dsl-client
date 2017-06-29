require('babel-polyfill')
import React, { Component } from "react"
import { connect } from 'react-redux'
import { autoBind } from "react-autobind"
import * as mapActions from "../Store/Maps/actions"
import * as mapSelectors from "../Store/Maps/reducer"
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client" ;


class MapScreen extends Component{
    //code here

    constructor(props) {
        super(props);
        // autoBind(this);
    }

    projection(){
        return geoMercator()
            .scale(900)
            .translate([800/10,450/2 ])
    }




    componentDidMount() {
        this.props.fetchCountyMap();
    }

    render(){
        if (!this.props.kenyaCountyMap) return this.renderLoading();
        Map = feature(this.props.kenyaCountyMap, this.props.kenyaCountyMap.objects.kenya2).features
        return(
            <div>
                <h1>Map</h1>
                  <svg width={ 800 } height={ 450 } viewBox="0 0 800 450" >
                    <g className="countries" >
                    {
                        Map.map((d,i) => (
                        <path
                            onClick={()=> {alert( `${ d }`)}}
                            key={ `path-${ i }` }
                            d={ geoPath().projection(this.projection())(d) }
                            className="country"
                            fill={ `rgba(38,50,56,${1 / Map.length * i})` }
                            stroke="#FFFFFF"
                            strokeWidth={ 0.5 }
                        />
                        ))
                    }
                    </g>
                    <g className="markers">
                    <circle
                        cx={ this.projection()([8,48])[0] }
                        cy={ this.projection()([8,48])[1] }
                        r={ 10 }
                        fill="#E91E63"
                        className="marker"
                    />
                    </g>
                </svg>
            </div>
        );
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