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

export function getFacilityProductOptions(state){
    if (state.commodityReducer.facilityProducts){
        let products = []
        state.commodityReducer.facilityProducts.map((product, i) => {
            products.push({
                key: product.id,
                value: product.id,
                text: product.name
            })
        })
        return products
    }
    else{ return undefined}
}