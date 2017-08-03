import * as types from "./actionTypes"
import FacilityService from  "../../Services/FacilityService"

export function showLoading(actionType){
   return function(dispatch, getState){       
       return dispatch({
           type: actionType
       })
   }
}

export function fetchCountyFacilities(countyId){
    return function(dispatch, getState){
        dispatch(showLoading(types.COUNTY_FACILITIES_REQUESTED))
        return FacilityService.getCountyFacilities(countyId)
            .then(countyFacilities =>{
                return dispatch({
                    type: types.COUNTY_FACILITIES_RECEIVED,
                    countyFacilities
                })
            })
            .catch(error =>{
                throw(error)
            })
    }
}

export function fetchCountySummary(countyId){
    return function(dispatch, getState){
        dispatch(showLoading(types.COUNTY_SUMMARY_REQUESTED))
        return FacilityService.getCountySummary(countyId)
            .then(countySummary =>{
                return dispatch({
                    type: types.COUNTY_SUMMARY_RECEIVED,
                    countySummary
                })
            })
            .catch(error =>{
                throw(error)
            })
    }
}

export function fetchConstituencyFacilities(constituencyId){
    return function(dispatch, getState){
        dispatch(showLoading(types.CONSTITUENCY_FACILITIES_REQUESTED))
        return FacilityService.getConstituencyFacilities(constituencyId)
            .then(constituencyFacilities =>{                
                return dispatch({
                    type: types.CONSTITUENCY_FACILITIES_RECEIVED,
                    constituencyFacilities
                })
            })
            .catch(error =>{
                throw(error)
            })
    }
}

export function fetchWardFacilities(wardId){
    return function(dispatch, getState){
        dispatch(showLoading(types.WARD_FACILITIES_REQUESTED))
        return FacilityService.getWardFacilities(wardId)
            .then(wardFacilities => {
                return dispatch({
                    type: types.WARD_FACILITIES_RECEIVED,
                    wardFacilities
                })
            })
            .catch(error =>{
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
