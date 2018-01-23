import { sharedHost } from "../Store/Shared/hosts"
export default class FacilityService {
	static get host() {
		delete FacilityService.host
		return (FacilityService.host = sharedHost.concat("facilities/api/"))
	}

	static getFacilityDetails(facilityId) {
		const url = this.host.concat(facilityId, "/")
		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				throw error
			})
	}

	static getCountryFacilityTypeSummary() {
		const url = this.host.concat("country/facilitytypes/summary/")
		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				throw error
			})
	}

	static getCountryKephLevelSummary() {
		const url = this.host.concat("country/kephlevels/summary")
		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				throw error
			})
	}

	static getCountryBedsSummary() {
		const url = this.host.concat("country/beds/summary")
		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				throw error
			})
	}

	static getCountrySummary() {
		const url = this.host.concat("country/summary/")
		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				throw error
			})
	}

	static getCountySummary(countyId) {
		const url = this.host.concat("county/", countyId, "/summary/")
		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				throw error
			})
	}

	static getCountyFacilityTypeSummary(countyId) {
		const url = this.host.concat("county/", countyId, "/facilitytypes/summary/")
		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				throw error
			})
	}

	static getCountyKephLevelsSummary(countyId) {
		const url = this.host.concat("county/", countyId, "/kephlevels/summary/")
		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				throw error
			})
	}

	static getConstituencySummary(constituencyId) {
		const url = this.host.concat("constituency/", constituencyId, "/summary/")
		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				throw error
			})
	}

	//#region ward
	static getWardSummary(wardId) {
		const url = this.host.concat("ward/", wardId, "/summary/")
		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				throw error
			})
	}

	static getWardFacilityTypeSummary(wardId) {
		const url = this.host.concat("ward/", wardId, "/facilitytypes/summary/")
		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				throw error
			})
	}
	//#endregion

	static getFacilities(level, id) {
		const url = this.host.concat(level, "/", id, "/facilities")
		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				throw error
			})
	}

	static getFacilityTypes() {
		const url = this.host.concat("facilitytypes/")
		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				return error
			})
	}

	static getFaciityKephLevels() {
		const url = this.host.concat("kephlevels/")
		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				return error
			})
	}
}
