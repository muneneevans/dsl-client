export function getJobTypes(state) {
    return state.staffReducer.jobTypes
}

export function getJobTypeOptions(state) {
    if (state.staffReducer.jobTypes) {
        let options = []

        state.staffReducer.jobTypes.map((jobType, i) => {
            options.push({
                key: jobType.id,
                value: jobType.id,
                text: jobType.name
            })
        })
        return options
    }
    else {
        return undefined
    }
}

export function getCadres(state) {
    return state.staffReducer.cadres

}

export function getCadreOptions(state) {
    if (state.staffReducer.cadres) {
        let options = []
        state.staffReducer.cadres.map((cadre, i) => {
            options.push({
                key: cadre.id,
                value: cadre.id,
                text: cadre.name
            })
        })
        return options
    }
    else {
        return undefined
    }
}