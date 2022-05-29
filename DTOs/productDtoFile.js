class ProductDto{
    constructor({id, title, price, description, photo, category}){
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.photo = photo;
        this.category = category;
    }
}

function asProdDtoFile(products) {
    if (Array.isArray(products))
        return products.map(p => new ProductDto(p))
    else
        return new ProductDto(products)
}

module.exports = {asProdDtoFile, ProductDto}