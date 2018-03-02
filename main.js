let data = [
  {name: 'fred', color:'grey'},
  {name: 'joe', color:'black'},
  {name: 'bob', color:'yellow'},
  {name: 'sam', color:'pink'},
  {name: 'jackie', color: 'red'},
  {name: 'bob', color: 'blue'}
];
var slices   = data.length;
var sliceDeg = 360/slices;
var deg      = 0;
var canvas = document.getElementById('wheel-canvas');
var ctx = canvas.getContext('2d');
var width  = canvas.width; // size
var center = width/2;      // center
function deg2rad(deg){ return deg * Math.PI/180; }

function drawSlice(deg, color){
  console.log(deg)
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(center, center);
  ctx.arc(center, center, width/2, deg2rad(deg), deg2rad(deg+sliceDeg));
  ctx.lineTo(center, center);
  ctx.fill();

}

for(var i=0; i<slices; i++){
  drawSlice(deg, data[i].color);
  deg += sliceDeg;
}

function spinWheel(spinLength) {

  canvas.style.transform   = 'rotate('+spinLength+'deg)';
  return spinLength;
}
