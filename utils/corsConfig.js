const dotenv = require('dotenv');
dotenv.config();



let allowlist = ['https://ecommerce-coderhouse-react.herokuapp.com/', 'https://ecommerce-coderhouse-react.herokuapp.com/login','https://ecommerce-coderhouse-react.herokuapp.com/register']
let corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

module.exports = corsOptionsDelegate();