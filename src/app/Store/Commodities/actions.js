import * as types from "./actionTypes"
import CommodityService from "../../Services/CommodityService"



export function fetchProducts() {
    return function (dispatch, getState) {
        return CommodityService.getProducts()
            .then(products => {
                dispatch({
                    type: types.PRODUCTS_RECEIVED,
                    products
                })
            })
            .catch(error => {
                throw (error)
            })
    }
}

export function fetchFacilityProducts(facilityId){
    return function (dispatch, getState){
        dispatch({type: types.FACILITY_PRODUCTS_REQUESTED})
        return CommodityService.getFacilityProducts(facilityId)
            .then(facilityProducts =>{
                dispatch({
                    type: types.FACILITY_PRODUCTS_RECEIVED,
                    facilityProducts
                })
            })
            .catch(error => {
                throw(error)
            })
    }
}