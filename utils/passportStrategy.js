const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('../DAOs/config');
const bCrypt = require('bcrypt');
const Users = require('../DAOs/schemas/schemaUser');
const logger = require('./logger');

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
   }

   function createHash(password) {
    return bCrypt.hashSync(
              password,
              bCrypt.genSaltSync(10),
              null);
  }
  

  passport.use('registro', new LocalStrategy({
    passReqToCallback: true
   },
    (req, username, password, done) => {

        Users.findOne({ 'email': req.body.username }, function (err, user) {
          console.log(user + "estrategia")
        if (err) {
          logger.error('Error in SignUp: ' + err);
          return done(err);
        }
   
        if (user) {
          logger.warn('El usuario ya existe');
          return done(null, false)
        }
   
        const newUser = {
          email: req.body.username,
          username: username,
          password: createHash(password),
          fullName: req.body.fullName,
          address: req.body.address,
          age: req.body.age,
          phone: req.body.phone,
          avatar: req.file.filename,
        }
        console.log(newUser);
        const userSaveModel = new Users(newUser)
        userSaveModel.save( (err, userWithId) => {
            if (err) {
              logger.error('Error in Saving user: ' + err);
              return done(err);
            }
            logger.info('User Registration succesful');
            return done(null, userWithId);
          });
        });
      })
     )

     passport.use('login', new LocalStrategy((username, password, done) => {

        Users.findOne({ 'email':username }, (err, user) => {

            if (err)
              return done(err);
       
            if (!user) {
              logger.error('No se encontro el usuario ' + username);
              return done(null, false);
            }
       
            if (!isValidPassword(user, password)) {
              logger.error('Contraseña Invalida');
              return done(null, false);
            }
       
            return done(null, user);
          });
        })
       );
       
     
passport.serializeUser((user, done) => {
    done(null, user._id);
});
      
passport.deserializeUser((id, done) => {
    Users.findById(id, done);
});
