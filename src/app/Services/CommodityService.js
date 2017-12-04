import { sharedHost } from '../Store/Shared/hosts'
export default class CommodityService {
    static get host() {
        delete CommodityService.host
        return CommodityService.host = sharedHost.concat('commodities/api/')
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

    static getFacilityYearProducts(facilityId, year) {
        const url = this.host.concat('products/facility/' + facilityId +'/')
        const request = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filters: {
                    facilityId: facilityId,
                    year: year
                }
            })
        };
        return fetch(url, request)
            .then(response => {
                return response.json()
            })
            .catch(error => {
                throw (error)
            })
    }
}