// require('babel-polyfill')

class MapService{
    static getKenyaCountyMap(){
        const url = 'http://41.89.94.68:8000/maps/api/counties/map'

        return fetch(url).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}


export default MapService
