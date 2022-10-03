const computerchoicedisplay=document.getElementById('computer-choice')
const userchoicedisplay=document.getElementById('user-choice')
const resultDisplay=document.getElementById('result')
const possiblechoices=document.querySelectorAll('button')
let userchoice
let computerchoice
let result
possiblechoices.forEach(possiblechoice=>possiblechoice.addEventListener('click',(e)=>
{
    userchoice=e.target.id
    userchoicedisplay.innerHTML=userchoice
    generatecompchoice()
    getresult()
}))

function generatecompchoice()
{
    const randomnumber=Math.floor(Math.random()*possiblechoices.length)+1
    if(randomnumber===1)
    {
        computerchoice='Rock'
    }
    if(randomnumber===2)
    {
        computerchoice='Scissors'
    }
    if(randomnumber===3)
    {
        computerchoice='Paper'
    }
    computerchoicedisplay.innerHTML=computerchoice
}

function getresult()
{
    if(computerchoice===userchoice)
    {
        result="It's a draw! "
    }
    if(computerchoice==='Rock' && userchoice==='Paper')
    {
        result='You  Win! '
    }
    if(computerchoice==='Rock' && userchoice==='Scissors')
    {
        result='You  Lost! '
    }
    if(computerchoice==='Paper' && userchoice==='Scissors')
    {
        result='You  Win! '
    }
    if(computerchoice==='Paper' && userchoice==='Rock')
    {
        result='You  Lost! '
    }
    if(computerchoice==='Scissors' && userchoice==='Rock')
    {
        result='You  Win! '
    }
    if(computerchoice==='Scissors' && userchoice==='Paper')
    {
        result='You  Lost! '
    }
    resultDisplay.innerHTML=result
}