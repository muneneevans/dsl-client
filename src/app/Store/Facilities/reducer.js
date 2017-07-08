import * as types from "./actionTypes"
import Immutable from "seamless-immutable"

const InitialState = Immutable({
    countyIds: undefined
})

export default function facilityReducer(state = InitialState, action={}){
    switch (action.type) {
        case types.COUNTY_CODES_FETCHED:                        
            return state.merge({
                countyIds: action.countyIds
            })
        case types.COUNTY_CONSTITUENCY_CODES_FETCHED:
            return state.merge({
                constituencyCodes: action.constituencyCodes
            })
        default:
            return state
    }
}


//selectors
export function getCountyIds(state){
    return state.facilityReducer.countyIds
}

export function getCountyConstituencyCodes(state){
    return state.facilityReducer.constituencyCodes
}