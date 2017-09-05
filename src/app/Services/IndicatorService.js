export default class IndicatorService{
    static get host(){
        delete IndicatorService.host;
        return IndicatorService.host = 'http://41.89.94.68:8000/indicators/api/';
    }

    static getDataElementGroups(){
        const url = this.host.concat('dataelementgroups/')

        return fetch(url)
            .then(response =>{
                return response.json()
            })
            .catch(error =>{
                throw(error)
            })
    }
    
    static getDatalements(dataElementGroupId=undefined){
        var url = this.host.concat('datalements/')
        if(dataElementGroupId){
            url = this.host.concat('dataelementgroups/' + dataElementGroupId + '/dataelements/' )
        }

        return fetch(url)
            .then(response =>{
                return response.json()
            })
            .catch(error =>{
                return error
            })
    }

    static getIndicators(){
        const url = this.host.concat('indicators/')

        return fetch(url)
            .then(response =>{
                return response.json()
            })
            .catch(error =>{
                throw(error)
            })
    }

    static getIndicatorGroups(){
        const url = this.host.concat('indicatorgroups/')

        return fetch(url)
            .then(response =>{
                return response.json()
            })
            .catch(error =>{
                throw(error)
            })
    }


}