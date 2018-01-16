import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import * as commoditySelectors from "../../Store/Commodities/selectors"
import * as commodityActions from "../../Store/Commodities/actions"

class CommoditiesPage extends Component {

	constructor(props) { super(props) }

	componentDidMount() {
		this.props.commodityActions.fetchCountryJobTypes()
	}

	render() {
		return (
			<h1>Commodities Page </h1>
		)
	}
}

const mapStateToProps = state => {
	return {
		countryJobTypeSummary: commoditySelectors.getCountryJobTypeSummary(state.commodityReducer)
	}
}

const mapDispatchToProps = dispatch => {
	return {		
	}
}

const CommodityPageContainer = connect(mapStateToProps, mapDispatchToProps)(CommoditiesPage)

export default CommodityPageContainer