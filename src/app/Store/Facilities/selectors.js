//selectors
export function getFaciltiesFecthStatus(state) {
	return state.facilityReducer.facilitiesIsFetched
}

export function getFacilties(state) {
	return state.facilityReducer.facilities
}

export function getFacilityDetailFetchStatus(state) {
	return state.facilityReducer.facilityDetailsIsFetched
}

export function getFaciliyDetails(state) {
	return state.facilityReducer.facilityDetails
}

//#region COUNTRY selectors
export function getCountryFacilityTypesSummary(state) {
	if (state.facilityReducer.countryFacilityTypesSummary) {
		return {
			summary: state.facilityReducer.countryFacilityTypesSummary,
			indexBy: "county_name"
		}
	} else {
		return undefined
	}
}

export function getCountryKephLevelsSummary(state) {
	if (state.facilityReducer.countryKephLevelsSummary) {
		return {
			summary: state.facilityReducer.countryKephLevelsSummary,
			indexBy: "county_name"
		}
	} else {
		return undefined
	}
}

export function getCountryBedsSummary(state) {
	if (state.facilityReducer.countryBedsSummary) {
		let newSummary = []
		Object.keys(state.facilityReducer.countryBedsSummary).map((key, i) => {
			newSummary.push({
				id: key,
				label: key,
				value: state.facilityReducer.countryBedsSummary[key]
			})
		})
		return newSummary
	} else {
		return undefined
	}
}

export function getCountryCotsSummary(state) {
	if (state.facilityReducer.countrySummary) {
		let newSummary = []
		state.facilityReducer.countrySummary.map((county, i) => {
			newSummary.push({
				id: county.name,
				label: county.name,
				value: county.number_of_cots
			})
		})
		return newSummary
	} else {
		return undefined
	}
}

export function getCountrySummary(state) {
	return state.facilityReducer.countrySummary
}

export function getCountrySummaryChartData(state) {
	if (state.facilityReducer.countrySummary) {
		let summary = {
			bedsSummary: [],
			cotsSummary: [],
			facilitiesSummary: [],
			bedCotsSummary: [],
			combinedSummary: [],
			labels: []
		}

		state.facilityReducer.map((county, i) => {
			summary.labels.push(county.name)
			summary.facilitiesSummary.push({
				label: county.name,
				value: county.number_of_facilities,
				x: county.number_of_facilities,
				y: i
			})
			summary.bedsSummary.push({
				label: county.name,
				value: county.number_of_beds,
				x: county.number_of_beds,
				y: i
			})
			summary.cotsSummary.push({
				label: county.name,
				value: county.number_of_cots,
				x: county.number_of_cots,
				y: i
			})
			summary.bedCotsSummary.push({
				label: county.name,
				value: county.number_of_beds,
				x: county.number_of_cots,
				y: i
			})
		})

		return summary
	} else {
		return {
			bedsSummary: [],
			cotsSummary: [],
			facilitiesSummary: []
		}
	}
}

export function getCountrySummaryMapData(state) {
	if (!state.facilityReducer.countrySummary) {
		return undefined
	}
	let summary = {
		facilitiesSummary: [],
		labels: [],
		countyCodeFacilityCount: [state.facilityReducer.countrySummary.length]
	}

	state.facilityReducer.countrySummary.map((county, i) => {
		summary.labels.push(county.name)
		summary.facilitiesSummary.push({
			label: county.name,
			value: county.number_of_facilities,
			x: county.number_of_facilities,
			y: i
		})
		summary.countyCodeFacilityCount[county.code] = county.number_of_facilities
	})
	return summary
}

//#endregion

//#region COUNTY selectors

export function getCountySummaryFetchStatus(state) {
	return state.facilityReducer.countySummaryIsFetched
}

export function getCountySummary(state) {
	return state.facilityReducer.countySummary
}

export function getCountyFacilityTypesSummary(state) {
	if (state.facilityReducer.countyFacilityTypesSummary) {
		return {
			summary: state.facilityReducer.countyFacilityTypesSummary,
			indexBy: "constituency_name"
		}
	} else {
		return undefined
	}
}

export function getCountyKephLevelsSummary(state) {
	if (state.facilityReducer.countyKephLevelsSummary) {
		return state.facilityReducer.countyKephLevelsSummary
	} else {
		return undefined
	}
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
	} else {
		return state.facilityReducer.countySummary
	}
}

