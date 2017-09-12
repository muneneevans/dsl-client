export function getDataElementsFetchStatus(state) {
    return state.indicatorReducer.dataElementsIsFetched
}

export function getDataElements(state) {
    return state.indicatorReducer.dataElements
}

export function getFacilityDataElementDataValuesFetchStatus(state) {
    return state.indicatorReducer.facilityDataElementDataValuesIsFetched
}

export function getFacilityDataElementDataValues(state) {
    if(!state.indicatorReducer.facilityDataElementDataValues){

        return []
    }

    var newDataValues =  []
    state.indicatorReducer.facilityDataElementDataValues.map((d, i) => {
        newDataValues.push( {
            label: d.categoryoptioncomboid,
            value: d.value,
            periodid: d.periodid,
            categoryoptioncomboid: d.categoryoptioncomboid
        })
    })
    console.log(newDataValues)
    return newDataValues
}