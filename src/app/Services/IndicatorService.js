export default class IndicatorService{
    static get host(){
        delete IndicatorService.host;
        return IndicatorService.host = 'http://localhost:8000/';
    }

    static getDatalements(){
        const url = this.host.concat('indicators/api/datalements/')

        return fetch(url)
            .then(response =>{
                return response.json()
            })
            .catch(error =>{
                return error
            })
    }
}