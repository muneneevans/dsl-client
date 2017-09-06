export function getDataElementsFetchStatus(state){
    return state.indicatorReducer.dataElementsIsFetched
}

export function getDataElements(state){
    return state.indicatorReducer.dataElements
}