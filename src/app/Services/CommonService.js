import { sharedHost } from "../Store/Shared/hosts"

export default class CommonService {
	static get host() {
		delete CommonService.host
		return (CommonService.host = sharedHost.concat("maps/api/"))
	}

	static getCountyIds() {
		const url = this.host.concat("counties/list")

		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				return error
			})
	}

	static getCountyConstituencyCodes(countyId) {
		const url = this.host.concat("counties/", countyId, "/constituencies/")

		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				return error
			})
	}

	static getConstituencyWardCodes(constituencyId) {
		const url = this.host.concat("constituencies/", constituencyId, "/wards/")
		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				return error
			})
	}

	static getWardDetails(wardId) {
		const url = this.host.concat("wards/", wardId)

		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				return error
			})
	}
	static getConstituencyDetails(constituencyId) {
		const url = this.host.concat("constituencies/", constituencyId)

		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				return error
			})
	}
}
