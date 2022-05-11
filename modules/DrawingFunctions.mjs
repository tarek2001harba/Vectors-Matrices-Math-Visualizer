const primaryColor  = '#ef476f'
const secondaryColor  = '#06d6a0'
const accentColor  = '#118ab2'
const black = '#073b4c'
const white = 255
const vectorsDisp = document.querySelector("#vectors"); 
const gridXLines = 20
const gridYLines = gridXLines / 2
let addedVectors = {}
// converting values for proper cartesian plane
const convertXCart = (x) => x - width/2
const convertYCart = (y) => -(y - height/2)

const xPxToCart = (x) => {
	return roundTwoDecimal(x, width/gridXLines)
}

const yPxToCart = (y) => {
	return roundTwoDecimal(y, height/gridYLines)
}

const matrix = (label, x, y) => (
	"<div class='matrix'>\
		<span class='mname'>"+label+"</span>\
		<span class='mop'>=</span>\
		<span class='mbracket'>[</span>\
		<div class='comps'>\
			<div class='xComp'>"+xPxToCart(x)+"</div>\
			<div class='yComp'>"+yPxToCart(y)+"</div>\
		</div>\
		<span class='mbracket'>]</span>\
    </div>"
)

function roundTwoDecimal(val, fact){
	return round(val/fact * 100) / 100
}

function checkBoundaries(){
	return !(mouseY < 0) && !(mouseY > height) && (mouseX > 0) && (mouseX < width)
}
function drawArrow(vec, label){
	push()
	translate(width/2, height/2)
    scale(1, -1)
	text(label, vec.x, vec.y+36)
	strokeWeight(3);
	stroke(black);
	line(0, 0, vec.x, vec.y);
	noStroke()
	fill(secondaryColor)
	textSize(24)
	text(label, vec.x, vec.y+36)
	rotate(vec.heading());
	let arrowSize = 18;
	fill(secondaryColor)
	translate(vec.mag() - arrowSize +6, 0);
	triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
	pop()
}

function drawVector(x, y){
	stroke(black)
	strokeWeight(4)
	line(0, 0, convertXCart(x), convertYCart(y))
}

function addVector(x, y){
	x = parseFloat(convertXCart(x))
	y = parseFloat(convertYCart(y))
	let vectorSymbol = String.fromCharCode(65+Object.keys(addedVectors).length)
	vectorsDisp.innerHTML += matrix(vectorSymbol, x, y)
	addedVectors[vectorSymbol] = createVector(x, y)
}

function removeVector(x, y){
	let vectorSymbol = String.fromCharCode(65+Object.keys(addedVectors).length)
	addedVectors[vectorSymbol] = createVector(x, y)
}

// setting up the cartesian plane grid
function drawGrid(){
	for (let x = 0; x < width; x += width / gridXLines){
		for (let y = 0; y < height; y += height / gridYLines){
			stroke(200);
			strokeWeight(1);
			line(x, 0, x, height);
			line(0, y, width, y);
		}
	}
}

function objectLength(obj){
	return Object.keys(obj).length
}

function checkObjectChange(prev ,obj){
	const crntLength = objectLength(obj)
	if(prev - crntLength != 0){
		return [true, crntLength]
	}
	return [false]
}