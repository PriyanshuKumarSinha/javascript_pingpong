var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth/2;
canvas.height = window.innerHeight/1.25;
var c = canvas.getContext('2d');
var scoreDiv = document.querySelector('.score')
var score = 0;
var scores = document.querySelector('ul')
var COLORS = ['red'];

if (window.innerWidth<700){
    canvas.width = window.innerWidth;
}

var maxRadius = 30;
var seperationDistance = 40;
// window.addEventListener('mousemove',
//     function(event){
//         paddleX = event.x;
//         // mouse.y = event.y - innerHeight;
        
//     }
//     )

// window.addEventListener('resize', 
//     function(){
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight/2;
//     init(); 
//     }
//     )


    
class Circle {
    constructor(x, y, radius, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = color;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();

        this.update();
    }
    update(){
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0 ){
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y-this.radius < 0 ){
            this.dy = -this.dy;
        }
        this.x+=this.dx;
        this.y+=this.dy;

        //interactivity

        // else{
        //     this.radius = this.minRadius;
        // }
        
    }

}

var circleArray = [];



function init(){
    circleArray = [];
    for ( let i =0; i<1; i++){
        var radius = 8;
    
        var x = Math.random() * (window.innerWidth/2 - radius * 2) + radius;
        var y = Math.random() * (window.innerHeight/2 - radius * 2) + radius;
    
        var dx = 4;
        var dy = 4;
    
        var color = COLORS[Math.floor(Math.random()*COLORS.length)];
    
        var circle = new Circle(x, y, radius, dx, dy, color);
        circleArray.push(circle);
    }
}

function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0,0,innerWidth, innerHeight) // clears the canvas from (0,0) to (innerWidth, innerHeight) i.e complete canvas
    drawPaddle(paddleX,canvas.height -15);
    if(circleArray[0].x + width < canvas.width){
    drawPaddle(circleArray[0].x -  Math.random() * 10, 0);
    }
    else{
    drawPaddle(canvas.width - width, 0);

    }
    scoreDiv.textContent = score;
    circleArray[0].draw();
        
    giveresult(circleArray[0], paddleX);
}


var paddleX = 0;

// function paddleAnimate(){
//     requestAnimationFrame(paddleAnimate)
//     c.clearRect(0,0,innerWidth, innerHeight) // clears the canvas from (0,0) to (innerWidth, innerHeight) i.e complete canvas
//     drawPaddle(paddleX);
// }

init();
animate();
drawPaddle(paddleX)
// paddleAnimate();
var height = 15;
var width = 100;
function drawPaddle(x,y){

    c.fillRect(x, y, width, height);
}

window.addEventListener('keydown', function(event){
    // 37 left
    // 38 up
    // 39 right
    // 40 bottom
    if (event.keyCode === 39){
        moveLeft();
    }
    else if (event.keyCode === 37){
        moveRight();
    }
})

function moveLeft(){

    if (paddleX+width < canvas.width){

        paddleX+=20
    }
}

function moveRight(){
    if (paddleX > 0){
        console.log('yes')

        paddleX -=20
    }
}

function giveresult(circle,X){

    if ((circle.y + circle.radius) >= (canvas.height) &&  ((circle.x - circle.radius) <= (X + 100) && (circle.x - circle.radius) > (X))){
        console.log('y')
        score += 1;
    }
    else if((circle.y + circle.radius) >= (canvas.height)){
        updateScore();
        score = 0;
        // alert('game over')
    }
}


function updateScore(){
    var li = document.createElement('li');
    li.innerText = score;

    scores.appendChild(li)
}