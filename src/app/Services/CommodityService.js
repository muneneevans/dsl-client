export default class CommodityService {
    static get host() {
        delete CommodityService.host
        return CommodityService.host = 'http://41.89.94.68:8000/commodities/api/'
    }

    static getProducts() {
        const url = this.host.concat('products')

        return fetch(url)
            .then(response => {
                return response.json()
            })
            .catch(error => {
                throw (error)
            })
    }

    static getFacilityProducts(facility_id) {
        const url = this.host.concat('products/facility/' + facility_id)

        return fetch(url)
            .then(response => {
                return response.json()
            })
            .catch(error => {
                throw (error)
            })
    }
}