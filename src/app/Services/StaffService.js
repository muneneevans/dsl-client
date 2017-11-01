export default class StaffService {
    static get host() {
        delete StaffService.host
        return StaffService.host = 'http://41.89.94.68:8000/hr/api/'
    }

    static getJobTypes() {
        const url = this.host.concat('staff/jobtypes/')
        return fetch(url)
            .then(response => {
                return response.json()
            })
            .catch(error => {
                throw (error)
            })
    }

    static getCadres() {
        const url = this.host.concat('staff/cadres/')
        return fetch(url)
            .then(response => {
                return response.json()
            })
            .catch(error => {
                throw (error)
            })
    }
}