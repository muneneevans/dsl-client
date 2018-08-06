import { sharedHost } from "../Store/Shared/hosts"
class MapService{
    static getKenyaCountyMap(){
        const url = sharedHost.concat('maps/api/counties/map')

        return fetch(url).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}


export default MapService
