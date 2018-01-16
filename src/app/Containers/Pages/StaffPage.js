import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import * as staffSelectors from "../../Store/Staff/selectors"
import * as staffActions from "../../Store/Staff/actions"

class StaffPage extends Component {

	constructor(props) { super(props) }

	componentDidMount() {
		this.props.staffActions.fetchCountryJobTypes()
	}

	render() {
		return (
			<h1>Staff Page </h1>
		)
	}
}

const mapStateToProps = state => {
	return {
		countryJobTypeSummary: staffSelectors.getCountryJobTypeSummary(state.staffReducer)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		staffActions: bindActionCreators(staffActions, dispatch)
	}
}

const StaffPageContainer = connect(mapStateToProps, mapDispatchToProps)(StaffPage)

export default StaffPageContainer