import * as types from "./actionTypes"
import Immutable from "seamless-immutable"

const InitialState = Immutable({
    facilityTypes: undefined,
    kephLevels: undefined,

    countyFacilitiesIsFetched: false,
    countyFacilities: undefined
})

export default function facilityReducer(state = InitialState, action={}){
    switch (action.type) {
        
        case types.CONSTITUENCY_FACILITIES_REQUESTED:
            return state.merge({
                countyFacilitiesIsFetched: false
            })
        
        case types.CONSTITUENCY_FACILITIES_RECEIVED:
            return state.merge({
                countyFacilities: action.constituencyFacilities,
                countyFacilitiesIsFetched: true
            })
        
        case types.FACILITY_TYPES_RECEIVED:
            return state.merge({
                facilityTypes: action.facilityTypes,
            })

        case types.FACILITY_KEPH_LEVELS_RECEIVED:
            return state.merge({
                kephLevels: action.kephLevels
            })
            
        case types.COUNTY_FACILITIES_REQUESTED:
            return state.merge({
                countyFacilitiesIsFetched: false
            })

        case types.COUNTY_FACILITIES_RECEIVED:
            return state.merge({
                countyFacilities: action.countyFacilities,
                countyFacilitiesIsFetched: true
            })

        default:
            return state
    }
}
