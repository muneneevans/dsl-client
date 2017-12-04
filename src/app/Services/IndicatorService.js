import { sharedHost } from '../Store/Shared/hosts'
export default class IndicatorService {
    static get host() {
        delete IndicatorService.host;
        return IndicatorService.host = sharedHost.concat('indicators/api/')
    }

    static getIndicatorGroups() {
        const url = this.host.concat('indicators/indicatorgroups')

        return fetch(url)
            .then(response => {
                return response.json()
            })
            .catch(error => {
                throw (error)
            })
    }

    static getIndicatorGroupIndicators(indicatorGroupdId) {
        const url = this.host.concat('indicators/indicatorgroups/' + indicatorGroupdId)

        return fetch(url)
            .then(indicators => {
                return indicators.json()
            })
            .catch(error => {
                throw (error)
            })
    }

    static getIndicatorDataValues(filters) {
        const url = this.host.concat('datavalues/facility/indicator/')
        
        const request = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filters: {
                    facilityId: filters.facilityId,
                    indicatorId: filters.indicatorId,
                    periodTypeId: filters.periodTypeId,
                    year: filters.year
                }
            })
        };              
        return fetch(url, request)
            .then(response => {
                return response.json()
            })
            .catch(error => {
                throw (error)
            })
    }


    static getDataElementGroups() {
        const url = this.host.concat('dataelementgroups/')

        return fetch(url)
            .then(response => {
                return response.json()
            })
            .catch(error => {
                throw (error)
            })
    }

    static getDatalements(dataElementGroupId = undefined) {
        var url = this.host.concat('dataelements/')
        if (dataElementGroupId) {
            url = this.host.concat('dataelementgroups/' + dataElementGroupId + '/dataelements/')
        }

        return fetch(url)
            .then(response => {
                return response.json()
            })
            .catch(error => {
                return error
            })
    }

    static getIndicators() {
        const url = this.host.concat('indicators/')

        return fetch(url)
            .then(response => {
                return response.json()
            })
            .catch(error => {
                throw (error)
            })
    }

    static getFacilityDataElementDatavalues(facilityId, dataElementId) {
        const url = this.host.concat('datavalues/facility/', facilityId, '/dataelement/', dataElementId)
        return fetch(url)
            .then(response => {
                return response.json()
            })
            .catch(error => {
                throw (error)
            })
    }

    static getPeriodTypes() {
        const url = this.host.concat('periods/periodtypes')

        return fetch(url)
            .then(response => {
                return response.json()
            })
            .catch(error => {
                throw (error)
            })
    }

}