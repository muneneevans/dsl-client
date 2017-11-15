import * as types from "./actionTypes"

import StaffService from "../../Services/StaffService"


export function fetchJobTypes(){
    return function ( dispatch, getState ){
        dispatch({type: types.JOB_TYPES_REQUESTED})
        return StaffService.getJobTypes()
            .then(jobTypes =>{
                return dispatch({
                    type: types.JOB_TYPES_RECEIVED,
                    jobTypes
                })
            })
            .catch(error => {
                throw(error)
            })
    }
}


export function fetchCadres(){
    return (dispatch, getState) =>{
        dispatch({ type: types.CADRES_REQUESTED})
        return StaffService.getCadres()
            .then(cadres => {
                return dispatch({
                    type: types.CADRES_RECEIVED,
                    cadres
                })
            }).catch(eror =>{
                throw(error)
            })
    }
}

export function fetchFacilityStaff(facilityId){
    return (dispatch, getState) =>{
        return StaffService.getFacilityStaff(facilityId)
            .then(facilityStaff =>{
                return dispatch({
                    type: types.FACILITY_STAFF_RECEIVED,
                    facilityStaff
                })
            })
            .catch(error => {
                throw(error)
            })
    }
}

export function addSelectedFacilityJobType(jobTypeId){
    return function(dispatch, getState){
        return dispatch({
            type: types.ADD_SELECTED_FACILITY_JOB_TYPE_REQUESTED,
            jobTypeId
        })
    }
}

export function removeSelectedFacilityJobType(jobTypeId){
    return function (dispatch, getState){
        return dispatch({
            type: types.REMOVE_SELECTED_FACILITY_JOB_TYPE_REQUESTED,
            jobTypeId
        })
    }
}