
const columns   = document.querySelectorAll('.column--cards');
const cards      = document.querySelectorAll('.card');

let dragged__card;


//para pc
const drag__start = (e)=>{
    dragged__card = e.target;
    e.dataTransfer.effectAllowed='move';
}
//para mobile first
const touch__start = (event)=>{
    dragged__card = event.target;
    
    const touch = event.touches[0];
    dragged__card.start__X = touch.clientX;
    dragged__card.start__Y = touch.clientY;

}

//para pc
const drag__over = (e)=>{
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}
//para mobile first 
let last__target;

const touch__move = (e)=>{
    e.preventDefault();
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX,touch.clientY);

    //movendo o card com o dedo
    dragged__card.style.position='absolute';
    dragged__card.style.left=`${touch.clientX-50}px`;
    dragged__card.style.top=`${touch.clientY-50}px`;

    //simula o 'dragenter'
    if(target && target.classList.contains('column--cards')){
        if(target.classList !== last__target){
            if(last__target){
                last__target.remove('columnn--higlight');
            }
        }
        target.classList.add('column--highlight');
        last__target = target.className('column-highlight');
    } else {
        last__target.classList.remove('column-highlight');
        last__target = null;
    }

}
//para pc
const drag__enter = ({target})=>{
    if(target.classList.contains('column--cards')){
        target.classList.add('column--highlight');
    }
}
//para pc
const drag__leave = ({target})=>{
    target.classList.remove('column--highlight');
}


const drop = ({target})=>{
    if(target.classList.contains('column--cards')){
        target.classList.remove('column--highlight');
        target.append(dragged__card);
    }
}

const criar__elemento = ({target}) =>{

    if(!target.classList.contains('column--cards')) return;

    const card = document.createElement('section');

    card.className='card';
    card.draggable='true';
    card.contentEditable='true';

    card.addEventListener('focusout',()=>{
        card.contentEditable='false';
        if(!card.textContent) card.remove();
    });

    card.addEventListener('dragstart',drag__start);
    
    target.append(card);
    card.focus();
}

columns.forEach((column)=>{
    column.addEventListener('dragover',drag__over);
    column.addEventListener('dragenter',drag__enter);
    column.addEventListener('dragleave',drag__leave);
    column.addEventListener('drop',drop);
    column.addEventListener('dblclick',criar__elemento);
})

//aqui vamos capturar cada card
cards.forEach((card)=>{
    //evento para PC
    card.addEventListener('dragstart',drag__start);
    //eventos para mobile first
    card.addEventListener('touchstart',touch__start);
    card.addEventListener('touchmove',touch__move);
    
})