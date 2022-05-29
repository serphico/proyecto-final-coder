const dotenv = require('dotenv')

dotenv.config()

const variableEnv = {

    port : process.env.PORT,
    node_env : process.env.NODE_ENV,
    mongo_atlas : process.env.MONGO_ATLAS

}

module.exports = variableEnv;