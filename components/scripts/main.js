
$(document).ready(function()
{
  init();
});

///// INIT vars
// html starts with 12
var totalSprites = 12,
spriteImgPath = 'images/single-poppie-lg.png',
spriteHolder = $('.sprites_holder'),
winWidth = window.innerWidth,
winHeight = window.innerHeight;


///// INIT positions + alphas
init = function() {
  // TweenLite.set(feed, {alpha:0, x:-100})
  createSprites();
  initBuild();
}

createSprites = function() {
  for(var i = 0; i < totalSprites; i++) {
    var _sprite = new Sprite(i);
  }
}

function rand(max){return Math.floor(Math.random()*max)};

Sprite = function(id) {
  var _sprite = '<img src="' + spriteImgPath + '" class="sprite" id="sprite' + id + '" />',
      randSize = rand(300);

  spriteHolder.append(_sprite);
  
  // need to grab a ref to the dom 
  domElement = $('#sprite' + id);
  TweenLite.set(domElement, {x: rand(500), y: rand(500), width:randSize, height:randSize, rotation:rand(360)});
  animateElement(domElement);
}

animateElement = function(domElement) {
  // TweenLite.to(domElement, rand(5)+2, {bezier:{values:[{x:rand(500), y:rand(500)}, {x:rand(500), y:rand(500)}]}, scale:rand(2)+0.5, rotation:rand(360), ease:Power4.easeOut,onComplete:animateElement, onCompleteParams:[domElement]});
  // get current elements cords
  var elementX = domElement.position.left;
  console.log("domElement: ", domElement);
  // TweenLite.to(domElement, rand(6), {x:rand()})
}


///// INIT build
initBuild = function() {
  createListeners();
};

createListeners = function() {
  
}
