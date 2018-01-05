import * as types from "./actionTypes"
import Immutable from "seamless-immutable"

const InitialState = Immutable({
	indicatorGroups: undefined,
	indicatorGroupIndicators: undefined,
	periodTypes: undefined,

	//facility specific
	facilityIndicators: undefined,
	facilityPeriodType: undefined,
	facilityYear: undefined,
	facilityIndicatorDataValues: undefined,

	//ward specific
	wardIndicators: undefined,
	wardPeriodType: undefined,
	wardYear: undefined,
	wardIndicatorDataValues: undefined
})

export default function indicatorReducer(state = InitialState, action = {}) {
	switch (action.type) {
	case types.INDICATORGROUP_RECEIVED:
		return state.merge({
			indicatorGroups: action.indicatorGroups
		})

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

	case types.GET_FACILITY_INDIVIDUAL_SELECTED_INDICATOR_VALUES_REQUESTED:
		return state.merge({
			facilityIndicators: updateFetchStateOfIndicators(
				action.selectedIndicatorId,
				state.facilityIndicators,
				2
			)
		})

	case types.GET_FACILITY_INDIVIDUAL_INDICATOR_VALUES_RECEIVED:
		return state.merge({
			facilityIndicatorDataValues: addIndicatorDataValuesToList(
				action.indicatorDataValues,
				action.indicatorId,
				state.facilityIndicatorDataValues
			),
			facilityIndicators: updateFetchStateOfIndicators(
				action.selectedIndicatorId,
				state.facilityIndicators,
				1
			)
		})

	case types.GET_FACILITY_INDIVIDUAL_SELECTED_INDICATOR_VALUES_ERROR:
		return state.merge({
			facilityIndicators: updateFetchStateOfIndicators(
				action.selectedIndicatorId,
				state.facilityIndicators,
				0
			)
		})

	case types.PERIODTYPES_RECEIVED:
		return state.merge({
			periodTypes: action.periodTypes
		})

	case types.ADD_FACILITY_INDICATOR_REQUESTED:
		return state.merge({
			facilityIndicators: addIndicatorToIndicatorsList(
				action.indicatorId,
				state.facilityIndicators,
				state.indicatorGroupIndicators
			)
		})
	case types.REMOVE_FACILITY_INDICATOR_REQUESTED:
		return state.merge({
			facilityIndicators: removeIndicatorFromIndicatorsList(
				action.indicatorId,
				state.facilityIndicators
			)
		})
	case types.ClEAR_FACILITY_INDICATOR_DATA_REQUESTED:
		return state.merge({
			facilityIndicators: undefined,
			facilityPeriodType: undefined,
			facilityYear: undefined,
			facilityIndicatorDataValues: undefined
		})

	case types.ADD_WARD_INDICATOR_REQUESTED:
		return state.merge({
			wardIndicators: addIndicatorToIndicatorsList(
				action.indicatorId,
				state.wardIndicators,
				state.indicatorGroupIndicators
			)
		})
	case types.REMOVE_WARD_INDICATOR_REQUESTED:
		return state.merge({
			wardIndicators: removeIndicatorFromIndicatorsList(
				action.indicatorId,
				state.wardIndicators
			)
		})

	case types.SET_WARD_PERIOD_TYPE_REQUESTED:
		return state.merge({
			wardPeriodType: action.periodTypeId
		})
	case types.SET_WARD_YEAR_REQUESTED:
		return state.merge({
			wardYear: action.year
		})

	case types.GET_WARD_INDIVIDUAL_INDICATOR_VALUES_REQUESTED:
		return state.merge({
			wardIndicators: updateFetchStateOfIndicators(
				action.indicatorId,
				state.wardIndicators,
				2
			)
		})

	case types.GET_WARD_INDIVIDUAL_INDICATOR_VALUES_RECEIVED:		
		return state.merge({
			wardIndicatorDataValues: addIndicatorDataValuesToList(
				action.indicatorDataValues,
				action.indicatorId,
				state.wardIndicatorDataValues
			),
			wardIndicators: updateFetchStateOfIndicators(
				action.indicatorId,
				state.wardIndicators,
				1
			)
		})
	case types.GET_WARD_INDIVIDUAL_INDICATOR_VALUES_ERROR:
		return state.merge({
			wardIndicators: updateFetchStateOfIndicators(
				action.indicatorId,
				state.wardIndicators,
				0
			)
		})
	default:
		return state
	}
}

//combiners
function addIndicatorToIndicatorsList(
	newIndicatorId,
	indicatorIds,
	allindicators
) {
	if (indicatorIds) {
		let existingIndicatorIds = Immutable.asMutable(indicatorIds, { deep: true })
		//check if the indicator exists in the list of facility indicators
		let foundIndicator = existingIndicatorIds.find(indicator => {
			return indicator.id == newIndicatorId
		})
		if (!foundIndicator) {
			existingIndicatorIds.push({
				id: newIndicatorId,
				name: allindicators.find(indicator => {
					return indicator.indicatorid == newIndicatorId
				}).indicatorname,
				fetchedStatus: -1
			})
		}

		return existingIndicatorIds
	} else {
		let existingIndicatorIds = []
		existingIndicatorIds.push({
			id: newIndicatorId,
			name: allindicators.find(indicator => {
				return indicator.indicatorid == newIndicatorId
			}).indicatorname,
			fetchedStatus: -1
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
	} else {
		return undefined
	}
}

function updateFetchStateOfIndicators(
	selectedIndicatorId,
	indicatorIds,
	fetchStatus
) {
	let existingIndicatorIds = Immutable.asMutable(indicatorIds, { deep: true })
	let foundIndicator = existingIndicatorIds.find(indicator => {
		return indicator.id == selectedIndicatorId
	})
	if (foundIndicator) {
		foundIndicator.fetchedStatus = fetchStatus
	}

	return existingIndicatorIds
}

function addIndicatorDataValuesToList(
	newIndicatorDataValues,
	newIndicatorId,
	indicatorDatavalues
) {
	if (indicatorDatavalues) {
		let existingIndicatorDataValues = Immutable.asMutable(indicatorDatavalues)
		// existingIndicatorDataValues.merge({
		//     newIndicatorId: newIndicatorDataValues.datavalues
		// })
		existingIndicatorDataValues[newIndicatorId] =
			newIndicatorDataValues.datavalues
		return existingIndicatorDataValues
	} else {
		let existingIndicatorDataValues = {}
		existingIndicatorDataValues[newIndicatorId] =
			newIndicatorDataValues.datavalues
		return existingIndicatorDataValues
	}
}
