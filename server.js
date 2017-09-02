var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user : 'smartkumara',
    database: 'smartkumara',
    host : 'http://db.imad.hasura-app.io',
    port : '5432',
    password : 'db-smartkumara-67757'
};
//process.env.DB_PASSWORD
var app = express();
app.use(morgan('combined'));

var pool = new Pool(config);

var articleOne = {
    title : 'First Article',
    heading : 'First heading',
    date : '26th August',
    content : `Hello my name is kumaran. This is my first article. 
    hello world.... Hi Hey hellooooo`
};

function createTemplate (data){
var title = data.title;
var heading = data.heading;
var date = data.date;
var content = data.content;
var htmlTemplate = `
<html>
    <head><title>${title}</title> </head>
    <body>
       <div><a href="/">Home</a></div>
        <hr>
        <p>${heading}</p>
        <hr>
        <p>${date}</p>
        <hr>
        <p>${content}<p>
        <h3> This is my first article.....</h3>
    </body>
</html>
`;
return htmlTemplate;
}

app.get('/testdb', function(req,res){
    pool.query('SELECT * FROM "user"', function(err,result){
       if(err){
           res.status(500).send(err.toString());
       } else{
           res.send(JSON.stringify(result));
       }
    });
    
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/articleOne', function (req, res) {
  res.send(createTemplate(articleOne));
});

app.get('/article-two', function (req, res) {
  res.send('article two requested will be served here');
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
