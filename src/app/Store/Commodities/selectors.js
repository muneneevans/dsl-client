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