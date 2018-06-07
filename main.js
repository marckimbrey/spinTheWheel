
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

  data.forEach((slice, i) => {
    let newSlice = document.createElement("div");
    newSlice.innerHTML = `
                <label>Option</label>
                <input type="text" name="name" value="${slice.name}">
                <label>color</label>
                <input type="color" name="color" value="${slice.color}">
                <button
                  class="delete-slice-btn btn"
                  type="button"
                  name="deleteSlice"
                  >X</button>
              `;
      if (i >= data.length -1) {
        newSlice.innerHTML += `
          <button class="add-slice-btn btn" type="button" name="addSlice">
          +</button>`;
      };
      document.getElementsByClassName('wheel-data-inputs')[0].appendChild(newSlice)
  })
}

/***
 FORM EVENT HANDLERS
 ***/

 const deleteBtns = document.getElementsByClassName("delete-slice-btn");
 const addSlice = document.getElementsByClassName("add-slice-btn")[0];

// delete input row
function deleteSlice() {
  // if last row
  if (!this.parentNode.nextSibling) {
    this.parentNode.previousSibling.innerHTML += `
      <button
        class="add-slice-btn btn"
        type="button"
        name="addSlice">
      +</button>`;
    this.parentNode.previousSibling.lastChild.addEventListener('click', addRow);
  }
  this.parentNode.parentNode.removeChild(this.parentNode)
}

function addRow() {
  console.log(this)
  this.parentNode.removeChild(this);
  let newSlice = document.createElement("div");
  newSlice.innerHTML = `
              <label>Option</label>
              <input type="text" name="name" value="">
              <label>color</label>
              <input type="color" name="color" value="">
              <button
                class="delete-slice-btn btn"
                type="button"
                name="deleteSlice"
                >X</button>
              <button class="add-slice-btn btn" type="button" name="addSlice">
              +</button>
            `;
  // add onclick eventlisteners
  Array.prototype.forEach.call(newSlice.childNodes, function(el, i) {
      if (el.className == "delete-slice-btn btn") {
        newSlice.childNodes[i].addEventListener('click', deleteSlice)
      } else if (el.className == "add-slice-btn btn") {
        newSlice.childNodes[i].addEventListener('click', addRow)
      }
  })

  document.getElementsByClassName('wheel-data-inputs')[0].appendChild(newSlice)
}


Array.prototype.forEach.call(deleteBtns, function(btn) {
  btn.addEventListener("click", deleteSlice)
});

addSlice.addEventListener("click", addRow)
