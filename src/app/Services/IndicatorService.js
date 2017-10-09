export default class IndicatorService {
    static get host() {
        delete IndicatorService.host;
        return IndicatorService.host = 'http://41.89.94.68:8000/indicators/api/'
    }

    static getIndicatorGroups(){
        const url = this.host.concat('indicators/indicatorgroups')

        return fetch(url)
            .then(response => {
                return response.json()
            }).catch(error =>{
                throw(error)
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


}