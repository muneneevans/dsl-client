import * as types from "./actionTypes"
import Immutable from "seamless-immutable"

const InitialState = Immutable({
    countyCodes: undefined,

    constituencyCodesIsFetched: false,
    constituencyCodes: undefined,

    wardCodesIsFetched: false,
    wardCodes: undefined,

    facilityTypes: undefined,

    kephLevels: undefined
})

export default function facilityReducer(state = InitialState, action={}){
    switch (action.type) {
        case types.COUNTY_CODES_FETCHED:
            return state.merge({                
                countyCodes: action.countyCodes
            })
        case types.COUNTY_CONSTITUENCY_CODES_FETCHED:
            return state.merge({
                constituencyCodes: action.constituencyCodes,
                constituencyCodesIsFetched: true
            })
        case types.COUNTY_CONSTITUENCY_CODES_REQUESTED:   
            return state.merge({
                constituencyCodesIsFetched: false
            })
        case types.CONSTITUENCY_WARD_CODES_REQUESTED:
            return state.merge({
                wardCodesIsFetched: false
            })
        case types.CONSTITUENCY_WARD_CODES_FETCHED:
            return state.merge({
                wardCodes : action.wardCodes,
                wardCodesIsFetched: true
            })
        case types.FACILITY_TYPES_RECEIVED:
            return state.merge({
                facilityTypes: action.facilityTypes,
            })
        case types.FACILITY_KEPH_LEVELS_RECEIVED:
            return state.merge({
                kephLevels: action.kephLevels
            })
        default:
            return state
    }
}


//selectors
export function getCountyCodes(state){    
    return state.facilityReducer.countyCodes
}


export function getCountyConstituencyCodesFetchStatus(state){
    return state.facilityReducer.constituencyCodesIsFetched
}
export function getCountyConstituencyCodes(state){
    return state.facilityReducer.constituencyCodes
}


export function getWardCodesFetcchedstatus(state){
    return state.facilityReducer.wardCodesIsFetched
}
export function getWardCodes(state){
    return state.facilityReducer.wardCodes
}
