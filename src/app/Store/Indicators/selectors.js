import * as d3 from "d3"

export function getDataElementsFetchStatus(state) {
	return state.indicatorReducer.dataElementsIsFetched
}

export function getIndicatorGroupsOptions(state) {
	if (state.indicatorReducer.indicatorGroups) {
		let indicatorGroups = []

		state.indicatorReducer.indicatorGroups.map(indicatorGroup => {
			indicatorGroups.push({
				key: indicatorGroup.indicatorgroupid,
				value: indicatorGroup.indicatorgroupid,
				text: indicatorGroup.name
			})
		})

		return indicatorGroups
	} else {
		return undefined
	}
}

export function getIndicatorGroupIndicatorsOptions(state) {
	if (state.indicatorReducer.indicatorGroupIndicators) {
		let indicatorGroupIndicators = []

		state.indicatorReducer.indicatorGroupIndicators.map(
			indicatorGroupIndicator => {
				indicatorGroupIndicators.push({
					key: indicatorGroupIndicator.indicatorid,
					value: indicatorGroupIndicator.indicatorid,
					text: indicatorGroupIndicator.indicatorname
				})
			}
		)
		return indicatorGroupIndicators
	} else {
		return undefined
	}
}

export function getPeriodTypeOptions(state) {
	if (state.indicatorReducer.periodTypes) {
		let periodTypes = []

		state.indicatorReducer.periodTypes.map(periodType => {
			periodTypes.push({
				key: periodType.id,
				value: periodType.id,
				text: periodType.name
			})
		})
		return periodTypes
	} else {
		return undefined
	}
}

//#region facility selectors
//facility specific selectos
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
	if (
		state.indicatorReducer.facilityIndicatorDataValues &&
		state.indicatorReducer.facilityIndicators
	) {
		let ids = state.indicatorReducer.facilityIndicators
		let data = state.indicatorReducer.facilityIndicatorDataValues
		let lineGraphKeys = []
		let monthDict = {
			1: "January",
			2: "February",
			3: "March",
			4: "April",
			5: "May",
			6: "June",
			7: "July",
			8: "August",
			9: "September",
			10: "October",
			11: "November",
			12: "December"
		}

		var colors = d3.scaleOrdinal(d3.schemeCategory10)

		if (ids.length == 0) {
			return undefined
		} else {
			//Create the braGraph data
			let barGraphData = {}
			let barGraphDataArray = []
			let barGarphKeys = []
			//get a list of the indicator names

			ids.map(indicator => {
				try {
					barGarphKeys.push(data[indicator.id][0].name)
					lineGraphKeys.push(indicator.id)
				} catch (error) {
					throw error
				}
			})
			//loop through each month
			for (var i = 0; i < data[ids[0].id].length; i++) {
				barGraphData = {
					month: data[ids[0].id][i].month,
					monthName: monthDict[data[ids[0].id][i].month]
				}
				//get month value for each indicator
				ids.map(indicator => {
					try {
						barGraphData[data[indicator.id][i].name] =
							Math.round(data[indicator.id][i].value * 100) / 100
					} catch (error) {
						barGraphData[indicator.id] = 0
					}
				})
				barGraphDataArray.push(barGraphData)
			}
			//sort the result by month
			barGraphDataArray.sort((a, b) => {
				return a.month - b.month
			})

			//create the lineGraph Data
			let lineGraphDataArray = []
			let lineGraphLegend = []
			let lineGraphData = {}
			lineGraphKeys.map(indicator => {
				lineGraphData[indicator] = []
				data[indicator].map(d => {
					lineGraphData[indicator].push({
						x: parseInt(d.month),
						y: Math.round(d.value * 100) / 100
					})
				})
				lineGraphData[indicator].sort((a, b) => {
					return a.x - b.x
				})
			})

			//append new data to the lineGraphArray
			lineGraphKeys.map(key => {
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
					indexBy: "monthName"
				},
				lineGraph: {
					data: lineGraphDataArray,
					legend: lineGraphLegend,
					months: monthDict
				}
			}
		}
	} else {
		return undefined
	}
}

//#endregion

//#region ward selectors
export const getWardIndicators = indicatorReducer => {
	return indicatorReducer.wardIndicators
}

export const getWardPeriodType = indicatorReducer => {
	return indicatorReducer.wardPeriodType
}

export const getWardYear = indicatorReducer => {
	return indicatorReducer.wardYear
}

