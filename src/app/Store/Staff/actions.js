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