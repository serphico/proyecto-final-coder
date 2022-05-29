const logger = require("../../utils/logger");
const ProductDaoFactory = require("../../DAOs/factoryConnect/factoryConnect");



class ProductSv{

    constructor(){
        this.productDao =  ProductDaoFactory.getDao();
    }

    async findAll(){
        try {
            const prodFound = await this.productDao.getAll();
            return prodFound;
        } catch (error) {
            logger.error(`error en la capa de servicio productSv en metodo findAll: ${error}`)  
        }

    }

    async findById(id){
        try {
            const prodFound = await this.productDao.getById(id);
            return prodFound;
        } catch (error) {
            logger.error(`error en la capa de servicio productSv en metodo findById: ${error}`)  
        }

    }

    async saveNewProd(newProd){
        try {
            const prodFound = await this.productDao.save(newProd);
            return prodFound;
        } catch (error) {
            logger.error(`error en la capa de servicio productSv en metodo saveNewProd: ${error}`)  
        }

    }

    async deleteAProd(idProd){
        try {
            const prodFound = await this.productDao.deleteById(idProd);
            return prodFound;
        } catch (error) {
            logger.error(`error en la capa de servicio productSv en metodo daleteAProd: ${error}`)  
        }

    }

    async deleteAllProd(){
        try {
            const prodFound = await this.productDao.deleteAll();
            return prodFound;
        } catch (error) {
            logger.error(`error en la capa de servicio productSv en metodo daleteAProd: ${error}`)  
        }

    }

    async updateProdById(idByChange, newInput){
        try {
            const prodFound = await this.productDao.updateById(idByChange,newInput);
            return prodFound;
        } catch (error) {
            logger.error(`error en la capa de servicio productSv en metodo updateProdById: ${error}`)  
        }

    }

}



const productSv = new ProductSv();

module.exports = productSv;