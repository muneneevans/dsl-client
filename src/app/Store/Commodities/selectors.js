export function getProductOptions(state) {
    if (state.commodityReducer.products) {
        let products = []
        state.commodityReducer.products.map((product, i) => {
            products.push({
                key: product.id,
                value: product.id,
                text: product.name
            })
        })
        return products
    }
    else { return undefined }
}

export function getFacilityProductOptions(state) {
    if (state.commodityReducer.facilityProducts) {

        let products = []
        let keys = []
        let monthDict = {
            1: 'January',
            2: 'February',
            3: 'March',
            4: 'April',
            5: 'May',
            6: 'June',
            7: 'July',
            8: 'August',
            9: 'September',
            10: 'October',
            11: 'November',
            12: 'December',
        }
        state.commodityReducer.facilityProducts.map((product, i) => {
            products.push({
                key: product.id,
                value: product.id,
                text: product.name
            })
        })
        return products
    }
    else { return undefined }
}

export function getFacilityYearProductGraphs(state) {
    if (state.commodityReducer.facilityYearProducts) {
        let months = [...new Set(state.commodityReducer.facilityYearProducts.map(a => a.month))]
        let output = []
        let keys = []

        months.map(month => {
            var item = {
                'month': month,
                monthName: monthDict[data[ids[0]][i].month]
            }

            var foundProducts = state.commodityReducer.facilityYearProducts.filter(obj => {
                return obj.month == month
            })

            foundProducts.map(product => {
                item[product.name ] = product.quantity
                keys.push(product.name)
            })
            output.push(item)
        })
        
        return {
            data: output,
            keys,
            indexBy: 'monthName'
        }
    }
    else { return undefined }
}

