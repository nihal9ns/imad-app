console.log('Loaded!');

//edit the content of div id="main-text"
var element = document.getElementById('main-text')
element.innerHTML='Edited text'

//edit image madi
var img = document.getElementById('madi')
img.onClick = function(){
    img.style.marginLeft='100px';
}