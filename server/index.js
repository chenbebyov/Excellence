const express = require('express');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser')
const bookRouter = require('./routes/book-router');
const userRouter = require('./routes/user-router');
const cors = require('cors')
const apiPort = 3000

const app = express();

const db = require('./db');

var corsOptions = {
    origin: "http://localhost:8000"
};
  
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors(corsOptions));

db.on('error', console.error.bind(console, 'MongoDB connection error:'))


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api', bookRouter);
app.use('/api', userRouter);

https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: '0533132212'
}, app)
.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
