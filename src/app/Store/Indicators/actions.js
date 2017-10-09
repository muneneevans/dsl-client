import * as types from "./actionTypes"
import IndicatorService from "../../Services/IndicatorService"

export function showLoading(actionType) {
    return function (dispatch, getState) {
        return dispatch({
            type: actionType
        })
    }
}

export function fetchIndicatorGroups() {
    return function (dispatch, getState) {
        dispatch(showLoading(types.INDICATORGROUP_REQUESTED))
        return IndicatorService.getIndicatorGroups()
            .then(indicatorGroups => {
                return dispatch({
                    type: types.INDICATORGROUP_RECEIVED,
                    indicatorGroups
                })
            })
            .catch(error => {
                throw(error)
             })
    }
}

export function fetchDataElements() {
    return function (dispatch, getState) {
        dispatch(showLoading(types.DATAELEMENTS_REQUESTED))
        return IndicatorService.getDatalements()
            .then(dataElements => {
                dispatch({
                    type: types.DATAELEMENTS_RECEIVED,
                    dataElements
                })
            })
            .catch(error => {
                throw (error)
            })
    }
}

export function fetchFacilityDataElementDataValues(facilityId, dataElementId) {
    return function (dispatch, getState) {
        dispatch(showLoading(types.FACILITY_DATAELEMENT_DATAVALUES_REQUESTED))
        return IndicatorService.getFacilityDataElementDatavalues(facilityId, dataElementId)
            .then(dataValues => {
                dataValues.sort((a, b) => a.periodid = b.periodid)
                dispatch({
                    type: types.FACILITY_DATAELEMENT_DATAVALUES_RECEIVED,
                    dataValues: dataValues
                })
            })
            .catch(error => { })
    }
}