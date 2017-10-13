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

export function getIndicatorGroupIndicatorsOptions(state) {
    if (state.indicatorReducer.indicatorGroupIndicators) {

        let indicatorGroupIndicators = []

        state.indicatorReducer.indicatorGroupIndicators.map((indicatorGroupIndicator, i) => {
            indicatorGroupIndicators.push({
                key: indicatorGroupIndicator.indicatorid,
                value: indicatorGroupIndicator.indicatorid,
                text: indicatorGroupIndicator.indicatorname
            })
        })        
        return indicatorGroupIndicators
    }
    else {
        return undefined
    }
}


export function getPeriodTypeOptions(state) {
    if (state.indicatorReducer.periodTypes) {
        
        let periodTypes = []
        
        state.indicatorReducer.periodTypes.map((periodType, i) => {
            periodTypes.push({
                key: periodType.id,
                value: periodType.id,
                text: periodType.name
            })
        })        
        return periodTypes
    }
    else {
        return undefined
    }
    
}

export function getFacilityIndicators(state){
    return state.indicatorReducer.facilityIndicators
}

export function getFacilityPeriodType(state){
    return state.indicatorReducer.facilityPeriodType
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