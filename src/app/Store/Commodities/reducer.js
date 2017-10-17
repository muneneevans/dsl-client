import * as types from "./actionTypes"
import Immutable from "seamless-immutable"

const initialState = Immutable({
    products: undefined
})

export default function commodityReducer(state = initialState, action = {}) {
    switch (action.type) {
        case types.PRODUCTS_REQUESTED:
            return state.merge({})

        case types.PRODUCTS_RECEIVED:
            return state.merge({
                products: action.products
            })

        default:
            return state
    }
}