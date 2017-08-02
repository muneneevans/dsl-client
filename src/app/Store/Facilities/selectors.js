//selectors
export function getCountyFacilities(state){
    return state.facilityReducer.countyFacilities
}

export function getCountyFacilitiesFecthStatus(state){
    return state.facilityReducer.countyFacilitiesIsFetched
}