const { Router } = require('express');
const passport = require('passport');
const multer = require('multer');
const path = require('path');
require('../utils/passportStrategy')
const sendMail = require('../services/sendmail/sendMailConfig')
const logger = require('../utils/logger');

/*------------------INICIO DECLARAR RUTAS------------------------*/

const loginRoute = Router();
const registerRoute = Router();
const logoutRoute = Router();
const failLoginRoute = Router();
const failRegisterRoute = Router();

/*------------------INICIO SET MULTER------------------------*/

const storage = multer.diskStorage({
    destination: function(req, file,cb){
        cb(null, path.resolve('./public/uploads/avatars'))
    },
    filename:function(req,file,cb){
        cb(null,`${file.originalname}`)
    }
})
const upload = multer({storage: storage})




/*------------------ INICIO RUTAS GET - POST - PUT - DELETE ----------------------------*/

loginRoute.get('/', (req, res) =>{
    try {
        let isLogin = req.session.email
            res.render('pages/login',{isLogin})
    } catch (error) {
        logger.error(`error en ruta loginRoute.get: ${error}`)
    }
})

loginRoute.post('/',passport.authenticate('login',{failureRedirect: '/failLogin'}),(req, res) => {
    req.session.email = req.body.username

    req.session.save(function(err) {
        res.redirect('/')

   })
})

registerRoute.get('/', (req,res)=>{
 
    let isLogin = req.session.email
    res.render('pages/register',{isLogin});
})

registerRoute.post('/', upload.single('avatar'),passport.authenticate('registro',{failureRedirect: '/failRegistro'}),(req,res)=>{
 
    sendMail.sendRegister(req.body)
    sendMail.sendRegisterToUser(req.body.username)
    res.redirect('/login');
})

logoutRoute.post('/',(req, res) =>{
    try {
        req.logout(() => {
            logger.info(`el usuario se ha deslogueado`)
            req.session.destroy();
            res.redirect('/login')
        });        

    } catch (error) {
        logger.error(`error producido en ruta de logout: ${error}`)
    }
})

failLoginRoute.get('/',(req, res)=>{
    let isLogin = req.session.email
    res.render('pages/loginfail',{isLogin})
})

failRegisterRoute.get('/',(req, res)=>{
    let isLogin = req.session.email
    res.render('pages/registerfail',{isLogin})
})

/*------------------ INICIO EXPORTACIONES ----------------------------*/
module.exports = {registerRoute, loginRoute, logoutRoute, failLoginRoute,failRegisterRoute} ;