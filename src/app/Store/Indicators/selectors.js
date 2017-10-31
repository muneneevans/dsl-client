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

export function getFacilityIndicators(state) {
    return state.indicatorReducer.facilityIndicators
}

export function getFacilityPeriodType(state) {
    return state.indicatorReducer.facilityPeriodType
}

export function getFacilityYear(state) {
    return state.indicatorReducer.facilityYear
}

export function getFacilityIndicatorDataValues(state) {
    return state.indicatorReducer.facilityIndicatorDataValues
}

export function getFacilityIndicatorDataValuesMapData(state) {
    if (state.indicatorReducer.facilityIndicatorDataValues && state.indicatorReducer.facilityIndicators) {

        let ids = state.indicatorReducer.facilityIndicators
        let data = state.indicatorReducer.facilityIndicatorDataValues
        let mData = {}
        let output = []
        let keys = []
        let monthDict = {
            1:'January',
            2:'February',
            3:'March',
            4:'April',
            5:'May',
            6:'June',
            7:'July',
            8:'August',
            9:'September',
            10:'October',
            11:'November',
            12:'December',            
        }
        if (ids.length == 0) {
            return undefined
        }
        else {
            ids.map((indicator, j) => {
                try{
                keys.push(data[indicator][0].name)
                }
                catch(error){

                }
            })
            for (var i = 0; i < data[ids[0]].length; i++) {
                mData = {
                    month: data[ids[0]][i].month,
                    monthName: monthDict[data[ids[0]][i].month]
                }

                ids.map((indicator, j) => {
                    try {
                        mData[data[indicator][i].name] = data[indicator][i].value
                    }
                    catch (error) {
                        mData[indicator] = 0
                    }


                })
                output.push(mData)
            }

            output.sort( (a, b) => {
                return a.month - b.month;
              })

            return {
                data: output,
                keys,
                indexBy: 'monthName'
            }
        }
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
    return newDataValues
}