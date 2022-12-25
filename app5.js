const timeleftdisplay=document.querySelector('#time-left');
const result=document.querySelector('#result');
const spb=document.querySelector('#stpa');
const squares=document.querySelectorAll('.grid div');
const logsleft=document.querySelectorAll('.log-left');
const logsright=document.querySelectorAll('.log-right');
const carsleft=document.querySelectorAll('.car-left');
const carsright=document.querySelectorAll('.car-right');



console.log(squares);
let curridx=76;
const width=9;
let timerid;
let checktid;
let currentTime=20;

function movefrog(e)
{
    squares[curridx].classList.remove('frog');
    switch(e.key)
    {
        case 'ArrowLeft':
            if(curridx%width!==0)curridx-=1;
            break;
        case 'ArrowRight':
            if(curridx%width<width-1)curridx+=1;
            break;
        case 'ArrowUp':
            if(curridx-width>=0)curridx-=width;
            break;
        case 'ArrowDown':
            if(curridx+width<width*width)curridx+=width;

    }
    squares[curridx].classList.add('frog');
}

document.addEventListener('keyup',movefrog);

function check()
{
    win();
    lose();
}

function automoveelements(){
    currentTime--;
    timeleftdisplay.textContent=currentTime;
    logsleft.forEach(logleft => movelogleft(logleft));
    logsright.forEach(logright => movelogright(logright));
    carsleft.forEach(carleft=>movecarleft(carleft));
    carsright.forEach(carright=>movecarright(carright));
}

function movelogleft(logleft)
{
    switch(true){
        case logleft.classList.contains('l1'):
            logleft.classList.remove('l1');
            logleft.classList.add('l2');
            break
        case logleft.classList.contains('l2'):
            logleft.classList.remove('l2');
            logleft.classList.add('l3');
            break
        case logleft.classList.contains('l3'):
            logleft.classList.remove('l3');
            logleft.classList.add('l4');
            break
        case logleft.classList.contains('l4'):
            logleft.classList.remove('l4');
            logleft.classList.add('l5');
            break
        case logleft.classList.contains('l5'):
            logleft.classList.remove('l5');
            logleft.classList.add('l1');
            break
    }
}

function movelogright(logright)
{
    switch(true){
        case logright.classList.contains('l1'):
            logright.classList.remove('l1');
            logright.classList.add('l5');
            break
        case logright.classList.contains('l2'):
            logright.classList.remove('l2');
            logright.classList.add('l1');
            break
        case logright.classList.contains('l3'):
            logright.classList.remove('l3');
            logright.classList.add('l2');
            break
        case logright.classList.contains('l4'):
            logright.classList.remove('l4');
            logright.classList.add('l3');
            break
        case logright.classList.contains('l5'):
            logright.classList.remove('l5');
            logright.classList.add('l4');
            break
    }
}

function movecarleft(carleft)
{
    switch(true){
        case carleft.classList.contains('c1'):
            carleft.classList.remove('c1');
            carleft.classList.add('c2');
            break
        case carleft.classList.contains('c2'):
            carleft.classList.remove('c2');
            carleft.classList.add('c3');
            break
        case carleft.classList.contains('c3'):
            carleft.classList.remove('c3');
            carleft.classList.add('c1');
            break
    }
}

function movecarright(carright)
{
    switch(true){
        case carright.classList.contains('c1'):
            carright.classList.remove('c1');
            carright.classList.add('c3');
            break
        case carright.classList.contains('c2'):
            carright.classList.remove('c2');
            carright.classList.add('c1');
            break
        case carright.classList.contains('c3'):
            carright.classList.remove('c3');
            carright.classList.add('c2');
            break
    }
}

function lose()
{
    if(squares[curridx].classList.contains('c1') || squares[curridx].classList.contains('l4') || squares[curridx].classList.contains('l5') || currentTime<=0){
        result.textContent="You lose!!!";
        clearInterval(timerid);
        clearInterval(checktid);
        squares[curridx].classList.remove('frog');
        document.removeEventListener('keyup',movefrog);
    }
}

function win()
{
    if(squares[curridx].classList.contains('ending-block'))
    {
        result.textContent="You Won!!!";
        clearInterval(timerid);
        clearInterval(checktid);
        document.removeEventListener('keyup',movefrog);
    }
}

spb.addEventListener('click',()=>{
    if(timerid){
        clearInterval(timerid);
        clearInterval(checktid);
        checktid=null;
        timerid=null;
        document.removeEventListener('keyup',movefrog);
    }
    else{
        checktid=setInterval(check,50);
        timerid=setInterval(automoveelements,1000);
        document.addEventListener('keyup',movefrog);
    }
})
timerid=setInterval(automoveelements,1000);
checktid=setInterval(check,50);

