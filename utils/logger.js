const winston = require("winston");
const variableEnv = require('../DAOs/config')

function buildProdLogger() {
    const prodLogger = winston.createLogger({
        level: "info",
        transports: [
            new winston.transports.File({ filename: 'debug.log', level:"debug"}),
            new winston.transports.File({ filename:'info.log', level:'error'}),
        ]
    })

    return prodLogger
}

function buildDevLogger() {
    const devLogger = winston.createLogger({
        level: "info",
        transports: [
            new winston.transports.Console({level:"info"}),
        ]
    })

    return devLogger
}

let logger = null

if(variableEnv.node_env === "PROD")  {
    logger = buildProdLogger()
} else {
    logger = buildDevLogger()
}

module.exports = logger;