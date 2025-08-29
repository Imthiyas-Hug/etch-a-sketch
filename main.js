const container = document.querySelector("#grid-container");

function setActiveMode(buttonId){
    document.querySelectorAll("#colorMode, #rainbowMode, #eraserMode").forEach(btn => btn.classList.remove("active"));
    document.querySelector(buttonId).classList.add("active");
}
let currentMode = 'color';
document.getElementById("colorMode").addEventListener("click", () => {
    currentMode = 'color';
    setActiveMode("#colorMode");
});

document.getElementById("rainbowMode").addEventListener("click", () => {
    currentMode = 'rainbow';
    setActiveMode("#rainbowMode");
});

document.getElementById("eraserMode").addEventListener("click", () => {
    currentMode = 'eraser';
    setActiveMode("#eraserMode");
});

const colorPicker = document.querySelector("#colorPicker");

let selectedColor = colorPicker.value;

colorPicker.addEventListener("input", () => {
    selectedColor = colorPicker.value;
});

createGrid(16);
function createGrid(size) {
    container.innerHTML = ``;
    const squareSize = 450 / size;

    for (let i = 1; i <= size * size; i++) {
        const square = document.createElement("div");
        square.classList.add("grid-square");
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;

        square.addEventListener("mouseover", () => {
            if (currentMode === 'color') {
                square.style.backgroundColor = selectedColor;
            } else if (currentMode === 'rainbow') {
                square.style.backgroundColor = getRandomColor();
            } else if (currentMode === 'eraser') {
                square.style.backgroundColor = '#ffffff';
            }
        });

        container.appendChild(square);
    }
}

const resizeBtn = document.querySelector("#resize-button");
resizeBtn.addEventListener("click", () => {
    let size = prompt("Enter grid size (max 100):")
    size = parseInt(size);
    if (size > 0 && size <= 100) {
        createGrid(size)
    } else {
        alert("Please enter a number between 1 and 100.")
    }
});

const resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", () => {
    const squares = document.querySelectorAll('.grid-square');

    squares.forEach(square => {
        square.style.backgroundColor = '';
    });
});

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}
const rainbowBtn = document.querySelector("#rainbowBtn");
rainbowBtn.addEventListener("click", () => {
    const squares = document.querySelectorAll('.grid-square');

    squares.forEach(square => {
        square.addEventListener("mouseover", () => {
            square.style.backgroundColor = getRandomColor();
        });
    });
});



