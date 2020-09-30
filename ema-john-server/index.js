const express = require('express')
const app = express()
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.efifc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const client = new MongoClient(
  uri,
  { useUnifiedTopology: true },
  { useNewUrlParser: true }
);


client.connect(err => {
  const productsCollection = client.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION);
  // perform actions on the collection object
  
  app.post('/addProduct', (req, res) => {
    const product = req.body;
    productsCollection.insertOne(product)
    .then(result => {
      console.log(result)
    })
  })







console.log('db connected')

  // client.close();
});



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)