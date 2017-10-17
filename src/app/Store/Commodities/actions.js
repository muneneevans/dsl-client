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