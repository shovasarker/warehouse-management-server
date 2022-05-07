const express = require('express')
const cors = require('cors')
require('dotenv').config()

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

const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.87qpx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})

const run = async () => {
  try {
    await client.connect()
  } finally {
  }
}

run().catch(console.dir)

// listneing to a fixed port for the server
app.listen(port, () => {
  console.log('Server is Running on Port, ', port)
})
