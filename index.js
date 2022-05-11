let xCart, yCart;
let planeX, planeY;
let vectorKey;
const matrixSelectOp = document.querySelector('#calculations__op')
const matrixSelectOne = document.querySelector('#matrix-1')
const matrixSelectTwo = document.querySelector('#matrix-2')
const selectedMatrices = document.querySelectorAll('.calculations__selected-matrix')
let addedVectorsLength = 0
let crntVectorsLength;
let selectPrev = [matrixSelectOne.value, matrixSelectTwo.value];
let selectCrnt;
let opCrnt;
let result;
function setup() {
    const cnv = createCanvas(windowWidth*0.85, windowHeight*.80);
	cnv.id('cartesian-plane')
	frameRate(120)
	noSmooth()
}

function draw() {
	const xFactor = width/20
	const yFactor = height/10
	yCart = convertXCart(pmouseX)
	xCart = convertYCart(pmouseY)
	planeX = roundTwoDecimal(convertXCart(pmouseX), xFactor)
	planeY = roundTwoDecimal(convertYCart(pmouseY), yFactor)
    background(white)
	drawGrid()
	for(let v = 0; v < Object.keys(addedVectors).length; v++){
		vectorKey = String.fromCharCode(65+v)
		drawArrow(addedVectors[vectorKey], vectorKey)
	}
	updateCalcMatrices()
	// check if vectors are added or removed
	crntVectorsLength = checkObjectChange(addedVectorsLength, addedVectors)
	if(crntVectorsLength[0]){
		addedVectorsLength = crntVectorsLength[1]
		updateSelect()
	}

	// legened
	if(checkBoundaries()){
		noStroke()
		fill(black)
		textStyle(BOLD)
		textSize(24)
		text("(" + planeX + ", " + planeY + ")", mouseX + 24, mouseY)
	}

	// changing the plane origin and inverting y
	push()
    translate(width/2, height/2)
    scale(1, -1)
	fill(black)
	ellipse(0, 0, 12, 12)

	fill(black)
	if(mouseIsPressed && checkBoundaries()){
		ellipse(convertXCart(mouseX), convertYCart(mouseY), 6, 6)
	} else {
		ellipse(convertXCart(mouseX), convertYCart(mouseY), 12, 12)
	}
	pop()
}

function mouseClicked(){
	if(checkBoundaries()){
		addVector(mouseX, mouseY);
	}
}


function updateSelect(){    
	let vectorsKeys = Object.keys(addedVectors)
	matrixSelectOne.innerHTML = ''
	matrixSelectTwo.innerHTML = ''
    for(i = 0; i < vectorsKeys.length; i++){
        matrixSelectOne.innerHTML += '<option value="'+vectorsKeys[i]+'">'+vectorsKeys[i]+'</option>'
        matrixSelectTwo.innerHTML += '<option value="'+vectorsKeys[i]+'">'+vectorsKeys[i]+'</option>'
    }
}

function updateCalcMatrices(){
	selectCrnt = [matrixSelectOne.value, matrixSelectTwo.value]
	// checking selected arrays change
	if(selectPrev.toString() === selectCrnt.toString()){
		return
	}
	selectPrev = selectCrnt
	const vecOne = addedVectors[matrixSelectOne.value]
	selectedMatrices[0].innerHTML = matrix(matrixSelectOne.value, vecOne.x, vecOne.y)
	const vecTwo = addedVectors[matrixSelectTwo.value]
	selectedMatrices[1].innerHTML = matrix(matrixSelectTwo.value, vecTwo.x, vecTwo.y)
}

function calculate(){
	let vectorOne = addedVectors[matrixSelectOne.value]
	let vectorTwo = addedVectors[matrixSelectTwo.value]
	opCrnt = matrixSelectOp.value
	if(opCrnt === '+'){
		result = vectorOne.add(vectorTwo)
	} else if (opCrnt === '-'){
		result = vectorOne.add(-vectorTwo)
	} else if (opCrnt === '×'){

	}
}