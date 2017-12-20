import * as types from "./actionTypes"
import IndicatorService from "../../Services/IndicatorService"

export function showLoading(actionType) {
	return function(dispatch) {
		return dispatch({
			type: actionType
		})
	}
}

export function fetchIndicatorGroups() {
	return function(dispatch) {
		dispatch(showLoading(types.INDICATORGROUP_REQUESTED))
		return IndicatorService.getIndicatorGroups()
			.then(indicatorGroups => {
				return dispatch({
					type: types.INDICATORGROUP_RECEIVED,
					indicatorGroups
				})
			})
			.catch(error => {
				throw error
			})
	}
}

export function fetchIndicatorGroupIndicators(indicatorGroupId) {
	return function(dispatch) {
		dispatch(showLoading(types.INDICATORGROUP_INDICATORS_REQUESTED))
		return IndicatorService.getIndicatorGroupIndicators(indicatorGroupId)
			.then(indicatorGroupIndicators => {
				return dispatch({
					type: types.INDICATORGROUP_INDICATORS_RECEIVED,
					indicatorGroupIndicators
				})
			})
			.catch(error => {
				throw error
			})
	}
}

export function fetchPeriodTypes() {
	return function(dispatch) {
		dispatch(showLoading(types.PERIODTYPES_REQUESTED))
		return IndicatorService.getPeriodTypes()
			.then(periodTypes => {
				return dispatch({
					type: types.PERIODTYPES_RECEIVED,
					periodTypes
				})
			})
			.catch(error => {
				throw error
			})
	}
}

//facility related actions
export function addFacilityIndicator(indicatorId) {
	return function(dispatch) {
		return dispatch({
			type: types.ADD_FACILITY_INDICATOR_REQUESTED,
			indicatorId
		})
	}
}

export function removeFacilityIndicator(indicatorId) {
	return function(dispatch) {
		return dispatch({
			type: types.REMOVE_FACILITY_INDICATOR_REQUESTED,
			indicatorId
		})
	}
}

export function setFacilityPeriodType(periodTypeId) {
	return function(dispatch) {
		return dispatch({
			type: types.SET_FACILITY_PERIOD_TYPE_REQUESTED,
			periodTypeId
		})
	}
}

export function setFacilityYear(year) {
	return function(dispatch) {
		return dispatch({
			type: types.SET_FACILITY_YEAR_REQUESTED,
			year
		})
	}
}

export function fetchFacilityIndicatorValues(
	facilityId,
	indicators,
	periodTypeId,
	year
) {
	return function(dispatch) {
		dispatch({ type: types.GET_FACILITY_INDICATORS_VALUES_START })

		let filters = {
			facilityId,
			periodTypeId,
			year
		}

		indicators.map((indicator, i) => {
			dispatch({
				type: types.GET_FACILITY_INDIVIDUAL_SELECTED_INDICATOR_VALUES_REQUESTED,
				selectedIndicatorId: indicator.id
			})

			IndicatorService.getIndicatorDataValues({
				...filters,
				indicatorId: indicator.id
			})
				.then(indicatorDataValues => {
					if (indicatorDataValues.datavalues) {
						dispatch({
							type: types.GET_FACILITY_INDIVIDUAL_INDICATOR_VALUES_RECEIVED,
							indicatorDataValues,
							indicatorId: indicator.id,
							selectedIndicatorId: indicator.id
						})
					} else {
						dispatch({
							type:
								types.GET_FACILITY_INDIVIDUAL_SELECTED_INDICATOR_VALUES_ERROR,
							selectedIndicatorId: indicator.id
						})
					}
				})
				.catch(error => {
					throw error
					dispatch({
						type: types.GET_FACILITY_INDIVIDUAL_SELECTED_INDICATOR_VALUES_ERROR,
						selectedIndicatorId: indicator.id
					})
				})
		})
	}
}

export function clearFacilityIndicatorData() {
	return dispatch => {
		return dispatch({
			type: types.ClEAR_FACILITY_INDICATOR_DATA_REQUESTED
		})
	}
}

//ward related actions
export function addWardIndicator(indicatorId) {
	return dispatch => {
		return dispatch({
			type: types.ADD_WARD_INDICATOR_REQUESTED,
			indicatorId
		})
	}
}
