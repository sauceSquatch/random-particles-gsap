
$(document).ready(function()
{
  init();
});

///// INIT vars
// html starts with 12
var totalSprites = 65,
winWidth = window.innerWidth,
winHeight = window.innerHeight,
wallHolder = $(".wall_holder"),
wall = $(".wall"),
wallViewer = $('.wall_view'),
viewerScaled = false;

// Draggable example
var gridWidth = 100;
var gridHeight = 175;
Draggable.create(".wall", {
    type:"x",
    edgeResistance:1,
    bounds:".wall_holder",
    throwProps:true,
    snap: {
        x: function(endValue) {
            return Math.round(endValue / gridWidth) * gridWidth;
        },
        y: function(endValue) {
            return Math.round(endValue / gridHeight) * gridHeight;
        }
    }
});


///// INIT positions + alphas
init = function() {
  // TweenLite.set(feed, {alpha:0, x:-100})
  // createSprites();
  initWall();
  initBuild();
}

initWall = function() {

}

createSprites = function() {
  for(var i = 0; i < totalSprites; i++) {
    var _sprite = new Sprite(i);
  }
}

function rand(max){return Math.floor(Math.random()*max)};
function coin(){ 
  return Math.floor(Math.random() * 2)};

Sprite = function(id) {
  var _sprite = '<img src="' + spriteImgPath + '" class="sprite" id="sprite' + id + '" />',
      randSize = rand(300);

  spriteHolder.append(_sprite);
  
  // need to grab a ref to the dom 
  domElement = $('#sprite' + id);
  TweenLite.set(domElement, {x: rand(winWidth), y: rand(winHeight), width:randSize, height:randSize, rotation:rand(360)});
  animateElement(domElement);
  console.log(coin());
}

animateElement = function(domElement) {
  // TweenLite.to(domElement, rand(5)+2, {bezier:{values:[{x:rand(500), y:rand(500)}, {x:rand(500), y:rand(500)}]}, scale:rand(2)+0.5, rotation:rand(360), ease:Power4.easeOut,onComplete:animateElement, onCompleteParams:[domElement]});
  // get current elements cords
  
  var posX = domElement[0]._gsTransform.x,
  posY = domElement[0]._gsTransform.y,
  randX = Math.floor(Math.random() * spriteTravel),
  randY = Math.floor(Math.random() * spriteTravel),
  newX = 0,
  newY = 0,
  newScale = Math.random() * (.5 + 1) + .5;

  if(coin()) {
    newX = posX + randX;
  } else {
    newX = posX - randX;
  }

  if(coin()) {
    newY = posY + randY;
  } else {
    newY = posY - randY;
  }

  TweenLite.to(domElement, rand(6) + 3, {x:newX, y:newY, scale:newScale, ease:Power4.easeInOut, onComplete:animateElement, onCompleteParams:[domElement] })
}


///// INIT build
initBuild = function() {
  createListeners();
};

viewerClicked = function() {
  if(viewerScaled) {
    TweenLite.to(wallHolder, .5, {scale:1, ease:Power4.easeInOut});
    viewerScaled = false;
  } else {
    TweenLite.to(wallHolder, .5, {scale:3, ease:Power4.easeInOut});
    viewerScaled = true;
  }
}

createListeners = function() {
  wallViewer.on('click', viewerClicked );
}
