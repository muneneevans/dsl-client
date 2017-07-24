

export default class FacilityService{
    static get host() {
        delete FacilityService.host;
        return FacilityService.host = 'http://localhost:8000/';
    }
    
    static getCountyIds(){
        const url = this.host.concat('maps/api/counties/list')

        return fetch(url)
            .then(response =>{
                return response.json()
            })
            .catch(error=>{
                return error
            })
    }

    static getCountyConstituencyCodes(countyId){        
        const url = this.host.concat('maps/api/counties/',countyId,'/constituencies/')

        return fetch(url)
            .then(response =>{
                return response.json()
            })
            .catch(error =>{
                return error
            })
    }

    static getConstituencyWardCodes(constituencyId){
        const url = this.host.concat('maps/api/constituencies/',constituencyId,'/wards/')
        return fetch(url)
            .then(response =>{
                return response.json()
            })
            .catch(error =>{
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


