console.log('Loaded!');

//edit the content of div id="main-text"
var element = document.getElementById('main-text')
//element.innerHTML='Edited text'

//edit image madi
var img = document.getElementById('madi')
var marginLeft = 0;
function moveRight(){
    marginLeft = marginLeft + 1;
        img.style.marginLeft= marginLeft + 'px';

}
img.onclick = function() {
    var interval = setInterval(moveRight,50);
} 

// counter code
/*var button = document.getElementById('counter');
var counter = 0;
button.onclick = function(){
    counter = counter + 1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
}; */
var button = document.getElementById('counter');
button.onclick = function(){

//create a request object
var request = new XMLHttpRequest();

//capture the response and store it in a variable
request.onreadystatechange = function(){
    if(request.readyState == XMLHttpRequest.DONE){
        //do some action
        if(request.status == 200){
              var counter = request.responseText; 
              var span = document.getElementById('count');
              span.innerHTML = counter.toString();
            }
        }
         //not done yet

    };
    //make the response
    request.open('GET','http://nihal9ns.imad.hasura-app.io/counter',true);
    request.send(null);
};

