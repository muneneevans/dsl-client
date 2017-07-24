// require('babel-polyfill')

class MapService{
    static getKenyaCountyMap(){
        const url = 'http://localhost:8000/maps/api/counties/map'

        return fetch(url).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}


export default MapService
