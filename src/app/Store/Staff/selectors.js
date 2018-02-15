import * as d3 from "d3"
export function getJobTypes(state) {
	return state.staffReducer.jobTypes
}

export function getJobTypeOptions(state) {
	if (state.staffReducer.jobTypes) {
		let options = []

		state.staffReducer.jobTypes.map(jobType => {
			options.push({
				key: jobType.id,
				value: jobType.id,
				text: jobType.name
			})
		})
		return options
	} else {
		return undefined
	}
}

export function getCadres(state) {
	return state.staffReducer.cadres
}

export function getCadreOptions(state) {
	if (state.staffReducer.cadres) {
		let options = []
		state.staffReducer.cadres.map(cadre => {
			options.push({
				key: cadre.id,
				value: cadre.id,
				text: cadre.name
			})
		})
		return options
	} else {
		return undefined
	}
}

export function getFacilityStaffGraphData(state) {
	if (state.staffReducer.facilityStaff) {
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

		//define a set of colors from d3
		let colors = d3.scaleOrdinal(d3.schemeCategory10)

		let staffBarGraph = []
		let staffBarGraphKeys = []
		Object.keys(monthDict).map((month, i) => {
			let item = {
				month: i,
				monthName: monthDict[i]
			}
			state.staffReducer.facilityStaff.map(jobType => {
				item[jobType.jobtype] = jobType.value
				let foundKey = staffBarGraphKeys.find(item => {
					return item == jobType.jobtype
				})
				if (!foundKey) {
					staffBarGraphKeys.push(jobType.jobtype)
				}
			})
			staffBarGraph.push(item)
		})

		//create the lineGraph data
		let lineGraphDataArray = []
		let lineGraphLegend = []
		// let lineGraphData = []
		let lineGraphKeys = []
		state.staffReducer.facilityStaff.map(jobType => {
			lineGraphKeys.push(jobType.jobtype)
		})

		state.staffReducer.facilityStaff.map((jobType, i) => {
			let item = {
				id: jobType.jobtype,
				color: colors(lineGraphKeys[i]),
				data: []
			}
			Object.keys(monthDict).map((month, i) => {
				item.data.push({
					x: i + 1,
					y: jobType.value
				})
			})

			lineGraphDataArray.push(item)
			lineGraphLegend.push({
				title: jobType.jobtype,
				color: colors(lineGraphKeys[i])
			})
		})

		return {
			barGraph: {
				data: staffBarGraph,
				keys: staffBarGraphKeys,
				indexBy: "monthName"
			},
			lineGraph: {
				data: lineGraphDataArray,
				legend: lineGraphLegend,
				months: monthDict
			}
		}
	} else {
		return undefined
	}
}

export function getSelectedFacilityJobTypes(state) {
	return state.staffReducer.selectedFacilityJobTypes
}

export function getFacilitySelectedJobTypeDataValues(state) {
	// return state.staffReducer.facilityJobTypeDataValues
	if (state.staffReducer.facilityJobTypeDataValues) {
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

		let staffBarGraph = []
		let staffBarGraphKeys = []

		state.staffReducer.facilityJobTypeDataValues.map(jobType => {
			let item = {}
			item[jobType.name] = jobType.value
			Object.keys(monthDict).map((month, i) => {
				item["month"] = i
				item["monthName"] = monthDict[i]

				staffBarGraph.push(item)
			})
			staffBarGraphKeys.push(jobType.name)
		})

		return {
			barGraph: {
				data: staffBarGraph,
				keys: staffBarGraphKeys,
				indexBy: "monthName"
			}
		}
	} else {
		return undefined
	}
}

//#region Country selectors

export function getCountryJobTypeSummaryGraphs(staffReducer) {
	if (staffReducer.countryJobTypesSummary) {
		var keys = Object.keys(staffReducer.countryJobTypesSummary)

		return {
			barGraph: {
				data: staffReducer.countryJobTypesSummary,
				keys,
				indexBy: ""
			}
		}
	}
}
//#endregion

//#region ward specific selectors
export function getWardJobTypes(staffReducer) {
	return staffReducer.wardJobTypes
}

export const getWardFacilityNumberOfStaff = staffReducer => {
	if (staffReducer.wardFacilityNumberOfStaff) {
		const getGraph = facilityNumberOfStaff => {
			return Object.keys(facilityNumberOfStaff).map(facility => {
				return {
					numberOfStaff: facilityNumberOfStaff[facility],
					facility
				}
			})
		}

		return {
			barGraph: {
				data: getGraph(staffReducer.wardFacilityNumberOfStaff),
				indexBy: "facility",
				keys: ["numberOfStaff"]
			}
		}
	} else {
		return undefined
	}
}
//#endregion
export const getConstituencyWardNumberOfStaff = staffReducer => {
	if (staffReducer.constituencyWardNumberOfStaff) {
		const getGraph = wardNumberOfStaff => {
			return Object.keys(wardNumberOfStaff).map(facility => {
				return {
					numberOfStaff: wardNumberOfStaff[facility],
					facility
				}
			})
		}

		return {
			barGraph: {
				data: getGraph(staffReducer.constituencyWardNumberOfStaff),
				indexBy: "facility",
				keys: ["numberOfStaff"]
			}
		}
	} else {
		return undefined
	}
}
