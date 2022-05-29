const Products = require('../schemas/prodSchema')
const Cart = require('../schemas/cartSchema')
const mongoose = require('mongoose')
const {asProdDto} = require('../../DTOs/productDto')

const logger = require('../../utils/logger')


class MongoProductDao{
    constructor(mongo){
        this.connect = mongo;
        this.product = Products;
        this.cart = Cart;
    }

    async init(){
        await mongoose.connect(this.connect)
        logger.info('conectado a la colección products de mongo atlas')
    }

    async disconnect() {
        await mongoose.disconnect()
        console.log('personas dao en mongodb -> cerrado')
    }

    async getAll(){
        try {
            const products = await this.product.find({})
            logger.info(products)
            return asProdDto(products)
        } catch (error) {
            logger.error(`error en CrudProductDao metodo getAll: ${error}`)
        }
    }

    async getById(idSearching) {
        try {
            const product = await this.product.findOne({ _id: idSearching })
            return asProdDto(product)    
        } catch (error) {
            logger.error(`error en CrudProductDao metodo getById: ${error}`)
        }

    }

    async save(newProduct) {
        try {
            console.log(newProduct)
            await this.product.create(newProduct)
            return asProdDto(newProduct)
        } catch (error) {
            logger.error(`error en CrudProductDao metodo save: ${error}`)
        }

    }

    async deleteById(idByDelete) {
        try {
            const prodDelete = await this.product.findOneAndDelete({ _id: idByDelete })
            return asProdDto(prodDelete)
        } catch (error) {
            logger.error(`error en CrudProductDao metodo deleteById: ${error}`)
        }

    }

    async deleteAll() {
        try {
            await this.product.deleteMany({})
        } catch (error) {
            logger.error(`error en CrudProductDao metodo deleteAll: ${error}`)
        }
    }

    async updateById(idByChange, newInput) {
        try {
            const prodUpdate = await this.product.findOneAndUpdate({ _id: idByChange }, { $set: newInput })
            return asProdDto(prodUpdate)    
        } catch (error) {
            logger.error(`error en CrudProductDao metodo updateById: ${error}`)
        }

    }

    async addCart(idProd){
        try {
            console.log(idProd)
            const product = await this.product.findOne({ _id: idProd })
            return asProdDto(product)
         
        } catch (error) {
          logger.info(`error on class Cart en el metodo addProd: ${error}`)  
        }

    }

    async showCart(){
        try {
            let cartContent = await this.contentCart;
            return cartContent;

        } catch (error) {
            logger.info(`error on class Cart en el metodo showCart: ${error}`)  

        }
    }

    async updateCartById(prod){
        try {
            console.log(prod._id)
            const product = await this.product.findOne({ _id: prod._id })
            return asProdDto(product)

        } catch (error) {
            logger.info(`error on class Cart en el metodo updateCartById: ${error}`)  

        }
    }

    async buy(finalCart){
        try {
            console.log(finalCart)

            await this.cart.create(finalCart)
        } catch (error) {
            logger.info(`error on class Cart en el metodo buy: ${error}`)  

        }
    }
}

module.exports = MongoProductDao;