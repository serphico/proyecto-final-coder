const logger = require('../../utils/logger')
const Users = require('../../DAOs/schemas/schemaUser')
const mongoose = require('mongoose')
const {asDto} = require('../../DTOs/usersDto')

class ShowInfoAccount{
    constructor(){

    }

    async infoAccount(username){
        try {
            let userData = await Users.findOne({ 'email': username})
            

            return asDto(userData)

        } catch (error) {
            logger.error(`error en metodo infoAccount: ${error}`)
        }
    }
}

const showInfoAccount = new ShowInfoAccount();

module.exports = showInfoAccount;