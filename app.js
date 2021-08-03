const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");


const INITIAL_COLOR = "black";

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 700, 700);
ctx.fillStyle = INITIAL_COLOR;
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

// ctx.fillRect(0, 0, 30, 30);

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function stratPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

// function onMouseDown(event) {
    //   painting = true;
    // }
    
    function handleColorClick(event) {
        const color = event.target.style.backgroundColor;
        console.log(color);
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
    }
    
    function modeChage() {
      if (filling === true) {
        filling = false;
        mode.innerText = "LINE";
        console.log(filling);
      } else {
        filling = true;
        mode.innerText = "FILL";
        console.log(filling);
      }
    }
    
    mode.addEventListener("click", modeChage);
 
function fillingCanvas() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  };
}

function contextMenuBlock(event) {
  event.preventDefault();
}

function saveImg() {
  const image = canvas.toDataURL("image/jpeg", 1);
  const link = document.createElement("a");
  link.href = image
  link.download = "panintJS[Practice]";
  console.log(link)
  link.click();
}


if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", stratPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", fillingCanvas);
  canvas.addEventListener("contextmenu", contextMenuBlock);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

function handleBrushSize() {
  const brushSize = range.value;
  ctx.lineWidth = brushSize;
}

range.addEventListener("input", handleBrushSize);

saveBtn.addEventListener("click", saveImg);

