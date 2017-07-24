import * as types from "./actionTypes"
import FacilityService from "../../Services/FacilityService"

export function showLoading(actionType){
   return function(dispatch, getState){       
       return dispatch({
           type: actionType
       })
   }
}

export function fetchCountyIds(){
    return function(dispatch, getState){
        return FacilityService.getCountyIds()
        .then(countyCodes=>{
            dispatch({
                type: types.COUNTY_CODES_FETCHED,
                countyCodes
            })
        })
        .catch(error => {
            throw(error)
        })
    }
}

export function fetchCountyConstituencyCodes(countyId){
    return function(dispatch, getState){
        dispatch(showLoading(types.COUNTY_CONSTITUENCY_CODES_REQUESTED))
        return FacilityService.getCountyConstituencyCodes(countyId)
            .then(constituencyCodes => {                
                dispatch({
                    type: types.COUNTY_CONSTITUENCY_CODES_FETCHED,
                    constituencyCodes
                })
            })
            .catch(error =>{
                throw(error)
            })
    }
}

export function fetchConstituencyWardCodes(constituencyId){
    return function(dispatch, getState){
        dispatch(showLoading(types.CONSTITUENCY_WARD_CODES_REQUESTED))
        return FacilityService.getConstituencyWardCodes(constituencyId)
            .then(wardCodes =>{
                return dispatch({
                    type: types.CONSTITUENCY_WARD_CODES_FETCHED,
                    wardCodes
                })
            })
            .catch(error => {
                throw(error)
            })
    }
}

export function fetchFacilityTypes(){
    return function(dispatch, getState){
        return FacilityService.getFacilityTypes()
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
        return FacilityService.getFaciityKephLevels()
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