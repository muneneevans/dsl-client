// require('babel-polyfill')

class MapService{
    static getKenyaCountyMap(){
        const url = 'http://localhost:8000/maps/api/countries/kenya/county'

        return fetch(url).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}


export default MapService
