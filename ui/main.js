console.log('Loaded!');

//edit the content of div id="main-text"
var element = document.getElementById('main-text')
element.innerHTML='Edited text'

//edit image madi
var img = document.getElementById('madi')
var marginLeft = 0;
function moveRight(){
    marginLeft = marginLeft + 10;
        img.style.marginLeft= marginLeft + 'px';

}
img.onclick = function(){
    var interval = setInterval(moveRight,100);
}