export function getCountySummaryXYData(state) {
	if (state.facilityReducer.countySummaryIsFetched) {
		let summary = {
			bedsSummary: [],
			cotsSummary: [],
			facilitiesSummary: [],
			bedCotsSummary: [],
			labels: []
		}
		state.facilityReducer.countySummary.map((county, i) => {
			summary.labels.push(county.constituency_name)
			summary.bedsSummary.push({
				label: county.constituency_name,
				constituency_id: county.constituency_id,
				x: county.number_of_beds,
				value: county.number_of_beds,
				y: i
			})
			summary.cotsSummary.push({
				label: county.constituency_name,
				constituency_id: county.constituency_id,
				x: county.number_of_cots,
				value: county.number_of_cots,
				y: i
			})
			summary.facilitiesSummary.push({
				label: county.constituency_name,
				constituency_id: county.constituency_id,
				x: county.number_of_facilities,
				value: county.number_of_facilities,
				y: i
			})
			summary.bedCotsSummary.push({
				label: county.constituency_name,
				value: county.number_of_facilities,
				x: county.number_of_beds,
				y: county.number_of_cots
			})
		})

		return summary
	} else {
		return {
			bedsSummary: [],
			cotsSummary: [],
			facilitiesSummary: []
		}
	}
}

//#endregion

//#region CONSTITUENCY selectors
export function getConstituencySummaryFetchStatus(state) {
	return state.facilityReducer.constituencySummaryIsFetched
}
export function getConstituencySummaryChartData(state) {
	if (state.facilityReducer.constituencySummaryIsFetched) {
		const summary = {
			bedsSummary: [],
			cotsSummary: [],
			facilitiesSummary: [],
			bedCotsSummary: [],
			labels: []
		}
		state.facilityReducer.constituencySummary.map((ward, i) => {
			summary.labels.push(ward.ward_name)
			summary.bedsSummary.push({
				label: ward.ward_name,
				value: ward.number_of_beds,
				x: ward.number_of_beds,
				y: i
			})
			summary.cotsSummary.push({
				label: ward.ward_name,
				ward_id: ward.ward_id,
				value: ward.number_of_cots,
				x: ward.number_of_cots,
				y: i
			})
			summary.facilitiesSummary.push({
				label: ward.ward_name,
				ward_id: ward.ward_id,
				x: ward.number_of_facilities,
				value: ward.number_of_facilities,
				y: i
			})
			summary.bedCotsSummary.push({
				label: ward.ward_name,
				value: ward.number_of_facilities,
				x: ward.number_of_beds,
				y: ward.number_of_cots
			})
		})

		return summary
	} else {
		return {
			bedsSummary: [],
			cotsSummary: [],
			facilitiesSummary: []
		}
	}
}

export const getConstituencyNumberOfFacilities = facilityReducer => {
	if (facilityReducer.constituencySummary) {
		const getNumberOfFacilities = constituencySummary => {
			return constituencySummary.map(constituency => {
				let value = {}
				value["facility"] = constituency["ward_name"]
				value["number_of_facilities"] = constituency["number_of_facilities"]
				return value
			})
		}
		const getNumberOfBeds = constituencySummary => {
			return constituencySummary.map(constituency => {
				let value = {}
				value["id"] = constituency["ward_name"]
				value["label"] = constituency["ward_name"]
				value["value"] = constituency["number_of_beds"]
				return value
			})
		}
		const getNumberOfCots = constituencySummary => {
			return constituencySummary.map(constituency => {
				let value = {}
				value["id"] = constituency["ward_name"]
				value["label"] = constituency["ward_name"]				
				value["value"] = constituency["number_of_cots"]
				return value
			})
		}

		return {
			facilitiesSummary: {
				barGraph: {
					data: getNumberOfFacilities(facilityReducer.constituencySummary),
					indexBy: "facility",
					keys: ["number_of_facilities"],
					legend: "number of facilities"
				}
			},
			bedsSummary: {
				pieChart: {
					data: getNumberOfBeds(facilityReducer.constituencySummary),
					indexBy: "facility",
					keys: ["number_of_beds"],
					legend: "number of beds"
				}
			},
			cotsSummary: {
				pieChart: {
					data: getNumberOfCots(facilityReducer.constituencySummary),
					indexBy: "facility",
					keys: ["number_of_cots"],
					legend: "number of cots"
				}
			}
		}
	}
}
//#endregion

//#region WARD selectors

export function getWardSummaryFetchStatus(state) {
	return state.facilityReducer.wardSummaryIsFetched
}

