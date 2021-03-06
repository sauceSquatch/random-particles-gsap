
$(document).ready(function()
{
  init();
});

///// INIT vars
// html starts with 12
var totalSprites = 377,
winWidth = window.innerWidth,
winHeight = window.innerHeight,
wallHolder = $(".wall_holder"),
wall = $(".wall"),
wallViewer = $('.wall_view'),
totalWallSections = 4,
wallSection1 = $('#wall_section1'),
viewerScaled = false,
spriteImgPath = "../../images/single-poppie-med.png",
modalLayer = $('.modal_layer'),
modal = $('.modal');

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
  TweenLite.set(modal, {autoAlpha:0, scale:0.5});
  TweenLite.set(modalLayer, {autoAlpha:0});

  initWall();
  initBuild();
}

initWall = function() {
  createSprites(wallSection1);
}

createSprites = function(_parent) {
  for(var i = 0; i < totalSprites; i++) {
    var _sprite = new Flower(i, _parent);
  }
}

function rand(max){return Math.floor(Math.random()*max)};
function coin(){ 
  return Math.floor(Math.random() * 2)};

Flower = function(_id, _parent) {
  var _sprite = '<img src="' + spriteImgPath + '" class="flower" id="flower' + _id + '" />',
      randSize = rand(55) + 10;

  _parent.append(_sprite);
  
  // need to grab a ref to the dom 
  domElement = $('#flower' + _id);
  TweenLite.set(domElement, {x: rand(_parent.width()), y: rand(_parent.height()), width:randSize, height:randSize, rotation:rand(360)});
  // animateElement(domElement);
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

wallClicked = function(evt) {
  if(Draggable.timeSinceDrag() <= 0.01) {
    console.log(Draggable.timeSinceDrag())
    console.log("WE BE DRAGGINS");
  } else if(evt.target.id.startsWith('flower')) {
    // console.log(evt.target.id.substr(6));
    openModal(evt.target.id.substr(6));
    // evt.stopImmediatePropagation();
  }
}

openModal = function(id) {
  var modalContent = '<div class="selected_num">' + id + '</div>';
  $("div.selected_num", modal).replaceWith(modalContent);

  TweenLite.to(modal, 0.4, {autoAlpha:1, scale:1, delay:0.25, ease:Power4.easeOut});
  TweenLite.to(modalLayer, 0.5, {autoAlpha:1});

  //add listeners
  $(".close_btn", modal).click(closeModal);
}

closeModal = function() {
  TweenLite.to(modal, 0.3, {autoAlpha:0, scale:0.5, ease:Power4.easeOut});
  TweenLite.to(modalLayer, 0.5, {autoAlpha:0, delay:0.1});

  //add listeners
  $(".close_btn", modal).unbind("click");
}

createListeners = function() {
  wallViewer.on('click', viewerClicked );
  // wall.on('click', wallClicked );
  wall.click(wallClicked);
}
