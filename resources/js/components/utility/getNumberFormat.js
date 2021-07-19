export const getSingleProductPrice = item => {
    return new Intl.NumberFormat().format(parseInt(item.quantity) * parseInt(item.product.price.split(',').join('')));
}


export const convertToNumberFormat = price => {
    return new Intl.NumberFormat().format(price);
}

