import * as types from "./actionTypes"

import StaffService from "../../Services/StaffService"


export function fetchJobTypes() {
    return function (dispatch, getState) {
        dispatch({ type: types.JOB_TYPES_REQUESTED })
        return StaffService.getJobTypes()
            .then(jobTypes => {
                return dispatch({
                    type: types.JOB_TYPES_RECEIVED,
                    jobTypes
                })
            })
            .catch(error => {
                throw (error)
            })
    }
}

export function fetchCadres() {
    return (dispatch, getState) => {
        dispatch({ type: types.CADRES_REQUESTED })
        return StaffService.getCadres()
            .then(cadres => {
                return dispatch({
                    type: types.CADRES_RECEIVED,
                    cadres
                })
            }).catch(eror => {
                throw (error)
            })
    }
}

export function fetchAllFacilityStaff(facilityId) {
    return (dispatch, getState) => {
        return StaffService.getFacilityStaff(facilityId)
            .then(facilityStaff => {
                return dispatch({
                    type: types.FACILITY_STAFF_RECEIVED,
                    facilityStaff
                })
            })
            .catch(error => {
                throw (error)
            })
    }
}

export function clearFacilityStaffData() {
    return (dispatch, getState) => {
        return dispatch({ type: types.CLEAR_FACILITY_STAFF_DATA_REQUESTED })
    }
}
export function addSelectedFacilityJobType(jobTypeId) {
    return function (dispatch, getState) {
        return dispatch({
            type: types.ADD_SELECTED_FACILITY_JOB_TYPE_REQUESTED,
            jobTypeId
        })
    }
}

export function removeSelectedFacilityJobType(jobTypeId) {
    return function (dispatch, getState) {
        return dispatch({
            type: types.REMOVE_SELECTED_FACILITY_JOB_TYPE_REQUESTED,
            jobTypeId
        })
    }
}


export function fetchFacilitySelectedStaff(facilityId, jobTypes) {
    return (dispatch, getState) => {
        //loop through each job type and get the number of staff
        dispatch({ type: types.GET_FACILITY_SELECTED_JOB_TYPES_START })
        
        jobTypes.map((jobType, i) => {
            //mark the job type as requested
            dispatch({
                type: types.GET_FACILITY_INDIVIDUAL_SELECTED_JOB_TYPES_REQUESTED,
                jobTypeId: jobType.id
            })
            StaffService.getFacilityJobType(facilityId, jobType.uid)
                .then(facilityJobTypeDataValues => {
                    //add the values to current list
                    dispatch({
                        type: types.GET_FACILITY_INDIVIDUAL_SELECTED_JOB_TYPES_VALUES_RECEIVED,
                        jobTypeId: jobType.id,
                        dataValues :facilityJobTypeDataValues
                    })
                })
                .catch(error => {

                })
        })
        //mark the collective process as complete
        dispatch({ type: types.GET_FACILITY_SELECTED_JOB_TYPES_STOP })
    }
}
