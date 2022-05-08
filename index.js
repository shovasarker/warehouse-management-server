const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const app = express()
const port = process.env.PORT || 5000

// setup middlewares
app.use(cors())
app.use(express.json())

// root api to check if the server is running or not
app.get('/', (req, res) => {
  res.send('Warehouse Management Server is Running')
})

//mongodb connect

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.87qpx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})

const run = async () => {
  try {
    await client.connect()

    const itemsCollection = client.db('wmdb').collection('items')
    const bannersCollection = client.db('wmdb').collection('banners')

    app.post('/signin', async (req, res) => {
      const user = req.body
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',
      })
      res.send({ accessToken })
    })

    //Getting all items from the db
    app.get('/items', async (req, res) => {
      const query = {}
      const cursor = itemsCollection.find(query)
      const result = await cursor.toArray()

      res.send(result)
    })

    //Getting all banners data from the db
    app.get('/banners', async (req, res) => {
      const query = {}
      const cursor = bannersCollection.find(query)
      const result = await cursor.toArray()

      res.send(result)
    })

    //getting one specific item from the db
    app.get('/item/:id', async (req, res) => {
      const { id } = req.params
      const query = { _id: ObjectId(id) }
      const result = await itemsCollection.findOne(query)

      res.send(result)
    })

    //updating one items quantity
    app.put('/item/:id', async (req, res) => {
      const { id } = req.params
      const item = req.body
      const filter = { _id: ObjectId(id) }
      const options = { upsert: true }
      const updateDoc = { $set: item }

      const result = await itemsCollection.updateOne(filter, updateDoc, options)

      res.send(result)
    })
  } finally {
  }
}

run().catch(console.dir)

// listneing to a fixed port for the server
app.listen(port, () => {
  console.log('Server is Running on Port, ', port)
})
