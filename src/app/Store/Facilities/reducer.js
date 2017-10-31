import * as types from "./actionTypes"
import Immutable from "seamless-immutable"

const InitialState = Immutable({
    facilityTypes: undefined,
    kephLevels: undefined,

    facilitiesIsFetched: false,
    facilities: undefined,

    facilityDetailsIsFetched: false,
    facilityDetails: undefined,

    countryBedsSummary: undefined,

    countryKephLevelsSummary: undefined,

    countryFacilityTypesSummary: undefined,

    countrySummary: undefined,

    countySummaryIsFetched: false,
    countySummary: undefined,
    countyFacilityTypesSummary: undefined,
    countyKephLevelsSummary: undefined,

    constituencySummaryIsFetched: false,
    constituencySummary: undefined,

    wardSummaryIsFetched: false,
    wardSummary: undefined,

    currentFacilityInformationType: undefined,

    filters: undefined
})

export default function facilityReducer(state = InitialState, action = {}) {
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

        case types.FACILITY_DETAILS_REQUESTED:
            return state.merge({
                facilityDetailsIsFetched: false
            })

        case types.FACILITY_DETAILS_RECEIVED:
            return state.merge({
                facilityDetails: action.facilityDetails,
                facilityDetailsIsFetched: true
            })

        case types.COUNTRY_FACILITYTYPES_SUMMARY_REQUESTED:
            return state.merge({})

        case types.COUNTRY_FACILITYTYPES_SUMMARY_RECEIVED:
            return state.merge({
                countryFacilityTypesSummary: action.countryFacilityTypesSummary
            })
        case types.COUNTRY_KEPHLEVELS_SUMMARY_REQUESTED:
            return state.merge({})
        case types.COUNTRY_KEPHLEVELS_SUMMARY_RECEIVED:
            return state.merge({
                countryKephLevelsSummary: action.countryKephLevelsSummary
            })

        case types.COUNTRY_BEDS_SUMMARY_REQUESTED:
            return state.merge({})

        case types.COUNTRY_BEDS_SUMMARY_RECEIVED:
            return state.merge({
                countryBedsSummary: action.countryBedsSummary
            })
        case types.COUNTRY_SUMMARY_REQUESTED:
            return state.merge({

            })

        case types.COUNTRY_SUMMARY_RECEIVED:
            return state.merge({
                countrySummary: action.countrySummary,
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

        case types.COUNTY_FACILITYTYPES_SUMMARY_REQUESTED:
            return state
        case types.COUNTY_FACILITYTYPES_SUMMARY_RECEIVED:
            return state.merge({
                countyFacilityTypesSummary: action.countyFacilityTypesSummary
            })
        case types.COUNTY_KEPHLEVELS_SUMMARY_REQUESTED:
            return state
        case types.COUNTY_KEPHLEVELS_SUMMARY_RECEIVED:
            return state.merge({
                countyKephLevelsSummary: action.countyKephLevelsSummary
            })

        case types.CONSTITUENCY_SUMMARY_REQUESTED:
            return state.merge({
                constituencySummaryIsFetched: false
            })

        case types.CONSTITUENCY_SUMMARY_RECEIVED:
            return state.merge({
                constituencySummary: action.constituencySummary,
                constituencySummaryIsFetched: true
            })

        case types.WARD_SUMMARY_REQUESTED:
            return state.merge({
                wardSummaryIsFetched: false
            })

        case types.WARD_SUMMARY_RECEIVED:
            return state.merge({
                wardSummary: action.wardSummary,
                wardSummaryIsFetched: true
            })

        case types.FACILITY_TYPES_RECEIVED:
            return state.merge({
                facilityTypes: action.facilityTypes,
            })

        case types.FACILITY_KEPH_LEVELS_REQUESTED:
            return state.merge({

            })
        case types.FACILITY_KEPH_LEVELS_RECEIVED:
            return state.merge({
                kephLevels: action.kephLevels
            })

        case types.CHANGE_FACILITY_INFORMATION_TYPE:
            return state.merge({
                currentFacilityInformationType: action.informationType
            })

        case types.CHANGE_FACILITY_FILTER:
            let newFilters = []
            if (state.filters) {
                newFilters = Immutable.asMutable(state.filters, { deep: true })
                let keyList = Object.keys(action.filterItem)
                if (keyList[0] in newFilters) {
                    
                    newFilters[keyList[0]] = action.filterItem[keyList[0]]
                }   
            }
            else {
                newFilters.push(action.filterItem)
            }            
            return state.merge({
                filters: newFilters
            })

        default:
            return state
    }
}
