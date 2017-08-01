import * as types from "./actionTypes"
import Immutable from "seamless-immutable"

const InitialState = Immutable({
    facilityTypes: undefined,
    kephLevels: undefined
})

export default function facilityReducer(state = InitialState, action={}){
    switch (action.type) {                
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
