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

export function getFacilityStaffGraphData(state) {
    if (state.staffReducer.facilityStaff) {
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

        var staffBarGraph = []
        Object.keys(monthDict).map((month, i) => {
            let item = {
                month: i,
                monthName: monthDict[i]
            }
            state.staffReducer.facilityStaff.map((jobType, i) => {
                item[jobType.jobtype] = jobType.value
            })
            staffBarGraph.push(
                item
            )

        })
        return {
            barGraph: {
                data: staffBarGraph,
                keys: state.staffReducer.jobTypes.map(jobType => jobType.name),
                indexBy: 'monthName'
            }
        }

    }
    else {
        return undefined
    }
}