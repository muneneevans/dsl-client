

export default class FacilityService{
    static getCountyIds(){
        const url = 'http://localhost:8000/maps/api/counties/list'

        return fetch(url)
            .then(response =>{
                return response.json()
            })
            .catch(error=>{
                return error
            })
    }

    static getCountyConstituencyCodes(countyId){
        const host = 'http://localhost:8000/maps/api/counties/'

        const url = host.concat(countyId,'/constituencies/')

        return fetch(url)
            .then(response =>{
                return response.json()
            })
            .catch(error =>{
                return error
            })
    }

    static getConstituencyWardCodes(constituencyId){
        const host = 'http://localhost:8000/maps/api/constituencies/'
        const url = host.concat(constituencyId,'/wards/')
        return fetch(url)
            .then(response =>{
                return response.json()
            })
            .catch(error =>{
                return error
            })
    }
}


