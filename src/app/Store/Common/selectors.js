//selectors
export function getCountyCodes(state){    
    return state.commonReducer.countyCodes
}

export function getCountyOptions(state){
    if (!state.commonReducer.countyCodes) {
        return undefined
    }
    let countyCodes = []

    state.commonReducer.countyCodes.map((county, i) => {
        
        countyCodes.push({
            key: county.id,
            value: county.id,
            text: county.name
        })
    })

    return countyCodes
}

export function getCountyConstituencyCodesFetchStatus(state){
    return state.commonReducer.constituencyCodesIsFetched
}
export function getCountyConstituencyCodes(state){
    return state.commonReducer.constituencyCodes
}


export function getWardCodesFetcchedstatus(state){
    return state.commonReducer.wardCodesIsFetched
}
export function getWardCodes(state){
    return state.commonReducer.wardCodes
}

export function getCurrentLevel(state){    
    return state.commonReducer.currentLevel
}

export function getCurrentId(state){
    return state.commonReducer.currentId
}
