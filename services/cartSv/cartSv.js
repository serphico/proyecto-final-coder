const logger = require("../../utils/logger");
const ProductDaoFactory = require("../../DAOs/factoryConnect/factoryConnect");

class CartSv{

    constructor(){
        this.productDao =  ProductDaoFactory.getDao();
        this.contentCart = [];

    }

    async addAll(id){

        try {
            const prodCart = await this.productDao.addCart(id);
            let newProd = {_id: prodCart._id,title: prodCart.title, price: prodCart.price, description: prodCart.description, photo: prodCart.photo, category: prodCart.category}

            if(this.contentCart.length == 0){
                
                let newCart = {...newProd, quantity : 1}
                
                this.contentCart.push(newCart)
                
            } else if(this.contentCart.length >= 1){
                const index = (element) => element._id == id;
                let foundIndex = this.contentCart.findIndex(index)

                if(this.contentCart[foundIndex]){
                    this.contentCart[foundIndex].quantity++
                }else if(!this.contentCart[foundIndex]){
                    let otherProd = {...newProd, quantity : 1}
                    this.contentCart.push(otherProd)
                }

            }
        } catch (error) {
            logger.error(`error en la capa de servicio cartSv en metodo addAll: ${error}`)  
        }

    }

    async showAll(){
        try {
            const prodCart = await this.contentCart;
            return prodCart
        } catch (error) {
            logger.error(`error en la capa de servicio cartSv en metodo showAll: ${error}`)  
        }
    }


    async updateById(prod){
        try {
            const index = (element) => element._id == prod._id;
            let foundIndex = this.contentCart.findIndex(index)
            console.log();
            if (prod.numQuantity > this.contentCart[foundIndex].quantity) {

                this.contentCart[foundIndex].quantity= prod.numQuantity

            }
            if (prod.numQuantity < this.contentCart[foundIndex].quantity) {

                this.contentCart[foundIndex].quantity= prod.numQuantity

            }
            console.log(this.contentCart)
        } catch (error) {
            logger.error(`error en la capa de servicio cartSv en metodo showAll: ${error}`)  
        }
    }

    async deleteById(id){
        try {
            const index = (element) => element._id == id;
            let foundIndex = this.contentCart.findIndex(index)

            this.contentCart.splice(foundIndex,1);
            console.log(this.contentCart)

        } catch (error) {
            logger.error(`error en la capa de servicio cartSv en metodo showAll: ${error}`)  
        }
    }

    async buyProd(totalPrice, user){
        try {
           console.log(totalPrice)
           let date = new Date().toLocaleDateString();

           let prodCartBuy = {
            timeStamp: date,
            username: user,
            products: this.contentCart,
            totalPrice : parseInt(totalPrice.priceFinal)
           }
           const prodFound = await this.productDao.buy(prodCartBuy);
           this.contentCart = [];
           return prodFound;



        } catch (error) {
            logger.error(`error en la capa de servicio cartSv en metodo showAll: ${error}`)  
        }
    }
    
}

const cartSv = new CartSv();

module.exports = cartSv;