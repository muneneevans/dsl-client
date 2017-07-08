

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
        console.log(url)

        return fetch(url)
            .then(response =>{
                return response.json()
            })
            .catch(error =>{
                return error
            })
    }
}


