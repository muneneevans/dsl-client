import * as types from "./actionTypes"
import Immutable from "seamless-immutable"

const InitialState = Immutable({
    dataElementsIsFetched: false,
    dataElements: undefined
})

export default function indicatorReducer(state= InitialState, action={}){
    switch (action.type) {
        case types.DATAELEMENTS_RECEIVED:            
            return state.merge({
                dataElements: action.dataElements,
                dataElementsIsFetched: true
            })
        case types.DATAELEMENTS_REQUESTED:
            return state.merge({
                dataElementsIsFetched: false
            })
        default:
            return state
    }
}


//selectors
export function getDataElements(state){
    return state.indicatorReducer.dataElements
    // return []
}

export function getDataElementFetchStatus(state){
    return state.indicatorReducer.dataElementsIsFetched
    // return false
}