const connectToMongo=require('./db');
const express = require('express')
const app = express()
const port = 5000
app.use(express.json())
connectToMongo();
app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes.js'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
