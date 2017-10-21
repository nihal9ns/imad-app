var express = require('express');
//-------------------------------------------------------------------------------------------------
//Login
//-------------------------------------------------------------------------------------------------

var submit = document.getElementById('submit_btn');
submit.onclick = function(){
   var request = new XMLHttpRequest();

//capture the response and store it in a variable
request.onreadystatechange = function(){
    if(request.readyState == XMLHttpRequest.DONE){
        //do some action
        if(request.status == 200){
                console.log('User logged in!');
                alert('Logged in successfully!');
              }
              else if(request.status === 403){
                  alert('username/password is incorrect...');
              }
              else if(request.status === 500){
                  alert('something went wrong on the server...');
              }
            }
        
         //not done yet
    };
    //make the response
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST','http://nihal9ns.imad.hasura-app.io/login',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username : username,password : password}));
};


//-------------------------------------------------------------------------------------------------
//Addition
//-------------------------------------------------------------------------------------------------

var sum = 0;
var btn_add = document.getElementById('btn_add');
btn_add.onclick = function(){
    var num1 = parseInt(document.getElementById('num1_add').value);
    var num2 = parseInt(document.getElementById('num2_add').value);
    sum = num1 + num2;
    var span = document.getElementById('result_add');
    span.innerHTML = sum.toString();
};

//-------------------------------------------------------------------------------------------------
//Subtraction
//-------------------------------------------------------------------------------------------------

var sub = 0;
var btn_sub = document.getElementById('btn_sub');
btn_sub.onclick = function(){
    var num1 = parseInt(document.getElementById('num1_sub').value);
    var num2 = parseInt(document.getElementById('num2_sub').value);
    sub = num1 - num2;
    var span = document.getElementById('result_sub');
    span.innerHTML = sub.toString();
};

//-------------------------------------------------------------------------------------------------
//Multiplication
//-------------------------------------------------------------------------------------------------

var mul = 0;
var btn_mul = document.getElementById('btn_mul');
btn_mul.onclick = function(){
    var num1 = parseInt(document.getElementById('num1_mul').value);
    var num2 = parseInt(document.getElementById('num2_mul').value);
    mul = num1 * num2;
    var span = document.getElementById('result_mul');
    span.innerHTML = mul.toString();
};

//-------------------------------------------------------------------------------------------------
//Division
//-------------------------------------------------------------------------------------------------

var div = 0;
var btn_div = document.getElementById('btn_div');
btn_div.onclick = function(){
    var num1 = parseInt(document.getElementById('num1_div').value);
    var num2 = parseInt(document.getElementById('num2_div').value);
    div = num1 / num2;
    var span = document.getElementById('result_div');
    span.innerHTML = div.toString();
};

//-------------------------------------------------------------------------------------------------
//Modulus
//-------------------------------------------------------------------------------------------------

var mod = 0;
var btn_mod = document.getElementById('btn_mod');
btn_mod.onclick = function(){
    var num1 = parseInt(document.getElementById('num1_mod').value);
    var num2 = parseInt(document.getElementById('num2_mod').value);
    mod = num1 % num2;
    var span = document.getElementById('result_mod');
    span.innerHTML = mod.toString();
};

//-------------------------------------------------------------------------------------------------
//Counter
//-------------------------------------------------------------------------------------------------
/* Basic code
var counter = 0;
var btn_counter = document.getElementById('btn_counter');
btn_counter.onclick = function(){
  counter = counter + 1;
  var span = document.getElementById('span_count');
  span.innerHTML = counter.toString();
}; */

//AJAX implementation (API Endpoint)

var btn_counter = document.getElementById('btn_counter');
btn_counter.onclick = function(){
    // Create a request
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
      if(request.readyState === XMLHttpRequest.DONE){
          if(request.status ===200){
              // Take some action
              var counter = request.responseText;
              var span = document.getElementById('span_count');
              span.innerHTML = counter.toString();
          }
      }
      // Do nothing
    };
    // Make the request
    request.open('GET','http://nihal9ns.imad.hasura-app.io/counter',true);
    request.send(null);
};

//-------------------------------------------------------------------------------------------------
//Name list
//-------------------------------------------------------------------------------------------------

// Basic code

/*var names = [];
var submit_name = document.getElementById('submit_name');
submit_name.onclick = function(){
    var list = '';
    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    names.push(name);
    for(var i=0;i<names.length;i++){
        list = list + '<li>' + names[i] + '</li>';
    }
    var ul = document.getElementById('namelist');
    ul.innerHTML = list;
};*/

//AJAX implementation (API Endpoint)

var submit_name = document.getElementById('submit_name');
submit_name.onclick = function(){
    // Create a request
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                // Take some action
                // Capture a list of names and render it as a list
                var names = request.responseText;
                names = JSON.parse(names);
                var list = '';
                for(var i = 0; i < names.length; i++){
                    list = list + '<li>' + names[i] + '</li>';
                }
                
                var ul = document.getElementById('namelist');
                ul.innerHTML = list;
            }
        }
        // Do nothing
    };
    // Make a request
    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    request.open('GET','http://nihal9ns.imad.hasura-app.io/submit-name?name='+name,true);
    request.send(null);
};

//-------------------------------------------------------------------------------------------------
//Select from Student
//-------------------------------------------------------------------------------------------------
// pg database integration
var Pool = require('pg').Pool;
var config = {
    user:'nihal9ns',
    database:'nihal9ns',
    host:'db.imad.hasura-app.io',
    password:process.env.DB_PASSWORD,
    port:'5432'
};

var btn_select = document.getElementById('btn_select');
btn_select.onclick = function(){
    var pool = new Pool(config);
     pool.query('SELECT * FROM "student"',function(err,result){
            if(err){
                console.log(res.status(500).send(err.toString()));
            }
            else{
                console.log(res.send(JSON.stringify(result.rows)));
            }
    });
};






