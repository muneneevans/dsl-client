import { sharedHost } from "../Store/Shared/hosts"
export default class StaffService {
	static get host() {
		delete StaffService.host
		return (StaffService.host = sharedHost.concat("hr/api/"))
	}

	static getJobTypes() {
		const url = this.host.concat("staff/jobtypes/")
		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				throw error
			})
	}

	static getCadres() {
		const url = this.host.concat("staff/cadres/")
		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				throw error
			})
	}

	static getFacilityStaff(facilityId) {
		const url = this.host.concat("facility/" + facilityId)
		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				throw error
			})
	}

	static getFacilityJobType(facilityId, jobTypeId) {
		const url = this.host.concat(
			"facility/" + facilityId + "/jobtype/" + jobTypeId
		)
		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				throw error
			})
	}

	static getCountryJobTypes() {
		const url = this.host.concat("country/jobtypes/")

		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				throw error
			})
	}

	static getWardFacilityNumberOfStaff(wardId) {
		const url = this.host.concat(
			"wards/" + wardId + "/facility/numberofstaff/"			
		)
		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				throw error
			})
	}
	static getConstituencyWardNumberOfStaff(constituencyId) {
		const url = this.host.concat(
			"constituencies/" + constituencyId + "/ward/numberofstaff/"			
		)
		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				throw error
			})
	}
}