export const getWardIndicatorDataValues = indicatorReducer => {
	if (indicatorReducer.wardIndicatorDataValues) {
		var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
		let monthDict = {
			1: "January",
			2: "February",
			3: "March",
			4: "April",
			5: "May",
			6: "June",
			7: "July",
			8: "August",
			9: "September",
			10: "October",
			11: "November",
			12: "December"
		}

		const getBarGraphKeys = (wardIndicators, graphKeys) => {
			if (wardIndicators) {
				wardIndicators.map(indicator => {
					graphKeys.push(indicator.name)
				})
			}
			return graphKeys
		}
		const aggregator = (accumulator, currentValue, currentIndex, arr) => {
			accumulator = accumulator + currentValue.value
			return currentIndex == arr.length - 1
				? accumulator / arr.length
				: accumulator
		}

		const getMonthValues = (month, values) => {
			//find object with equal month value
			return values.value.filter(item => {
				return item.month == month
			})[0]
		}

		const facilityfn = (month, values) => {
			return values.map(hospital => {
				return getMonthValues(month, hospital)
			})
		}

		const monthsData = (months, data, monthData = {}) => {
			months.map(month => {
				//get the values for each month
				monthData[month] = facilityfn(month, data)
					.filter(item => item != null)
					.reduce(aggregator, 0)
			})
			return monthData
		}

		const indicatorSummaries = Object.keys(
			indicatorReducer.wardIndicatorDataValues
		).map(indicator => {
			var result = {}
			result[indicator] = monthsData(
				months,
				indicatorReducer.wardIndicatorDataValues[indicator],
				{}
			)

			return result
		})

		const graphs = (output, months, wardIndicators) => {
			months.map(month => {
				var monthValues = {}
				monthValues["month"] = month
				monthValues["monthName"] = monthDict[month]
				indicatorSummaries.map(indicator => {
					Object.keys(indicator).map(indicatorId => {
						var index = Object.keys(indicator[indicatorId]).filter(
							item => item == month
						)[0]
						var indicatorName = wardIndicators.filter(
							indicator => indicator.id == indicatorId
						)[0]
						monthValues[indicatorName.name] = indicator[indicatorId][index]
					})
				})
				output.push(monthValues)
			})
			return output
		}

		return {
			barGraph: {
				data: graphs([], months, indicatorReducer.wardIndicators),
				keys: getBarGraphKeys(indicatorReducer.wardIndicators, []),
				indexBy: "monthName"
			}
		}
	} else {
		return undefined
	}
}

export const getWardIndicatorGraph = indicatorReducer => {
	if (indicatorReducer.wardIndicatorDataValues) {
		const monthDict = {
			1: "January",
			2: "February",
			3: "March",
			4: "April",
			5: "May",
			6: "June",
			7: "July",
			8: "August",
			9: "September",
			10: "October",
			11: "November",
			12: "December"
		}

		const getBarGraphData = indicatorDataValues => {
			var newArray = []			
			indicatorDataValues.map(monthValue => {
				newArray.push({
					x: Number(monthValue.month),
					y: monthValue.value
				})
			})
			newArray = newArray.sort((a, b) => a.x - b.x)
			return newArray
		}

		const getbarGraph = (wardIndicatorDataValues, wardIndicators) => {
			var graphData = []
			var graphLegend = []
			//define a set fo colors
			var colors = d3.scaleOrdinal(d3.schemeCategory10)
			Object.keys(wardIndicatorDataValues).map(indicator => {
				if (wardIndicators.filter(item => item.id == indicator).length != 0) {
					graphData.push({
						data: getBarGraphData(wardIndicatorDataValues[indicator]),
						color: colors(indicator)
					})
					graphLegend.push({
						title: wardIndicators.filter(item => item.id == indicator)[0].name,
						color: colors(indicator),
						disabled: false
					})
				}
			})

			return {
				data: graphData,
				legend: graphLegend
			}
		}

		return {
			barGraph: {
				data: getbarGraph(
					indicatorReducer.wardIndicatorDataValues,
					indicatorReducer.wardIndicators
				).data,
				legend: getbarGraph(
					indicatorReducer.wardIndicatorDataValues,
					indicatorReducer.wardIndicators
				).legend,
				keys: monthDict
			}
		}
	} else {
		return undefined
	}
}

export const getWardFacilityIndicatorGraph = indicatorReducer => {
	if (indicatorReducer.wardFacilityIndicatorDatavalues) {
		const monthDict = {
			1: "January",
			2: "February",
			3: "March",
			4: "April",
			5: "May",
			6: "June",
			7: "July",
			8: "August",
			9: "September",
			10: "October",
			11: "November",
			12: "December"
		}

		const getFacilityIndicatorXYPlot = facilityData => {
			let newArray = []
			facilityData.map(monthValue => {
				newArray.push({
					x: Number(monthValue.month),
					y: Number(monthValue.value)
				})
			})
			return newArray.sort((a, b) => {
				return a.x - b.x
			})
			// return newData
		}

		const getGraphLegend = facilityArray => {
			const colors = d3.scaleOrdinal(d3.schemeCategory10)
			return facilityArray.map(facility => {
				return {
					title: facility.name,
					color: colors(facility.id)
				}
			})
		}

		const getIndicatorValues = (indicator, wardFacilityDataValues) => {
			const colors = d3.scaleOrdinal(d3.schemeCategory10)
			return wardFacilityDataValues[indicator.id].map(facility => {
				return {
					data: getFacilityIndicatorXYPlot(facility.value),
					color: colors(facility.name)
				}
			})
		}

		const getWardFacilityIndicatorGraph = (
			wardIndicators,
			wardFacilityDataValues,
			monthDict
		) => {
			return wardIndicators.map(indicator => {
				return {
					barGraph: {
						data: getIndicatorValues(indicator, wardFacilityDataValues),
						legend: getGraphLegend(wardFacilityDataValues[indicator.id]),
						keys: monthDict
					},
					name: indicator.name
				}
			})
		}

		return getWardFacilityIndicatorGraph(
			indicatorReducer.wardIndicators,
			indicatorReducer.wardFacilityIndicatorDatavalues,
			monthDict
		)
		
	} else {
		return undefined
	}
}

