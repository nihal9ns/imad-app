// pg database integration
var Pool = require('pg').Pool;
var config = {
    user:'nihal9ns',
    database:'nihal9ns',
    host:'db.imad.hasura-app.io',
    password:process.env.DB_PASSWORD,
    port:'5432'
};
var pool = new Pool(config);

var username = document.getElementById('username');
var password = docuent.getElementById('password');
var btn_register = document.getElementById('btn_register');
btn_register.onclick = function(){
    // Create a request
   // var request = new XMLHttpRequest();
  //  request.onreadystatechange = function(){
    //    if(request.readyState === XMLHttpRequest.DONE){
          //  if(request.status === 200){
                pool.query('INSERT into "login" (username,password) VALUES ($1,$2)',[username,password],function(err,result){
                    if(err){
                        res.status(500).send(err.toString());
                    }
                    else{
                        res.send('User successfully created ' +username);
                    }
                });
     //       }
     //   }
        // Do nothing
//};
    // Make the request
    
};
/*
// pg database integration
var Pool = require('pg').Pool;
var config = {
    user:'nihal9ns',
    database:'nihal9ns',
    host:'db.imad.hasura-app.io',
    password:process.env.DB_PASSWORD,
    port:'5432'
};
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

//------------------------------------------------------------------------------


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
   */
   //CURL : 
   /* curl -v -XPOST -H 'Content-Type: application/json' --data '{"username":"nihal","password":"password"}' http://nihal9ns.imad.hasura-app.io/create-user */ 
  /* var username = req.body.username;
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
}); */
