
var express = require('express');
const bodyParser = require('body-parser');
var app = express();

// --> 7)  Mount the Logger middleware here

/** 7) Root-level Middleware - A logger */
//  place it before all the routes !
app.use(function (req, res, next) {
    console.log(req.method + ' ' + req.path + ' - ' + req.ip);
});

// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({ extended: false }));

/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */
// app.get('/',function(req,res){
//     res.send('Hello Express');
// });

/** 3) Serve an HTML file */
app.get('/', function (req, res) {      //  This method needs an absolute file path   e.g. absolutePath = __dirname + relativePath/file.ext.
    res.sendPath(__dirname + 'views/index.html');  // use the Node global variable __dirname to calculate the path.
});

/** 4) Serve static assets  */
app.use(express.static(__dirname + '/public'));  //  app.use(path, middlewareFunction). The first path argument is optional. If you don’t pass it, the middleware will be executed for all the requests.  

/** 5) serve JSON on a specific route */
app.get('/json', function (req, res) {
    res.json({ 'message': 'Hello json' });
});

/** 6) Use the .env file to configure the app */
app.get('/json', function (req, res) {
    process.env.MESSAGE_STYLE === 'uppercase' ? res.json({ 'message': 'HELLO JSON' }) : res.json({ 'message': 'Hello json' });
});

/** 8) Chaining middleware. A Time server */ // This approach is useful to split the server operations into smaller units. 
app.get('/now', function (req, res, next) {
    req.time = new Date().toString();
    next();
}, function (req, res) {
    res.send({ time: req.time });
});


/** 9)  Get input from client - Route parameters */
app.get('/:word/echo', function (req, res) {
    res.json({ 'echo': req.params.word });
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
// app.get('/name', function (req, res) {
//     let firstname = req.query.first, lastname = req.query.last;
//     res.json({ name: firstname + ' ' + lastname });
// });
app.route('/name').get(function (req, res) {
    let firstName = req.query.first, lastName = req.query.last;
    res.json({ name: firstName + ' ' + lastName });
}).post(function (req, res) {
    res.json(req.body);
});

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */
// app.post('/name', function(req,res){
//     res.json(req.body);
// });


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
