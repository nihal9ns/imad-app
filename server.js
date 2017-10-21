var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');


// pg database integration
var Pool = require('pg').Pool;
var config = {
    user:'nihal9ns',
    database:'nihal9ns',
    host:'db.imad.hasura-app.io',
    password:process.env.DB_PASSWORD,
    port:'5432'
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret : 'someRandomSecretValue',
    cookie : {maxAge : 1000 * 60 * 60 * 24 * 30}
}));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

// Crypto
function hash(input,salt){
    //How do we create a hash?
    var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
    
    
    //md5
    //"password" -> sfdsafnakrn345u894q3u8rhejf328432809ru
    //"password-this-is-some-random-string" -> dnkfja89345jndsbfjwe893282349084sddfgafga
    //"password" -> "password-this-is-a-salt" -> <hash> -> <hash> * 10k times.
}

app.get('/hash/:input',function(req,res){
    var hashedString = hash(req.params.input,'this-is-some-random-string');
    res.send(hashedString);
});

app.post('/create-user',function(req,res){
   //username,password 
   //{"username" : "nihal","password" : "password"}
   //JSON
   
   //CURL : 
   /* curl -v -XPOST -H 'Content-Type: application/json' --data '{"username":"nihal","password":"password"}' http://nihal9ns.imad.hasura-app.io/create-user */
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT into "login" (username,password) VALUES ($1,$2)',[username,dbString],function(err,result){
        if(err){
            res.status(500).send(err.toSrting());
        }
        else{
            res.send('User successfully created ' +username);
        }
    });
});

app.post('/login',function(req,res){
     var username = req.body.username;
     var password = req.body.password;
      pool.query('SELECT * FROM "login" WHERE username = $1',[username],function(err,result){
            if(err){
                res.status(500).send(err.toSrting());
            }
            else{
                if(result.rows.length === 0){
                    res.send(403).send('username/password is invalid!');
                }else{
                    // Match the password
                    var dbString = result.rows[0].password;
                    var salt = dbString.split('$')[2];
                    var hashedPassword = hash(password,salt); // Creating a hash based on the password submitted and the original salt
                    if(hashedPassword === dbString){
                         // Set the session
                         req.session.auth = {userId : result.rows[0].id };
                         // set a cookie with a session id
                         // internally on the server side , it maps the session id to an object
                         // { auth : { userId }}
                        res.send('Credential\'s Correct!!!');
                       
                    }
                    else{
                        res.send(403).send('username/password is invalid!');
                    }
                }
            }
    });
});

app.get('/check-login',function(req,res){
    if(req.session && req.session.auth && req.session.auth.userId){
        res.send('You are logged in... ' +req.session.auth.userId.toString());
    } 
    else{
        res.send('You are not logged in...');
    }
});

app.get('/logout',function(req,res){
   delete req.session.auth;
   res.send('Logged out!');
});


var pool = new Pool(config);

app.get('/test-db-insert/:id/:name/:course/:marks',function(req,res){
    var id = req.params.id;
    var name = req.params.name;
    var course = req.params.course;
    var marks = req.params.marks;
   pool.query('INSERT INTO "student" (id,name,course,marks) VALUES ($1,$2,$3,$4)',[id,name,course,marks],function(err,result){
        if(err){
            res.status(500).send(err.toSrting());
        }
        else{
            res.send('Value successfully inserted '+id);
        }
   });
});

app.get('/test-db-select',function(req,res){
   pool.query('SELECT * FROM "student"',function(err,result){
        if(err){
            res.status(500).send(err.toSrting());
        }
        else{
            res.send('JSON.stringify(result.rows)');
        }
   });
});



app.get('/test-db', function (req, res) {
    //make a select request
    //return a response with the results
    pool.query('SELECT * FROM test',function(err,result){
        if(err){
            res.status(500).send(err.toSrting());
        }
        else{
            res.send('JSON.stringify(result.rows)');
        }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/myapp_style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'myapp_style.css'));
});

app.get('/myapp', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'myapp.html'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

// Counter 
var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
    res.send(counter.toString());
});

//Name list
names = [];
app.get('/submit-name',function(req,res){ //URL : /submit-name?name=xxxxx
    //Get the name from the request
    var name = req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

//----------------------------------------------------------------
// Basic Blog App
//----------------------------------------------------------------

app.get('/ui/blog.css',function(req,res){
   res.sendFile(path.join(__dirname,'ui','blog.css')); 
});

app.get('/blog',function(req,res){
   res.sendFile(path.join(__dirname,'ui','blog.html')); 
});

app.get('/ui/blog.js',function(req,res){
   res.sendFile(path.join(__dirname,'ui','blog.js')); 
});

//-----------------------------------------------------------------

// Article
app.get('/:articleName',function(req,res){
    //articleName = article-one
    //articles[articleName] = {} content object for artice-one
    var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});

/*app.get('/article-two',function(req,res){
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three',function(req,res){
  res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
}); */

var articles = {
 'article-one' : {
    title : 'Article One | Nihal Kaul',
    heading : 'Article-One',
    date : '4th August 2017',
    content :
    `
             <p>
                This is my content for article-one.This is my content for article-one.This is my content for article-one.
                 </p>
                 
                   <p>
                This is my content for article-one.This is my content for article-one.This is my content for article-one.
             </p>
                 
              <p>
                This is my content for article-one.This is my content for article-one.This is my content for article-one.
             </p>
    `
},
 'article-two' : {
     title : 'Article Two | Nihal Kaul',
    heading : 'Article-Two',
    date : '4th August 2017',
    content :
    `
                 <p>
                This is my content for article-two.This is my content for article-two.This is my content for article-two.
                 </p>
                 
                   <p>
                This is my content for article-two.This is my content for article-two.This is my content for article-two.
             </p>
                 
              <p>
                This is my content for article-two.This is my content for article-two.This is my content for article-two.
             </p>
    `
},
 'article-three' : {
       title : 'Article Three | Nihal Kaul',
    heading : 'Article-Three',
    date : '4th August 2017',
    content :
    `       <p>
                This is my content for article-three.This is my content for article-three.This is my content for article-three.
                 </p>
                 
                   <p>
             This is my content for article-three.This is my content for article-three.This is my content for article-three
             </p>
                 
              <p>
             This is my content for article-three.This is my content for article-three.This is my content for article-three.
             </p>`
    }
};

function createTemplate (data){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    var htmlTemplate = 
    `<html>
    <head>
        <title>
           ${title}  </title>
        <meta name="viewport" content="width=device-width , initial-scale=1" />
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
             <div>
                 <a href="/">Home</a>
                 <hr/>
             </div>
             <h3>
                    ${heading}
             </h3>
             <div>
                 I created this web-page on ${date}
             </div>
             <div>
                ${content}
             </div>
         </div>
    </body>
</html>`;

return htmlTemplate;
}

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

