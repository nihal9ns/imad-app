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
img.onclick = function(){
    var interval = setInterval(moveRight,50);
} 

var button = document.getElementById('counter');
var counter = 0;
button.onclick(){
    counter = counter + 1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
}