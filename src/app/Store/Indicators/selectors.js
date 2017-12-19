import { schemeCategory10 } from "d3-scale"

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
        let lineGraphKeys = []
        let monthDict = {
            1: 'January',
            2: 'February',
            3: 'March',
            4: 'April',
            5: 'May',
            6: 'June',
            7: 'July',
            8: 'August',
            9: 'September',
            10: 'October',
            11: 'November',
            12: 'December',
        }

        //define a set fo colors
        var colors = d3.scale.category10();


        if (ids.length == 0) {
            return undefined
        }
        else {

            //Create the braGraph data
            let barGraphData = {}
            let barGraphDataArray = []
            let barGarphKeys = []
            //get a list of the indicator names

            ids.map((indicator, j) => {
                try {
                    barGarphKeys.push(data[indicator.id][0].name)
                    lineGraphKeys.push(indicator.id)
                }
                catch (error) {

                }
            })
            //loop through each month 
            for (var i = 0; i < data[ids[0].id].length; i++) {
                barGraphData = {
                    month: data[ids[0].id][i].month,
                    monthName: monthDict[data[ids[0].id][i].month],
                }
                //get month value for each indicator
                ids.map((indicator, j) => {
                    try {
                        barGraphData[data[indicator.id][i].name] = Math.round(data[indicator.id][i].value * 100) / 100
                    }
                    catch (error) {
                        barGraphData[indicator.id] = 0
                    }
                })
                barGraphDataArray.push(barGraphData)
            }
            //sort the result by month
            barGraphDataArray.sort((a, b) => {
                return a.month - b.month;
            })


            //create the lineGraph Data
            let lineGraphDataArray = []
            let lineGraphLegend = []
            let lineGraphData = {}
            lineGraphKeys.map((indicator, i) => {
                lineGraphData[indicator] = []
                data[indicator].map((d, i) => {
                    lineGraphData[indicator].push({
                        x: parseInt(d.month),
                        y: Math.round(d.value * 100) / 100
                    })

                })
                lineGraphData[indicator].sort((a, b) => {
                    return a.x - b.x;
                })
            })

            //append new data to the lineGraphArray
            lineGraphKeys.map((key, i) => {
                lineGraphDataArray.push({
                    id: data[key][0].name,
                    color: colors(key),
                    data: lineGraphData[key]
                })
                lineGraphLegend.push({
                    title: data[key][0].name,
                    color: colors(key),
                    disabled: false
                })

            })

            


            return {
                barGraph: {
                    data: barGraphDataArray,
                    keys: barGarphKeys,
                    indexBy: 'monthName'
                },
                lineGraph: {
                    data: lineGraphDataArray,
                    legend: lineGraphLegend,
                    months: monthDict
                }
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