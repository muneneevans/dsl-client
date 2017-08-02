//selectors
export function getFacilties(state){
    return state.facilityReducer.facilities
}

export function getFaciltiesFecthStatus(state){
    return state.facilityReducer.facilitiesIsFetched
}