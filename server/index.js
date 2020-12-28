const app = require('express')();
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser')
const bookRouter = require('./routes/book-router');
const cors = require('cors')
const apiPort = 3000

const db = require('./db');

//GET home route
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/api', bookRouter);

https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: '0533132212'
}, app)
.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
