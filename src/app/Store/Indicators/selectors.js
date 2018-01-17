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

		//define a set fo colors
		var colors = d3.scale.category10()

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
			// console.log(dataArray)
			indicatorDataValues.map(monthValue => {
				newArray.push({
					x: Number(monthValue.month),
					y: monthValue.value,
				})
			})
			newArray = newArray.sort((a,b)=>a.x - b.x)			
			return newArray
		}

		const getbarGraph = (wardIndicatorDataValues, wardIndicators) => {
			var graphData = []
			var graphLegend = []
			//define a set fo colors
			var colors = d3.scale.category10()
			Object.keys(wardIndicatorDataValues).map(indicator => {
				graphData.push(
					{
						data: getBarGraphData(wardIndicatorDataValues[indicator]),
						color: colors(indicator)
					})				
				if (wardIndicators.filter(item => item.id == indicator)){	
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
				data: getbarGraph(indicatorReducer.wardIndicatorDataValues, indicatorReducer.wardIndicators).data,
				legend: getbarGraph(indicatorReducer.wardIndicatorDataValues, indicatorReducer.wardIndicators).legend,
				keys: monthDict
			}
		}
	}
	else {
		return undefined
	}
}


//#endregion
