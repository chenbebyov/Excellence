const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const bookRouter = require('./routes/book-router');
const app = express()
const apiPort = 3000

const db = require('./db');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello word')
});

app.use('/api', bookRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))