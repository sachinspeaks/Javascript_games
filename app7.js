const grid=document.querySelector('.grid');
const resultdisplay=document.querySelector('#result');
let currentshooteridx=202;
const width=15;
let direction=1;
let invadersid;
let goingright=true;
let aliensremoved=[];
let result=0;

for(let i=0;i<225;i++)
{
    const square=document.createElement('div');
    square.innerHTML='.';
    grid.appendChild(square);
}

const squares=Array.from(document.querySelectorAll('.grid div'));

const alieninvaders=[
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39,   
];

function draw()
{
    for(let i=0;i<alieninvaders.length;i++)
    {
        if(!aliensremoved.includes(i))squares[alieninvaders[i]].classList.add('invaders');
    }
}
draw();

function removeinvader()
{
    for(let i=0;i<alieninvaders.length;i++)
    {
        squares[alieninvaders[i]].classList.remove('invaders');
    }
}
squares[currentshooteridx].classList.add('shooter');

function moveshooter(e)
{
    squares[currentshooteridx].classList.remove('shooter');
    switch(e.key)
    {
        case 'ArrowLeft':
            if(currentshooteridx%width!==0)currentshooteridx-=1;
        break;
        case 'ArrowRight':
            if(currentshooteridx%width<width-1)currentshooteridx+=1;
        break;    
    }
    squares[currentshooteridx].classList.add('shooter');
}
document.addEventListener('keydown',moveshooter);

function  moveinvaders()
{
    const leftedge=alieninvaders[0]%width===0;
    const rightedge=alieninvaders[alieninvaders.length-1]%width===width-1;
    removeinvader();

    if(rightedge && goingright)
    {
        for(let i=0;i<alieninvaders.length;i++)
        {
            alieninvaders[i]+=width+1;
            direction=-1;
            goingright=false;
        }
    }

    if(leftedge && !goingright)
    {
        for(let i=0;i<alieninvaders.length;i++)
        {
            alieninvaders[i]+=width-1;
            direction=1;
            goingright=true;
        }
    }

    for(let i=0;i<alieninvaders.length;i++)
    {
        alieninvaders[i]+=direction;
    }
    draw();
    if(squares[currentshooteridx].classList.contains('invaders','shooter')){
        resultdisplay.innerHTML='Game Over!!!!';
        clearInterval(invadersid);
    }

    for(let i=0;i<alieninvaders.length;i++)
    {
        if(alieninvaders[i]>(squares.length))
        {
            resultdisplay.innerHTML='Game Over!!!!';
            clearInterval(invadersid);
        }
    }

    if(aliensremoved.length===alieninvaders.length)
    {
        resultdisplay.innerHTML="You Win";
        clearInterval(invadersid);
        document.removeEventListener('keydown',shoot);
    }

}

invadersid=setInterval(moveinvaders,500);

function shoot(e)
{
    let laserid;
    let currentlaseridx=currentshooteridx;
    function movelaser()
    {
        squares[currentlaseridx].classList.remove('laser');
        currentlaseridx-=width;
        squares[currentlaseridx].classList.add('laser');

        if(squares[currentlaseridx].classList.contains('invaders'))
        {
            squares[currentlaseridx].classList.remove('laser');
            squares[currentlaseridx].classList.remove('invaders');
            squares[currentlaseridx].classList.add('boom');

            setTimeout(()=> squares[currentlaseridx].classList.remove('boom'),300);
            clearInterval(laserid);

            const alienremoved=alieninvaders.indexOf(currentlaseridx);
            aliensremoved.push(alienremoved);
            result++;
            resultdisplay.innerHTML=result;
        }
    }
    switch(e.key)
    {
        case 'ArrowUp':
            laserid=setInterval(movelaser,50);

    }
}
document.addEventListener('keydown',shoot);
