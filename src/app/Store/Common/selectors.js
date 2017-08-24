//selectors
export function getCountyCodes(state){    
    return state.commonReducer.countyCodes
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
