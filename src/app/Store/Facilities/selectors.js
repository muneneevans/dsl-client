//selectors
export function getCountyFacilities(state){
    return state.FacilityReducer.countyFacilities
}

export function getCountFacilitiesFecthStatus(state){
    return state.FacilityReducer.countyFacilitiesIsFetched
}