import * as types from "./actionTypes"
import Immutable from "seamless-immutable"

const initialState = Immutable({
    products: undefined,
    facilityProducts: undefined,
    facilityYearProducts: undefined
})

export default function commodityReducer(state = initialState, action = {}) {
    switch (action.type) {
        case types.PRODUCTS_REQUESTED:
            return state
        case types.PRODUCTS_RECEIVED:
            return state.merge({
                products: action.products
            })

        case types.FACILITY_PRODUCTS_REQUESTED:
            return state
        case types.FACILITY_PRODUCTS_RECEIVED:
            return state.merge({
                facilityProducts: action.facilityProducts
            })

        case types.FACILITY_YEAR_PRODUCT_REQUESTED:
            return state
        case types.FACILITY_YEAR_PRODUCTS_RECEIVED:
            return state.merge({
                facilityYearProducts: action.facilityYearProducts
            })
        case types.CLEAR_FACILITY_PRODUCTS_DATA:
            return state.merge({
                facilityYearProducts: undefined,
                facilityProducts: undefined,
            })
        default:
            return state
    }
}