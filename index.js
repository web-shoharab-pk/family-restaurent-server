const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5500
require('dotenv').config()
const ObjectID = require('mongodb').ObjectID

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qkzne.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const restaurentCollection = client.db(`${process.env.DB_NAME}`).collection("foods"); 
    const orderCollection = client.db(`${process.env.DB_NAME}`).collection("checkoutdetails"); 

     app.post('/addfood', (req, res) => {
        const foodData = req.body;
        restaurentCollection.insertOne(foodData) 
        console.log(foodData);
    })
    
    app.get('/allfoods', (req, res) => {
        restaurentCollection.find({})
           .toArray((err, foods) => {
               res.send(foods)
           })
          
    })     
    app.get('/breakfastfoods', (req, res) => {
        restaurentCollection.find({foodCat : "breakfast"})
           .toArray((err, foods) => {
               res.send(foods)
           })
          
    }) 
    app.get('/lunchfoods', (req, res) => {
        restaurentCollection.find({ foodCat  :  "lunch" })
           .toArray((err, foods) => {
               res.send(foods)
           })
          
    }) 
        
    app.get('/dinnerfoods', (req, res) => {
        restaurentCollection.find({ foodCat : "dinner" })
           .toArray((err, foods) => {
               res.send(foods)
           })
          
    }) 
    app.get('/checkout/:id', (req, res) => { 
        restaurentCollection.find({ _id: ObjectID(req.params.id) })
           .toArray((err, food) => {
               res.send(food)
           })
          
    }) 

    app.post('/getOrder/:id', (req, res) => {
        const foodData = req.body;
        orderCollection.insertOne(foodData) 
        console.log(foodData);
    })

    app.get('/orderedfood ', (req, res) => { 
        orderCollection.find()
           .toArray((err, food) => {
               res.send(food)
           })
          
    }) 

    app.get('/orderedfood/:email', (req, res) => {
        orderCollection.find({email: req.params.email})
           .toArray((err, foods) => {
               res.send(foods)
           })
          
    }) 





});

 






app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})