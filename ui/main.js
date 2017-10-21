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
    var num1 = parseInt(document.getElementById('num1').value);
    var num2 = parseInt(document.getElementById('num2').value);
    sum = num1 + num2;
    var span = document.getElementById('result');
    span.innerHTML = sum.toString();
};

//-------------------------------------------------------------------------------------------------
//Subtraction
//-------------------------------------------------------------------------------------------------

var sub = 0;
var btn_sub = document.getElementById('btn_sub');
btn_sub.onclick = function(){
    var num1 = parseInt(document.getElementById('num1').value);
    var num2 = parseInt(document.getElementById('num2').value);
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
    var num1 = parseInt(document.getElementById('num1').value);
    var num2 = parseInt(document.getElementById('num2').value);
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
    var num1 = parseInt(document.getElementById('num1').value);
    var num2 = parseInt(document.getElementById('num2').value);
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
    var num1 = parseInt(document.getElementById('num1').value);
    var num2 = parseInt(document.getElementById('num2').value);
    mod = num1 % num2;
    var span = document.getElementById('result_mod');
    span.innerHTML = mod.toString();
};







