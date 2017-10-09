export function getDataElementsFetchStatus(state) {
    return state.indicatorReducer.dataElementsIsFetched
}

export function getIndicatorGroupsOptions(state) {
    if (state.indicatorReducer.indicatorGroups) {

        let indicatorGroups = []

        state.indicatorReducer.indicatorGroups.map((indicatorGroup, i) => {
            indicatorGroups.push({
                key: indicatorGroup.indicatorgroupid,
                value: indicatorGroup.indicatorgroupid,
                text: indicatorGroup.name
            })
        })
        
        return indicatorGroups
    }
    else {
        return undefined
    }
}

export function getDataElements(state) {
    return state.indicatorReducer.dataElements
}

export function getFacilityDataElementDataValuesFetchStatus(state) {
    return state.indicatorReducer.facilityDataElementDataValuesIsFetched
}

export function getFacilityDataElementDataValues(state) {
    if (!state.indicatorReducer.facilityDataElementDataValues) {

        return []
    }

    var newDataValues = []
    state.indicatorReducer.facilityDataElementDataValues.map((d, i) => {
        newDataValues.push({
            label: d.categoryoptioncomboid,
            value: d.value,
            periodid: d.periodid,
            categoryoptioncomboid: d.categoryoptioncomboid
        })
    })
    console.log(newDataValues)
    return newDataValues
}