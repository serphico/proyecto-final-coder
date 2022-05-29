const app = require('./main')
const logger = require('./utils/logger')
const variableEnv = require('./DAOs/config')


const server = app.listen(variableEnv.port, () =>{
    logger.info(`servidore corriendo en puerto: ${variableEnv.port}`)
})

server.on(variableEnv.port, (err)=>{
    logger.error(`Error en server.js: ${err}`)
})