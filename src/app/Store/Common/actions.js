import * as types from "./actionTypes"
// import CommonService from "../../Services/CommonService"
import CommonService from "../../Services/CommonService"

export function showLoading(actionType) {
	return function(dispatch) {
		return dispatch({
			type: actionType
		})
	}
}

export function fetchCountyIds() {
	return function(dispatch) {
		return CommonService.getCountyIds()
			.then(countyCodes => {
				dispatch({
					type: types.COUNTY_CODES_FETCHED,
					countyCodes
				})
			})
			.catch(error => {
				throw error
			})
	}
}

export function fetchCountyConstituencyCodes(countyId) {
	return function(dispatch) {
		dispatch(showLoading(types.COUNTY_CONSTITUENCY_CODES_REQUESTED))
		dispatch({
			type: types.CHANGE_CURRENT_ID,
			currentId: countyId
		})
		return CommonService.getCountyConstituencyCodes(countyId)
			.then(constituencyCodes => {
				dispatch({
					type: types.COUNTY_CONSTITUENCY_CODES_FETCHED,
					constituencyCodes
				})
			})
			.catch(error => {
				throw error
			})
	}
}

export function fetchConstituencyWardCodes(constituencyId) {
	return function(dispatch) {
		dispatch(showLoading(types.CONSTITUENCY_WARD_CODES_REQUESTED))
		return CommonService.getConstituencyWardCodes(constituencyId)
			.then(wardCodes => {
				return dispatch({
					type: types.CONSTITUENCY_WARD_CODES_FETCHED,
					wardCodes
				})
			})
			.catch(error => {
				throw error
			})
	}
}

export function changeLevel(level) {
	return function(dispatch) {
		return dispatch({
			type: types.CHANGE_LEVEL,
			level
		})
	}
}

export function changeCurrentId(currentId) {
	return function(dispatch) {
		return dispatch({
			type: types.CHANGE_CURRENT_ID,
			currentId
		})
	}
}

export function fetchWardDetails(wardId) {
	return dispatch => {
		return CommonService.getWardDetails(wardId)
			.then(wardDetails => {
				return dispatch({
					type: types.GET_WARD_DETAILS_RECEIVED,
					wardDetails: wardDetails[0]
				})
			})
			.catch(error => {
				throw error
			})
	}
}

export function fetchConstituencyDetails(constituencyId) {
	return dispatch => {
		return CommonService.getConstituencyDetails(constituencyId)
			.then(constituencyDetails => {				
				return dispatch({
					type: types.GET_CONSTITUENCY_DETAILS_RECEIVED,
					constituencyDetails: constituencyDetails[0]
				})
			})
			.catch(error => {
				throw error
			})
	}
}
