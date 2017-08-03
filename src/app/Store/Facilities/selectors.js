//selectors
export function getFaciltiesFecthStatus(state){
    return state.facilityReducer.facilitiesIsFetched
}

export function getFacilties(state){
    return state.facilityReducer.facilities
}

export function getCountySummaryFetchStatus(state){
    return state.facilityReducer.countySummaryIsFetched
}

export function getCountySummary(state){
    return state.facilityReducer.countySummary
}

export function getCountySummaryChartData(state){
    if (state.facilityReducer.countySummaryIsFetched ){
        const summary = []
        state.facilityReducer.countySummary.map((county, i) =>{
            summary.push({
                constituency_id: county.constituency_id, 
                constituency_name : county.constituency_name,
                number_of_beds: county.number_of_beds,
                number_of_cots: county.number_of_facilities,
                number_of_facilities: county.number_of_facilities
            })
        })
        console.log(summary)
        return summary
    }
    else{
        return state.facilityReducer.countySummary
    }
}