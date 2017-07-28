import * as types from "./actionTypes"
import IndicatorService from "../../Services/IndicatorService"

export function showLoading(actionType){
   return function(dispatch, getState){     
       return dispatch({
           type: actionType
       })
   }
}

export function fetchDataElements(){
    return function(dispatch, getState){
        dispatch(showLoading(types.DATAELEMENTS_REQUESTED))
        return IndicatorService.getDatalements()
            .then(dataElements=>{
                dispatch({
                    type: types.DATAELEMENTS_RECEIVED,
                    dataElements
                })
            })
            .catch(error=>{
                throw(error)
            })
    }
}