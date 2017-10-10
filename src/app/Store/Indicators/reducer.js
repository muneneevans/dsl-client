import * as types from "./actionTypes"
import Immutable from "seamless-immutable"

const InitialState = Immutable({
    indicatorGroups: undefined,

    indicatorGroupIndicators: undefined,

    dataElementsIsFetched: false,
    dataElements: undefined,

    facilityDataElementDataValuesIsFetched: false,
    facilityDataElementDataValues: undefined
})

export default function indicatorReducer(state= InitialState, action={}){
    switch (action.type) {
        case types.DATAELEMENTS_REQUESTED:
            return state.merge({
                dataElementsIsFetched: false
            })
        
        case types.INDICATORGROUP_REQUESTED:
            return state.merge({})
        
        case types.INDICATORGROUP_RECEIVED:
            return state.merge({
                indicatorGroups: action.indicatorGroups
            })
            
        case types.INDICATORGROUP_INDICATORS_REQUESTED:
            return state.merge({})
        
        case types.INDICATORGROUP_INDICATORS_RECEIVED:
            return state.merge({
                indicatorGroupIndicators: action.indicatorGroupIndicators
            })
        case types.DATAELEMENTS_RECEIVED:            
            return state.merge({
                dataElements: action.dataElements,
                dataElementsIsFetched: true
            })
        
        case types.FACILITY_DATAELEMENT_DATAVALUES_REQUESTED:            
            return state.merge({
                facilityDataElementDataValuesIsFetched: false
            })
        case types.FACILITY_DATAELEMENT_DATAVALUES_RECEIVED:            
            return state.merge({
                facilityDataElementDataValues: action.dataValues,
                facilityDataElementDataValuesIsFetched: true
            })
        default:
            return state
    }
}


//selectors
