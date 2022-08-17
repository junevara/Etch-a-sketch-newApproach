const drawArea = document.querySelector('.draw-area');
const colorButtons = document.querySelectorAll('.color-choice');
const userColorPicker = document.querySelector('#input-color');
const clearButton = document.querySelector('.clear');
var slider = document.querySelector('#sizeRange');
let display = document.getElementById("display");
let color = 'black';


let mouseDown = false;

function createGrid (gridNumber) { 
    let gridArea = gridNumber * gridNumber;
    for (let i = 1; i <= gridArea; i++) {
        let gridItem = document.createElement('div');
        drawArea.style.gridTemplateColumns = `repeat(${gridNumber}, 1fr)`;
        drawArea.style.gridTemplateRows = `repeat(${gridNumber}, 1fr)`;
        drawArea.insertAdjacentElement('beforeend', gridItem);
    } 
    let gridPixels = drawArea.querySelectorAll('div');
    gridPixels.forEach(gridPixel => gridPixel.addEventListener('mousedown', () => {mouseDown = true}));
    gridPixels.forEach(gridPixel => gridPixel.addEventListener('mouseup',  () => [mouseDown = false]));
    gridPixels.forEach(gridPixel => gridPixel.addEventListener('mouseover', colorGrid));
   
}






function colorGrid(e) {
    if(e.type === 'mouseover' && !mouseDown){ 
        return;
    }
    else {
        switch (color) {
            case 'rainbow':
                this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
                this.classList.remove('gray');
                break;  
            case 'gray':
                if (this.style.backgroundColor.match(/rgba/)) {
                    let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
                    if (currentOpacity <= 0.9) {
                        this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
                        this.classList.add('gray');
                    }
                } else if (this.classList == 'gray' && this.style.backgroundColor == 'rgb(0, 0, 0)') {
                    return;
                } else {
                    this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';  
                }
                break;
            case 'eraser':
                this.style.backgroundColor = '#ffffff';
                this.classList.remove('gray');
                break;
            case 'black':
                this.style.backgroundColor = '#000000';
                this.classList.remove('gray');
                break;
            default:
                this.style.backgroundColor = color;
                this.classList.remove('gray');
                break;
        } 
    }
}

function eraseAllColor() {
    var gridPixels = drawArea.querySelectorAll('div');
    gridPixels.forEach(gridPixel => gridPixel.style.backgroundColor = '#ffffff');
}

function changeColor(event) {
    switch (event.target.dataset.color) { 
        case 'rainbow':
            color = 'rainbow';
            break;  
        case 'gray':
            color = 'gray';
            break;
        case 'eraser':
            color = 'eraser';
            break;
        default:
            color = 'black';
            break;
    } 
}




function pixelSize() {
    let gridPixels = drawArea.querySelectorAll('div');
    gridPixels.forEach(gridPixel => gridPixel.remove());
    createGrid(slider.value);
    console.log(slider.value);
}

function userColorSelection(event){
    color = event.target.value;
}

function buttonHover() {
    this.style.border = '1px solid #ffffff';
}

function buttonStandard(){
    this.style.border = '1px solid #FF0000';
}

createGrid(10);

clearButton.addEventListener('click', eraseAllColor);
clearButton.addEventListener('mouseover', buttonHover);
clearButton.addEventListener('mouseout', buttonStandard);
colorButtons.forEach(colorButton => colorButton.addEventListener('click', changeColor));
colorButtons.forEach(colorButton => colorButton.addEventListener('mouseover', buttonHover));
colorButtons.forEach(colorButton => colorButton.addEventListener('mouseout', buttonStandard));


slider.addEventListener('mouseup', pixelSize);

userColorPicker.addEventListener('change', userColorSelection, false);
userColorPicker.addEventListener('input', userColorSelection, false);


display.innerHTML = `${slider.value}x${slider.value}`;

slider.oninput = function() {
    display.innerHTML = `${this.value}x${this.value}`;
}