//#endregion

//#region constituency selectors
export const getConstituencyIndicators = indicatorReducer => {
	return indicatorReducer.constituencyIndicators
}

export const getConstituencyPeriodType = indicatorReducer => {
	return indicatorReducer.constituencyPeriodType
}

export const getConstituencyYear = indicatorReducer => {
	return indicatorReducer.constituencyYear
}

export const getConstituencyIndicatorGraph = indicatorReducer => {
	if (indicatorReducer.constituencyIndicatorDataValues) {
		const monthDict = {
			1: "January",
			2: "February",
			3: "March",
			4: "April",
			5: "May",
			6: "June",
			7: "July",
			8: "August",
			9: "September",
			10: "October",
			11: "November",
			12: "December"
		}

		const getBarGraphData = indicatorDataValues => {
			var newArray = []			
			indicatorDataValues.map(monthValue => {
				newArray.push({
					x: Number(monthValue.month),
					y: monthValue.value
				})
			})
			newArray = newArray.sort((a, b) => a.x - b.x)
			return newArray
		}

		const getbarGraph = (
			constituencyIndicatorDataValues,
			constituencyIndicators
		) => {
			var graphData = []
			var graphLegend = []
			//define a set fo colors
			var colors = d3.scaleOrdinal(d3.schemeCategory10)
			Object.keys(constituencyIndicatorDataValues).map(indicator => {
				if (
					constituencyIndicators.filter(item => item.id == indicator).length !=
					0
				) {
					graphData.push({
						data: getBarGraphData(constituencyIndicatorDataValues[indicator]),
						color: colors(indicator)
					})
					graphLegend.push({
						title: constituencyIndicators.filter(
							item => item.id == indicator
						)[0].name,
						color: colors(indicator),
						disabled: false
					})
				}
			})

			return {
				data: graphData,
				legend: graphLegend
			}
		}

		return {
			barGraph: {
				data: getbarGraph(
					indicatorReducer.constituencyIndicatorDataValues,
					indicatorReducer.constituencyIndicators
				).data,
				legend: getbarGraph(
					indicatorReducer.constituencyIndicatorDataValues,
					indicatorReducer.constituencyIndicators
				).legend,
				keys: monthDict
			}
		}
	} else {
		return undefined
	}
}

export const getConstituencyWardIndicatorGraph = indicatorReducer => {
	if (indicatorReducer.constituencyWardIndicatorDataValues) {
		const monthDict = {
			1: "January",
			2: "February",
			3: "March",
			4: "April",
			5: "May",
			6: "June",
			7: "July",
			8: "August",
			9: "September",
			10: "October",
			11: "November",
			12: "December"
		}

		const getWardIndicatorXYPlot = wardData => {
			let newArray = []
			wardData.map(monthValue => {
				newArray.push({
					x: Number(monthValue.month),
					y: Number(monthValue.value)
				})
			})
			return newArray.sort((a, b) => {
				return a.x - b.x
			})
			// return newData
		}

		const getGraphLegend = wardArray => {
			const colors = d3.scaleOrdinal(d3.schemeCategory10)
			return wardArray.map(ward => {
				return {
					title: ward.name,
					color: colors(ward.id)
				}
			})
		}

		const getIndicatorValues = (indicator, constituencyWardDataValues) => {
			const colors = d3.scaleOrdinal(d3.schemeCategory10)
			return constituencyWardDataValues[indicator.id].map(ward => {
				return {
					data: getWardIndicatorXYPlot(ward.value),
					color: colors(ward.name)
				}
			})
		}

		const getConstituencyWardIndicatorGraph = (
			constituencyIndicators,
			constituencyWardDataValues,
			monthDict
		) => {
			return constituencyIndicators.map(indicator => {
				return {
					barGraph: {
						data: getIndicatorValues(indicator, constituencyWardDataValues),
						legend: getGraphLegend(constituencyWardDataValues[indicator.id]),
						keys: monthDict
					},
					name: indicator.name
				}
			})
		}
	
		return getConstituencyWardIndicatorGraph(
			indicatorReducer.constituencyIndicators,
			indicatorReducer.constituencyWardIndicatorDataValues,
			monthDict
		)
		
	} else {
		return undefined
	}
}
//#endregion
