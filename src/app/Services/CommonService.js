

export default class CommonService{
    static get host() {
        delete CommonService.host;
        return CommonService.host = 'http://localhost:8000/';
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
}


