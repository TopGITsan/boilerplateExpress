const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const result = dotenv.config();


(result.error) ? console.log(result.error) : console.log(result.parsed);

app.use((req, res, next) => {
    console.log(req.method + ' @ ' + req.path + ' - ' + req.ip);
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.send({ time: req.time });
});

app.get('/json', (req, res) => {
    (process.env.MESSAGE_STYLE === 'uppercase') ? res.json({ message: "HELLO JSON" }) : res.json({ message: 'hello json' });
});

app.use(express.static(__dirname + '/public'));

app.get('/:word/echo', (req, res) => {
    res.send({ echo: req.params.word });
});

app.get('/name', (req, res) => {
    let firstName = req.query.first, lastName = req.query.last;
    res.send({ name: firstName + ' ' + lastName });
});

app.post('/name', (req, res) => {
    res.send({ user: req.body.first + ' ' + req.body.last });
});

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`App is listening on port: ${port}`) });

