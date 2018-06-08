
// retrieve data from localStorage
let localData = JSON.parse(localStorage.getItem("chartData"));

// chart variables
// let slices   = localData.length;
// let sliceDeg = 360/slices;
//let deg      = 0;
const canvas = document.getElementById('wheel-canvas');
const ctx = canvas.getContext('2d');
let width  = canvas.width; // size
let center = width/2;      // center


function deg2rad(deg){ return deg * Math.PI/180; }

function drawSlice(deg, color, sliceDeg){
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(center, center);
  ctx.arc(center, center, width/2, deg2rad(deg), deg2rad(deg+sliceDeg));
  ctx.lineTo(center, center);
  ctx.fill();

}
function loadPieChart(data) {
  let deg= 0;
  let slices   = data.length;
  let sliceDeg = 360/slices;
  // draw pie chart
  for(var i=0; i<data.length; i++){
    drawSlice(deg, data[i].color, sliceDeg);
    deg += sliceDeg;
  }
}

function newInputRow(name, color) {
  let newRow = document.createElement("div");
  newRow.classList.add("row-input");
  newRow.innerHTML = `
              <label>Option</label>
              <input type="text" name="name" value="${name || ""}">
              <label>color</label>
              <input type="color" name="color" value="${color || ""}">
              <button
                class="delete-slice-btn btn"
                type="button"
                name="deleteSlice"
                >X</button>
            `;
  return newRow;
}
// handle slice input data
function loadSliceInputs(data) {
  console.log('data',data)
  if(!data) return;
  data.forEach((slice, i) => {
    let newSlice = newInputRow(slice.name, slice.color);
    // if last row add addrow button
    if (i >= data.length -1) {
      newSlice.innerHTML += `
        <button class="add-slice-btn btn" type="button" name="addSlice">
        +</button>`;
    };
    document.getElementsByClassName('wheel-data-inputs')[0].appendChild(newSlice)
  })
}
// load app
loadPieChart(localData);
loadSliceInputs(localData)

/***
EVENT HANDLERS
 ***/

 const deleteBtns = document.getElementsByClassName("delete-slice-btn");
 const addSlice = document.getElementsByClassName("add-slice-btn")[0];
 const submitBtn = document.getElementsByClassName("wheel-data-submit")[0];
 const spinWheelBtn = document.getElementsByClassName("spin-wheel-btn")[0];


// delete input row
function deleteSlice() {
  // if last row
  if (!this.parentNode.nextSibling) {
    addRowBtn = document.createElement('button')
    addRowBtn.class = "add-slice-btn btn";
    addRowBtn.type = "button";
    addRowBtn.name = "addSlice";
    addRowBtn.innerHTML = "+";
    addRowBtn.addEventListener('click', addRow);
    this.parentNode.previousSibling.appendChild(addRowBtn)
  }
  this.parentNode.parentNode.removeChild(this.parentNode)
}

function addRow() {
  console.log(this)
  this.parentNode.removeChild(this);
  let newSlice = newInputRow();
  newSlice.innerHTML += `
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

function handleFormSubmit(e) {
  //prevent form submit and page reload
  e.preventDefault();
  let data = [];

  // iterate over form rows for data
  const rows = document.getElementsByClassName('row-input');
  Array.prototype.forEach.call(rows, function(row, i) {
    let name = row.querySelector('input[name="name"]').value;
    let color = row.querySelector('input[name="color"]').value;
    data.push({name: name, color: color})
  });
  // update localStorage
  localStorage.setItem("chartData", JSON.stringify(data));
    // reload app
    loadPieChart(data);


}

function spinWheel() {
  const spinLength = Math.random() * 10000
  canvas.style.transform   = 'rotate('+spinLength+'deg)';
  return spinLength;
}


Array.prototype.forEach.call(deleteBtns, function(btn) {
  btn.addEventListener("click", deleteSlice)
});

addSlice.addEventListener("click", addRow)
submitBtn.addEventListener("click", handleFormSubmit)
spinWheelBtn.addEventListener("click", spinWheel)
