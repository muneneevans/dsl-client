export default class FacilityService {
    static get host() {
        delete FacilityService.host
        return FacilityService.host = 'http://localhost:8000/facilities/api/'
    }

    static getCountySummary(countyId) {
        const url = this.host.concat('county/', countyId, '/summary/')
        return fetch(url)
            .then(response => {
                return response.json()
            })
            .catch(error => {
                throw (error)
            })
    }

    static getConstituencySummary(constituencyId) {
        const url = this.host.concat('constituency/', constituencyId, '/summary/')
        return fetch(url)
            .then(response => {
                return response.json()
            })
            .catch(error => {
                throw (error)
            })
    }
    static getFacilities(level, id) {
        const url = this.host.concat(level, '/', id, '/facilities')
        return fetch(url)
            .then(response => {
                return response.json()
            })
            .catch(error => {
                throw (error)
            })
    }

    static getFacilityTypes() {
        const url = this.host.concat('facilitytypes/')
        return fetch(url)
            .then(response => {
                return response.json()
            })
            .catch(error => {
                return error
            })
    }

    static getFaciityKephLevels() {
        const url = this.host.concat('kephlevels/')
        return fetch(url)
            .then(response => {
                return response.json()
            })
            .catch(error => {
                return error
            })
    }
}


