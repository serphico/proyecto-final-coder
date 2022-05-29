const { createTransport } = require('nodemailer');
const logger = require('../../utils/logger')
const User = require('../../DAOs/schemas/schemaUser')
const dotenv = require('dotenv');

dotenv.config();

/*mail de test*/
const TEST_MAIL = process.env.NODE_TEST_MAIL; 

/*CUENTA QUE ENVIA (TRANSPORTE)*/
const transporter = createTransport({
   host: process.env.NODE_HOST_EMAIL,
   port: process.env.NODE_PORT_EMAIL,
   auth: {
       user: TEST_MAIL,
       pass: process.env.NODE_PASS_EMAIL
   }
});



 
 class SendMail{

    constructor(){
        this.from,
        this.to,
        this.subject,
        this.html
    }

    async sendBuy(username, body){
        
        User.findOne({'email': username}, (err, user) =>{

            this.from = TEST_MAIL;
            this.to = TEST_MAIL;
            this.subject = `nuevo pedido de ${user.fullName} con email ${user.email}`;
            this.html = JSON.stringify(body);

            


        /* OPCIONES/DATOS DE ENVIO DE MAIL */
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject: this.subject,
            html: this.html
         }
         logger.info(mailOptions)
         try {
            transporter.sendMail(mailOptions)
            logger.info(`mensaje enviado`)
         } catch (error) {
            logger.error(`error en metodo sendBuy: ${error}`)
         }
         
        })

    }

    async sendRegister(dataRegister){

        this.from = TEST_MAIL;
        this.to = TEST_MAIL;
        this.subject = `nuevo registro`;
        this.html = JSON.stringify(dataRegister);

        /* OPCIONES/DATOS DE ENVIO DE MAIL */
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject: this.subject,
            html: this.html
         }

         try {
            await transporter.sendMail(mailOptions)
            logger.info(`Registro enviado`)
         } catch (error) {
            logger.error(error)
         }
    }

    async sendRegisterToUser(user){

      this.from = TEST_MAIL;
      this.to = user;
      this.subject = `nuevo registro`;
      this.html = "Tu usuario se ha registrado con exito";

      /* OPCIONES/DATOS DE ENVIO DE MAIL */
      const mailOptions = {
          from: this.from,
          to: this.to,
          subject: this.subject,
          html: this.html
       }

       try {
          await transporter.sendMail(mailOptions)
          logger.info(`Registro enviado`)
       } catch (error) {
          logger.error(error)
       }
  }

 }

 const sendMail = new SendMail()

 module.exports = sendMail;