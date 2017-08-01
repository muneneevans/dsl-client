import * as types from "./actionTypes"
// import CommonService from "../../Services/CommonService"
import CommonService from "../../Services/CommonService"

export function showLoading(actionType){
   return function(dispatch, getState){       
       return dispatch({
           type: actionType
       })
   }
}

export function fetchCountyIds(){
    return function(dispatch, getState){
        return CommonService.getCountyIds()
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
        return CommonService.getCountyConstituencyCodes(countyId)
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
        return CommonService.getConstituencyWardCodes(constituencyId)
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