export function getWardSummaryChartData(state) {
	if (state.facilityReducer.wardSummaryIsFetched) {
		const summary = {
			bedsSummary: [],
			cotsSummary: [],
			facilitiesSummary: [],
			bedCotsSummary: [],
			labels: []
		}
		state.facilityReducer.wardSummary.map((facility, i) => {
			summary.labels.push(facility.name)
			summary.bedsSummary.push({
				label: facility.name,
				value: facility.number_of_beds,
				x: facility.number_of_beds,
				y: i
			})
			summary.cotsSummary.push({
				label: facility.name,
				value: facility.number_of_cots,
				x: facility.number_of_cots,
				y: i
			})
			summary.facilitiesSummary.push({
				label: facility.name,
				x: facility.number_of_facilities,
				value: facility.number_of_facilities,
				y: i
			})
			summary.bedCotsSummary.push({
				label: facility.name,
				value: facility.number_of_facilities,
				x: facility.number_of_beds,
				y: facility.number_of_cots
			})
		})

		return summary
	} else {
		return {
			bedsSummary: [],
			cotsSummary: [],
			facilitiesSummary: []
		}
	}
}

export function getWardSummaryGraphData(facilityReducer) {
	if (facilityReducer.wardSummary) {
		const bedsBarGraph = wardSummary => {
			var barGraphDataArray = []
			var keys = []
			wardSummary.map(facility => {
				barGraphDataArray.push({
					facility: facility.name,
					beds: facility.number_of_beds
				})
			})
			keys.push("beds")

			return {
				data: barGraphDataArray,
				keys,
				indexBy: "facility"
			}
		}

		const cotsBarGraph = wardSummary => {
			var barGraphDataArray = []
			var keys = []
			wardSummary.map(facility => {
				barGraphDataArray.push({
					facility: facility.name,
					beds: facility.number_of_cots
				})
			})
			keys.push("cots")

			return {
				data: barGraphDataArray,
				keys,
				indexBy: "facility"
			}
		}

		return {
			bedsSummary: {
				barGraph: bedsBarGraph(facilityReducer.wardSummary)
			},
			cotsSummary: {
				barGraph: cotsBarGraph(facilityReducer.wardSummary)
			}
		}
	} else {
		return undefined
	}
}

export function getWardFacilityTypeGraphData(facilityReducer) {
	if (facilityReducer.wardFacilityTypesSummary) {
		const createBarGraphKeys = wardSummary => {
			return Object.keys(wardSummary.value)
		}

		const createBarGraph = wardSummary => {
			return Object.keys(wardSummary.value).map((facilityType, i) => {
				return {
					x: i,
					y: wardSummary.value[facilityType],
					color: "red"
				}
			})
		}

		return {
			barGraph: {
				data: createBarGraph(facilityReducer.wardFacilityTypesSummary),
				keys: createBarGraphKeys(facilityReducer.wardFacilityTypesSummary)
			}
		}
	} else {
		return undefined
	}
}
export function getWardKephLevelGraphData(facilityReducer) {
	if (facilityReducer.wardKephLevelsSummary) {
		const createBarGraphKeys = wardSummary => {
			return Object.keys(wardSummary.value)
		}

		const createBarGraph = wardSummary => {
			return Object.keys(wardSummary.value).map((facilityType, i) => {
				return {
					x: i,
					y: wardSummary.value[facilityType],
					color: "red"
				}
			})
		}

		return {
			barGraph: {
				data: createBarGraph(facilityReducer.wardKephLevelsSummary),
				keys: createBarGraphKeys(facilityReducer.wardKephLevelsSummary)
			}
		}
	} else {
		return undefined
	}
}
//#endregion

export function getCurrentFacilityInformationType(state) {
	return state.facilityReducer.currentFacilityInformationType
}

export function getFacilityTypes(state) {
	return state.facilityReducer.facilityTypes
}
export function getFacilityTypesNames(state) {
	if (state.facilityReducer.facilityTypes) {
		let facilityTypesNames = []

		state.facilityReducer.facilityTypes.map((facilityType, i) => {
			facilityTypesNames.push(facilityType.name)
		})

		return facilityTypesNames
	} else {
		return undefined
	}
}

export function getKephLevelsNames(state) {
	if (state.facilityReducer.kephLevels) {
		let kephLevelsName = []

		state.facilityReducer.kephLevels.map((kephLevel, i) => {
			kephLevelsName.push(kephLevel.name)
		})

		return kephLevelsName
	} else {
		return undefined
	}
}

export function getKephLevels(state) {
	return state.facilityReducer.kephLevels
}

export function getKephLevelsOptions(state) {
	if (!state.facilityReducer.kephLevels) {
		return undefined
	}
	let kephLevels = []

	state.facilityReducer.kephLevels.map((kephLevel, i) => {
		kephLevels.push({
			key: kephLevel.id,
			value: kephLevel.id,
			text: kephLevel.name
		})
	})

	return kephLevels
}

function renameKeys(dict, keyMap) {
	if (old_key !== new_key) {
		Object.defineProperty(
			o,
			new_key,
			Object.getOwnPropertyDescriptor(o, old_key)
		)
		delete o[old_key]
	}
}
