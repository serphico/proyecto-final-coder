const express = require('express')
const cookieParse = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const cors = require('cors')
const dotenv = require('dotenv');
const {productRoute} = require('./routes/productsRoute')
const {registerRoute, loginRoute, logoutRoute, failLoginRoute,failRegisterRoute} = require('./routes/routeAccount')
const {cartRoute} = require('./routes/cartRoute')
const path = require('path')

dotenv.config();


const app = express()

/* Middlewares  */

app.use(cookieParse());

app.use(session({

    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false, 
      maxAge: 600000
    }    
}));

app.use(function(req, res, next) {
   res.header('Access-Control-Allow-Credentials', true); 
   res.header('Access-Control-Allow-Origin', req.headers.origin); 
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); 
   res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'); 
   next(); }

)
app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use(express.static('public'))

//app.use(express.static(path.join(__dirname, 'build')))

app.use(passport.initialize());

app.use(cors());

app.set('view engine', 'ejs')

/* Routes  */

app.use('/', productRoute)

app.use('/cart', cartRoute)

app.use('/register', registerRoute);

app.use('/login', loginRoute)

app.use('/logout', logoutRoute)

app.use('/failLogin', failLoginRoute)

app.use('/failRegistro', failRegisterRoute)

module.exports = app;