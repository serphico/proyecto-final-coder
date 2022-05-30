
const MongoProductDao = require('../mongoProductDao/mongoProductDao')
const FileProductDao = require('../fileProductDao/fileProductDao')
const variableEnv = require('../config')
const logger = require('../../utils/logger')

const rutaArchivoProducts = './products.txt'
const mongo = variableEnv.mongo_atlas

const opcion = process.argv[ 2 ] || 'Mongo'
console.log(opcion)
let dao
switch (opcion) {
    case 'Mongo':
        dao = new MongoProductDao(mongo)
        logger.info(`base de datos con mongo `)
        dao.init()
        break
    default:
        dao = new FileProductDao(rutaArchivoProducts)
        dao.init()
        break
}

module.exports = class ProductDaoFactory {
    static getDao() {
        return dao
    }
}