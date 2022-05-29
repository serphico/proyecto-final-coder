const fs = require('fs')
const {asProdDtoFile} = require('../../DTOs/productDtoFile')

const logger = require('../../utils/logger')

class FileProductDao{
    #ready = false

    constructor(path){
        this.path = path;
        this.product = []
    }

    async init() {
        try {
            await fs.promises.readFile(this.path, 'utf-8')
            this.#ready = true
            logger.info('productDao en archivo -> listo')
        } catch (error) {
            await fs.promises.writeFile(this.path, '[]')
            this.#ready = true
            logger.info('productDao en archivo -> listo')
        }
    }

    disconnect() {
        logger.info('productDao en archivo -> cerrado')
    }

    #checkReady() {
        if (!this.#ready) throw new Error('INTERNAL_ERROR: dao no conectado!')
    }

    async #readFile() {
        this.#checkReady()
        const text = await fs.promises.readFile(this.path, 'utf-8')
        this.product = JSON.parse(text)
    }

    async #writeFile() {
        this.#checkReady()
        const text = JSON.stringify(this.product, null, 2)
        await fs.promises.writeFile(this.path, text)
    }

    #getIndex(id) {
        return this.product.findIndex(product => product.id === id)
    }

    async getAll() {
        try {
            await this.#readFile()
            return asProdDtoFile(this.product)    
        } catch (error) {
            logger.error(`error en fileProductDao metodo getAll: ${error}`)
        }
    }

    async getById(idSearching) {
        try {
            await this.#readFile()
            return asProdDtoFile(this.product[ this.#getIndex(idSearching) ])
        } catch (error) {
            logger.error(`error en fileProductDao metodo getById: ${error}`)
        }

    }

    async save(newProduct) {
        try {
            await this.#readFile()
            this.product.push(newProduct)
            await this.#writeFile()
            return asProdDtoFile(newProduct)
        } catch (error) {
            logger.error(`error en fileProductDao metodo save: ${error}`)
        }

    }

    async deleteById(idByDelete) {
        try {
            await this.#readFile()
            const [ prodDelete ] = this.product.splice(this.#getIndex(idByDelete), 1)
            await this.#writeFile()
            return asProdDtoFile(prodDelete)
        } catch (error) {
            logger.error(`error en fileProductDao metodo deleteById: ${error}`)
        }

    }

    async deleteAll() {
        try {
            this.product = []
            await this.#writeFile()
        } catch (error) {
            logger.error(`error en fileProductDao metodo deleteAll: ${error}`)
        }

    }

    async updateById(idByChange, newInput) {
        try {
            await this.#readFile()
            const index = this.#getIndex(idByChange)
            const prodUpdate = { ...this.product[ index ], ...newInput }
            this.product.splice(index, 1, prodUpdate)
            await this.#writeFile()
            return asProdDtoFile(prodUpdate)
        } catch (error) {
            logger.error(`error en fileProductDao metodo updateById: ${error}`)
        }

    }
}

module.exports = FileProductDao;