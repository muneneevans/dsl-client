import * as types from "./actionTypes"
import FacilityService from "../../Services/FacilityService"

export function fetchCountyIds(){
    return function(dispatch, getState){
        return FacilityService.getCountyIds()
        .then(countyIds=>{            
            dispatch({
                type: types.COUNTY_CODES_FETCHED,
                countyIds
            })
        })
        .catch(error => {
            throw(error)
        })
    }
}

export function fetchCountyConstituencyCodes(countyId){
    return function(dispatch, getState){
        return FacilityService.getCountyConstituencyCodes(countyId)
            .then(constituencyCodes => {
                console.log(constituencyCodes)
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