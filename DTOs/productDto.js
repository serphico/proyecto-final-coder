class ProductDto{
    constructor({_id,title, price, description, photo, category}){
        this._id = _id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.photo = photo;
        this.category = category;
    }
}

function asProdDto(products) {
    if (Array.isArray(products))
        return products.map(p => new ProductDto(p))
    else
        return new ProductDto(products)
}

module.exports = {asProdDto, ProductDto}