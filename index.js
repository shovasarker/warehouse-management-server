const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000

// setup middlewares
app.use(cors())
app.use(express.json())

// root api to check if the server is running or not
app.get('/', (req, res) => {
  res.send('Warehouse Management Server is Running')
})

// listneing to a fixed port for the server
app.listen(port, () => {
  console.log('Server is Running on Port, ', port)
})
