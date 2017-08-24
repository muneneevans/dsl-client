export default class FacilityService{
    static get host() {
        delete FacilityService.host
        return FacilityService.host = 'http://localhost:8000/facilities/api/'
    }
    

    static getCountyFacilities(countyId){
        const url = this.host.concat('county/',countyId,'/facilities')
        return fetch(url)
            .then(response =>{
                return response.json()
            })
            .catch(error =>{
                return error
            })
    }

    static getCountySummary(countyId){
        const url = this.host.concat('county/', countyId, '/summary/')
        return fetch(url)
            .then(response =>{
                return response.json()
            })
            .catch(error =>{
                throw(error)
            })
    }

    static getConstituencyFacilities(constituencyId){
        const url = this.host.concat('constituency/', constituencyId,'/facilities')
        return fetch(url)
            .then(response => {
                return response.json()
            })
            .catch(error => {
                return error
            })
    }

    static getWardFacilities(wardId){
        const url = this.host.concat('ward/', wardId,'/facilities')
        return fetch(url)
            .then(response => {
                return response.json()
            })
            .catch(error =>{
                throw(error)
            })
    }

    static getFacilityTypes(){
        const url = this.host.concat('facilities/facilitytypes/')
        return fetch(url)
            .then(response =>{
                return response.json()
            })
            .catch(error => {
                return error
            })
    }

    static getFaciityKephLevels(){
        const url = this.host.concat('facilities/kephlevels/')
        return fetch(url)
            .then(response => {
                return response.json()
            })
            .catch(error => {
                return error
            })
    }
}


