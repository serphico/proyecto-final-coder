const {Router} = require('express')
const passport = require('passport');
const isAuth = require('../utils/isAuth')
const cartSv = require('../services/cartSv/cartSv');
const showInfoAccount = require('../services/showAccountInfo/showAccountInfo');

const logger = require('../utils/logger');


const cartRoute = Router()


cartRoute.get('/', isAuth, (req, res) =>{       

    try {
        let isLogin = req.session.email
        let resp = res;
        showInfoAccount.infoAccount(isLogin)
        .then(user => 
        cartSv.showAll()
        .then(cart =>{
            resp.render('pages/cart',{cart:cart, isLogin:isLogin, user:user})
        } )
        )
    } catch (error) {
        logger.error(`error en ruta get cart, ${error}`)
    }
})

cartRoute.post('/', (req, res)=>{
    try {
        cartSv.addAll(req.body.id)
    
      } catch (error) {
        logger.error(`error en ruta post cart, ${error}`)
      }
})

cartRoute.post('/buy', (req, res)=>{
  try {
    let user = req.session.email
    cartSv.buyProd(req.body, user)
  
    } catch (error) {
      logger.error(`error en ruta put cart, ${error}`)
    }
})

cartRoute.post('/:id', (req, res)=>{
    try {
      cartSv.updateById(req.body)
    
      } catch (error) {
        logger.error(`error en ruta put cart, ${error}`)
      }
})

cartRoute.delete('/:id', (req, res)=>{
  try {
    cartSv.deleteById(req.params.id)
  
    } catch (error) {
      logger.error(`error en ruta put cart, ${error}`)
    }
})




module.exports = {cartRoute};