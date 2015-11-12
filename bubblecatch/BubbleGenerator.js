/**
 * Created by lxkaka on 15/11/11.
 */
//注意 x，y 的位置都是相对于canvas的起点（左上角）

var canvas = document.getElementById('canvas');
var width = canvas.width, height = canvas.height;
var ctx = canvas.getContext('2d');

var bubbleNumber = 10, bubbleList = new Array(),speed = 10;// var bubbleList = [];
var diffX,diffY;
// define constructor Bubble
function Bubble(x,y,diffX,diffY,col,radius){
    this.x = x;
    this.y = y;
    this.col = col;

    this.radius = radius;
    this.bubbleCode = Math.ceil(radius);
    this.update = function(){
        x += diffX;
        y += diffY;
        if(x>width||x<0){
            diffX = -diffX;
        }
        if(y>height||y<0){
            diffY = -diffY;
        }
    }
    this.draw = function(){
        ctx.fillStyle = col;
        ctx.beginPath();
        var startAngle = 0;
        var endAngle = Math.PI * 2;

        ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();

    }

}

function generateSingleBubble(){
    // x,y in the interval[,]
    // x,y specify the position(center) on the canvas, relative to the top-left corner of canvas(not origin)
    var randomX = Math.random()*width;
    var randomY = Math.random()*height;
    var vX = Math.random()*6-3, vY = Math.random()*6-3;
    var colors = ['#C0C0C0','#FF0000','#00FF00','#0000FF','#FFFF00','#00FFFF','#FF00FF','','#FF8C00'];
    var randomCol = colors[Math.floor(Math.random() * colors.length)];
    var radius = Math.random()*100 % 11 + 10;
    //create Bubble object
    var bubble = new Bubble(randomX,randomY,vX,vY,randomCol,radius);
    bubbleList.push(bubble);

}

function generateBubbleAmount(){
    for(var i=0;i<bubbleNumber;i++){
        generateSingleBubble();

    }
    return bubbleList;

}

function run(){
    ctx.clearRect(0, 0, width, height);
    for (var i = 0; i < bubbleList.length; i++) {
        bubbleList[i].update();
        bubbleList[i].draw();
    }
    requestAnimationFrame(run);

}

//下面的不用看

function removeBubble(){
    bubbleList.pop();

}
function addBubble(){
    generateSingleBubble();

}
function speedUp(){
    diffX+=speed;
    diffY+=speed;

}
function speedCut(){
    diffX-=speed;
    diffY-=speed;
}
function initial(){
    generateBubbleAmount();
    run();

}

