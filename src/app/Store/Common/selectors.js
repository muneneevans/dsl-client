//selectors
export function getCountyCodes(state) {
	return state.commonReducer.countyCodes
}

export function getCountyOptions(state) {
	if (!state.commonReducer.countyCodes) {
		return undefined
	}
	let countyCodes = []

	state.commonReducer.countyCodes.map(county => {
		countyCodes.push({
			key: county.id,
			value: county.id,
			text: county.name
		})
	})

	return countyCodes
}

export function getCountyNames(state) {
	if (!state.commonReducer.countyCodes) {
		return undefined
	}
	let countyNames = []

	state.commonReducer.countyCodes.map(county => {
		countyNames.push(county.name)
	})

	return countyNames
}

export function getCountyConstituencyCodesFetchStatus(state) {
	return state.commonReducer.constituencyCodesIsFetched
}
export function getCountyConstituencyCodes(state) {
	return state.commonReducer.constituencyCodes
}

export function getConstituencyDetails(commonReducer) {	
	return commonReducer.constituencyDetails
}

export function getWardCodesFetcchedstatus(state) {
	return state.commonReducer.wardCodesIsFetched
}
export function getWardCodes(state) {
	return state.commonReducer.wardCodes
}

export function getCurrentLevel(state) {
	return state.commonReducer.currentLevel
}

export function getCurrentId(state) {
	return state.commonReducer.currentId
}

export function getCurrentWardDetails(commonReducer) {
	return commonReducer.currentWardDetails
}
