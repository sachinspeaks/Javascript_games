const grid=document.querySelector('.grid');
const scoredisplay=document.querySelector('#score');
const blockwidth=100;
const blockheight=20;
const boardwidth=560;
const boardheight=300;
const userstart=[230,10];
let currposn=userstart;
const ballstartposn=[270,30];
let ballcurrposn=ballstartposn;
const balldiameter=20;
let timerid;
let xdirection=-2;
let ydirection=2;
let score=0;

class Block{
    constructor(xAxis,yAxis)
    {
        this.bottomleft=[xAxis,yAxis]
        this.bottomright=[xAxis+blockwidth,yAxis]
        this.topleft=[xAxis,yAxis+blockheight]
        this.topright=[xAxis+blockwidth,yAxis+blockheight]
    }
}

const blocks=[
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
  ]

function addblock()
{
    for(let i=0;i<blocks.length;i++)
    {
        const block=document.createElement('div');
        block.classList.add('block')
        block.style.left=blocks[i].bottomleft[0]+'px';
        block.style.bottom=blocks[i].bottomleft[1]+'px';
        grid.appendChild(block)
    }
}
addblock();

const user=document.createElement('div');
user.classList.add('user');
drawuser();
grid.appendChild(user);

function drawuser()
{
    user.style.left=currposn[0]+'px';
    user.style.bottom=currposn[1]+'px';
}

function drawball()
{
    ball.style.left=ballcurrposn[0]+'px';
    ball.style.bottom=ballcurrposn[1]+'px';
}

function moveuser(e)
{
    switch(e.key){
        case 'ArrowLeft':
            if(currposn[0]>10)
            {
                currposn[0]-=10;
                drawuser();
            }
        break;
        case 'ArrowRight':   
            if(currposn[0]<boardwidth-110)
            {
                currposn[0]+=10;
                drawuser();
            }
        break;
    }
}

document.addEventListener('keydown',moveuser);

const ball=document.createElement('div');
ball.classList.add('ball');
drawball();
grid.appendChild(ball);

function moveball()
{
    ballcurrposn[0]+=xdirection;
    ballcurrposn[1]+=ydirection;
    drawball();
    checkcoll();
}

timerid=setInterval(moveball,20);

function checkcoll()
{

    for(let i=0;i<blocks.length;i++)
    {
        if(ballcurrposn[0]>blocks[i].bottomleft[0] && ballcurrposn[0]<blocks[i].bottomright[0] && ballcurrposn[1]+balldiameter>blocks[i].bottomleft[1] && ballcurrposn[1]<blocks[i].topleft[1])
        {
            const allBlocks=Array.from(document.querySelectorAll('.block'));
            allBlocks[i].classList.remove('block');
            blocks.splice(i,1);
            direction();
            score++;
            scoredisplay.innerHTML=score;
           if(blocks.length===0)
            {
                scoredisplay.innerHTML="You Win!!!!";
                clearInterval(timerid);
                document.removeEventListener('keydown',moveuser);
            }
        }
    }



    if(ballcurrposn[0]>currposn[0] && ballcurrposn[0]<currposn[0]+blockwidth && ballcurrposn[1]>currposn[1] && ballcurrposn[1]<currposn[1]+blockheight)
    {
        direction();
    }

    if(ballcurrposn[0]>=(boardwidth-balldiameter) || ballcurrposn[1]>=(boardheight-balldiameter) || ballcurrposn[0]<=0)
    {
        direction();
    }
    if(ballcurrposn[1]<=0)
    {
        clearInterval(timerid);
        scoredisplay.innerHTML='You lose';
        document.removeEventListener('key',moveuser);
    }
}



function direction()
{
    if(xdirection===2 && ydirection===2)
    {
        ydirection=-2;
        return;
    }
    if(xdirection===2 && ydirection===-2)
    {
        xdirection=-2;
        return;
    }
    if(xdirection===-2 && ydirection===-2)
    {
        ydirection=2;
        return;
    }
    if(xdirection===-2 && ydirection===2)
    {
        xdirection=2;
        return;
    }
}