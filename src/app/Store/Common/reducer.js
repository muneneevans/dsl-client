import * as types from "./actionTypes"
import Immutable from "seamless-immutable"

const InitialState = Immutable({
    countyCodes: undefined,

    constituencyCodesIsFetched: false,
    constituencyCodes: undefined,

    wardCodesIsFetched: false,
    wardCodes: undefined,

    currentLevel: undefined,
    currentId: undefined
})

export default function facilityReducer(state = InitialState, action = {}) {
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
                wardCodes: action.wardCodes,
                wardCodesIsFetched: true
            })

        case types.CHANGE_LEVEL:            
            return state.merge({
                currentLevel: action.level
            })
        case types.CHANGE_CURRENT_ID:
            return state.merge({
                currentId: action.currentId
            })
        default:
            return state
    }
}


