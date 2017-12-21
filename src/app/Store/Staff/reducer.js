import * as types from "./actionTypes"
import Immutable from "seamless-immutable"

const initialState = Immutable({
	jobTypes: undefined,
	cadres: undefined,

	selectedFacilityJobTypes: undefined,
	facilityStaff: undefined,
	facilityJobTypeDataValues: undefined,

	wardJobTypes: undefined,
	wardStaff: undefined,
	wardJobTypeDataValues: undefined
})

export default function staffReducer(state = initialState, action = {}) {
	switch (action.type) {
	case types.JOB_TYPES_RECEIVED:
		return state.merge({
			jobTypes: action.jobTypes
		})

	case types.CADRES_RECEIVED:
		return state.merge({
			cadres: action.cadres
		})

	case types.FACILITY_STAFF_RECEIVED:
		return state.merge({
			facilityStaff: action.facilityStaff
		})

	case types.ADD_SELECTED_FACILITY_JOB_TYPE_REQUESTED:
		return state.merge({
			selectedFacilityJobTypes: addJobTypeToSelectedJobTypesList(
				action.jobTypeId,
				state.selectedFacilityJobTypes,
				state.jobTypes
			)
		})
	case types.REMOVE_SELECTED_FACILITY_JOB_TYPE_REQUESTED:
		return state.merge({
			selectedFacilityJobTypes: removeJobTypeFromSelectedJobTypesList(
				action.jobTypeId,
				state.selectedFacilityJobTypes
			)
		})

	case types.GET_FACILITY_INDIVIDUAL_SELECTED_JOB_TYPES_REQUESTED:
		return state.merge({
			selectedFacilityJobTypes: updateSelectedJobTypeFetchState(
				action.jobTypeId,
				state.selectedFacilityJobTypes,
				2
			)
		})
	case types.GET_FACILITY_INDIVIDUAL_SELECTED_JOB_TYPES_VALUES_RECEIVED:
		return state.merge({
			selectedFacilityJobTypes: updateSelectedJobTypeFetchState(
				action.jobTypeId,
				state.selectedFacilityJobTypes,
				1
			),
			facilityJobTypeDataValues: addJobTypeDataValuesToList(
				action.dataValues,
				action.jobTypeId,
				state.facilityJobTypeDataValues,
				state.jobTypes
			)
		})

	case types.ADD_WARD_JOB_TYPE_REQUESTED:
		return state.merge({
			wardJobTypes: addJobTypeToSelectedJobTypesList(
				action.jobTypeId,
				state.wardJobTypes,
				state.jobTypes
			)
		})
	case types.REMOVE_WARD_JOB_TYPE_REQUESTED:
		return state.merge({
			wardJobTypes: removeJobTypeFromSelectedJobTypesList(
				action.jobTypeId,
				state.wardJobTypes,
				state.jobTypes
			)
		})
	default:
		return state
	}
}

//combiners
function addJobTypeToSelectedJobTypesList(
	newJobTypeId,
	selectedJobTypes,
	allJobTypes
) {
	if (selectedJobTypes) {
		let existingSelectedFacilityJobTypes = Immutable.asMutable(
			selectedJobTypes,
			{ deep: true }
		)
		//check if the jobType exists in the list of selected facility jobTypes
		let foundJobType = existingSelectedFacilityJobTypes.find(jobType => {
			return jobType.id == newJobTypeId
		})
		if (!foundJobType) {
			existingSelectedFacilityJobTypes.push({
				id: newJobTypeId,
				//jobType.key = jobType Id & jobType.text = jobType name
				name: allJobTypes.find(jobType => {
					return jobType.id == newJobTypeId
				}).name,
				uid: allJobTypes.find(jobType => {
					return jobType.id == newJobTypeId
				}).uid,
				fetchedStatus: -1
			})
		}

		return existingSelectedFacilityJobTypes
	} else {
		let existingSelectedFacilityJobTypes = []
		existingSelectedFacilityJobTypes.push({
			id: newJobTypeId,
			//jobType.key = jobType Id & jobType.text = jobType name
			name: allJobTypes.find(jobType => {
				return jobType.id == newJobTypeId
			}).name,
			uid: allJobTypes.find(jobType => {
				return jobType.id == newJobTypeId
			}).uid,
			fetchedStatus: -1
		})
		return existingSelectedFacilityJobTypes
	}
}

function removeJobTypeFromSelectedJobTypesList(
	newJobTypeId,
	selectedJobTypes
) {
	if (selectedJobTypes) {
		let existingSelectedFacilityJobTypes = Immutable.asMutable(
			selectedJobTypes,
			{ deep: true }
		)
		//check if the jobType exists in the list of selected facility jobTypes,
		existingSelectedFacilityJobTypes.find((jobType, i) => {
			//if jobType exists, splice from array
			if (jobType.id == newJobTypeId) {
				existingSelectedFacilityJobTypes.splice(i, 1)
				return true
			} else {
				return false
			}
		})
		if (existingSelectedFacilityJobTypes.length < 1) {
			return undefined
		}
		return existingSelectedFacilityJobTypes
	} else {
		return undefined
	}
}

function updateSelectedJobTypeFetchState(
	selectedJobTypeId,
	selectedFacilityJobTypes,
	newFetchStatus
) {
	//find the specifin job type and update its fetch status
	let existingjobTypes = Immutable.asMutable(selectedFacilityJobTypes, {
		deep: true
	})
	let foundJobType = existingjobTypes.find(jobType => {
		return jobType.id == selectedJobTypeId
	})
	if (foundJobType) {
		foundJobType.fetchedStatus = newFetchStatus
	}
	return existingjobTypes
}

function addJobTypeDataValuesToList(
	newJobTypeDatavalues,
	newJobTypeId,
	currentJobTypeDataValues,
	allJobTypes
) {
	//check if value entered is 0 or not present. Substitute with 0 if so
	let value =
		newJobTypeDatavalues.length == 0 ? 0 : newJobTypeDatavalues[0].value

	//
	let existingJobTypeDataValues = []
	if (currentJobTypeDataValues) {
		existingJobTypeDataValues = Immutable.asMutable(currentJobTypeDataValues, {
			deep: true
		})
		existingJobTypeDataValues.find((JobType, i) => {
			if (JobType.id == newJobTypeId) {
				existingJobTypeDataValues.splice(i, 1)
				return true
			} else {
				return false
			}
		})
	}
	existingJobTypeDataValues.push({
		value,
		id: newJobTypeId,
		name: allJobTypes.find(jobType => {
			return jobType.id == newJobTypeId
		}).name
	})
	return existingJobTypeDataValues
}
