const container = document.querySelector("#container");
const defaultSize = 16;
let dDiv = [];
let iV = 16;
let rgbColor;
let cValue;


let modes = {colorMode: false, shadeMode: true, rainbowMode: false, erasorMode: false};

// button handling
function modeHandler(modes, button) {
  if(button === "cButton") {
    modes.colorMode = true;
    modes.shadeMode = false;
    modes.rainbowMode = false;
    modes.erasorMode = false;
  } else if (button === "sButton") {
    modes.colorMode = false;
    modes.shadeMode = true;
    modes.rainbowMode = false;
    modes.erasorMode = false;
  } else if (button === "rButton") {
    modes.colorMode = false;
    modes.shadeMode = false;
    modes.rainbowMode = true;
    modes.erasorMode = false;
  } else if (button === "eButton") {
    modes.colorMode = false;
    modes.shadeMode = false;
    modes.rainbowMode = false;
    modes.erasorMode = true;
  }
    modes;
}


// Input Range button slider value 
const rvalue = document.querySelector("#rangeValue");
const rInput = document.querySelector("#inputRange");
rvalue.textContent = rInput.value;
rInput.addEventListener("input", (event) => {
  rvalue.textContent = (event.target.value + "x" + event.target.value);
  iV = event.target.value;
  makeRows(iV, iV);
  console.log(iV);
});

//Input color mode Value
let colorPicker = document.getElementById("colorValue");
colorPicker.addEventListener('input', function() {
  modes = {colorMode: true, shadeMode: false, rainbowMode: false, erasorMode: false};
  cValue = this.value;
  return cValue;
  
});

// function to generate canvas blocks 
function makeRows(rows, cols) {
  // remove all existing grid-item divs
  let existingDivs = document.querySelectorAll("div.grid-item");
  existingDivs.forEach(div => div.remove());

  // set the number of rows and columns for the grid
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", cols);

  // create new grid-item divs and add them to the container
  for(let i = 0; i < rows * cols; i++) {
    let cell = document.createElement("div");
    container.appendChild(cell).className = "grid-item";
  }

  // reset the modes
  modes = {colorMode: false, shadeMode: true, rainbowMode: false, erasorMode: false};
};

//  mouse over effect 
container.addEventListener('mouseover', event => {
let target = event.target;
let rbgPercentValue = parseInt(target.dataset.percent);
let rgbaPercentValue = parseInt(target.dataset.percent);


if (isNaN(rbgPercentValue)) rbgPercentValue = 100;
if (rbgPercentValue >= 10) {
    rbgPercentValue -= 10;
    target.dataset.percent = rbgPercentValue;
}
if(modes.shadeMode === true) {
  rgbColor = `rgb(${rbgPercentValue}%,${rbgPercentValue}%,${rbgPercentValue}%)`
  if (target !== container) {
  target.style['background'] = rgbColor;
  }
} else if(modes.colorMode === true) {
  target.style['background'] = cValue;
} else if(modes.rainbowMode === true) {
    //generate random values for r.g.b colors
    let randomR = randomNumber = Math.floor(Math.random() * 256);   
    let randomG = randomNumber = Math.floor(Math.random() * 256);   
    let randomB = randomNumber = Math.floor(Math.random() * 256);  
    let alphaValue = 1;
    for (let i = 0; i < 10; i++) {
      rgbaColor = `rgba(${randomR},${randomG},${randomB},${alphaValue})`;
    if (target !== container) {
      target.style['background'] = rgbaColor;
      } 
    }
  } else if(modes.erasorMode === true) {
      if(target !== container) {
        target.style.backgroundColor = '#fff';
    }
  }    
}

);

window.onload = () => {
makeRows(16, 16);
}

