import * as types from "./actionTypes"
import Immutable from "seamless-immutable"

const InitialState = Immutable({
    indicatorGroups: undefined,
    indicatorGroupIndicators: undefined,

    facilityIndicators: undefined,
    facilityPeriodType: undefined,
    facilityYear: undefined,
    facilityIndicatorDataValues: undefined,

    periodTypes: undefined,

    dataElementsIsFetched: false,
    dataElements: undefined,

    facilityDataElementDataValuesIsFetched: false,
    facilityDataElementDataValues: undefined
})

export default function indicatorReducer(state = InitialState, action = {}) {
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

        case types.SET_FACILITY_PERIOD_TYPE_REQUESTED:
            return state.merge({
                facilityPeriodType: action.periodTypeId
            })

        case types.SET_FACILITY_YEAR_REQUESTED:
            return state.merge({
                facilityYear: action.year
            })
        case types.GET_FACILITY_INDIVIDUAL_INDICATOR_VALUES_RECEIVED:
            return state.merge({
                facilityIndicatorDataValues: addIndicatorDataValuesToList(action.indicatorDataValues, action.indicatorId, state.facilityIndicatorDataValues)
            })
        case types.PERIODTYPES_REQUESTED:
            return state.merge({})

        case types.PERIODTYPES_RECEIVED:
            return state.merge({
                periodTypes: action.periodTypes
            })

        case types.ADD_FACILITY_INDICATOR_REQUESTED:
            return state.merge({
                facilityIndicators: addIndicatorToIndicatorsList(action.indicatorId, state.facilityIndicators, state.indicatorGroupIndicators)
            })
        case types.REMOVE_FACILITY_INDICATOR_REQUESTED:
            return state.merge({
                facilityIndicators: removeIndicatorFromIndicatorsList(action.indicatorId, state.facilityIndicators)
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


//combiners
function addIndicatorToIndicatorsList(newIndicatorId, indicatorIds, allindicators) {
    if (indicatorIds) {
        let existingIndicatorIds = Immutable.asMutable(indicatorIds, { deep: true })
        //check if the indicator exists in the list of facility indicators
        let foundIndicator = existingIndicatorIds.find((indicator) => { return indicator.id == newIndicatorId })
        if (!foundIndicator) {
            existingIndicatorIds.push({
                id: newIndicatorId,                
                name: allindicators.find((indicator) => { return indicator.indicatorid == newIndicatorId }).indicatorname,
                isFetched: false
            })
        }
        
        return existingIndicatorIds
    }
    else {
        let existingIndicatorIds = []
        existingIndicatorIds.push({
            id: newIndicatorId,
            name: allindicators.find((indicator) => { return indicator.indicatorid == newIndicatorId }).indicatorname,
            isFetched: false
        })
        return existingIndicatorIds
    }
}

function removeIndicatorFromIndicatorsList(newIndicatorId, indicatorIds) {
    if (indicatorIds) {
        let existingIndicatorIds = Immutable.asMutable(indicatorIds, { deep: true })
        //check if the indicator exists in the list of facility indicators, 
        existingIndicatorIds.find((indicator, i) => {
            //if indicator exists, splice from array          
            if (indicator.id == newIndicatorId) {
                existingIndicatorIds.splice(i, 1)
                return true
            } else {
                return false
            }
        })
        if (existingIndicatorIds.length < 1) {
            return undefined
        }
        return existingIndicatorIds
    }
    else {
        return undefined
    }
}


function addIndicatorDataValuesToList(newIndicatorDataValues, newIndicatorId, indicatorDatavalues) {
    if (indicatorDatavalues) {
        let existingIndicatorDataValues = Immutable.asMutable(indicatorDatavalues)
        // existingIndicatorDataValues.merge({
        //     newIndicatorId: newIndicatorDataValues.datavalues
        // })
        existingIndicatorDataValues[newIndicatorId] = newIndicatorDataValues.datavalues
        return existingIndicatorDataValues
    }
    else {
        let existingIndicatorDataValues = {}
        existingIndicatorDataValues[newIndicatorId] = newIndicatorDataValues.datavalues
        return existingIndicatorDataValues
    }
}

