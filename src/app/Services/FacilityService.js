export default class FacilityService{
    static get host() {
        delete FacilityService.host
        return FacilityService.host = 'http://localhost:8000/facilities/'
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


