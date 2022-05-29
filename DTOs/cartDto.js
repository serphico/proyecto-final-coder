class CartDto{
    constructor({timeStamp, productos}){
        this.timeStamp = timeStamp;
        this.productos = productos
    }
}

function asCartDto(products) {
    if (Array.isArray(products))
        return products.map(p => new asCartDto(p))
    else
        return new asCartDto(products)
}

module.exports = {asCartDto, CartDto}