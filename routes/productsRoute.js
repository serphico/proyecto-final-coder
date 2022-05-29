const {Router} = require('express')
const passport = require('passport');
const isAuth = require('../utils/isAuth')
const productSv = require('../services/productSv/productSv');
const logger = require('../utils/logger');
const showInfoAccount = require('../services/showAccountInfo/showAccountInfo');

const productRoute = Router()



productRoute.get('/',isAuth, (req, res) => {
    try {
        let isLogin = req.session.email
        let resp = res;
        showInfoAccount.infoAccount(isLogin)
        .then(user => 

        productSv.findAll()
        .then(productos =>{
            resp.render('pages/index',{ productos: productos, isLogin: isLogin, user: user});
        })
        )
    
      } catch (error) {
        logger.error(`error en ruta get home, ${error}`)
      }
})

/*productRoute.get('/:id', (req, res) => {
        let resp = res
        let id = req.params.id
        productSv.findById(id)
        .then( res =>{
            resp.send(res)
        })
})*/

productRoute.post('/', (req, res) => {
    let resp = res
    productSv.saveNewProd(req.body)
    .then( res =>{
        resp.send(res)
    })
})

productRoute.delete('/:id', (req, res) => {
    let resp = res
    productSv.deleteAProd(req.params.id)
    .then( res =>{
        resp.send(res)
    })
})

productRoute.delete('/', (req, res) => {
    let resp = res
    productSv.deleteAllProd()
    .then( res =>{
        resp.send(`borrado todo`)
    })
})

productRoute.put('/:id', (req, res) => {
    let resp = res
    productSv.updateProdById(req.params.id, req.body)
    .then( res =>{
        resp.send(`elemento actualizado ${res}`)
    })
})

module.exports = {productRoute};