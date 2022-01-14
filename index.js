const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb');
const ObjectId = require("mongodb").ObjectId
const app = express()
const port = process.env.PORT || 5000
require("dotenv").config()

app.use(express.json())
app.use(cors())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dptl4.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log("uri", uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log("this is error", err)
  const bookCollection = client.db("bookShop").collection("book");
  const ordersCollection = client.db("bookShop").collection("bookOrders");
  // perform actions on the collection object
 // client.close();

 app.get('/books', (req, res)=>{
   bookCollection.find()
   .toArray((err, items) =>{
     res.send(items)
   })
 })


 app.get('/orders', (req, res)=>{
  ordersCollection.find()
  .toArray((err, items) =>{
    res.send(items)
  })
})
//delete

app.delete('/delete/:id', (req, res) =>{
const id = ObjectId(req.body.params)
bookCollection.findOneAndDelete({_id : id})
.then (document)
})


app.post('/addOrders', (req, res) =>{
  const newOrders = req.body;
  // console.log("adding event chung vhu : ", newBook)
  ordersCollection.insertOne(newOrders)
  .then(result =>{
    res.send (result.insertedCount > 0)
  })
})


 app.post('/addBook', (req, res) =>{
   const newBook = req.body;
   console.log("adding event chung vhu : ", newBook)
   bookCollection.insertOne(newBook)
   .then(result =>{
     res.send (result.insertedCount > 0)
   })
 })
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})