const squares=document.querySelectorAll(".square")
const mole=document.querySelector('.mole')
const timeleft=document.querySelector('#time-left')
const score=document.querySelector('#score')

let result=0;
let hitpos;
let currenttime=10;
let timerid=null;

function randomsquare(){
    squares.forEach(square=>{
        square.classList.remove('mole')
    })

    let randsquare=squares[Math.floor(Math.random()*9)]
    randsquare.classList.add('mole')

    hitpos=randsquare.id;
}

squares.forEach(square=>{
    square.addEventListener('mousedown',()=>{
        if(square.id==hitpos)
        {
            result++;
            score.textContent=result;
            hitpos=null;
        }
        
    })
})

function movemole(){
    timerid=setInterval(randomsquare,1000);
}

movemole();

function countdown(){
    currenttime--;
    timeleft.textContent=currenttime;

    if(currenttime==0)
    {
        clearInterval(countdowntimerid);
        clearInterval(timerid);
        alert("Game over,your final score is : "+result)
    }
}

let countdowntimerid=setInterval(countdown,1000);
