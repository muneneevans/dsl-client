import * as types from "./actionTypes"
import Immutable from "seamless-immutable"

const initialState = Immutable({
    jobTypes: undefined,
    cadres: undefined,

    facilityStaff: undefined
})

function staffReducer(state = initialState, action = {}) {
    switch (action.type) {
        case types.JOB_TYPES_REQUESTED:
            return state
        case types.JOB_TYPES_RECEIVED:
            return state.merge({
                jobTypes: action.jobTypes
            })
        case types.CADRES_REQUESTED:
            return state
        case types.CADRES_RECEIVED:
            return state.merge({
                cadres: action.cadres
            })
        case types.FACILITY_STAFF_REQUESTED:
            return state

        case types.FACILITY_STAFF_RECEIVED:
            return state.merge({
                facilityStaff: action.facilityStaff
            })
        case types.CLEAR_FACILITY_STAFF_DATA_REQUESTED:
        return state.merge({
            facilityStaff: undefined
        })
        default:
            return state
    }
}

export default staffReducer