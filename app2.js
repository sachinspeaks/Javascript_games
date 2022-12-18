document.addEventListener('DOMContentLoaded',()=>{
    const cardarray=[
        {
            name: 'Fries',
            img: 'img/fries.jpg',
        },
        {
            name:'Burger',
            img: 'img/burger.jpg',
        },
        {
            name:'Ice Cream',
            img: 'img/icecream.jpg',
        },
        {
            name:'Pizza',
            img: 'img/pizza.jpg'
        },
        {
            name:'Beer',
            img: 'img/beer.jpg'
        },
        {
            name:'Shake',
            img: 'img/shake.jpg'
        },
        {
            name: 'Fries',
            img: 'img/fries.jpg',
        },
        {
            name:'Burger',
            img: 'img/burger.jpg',
        },
        {
            name:'Ice Cream',
            img: 'img/icecream.jpg',
        },
        {
            name:'Pizza',
            img: 'img/pizza.jpg'
        },
        {
            name:'Beer',
            img: 'img/beer.jpg'
        },
        {
            name:'Shake',
            img: 'img/shake.jpg'
        },
    ]
    cardarray.sort(()=>0.5-Math.random())
    console.log(cardarray)
    
    const griddisplay=document.querySelector('#grid')
    const resultdisplay=document.querySelector('#result')
    let cardchosen=[]
    let cardchosenid=[]
    const cardswon=[]
    
    function createboard()
    {
        for(let i=0;i<cardarray.length;i++)
        {
            const card=document.createElement('img')
            card.setAttribute('src','img/cover.jpg')
            card.setAttribute('data-id',i)
            card.addEventListener('click',flipcard)
            console.log(card,i)
            griddisplay.append(card)
        }
    }    
    createboard()
    
    function checkmatch()
    {
        const cards=document.querySelectorAll('img')
        const optiononeid=cardchosenid[0]
        const optiontwoeid=cardchosenid[1]
        console.log(cards)
        console.log('check for match')
        if(optiononeid == optiontwoeid)
        {
            cards[optiononeid].setAttribute('src','img/cover.jpg')
            cards[optiontwoeid].setAttribute('src','img/cover.jpg')
            alert("You  have clicked same picture dumbo ")
        }
        if(cardchosen[0]===cardchosen[1])
        {
            alert('You found a match bro!!!')
            cards[optiononeid].setAttribute('src','img/white.png')
            cards[optiontwoeid].setAttribute('src','img/white.png')
            cards[optiononeid].removeEventListener('click',flipcard)
            cards[optiontwoeid].removeEventListener('click',flipcard)
            cardswon.push(cardchosen)
        }
        else
        {
            cards[optiononeid].setAttribute('src','img/cover.jpg')
            cards[optiontwoeid].setAttribute('src','img/cover.jpg')
            alert("Sorry try again !!!")
        }
        resultdisplay.innerHTML=cardswon.length
        cardchosen=[]
        cardchosenid=[]
        if(cardswon.length==cardarray.length/2)
        {
            resultdisplay.textContent="Congratulations You found them all "
        }
    }
    
    function flipcard()
    {
        const cardid=this.getAttribute('data-id')
        cardchosen.push(cardarray[cardid].name)
        cardchosenid.push(cardid)
        this.setAttribute('src',cardarray[cardid].img)
        if(cardchosen.length===2)
        {
            setTimeout(checkmatch,50)
        }
    }
})