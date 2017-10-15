var express = require('express');
var morgan = require('morgan');
var path = require('path');

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

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);


app.get('/test-db', function (req, res) {
    //make a select request
    //return a response with the results
    pool.query('SELECT * FROM test',function(err,result){
        if(err){
            res.status(500).send(err.toSrting());
        }
        else{
            res.send(JSON.stringify(result.rows));
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

app.get('/:articleName',function(req,res){
    //articleName = article-one
    //articles[articleName] = {} content object for artice-one
    var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});

var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
    res.send(counter.toString());
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

//--------------------------------------------
//My APP
//--------------------------------------------

//--------------------------------------------
//Create Endpoints
//--------------------------------------------

app.get('/',function(req,res){
	res.send('This is the root end point');
});

app.get('/hi',function(req,res){
	res.send('This is the hi end point');
});

app.get('/profile/:name',function(req,res){
	res.send('You requetsed the profile with the name : ' +req.params.name);
});

app.get('/hello.html',function(req,res){
	res.sendFile(__dirname + '/hello.html');
});

/* app.get('/london.html',function(req,res){
	res.sendFile(__dirname + '/london.html');
});

app.get('/paris.html',function(req,res){
	res.sendFile(__dirname + '/paris.html');
});

app.get('/newyork.html',function(req,res){
	res.sendFile(__dirname + '/newyork.html');
}); 

app.get('/tokyo.html',function(req,res){
	res.sendFile(__dirname + '/tokyo.html');
}); */

app.get('/:placeName',function(req,res){
	var placeName = req.params.placeName;
	res.send(createTemplate(places[placeName]));
});


app.get('/style.css',function(req,res) {
	res.sendFile(__dirname + '/style.css');
});

//----------------------------------------------
//HTML Templating
//----------------------------------------------

var places = {
	'london' : {
		title : 'London | Quantum Demon',
		heading : 'London',
		date : 'I created it in 2050',
		content : `
		<p>
			London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times.
			 At its centre stand the imposing Houses of Parliament, the iconic ‘Big Ben’ clock tower
			 and Westminster Abbey, site of British monarch coronations. Across the Thames River, the London Eye observation wheel
			 provides panoramic views of the South Bank cultural complex, and the entire city.
		</p>
		`
	},
	'paris' : {
		title : 'Paris| Quantum Demon',
		heading : 'Paris',
		date : 'I created it in 2050',
		content : `
		<p>
		Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy and culture. 
		Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine.Beyond such landmarks as the 
		Eiffel Tower and the 12th-century, Gothic Notre-Dame cathedral, the city is known for its cafe culture and designer boutiques 
		along the Rue du Faubourg Saint-Honoré.
		</p>
		`
	},
	'newyork' : {
		title : 'New York| Quantum Demon',
		heading : 'New York',
		date : 'I created it in 2050',
		content : `
			<p>
			New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean.
			At its core is Manhattan, a densely populated borough that’s among the world’s major commercial, financial and cultural centers.
			Its iconic sites include skyscrapers such as the Empire State Building and sprawling Central Park.
			Broadway theater is staged in neon-lit Times Square.
		</p>
		`
	},
	'tokyo' : {
		title : 'Tokyo| Quantum Demon',
		heading : 'Tokyo',
		date : 'I created it in 2050',
		content : `
		<p>
			 Tokyo, Japan’s busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples.
			 The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods. The Imperial Palace sits amid large public gardens. 
			 he city's many museums offer exhibits ranging from classical art (in the Tokyo National Museum) to a 
			 reconstructed kabuki theater (in the Edo-Tokyo Museum).
		</p>
		`
	}
};

function createTemplate(data){
	var title = data.title;
	var date = data.date;
	var heading = data.heading;
	var content = data.content;
	var htmlTemplate = 
	`
		<!DOCTYPE html>
		<html>
		<head>
			<title> ${title}
			 </title>
			<link rel="stylesheet" type="text/css" href="/style.css">
		</head>
		<body>
			<div class="container">
			<h3> ${heading} </h3>
				${date}
				${content}
			</div>
		</body>
		</html>
	`;

	return htmlTemplate;
}



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

