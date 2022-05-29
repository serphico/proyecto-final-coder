const request = require('supertest')('http://localhost:8080')
const expect = require('chai').expect
const prodGen = require('./utils/genProd')

describe('test de Get de Api Productos', () =>{
    describe('GET - trae todo', () =>{
       it('deberia retornar status 200', async()=>{
         let response = await request.get('/product')  
         expect(response.status).to.eql(200)
       }) 
    })

    describe('GET - un producto por id', () =>{
        it('deberia el objeto debe ser igual al que se pide', async()=>{
          let response = await request.get('/product/624b051f27c2088d28272af7')  
          expect(response.body).to.eql({
            title: 'Samsung A52',
            price: 85000,
            description: 'Celular requete Copado',
            photo: 'celular2.png',
            category: 'celular'
          })
          expect(response.status).to.eql(200)
        }) 
     })
})

describe('test de Post de Api Productos', () =>{
    it('debería incorporar un producto', async() =>{
       let producto = prodGen.getProd();
       let response = await request.post('/product').send(producto)
       expect(response.status).to.eql(200)

       let prod = response.body

       expect(prod).to.include.keys('title','price','description','photo','category')
       expect(prod.title).to.eql(producto.title)
       expect(prod.price).to.eql(producto.price)
       expect(prod.description).to.eql(producto.description)
       expect(prod.photo).to.eql(producto.photo)
       expect(prod.category).to.eql(producto.category)
    })


})

describe('test de Put de Api Productos', () =>{
    it('debería modificar un producto por su id', async() =>{

        let prodToUpdate = await request.get('/product/6265d6c3c87dd873e9413160')
        expect(prodToUpdate.status).to.eql(200)
        let prodUpdate = {
            title: 	prodToUpdate.body.title,
            price: 3000,
            description: prodToUpdate.body.description,
            photo: `${prodToUpdate.body.photo}.png`,
            category: 'coso'
        }

       let response = await request.put('/product/6265d6c3c87dd873e9413160').send(prodUpdate)
       expect(response.status).to.eql(200)

    })


})

describe('test de Delete por ID de Api Productos', () =>{

        it('deberia eliminar un producto por su ID', async()=>{
          let response = await request.delete('/product/6265d8a9c87dd873e9413165')  
          expect(response.status).to.eql(200)
        })      
})

describe('test de Delete de Api Productos', () =>{  
       it('deberia eliminar todos los productos', async()=>{
         let response = await request.delete('/product')  
         expect(response.status).to.eql(200)
       })     

})