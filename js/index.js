
var marker = "rgb(0,0,0)";
var markerWidth = 8;

var lastEvent;
var mouseDown = false;

var context = $('canvas')[0].getContext('2d');
var $canvas = $('#canvas');


$canvas.mousedown(function(e){
    lastEvent = e;
    mouseDown = true;
    console.log(lastEvent);
}).mousemove(function(e){
  if(mouseDown){
    context.beginPath();

    context.moveTo(lastEvent.offsetX,lastEvent.offsetY);
    context.lineTo(e.offsetX,e.offsetY);
    context.lineWidth=markerWidth;
    context.strokeStyle = marker;
    context.lineCap='round';
    context.stroke();

    lastEvent = e;
  }

}).mouseup(function(){
  mouseDown = false;
});


/****CLEAR****/

var clear = function(){
  context.clearRect(0,0,575,300);
};

$('#clear').on("click",clear);

/****CHANGE MARGER WIDTH****/

var changeWidth =  function(){
  markerWidth = $("#marker").val();
  console.log(markerWidth);
};


$("#marker").change(changeWidth);


/*Copyright (c) 2014 by Richard (https://codepen.io/barkins/pen/irkja)*/
