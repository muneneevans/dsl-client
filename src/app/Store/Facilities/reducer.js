import * as types from "./actionTypes"
import Immutable from "seamless-immutable"

const InitialState = Immutable({
    facilityTypes: undefined,
    kephLevels: undefined,

    facilitiesIsFetched: false,
    facilities: undefined
})

export default function facilityReducer(state = InitialState, action={}){
    switch (action.type) {

        case types.COUNTY_FACILITIES_REQUESTED:
            return state.merge({
                facilitiesIsFetched: false
            })

        case types.COUNTY_FACILITIES_RECEIVED:
            return state.merge({
                facilities: action.countyFacilities,
                facilitiesIsFetched: true
            })
        
        case types.CONSTITUENCY_FACILITIES_REQUESTED:
            return state.merge({
                facilitiesIsFetched: false
            })
        
        case types.CONSTITUENCY_FACILITIES_RECEIVED:
            return state.merge({
                facilities: action.constituencyFacilities,
                facilitiesIsFetched: true
            })
        
        case types.WARD_FACILITIES_REQUESTED:
            return state.merge({
                facilitiesIsFetched: false
            })
        
        case types.WARD_FACILITIES_RECEIVED:
            return state.merge({
                facilities: action.wardFacilities,
                facilitiesIsFetched: true
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
