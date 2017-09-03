//selectors
export function getFaciltiesFecthStatus(state) {
    return state.facilityReducer.facilitiesIsFetched
}

export function getFacilties(state) {
    return state.facilityReducer.facilities
}

export function getCountySummaryFetchStatus(state) {
    return state.facilityReducer.countySummaryIsFetched
}

export function getCountySummary(state) {
    return state.facilityReducer.countySummary
}

export function getCountySummaryChartData(state) {
    if (state.facilityReducer.countySummaryIsFetched) {
        const summary = []
        state.facilityReducer.countySummary.map((county, i) => {
            summary.push({
                constituency_id: county.constituency_id,
                constituency_name: county.constituency_name,
                number_of_beds: county.number_of_beds,
                number_of_cots: county.number_of_facilities,
                number_of_facilities: county.number_of_facilities
            })
        })        
        return summary
    }
    else {
        return state.facilityReducer.countySummary
    }
}

export function getCountySummaryXYData(state) {
    if (state.facilityReducer.countySummaryIsFetched) {
        const summary = {
            bedsSummary: [],
            cotsSummary: [],
            facilitiesSummary: []
        }
        state.facilityReducer.countySummary.map((county, i) => {
            summary.bedsSummary.push({
                label: county.constituency_name,
                constituency_id: county.constituency_id,
                x: county.number_of_beds,
                value: county.number_of_beds,
                y: summary.bedsSummary.length
            })
            summary.cotsSummary.push({
                label: county.constituency_name,
                constituency_id: county.constituency_id,
                x: county.number_of_cots,
                value: county.number_of_cots,
                y: summary.cotsSummary.length
            })
            summary.facilitiesSummary.push({
                label: county.constituency_name,
                constituency_id: county.constituency_id,
                x: county.number_of_facilities,
                value: county.number_of_facilities,
                y: summary.facilitiesSummary.length
            })
        })    
          
        return summary
    }
    else {
        return {
            bedsSummary: [],
            cotsSummary: [],
            facilitiesSummary: []
        }
    }
}
export function getConstituencySummaryXYData(state) {
    if (state.facilityReducer.constituencySummaryIsFetched) {
        const summary = {
            bedsSummary: [],
            cotsSummary: [],
            facilitiesSummary: []
        }
        state.facilityReducer.constituencySummary.map((ward, i) => {
            summary.bedsSummary.push({
                label: county.constituency_name,                
                x: county.number_of_beds,
                value: county.number_of_beds,
                y: summary.bedsSummary.length
            })
            summary.cotsSummary.push({
                label: county.constituency_name,
                constituency_id: county.constituency_id,
                x: county.number_of_cots,
                value: county.number_of_cots,
                y: summary.cotsSummary.length
            })
            summary.facilitiesSummary.push({
                label: county.constituency_name,
                constituency_id: county.constituency_id,
                x: county.number_of_facilities,
                value: county.number_of_facilities,
                y: summary.facilitiesSummary.length
            })
        })    
          
        return summary
    }
    else {
        return {
            bedsSummary: [],
            cotsSummary: [],
            facilitiesSummary: []
        }
    }
}


export function getCurrentFacilityInformationType(state) {
    return state.facilityReducer.currentFacilityInformationType
}

export function getFacilityTypes(state) {    
    return state.facilityReducer.facilityTypes
}