import * as types from "./actionTypes"

export function showLoading(actionType){
   return function(dispatch, getState){       
       return dispatch({
           type: actionType
       })
   }
}

export function fetchFacilityTypes(){
    return function(dispatch, getState){
        return CommonService.getFacilityTypes()
            .then(facilityTypes => {
                return dispatch({
                    type: types.FACILITY_TYPES_RECEIVED,
                    facilityTypes
                })
            })
            .catch(error => {
                throw(error)
            })
    }
}

export function fetchFacilityKephLevels(){
    return function(dispatch, getState){
        return CommonService.getFaciityKephLevels()
            .then(kephLevels => {
                return dispatch({
                    type: types.FACILITY_KEPH_LEVELS_RECEIVED,
                    kephLevels
                })
            })
            .catch(error => {
                throw(error)
            })
    }
}