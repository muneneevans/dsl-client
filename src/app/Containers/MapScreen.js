require('babel-polyfill')
import React, { Component } from "react"
import { connect } from 'react-redux'
import { autoBind } from "react-autobind"
import * as mapActions from "../Store/Maps/actions"
import * as mapSelectors from "../Store/Maps/reducer"


class MapScreen extends Component{
    //code here

    constructor(props) {
        super(props);
        // autoBind(this);
    }

    componentDidMount() {
        this.props.fetchCountyMap();
    }
    render(){
        return(
            <div>
                <h1>Map</h1>
                {/*<button onClick={this.props.fetchCountyMap}>hshd</button>*/}
            </div>
        );
    }
}




const mapStateToProps = (state, ownProps) => {
    return {
        kenyaCountyMap: mapSelectors.getKenyaCountyMap(state)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        fetchCountyMap: () => dispatch( mapActions.fetchCountyMap())
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)