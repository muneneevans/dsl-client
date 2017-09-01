import * as types from "./actionTypes"
import Immutable from "seamless-immutable"

const InitialState = Immutable({
    facilityTypes: undefined,
    kephLevels: undefined,

    facilitiesIsFetched: false,
    facilities: undefined,

    countySummaryIsFetched: false,
    countySummary: undefined,

    currentFacilityInformationType: undefined
})

export default function facilityReducer(state = InitialState, action={}){
    switch (action.type) {
        case types.FACILITY_LIST_REQUESTED:
            return state.merge({
                facilitiesIsFetched: false
            })
        
        case types.FACILITY_LIST_RECEIVED:
            return state.merge({
                facilities: action.facilities,
                facilitiesIsFetched: true
            })        
        
        case types.COUNTY_SUMMARY_REQUESTED:
            return state.merge({
                countySummaryIsFetched: false
            })
        
        case types.COUNTY_SUMMARY_RECEIVED:            
            return state.merge({
                countySummary: action.countySummary,
                countySummaryIsFetched: true
            })
        
        case types.FACILITY_TYPES_RECEIVED:
            return state.merge({
                facilityTypes: action.facilityTypes,
            })

        case types.FACILITY_KEPH_LEVELS_RECEIVED:
            return state.merge({
                kephLevels: action.kephLevels
            })
        
        case types.CHANGE_FACILITY_INFORMATION_TYPE:
            return state.merge({
                currentFacilityInformationType: action.informationType
            })

        default:
            return state
    }
}
