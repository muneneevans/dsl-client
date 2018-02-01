import { sharedHost } from "../Store/Shared/hosts"
export default class IndicatorService {
	static get host() {
		delete IndicatorService.host
		return (IndicatorService.host = sharedHost.concat("indicators/api/"))
	}

	static getPeriodTypes() {
		const url = this.host.concat("periods/periodtypes")

		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				throw error
			})
	}

	static getIndicatorGroups() {
		const url = this.host.concat("indicators/indicatorgroups")

		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				throw error
			})
	}

	static getIndicatorGroupIndicators(indicatorGroupdId) {
		const url = this.host.concat(
			"indicators/indicatorgroups/" + indicatorGroupdId
		)

		return fetch(url)
			.then(indicators => {
				return indicators.json()
			})
			.catch(error => {
				throw error
			})
	}

	static getIndicators() {
		const url = this.host.concat("indicators/")

		return fetch(url)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				throw error
			})
	}

	//#region  facility specific services
	static getIndicatorDataValues(filters) {
		const url = this.host.concat("datavalues/facility/indicator/")

		const request = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				filters: {
					facilityId: filters.facilityId,
					indicatorId: filters.indicatorId,
					periodTypeId: filters.periodTypeId,
					year: filters.year
				}
			})
		}
		return fetch(url, request)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				throw error
			})
	}
	//#endregion

	//#region ward specific services
	static getWardIndicatorDataValues(filters) {
		const url = this.host.concat("datavalues/ward/indicator/")

		const request = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				filters: {
					wardId: filters.wardId,
					indicatorId: filters.indicatorId,
					periodTypeId: filters.periodTypeId,
					year: filters.year
				}
			})
		}
		return fetch(url, request)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				throw error
			})
	}
	static getWardFacilityIndicatorDataValues(filters) {
		const url = this.host.concat("datavalues/ward/facility/indicator/")

		const request = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				filters: {
					wardId: filters.wardId,
					indicatorId: filters.indicatorId,
					periodTypeId: filters.periodTypeId,
					year: filters.year
				}
			})
		}
		return fetch(url, request)
			.then(response => {
				return response.json()
			})
			.catch(error => {
				throw error
			})
	}
	//#endregion
}
