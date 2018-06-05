
// retrieve data from localStorage
let localData = JSON.parse(localStorage.getItem("chartData"));

// chart variables
let slices   = localData.length;
let sliceDeg = 360/slices;
let deg      = 0;
const canvas = document.getElementById('wheel-canvas');
const ctx = canvas.getContext('2d');
let width  = canvas.width; // size
let center = width/2;      // center




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
// draw pie chart
for(var i=0; i<slices; i++){
  drawSlice(deg, localData[i].color);
  deg += sliceDeg;
}
// load form with existing data
loadSliceInputs(localData)

function spinWheel(spinLength) {

  canvas.style.transform   = 'rotate('+spinLength+'deg)';
  return spinLength;
}

// handle slice input data
function loadSliceInputs(data) {

  data.forEach((slice) => {
    let newSlice = document.createElement("div");
    newSlice.innerHTML = `
                <label>Option</label>
                <input type="text" name="name" value="${slice.name}">
                <label>color</label>
                <input type="color" name="color" value="${slice.color}">
              `;
      document.getElementsByClassName('wheel-data')[0].appendChild(newSlice)
  })
}
