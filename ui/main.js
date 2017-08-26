console.log('Loaded!');

var element = document.getElementById("img");

var marginLeft = 0;

function moveRight(){
    marginLeft  = marginLeft + 10;
    element.style.marginLeft = marginLeft + 'px';
}

img.onclick = function(){
    var interval = setInterval(moveRight, 100);
};