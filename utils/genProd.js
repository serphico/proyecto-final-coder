const {faker} = require('@faker-js/faker')

const getProd = () => ({
    title: 	faker.commerce.product(),
    price: faker.commerce.price(100, 200, 0),
    description: faker.commerce.productDescription(),
    photo: `${faker.commerce.productAdjective()}.png`,
    category: faker.commerce.productAdjective()
})

module.exports = {
    getProd
}