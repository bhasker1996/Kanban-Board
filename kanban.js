let addbtn = document.querySelector('.add-btn');
let modelcont = document.querySelector('.model-cont');
let maincont = document.querySelector('.main-cont');
let textareacont = document.querySelector('.textarea-cont');

let allprioritycolors = document.querySelectorAll('.priority-color');
let modelPriorityColor = 'lightpink';

let lockClass = 'fa-lock';
let unlockClass =  "fa-lock-open";


let addTaskFlag = false;

// Logic for when you click on + button 
addbtn.addEventListener('click', function(){

    addTaskFlag = !addTaskFlag;

    if(addTaskFlag == true)
    {
        modelcont.style.display = 'flex';
    }
    else
    {
        modelcont.style.display = 'none';
    }
});


//Logic -> Pressing SHIFT button
modelcont.addEventListener("keydown", function(e){
    console.log("Pressed SOme key");
    let key = e.key;

    if(key =='Shift')
    {
        console.log('ticket created');
        createTicket(textareacont.value, modelPriorityColor);
        modelcont.style.display = 'none';
    }
});


//Adding event listeners to the colors to put the ticket-color when clicked
allprioritycolors.forEach(function(colorElem){

    colorElem.addEventListener('click', function(){
        allprioritycolors.forEach(function(priorityColorElem){

            priorityColorElem.classList.remove('active')

        })
        colorElem.classList.add('active');
        modelPriorityColor = colorElem.classList[0];
        console.log(modelPriorityColor);
    })
});


//Logic for creating TICKET
function createTicket(TicketTask, ticketColorClass)
{

    let ticketcont = document.createElement("div");
    ticketcont.setAttribute('class', 'ticket-cont');

    ticketcont.innerHTML = `<div class="ticket-color ${ticketColorClass}"></div>
            <div class = "ticket-id">
                1234
            </div>
            <div class = "ticket-task">
                ${TicketTask}
            </div>
            <div class = ticket-lock>
                <i class="fa-solid fa-lock"></i>
            </div>`;

    maincont.appendChild(ticketcont);
    handleLock(ticketcont);
}


//Handling Lock
function handleLock(ticket)
{
    let ticketLockElem = document.querySelector('.ticket-lock');

    let ticketLockIcon = ticketLockElem.children[0];

    let ticketTaskArea = document.querySelector('.ticket-task');

    ticketLockIcon.addEventListener('click', function(){

        if(ticketLockIcon.classList.contains(lockClass))
        {
            ticketLockIcon.classList.remove(lockClass);
            ticketLockIcon.classList.add(unlockClass);
            ticketTaskArea.setAttribute('contenteditable', 'true');
        }
        else
        {
            ticketLockIcon.classList.remove(unlockClass);
            ticketLockIcon.classList.add(lockClass);
            ticketTaskArea.setAttribute('contenteditable', 'false');
        }

    });

}

