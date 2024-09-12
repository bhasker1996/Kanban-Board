let addbtn = document.querySelector('.add-btn');
let modelcont = document.querySelector('.model-cont');
let maincont = document.querySelector('.main-cont');
let textareacont = document.querySelector('.textarea-cont');
let removebtn = document.querySelector('.remove-btn');
let toolboxColors = document.querySelectorAll('.color-box');
let allprioritycolors = document.querySelectorAll('.priority-color');
let modelPriorityColor = 'lightpink';
let colors = ['lightpink' , 'lightgreen' , 'lightblue' , 'black']
let lockClass = 'fa-lock';
let unlockClass =  "fa-lock-open";
let ticketsArr = [];

let addTaskFlag = false;
let removeTaskFlag = false;

//Getting things from the localStorage
if(localStorage.getItem('tickets')){
    ticketsArr = JSON.parse(localStorage.getItem('tickets'))

    ticketsArr.forEach(function(ticket){
        createTicket(ticket.ticketTask , ticket.ticketColorClass , ticket.ticketID )
    })
}


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
        textareacont.value = ''
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
function createTicket(ticketTask, ticketColorClass, ticketID)
{
    //console.log(ticketID);
    let id = ticketID || shortid();
    let ticketcont = document.createElement("div");
    ticketcont.setAttribute('class', 'ticket-cont');

    ticketcont.innerHTML = `<div class="ticket-color ${ticketColorClass}"></div>
            <div class = "ticket-id">
                ${id}
            </div>
            <div class = "ticket-task">
                ${ticketTask}
            </div>
            <div class = ticket-lock>
                <i class="fa-solid fa-lock"></i>
            </div>`;

    maincont.appendChild(ticketcont);
    handleLock(ticketcont, id);
    handleRemove(ticketcont, id);
    handleTicketColor(ticketcont, id);
    if(!ticketID)
    {
        ticketsArr.push({ticketTask, ticketColorClass, ticketID:id});
        localStorage.setItem('tickets', JSON.stringify(ticketsArr));
    }
}


//Get tasks based on color filter
for(let i=0; i<toolboxColors.length; i++)
    {
    
        toolboxColors[i].addEventListener('click', function(){
    
            let selectedToolBoxColor = toolboxColors[i].classList[0];
            let filteredTickets = ticketsArr.filter(function(ticket){
                return selectedToolBoxColor === ticket.ticketColorClass;
            })

            console.log(filteredTickets);
    
            let allTickets = document.querySelectorAll('.ticket-cont');
            for(let i=0; i<allTickets.length; i++)
            {
                allTickets[i].remove();
            }
    
            console.log("All Tickets Removed");
    
            filteredTickets.forEach(function(filteredTicket){
                createTicket(filteredTicket.ticketTask, filteredTicket.ticketColorClass, filteredTicket.ticketID)
                console.log("Filtered Tickets");
            })    
        })
    
    }


//Handling Lock
function handleLock(ticket, id)
{
    let ticketLockElem = document.querySelector('.ticket-lock');
    let ticketLockIcon = ticketLockElem.children[0];
    let ticketTaskArea = document.querySelector('.ticket-task');

    ticketLockIcon.addEventListener('click', function(){

        let ticketIdx = getIdx(id);

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

        ticketsArr[ticketIdx].ticketTask = ticketTaskArea.innerText;
        localStorage.setItem('tickets', JSON.stringify(ticketsArr));
    });
}



//Adding the functionality to the remove-btn
removebtn.addEventListener('click', function(){

    removeTaskFlag = !removeTaskFlag;

    //if(!removeTaskFlag){return ;}

    if(removeTaskFlag == true)
    {
        alert('Removing Activated');
        removebtn.style.color = 'red';
    }
    else
    {
        alert('Removing De-Activated');
        removebtn.style.color = 'white';
    }
})


// Removing the ticket
function handleRemove(ticket, id)
{
    ticket.addEventListener('click', function(){
        let ticketIdx = getIdx(id);

        if(!removeTaskFlag){return ;}

        ticket.remove();
        ticketsArr.splice(ticketIdx, 1);
        localStorage.setItem('tickets', JSON.stringify(ticketsArr));
    })
}


// Handling ticket color priority for .ticket-color
function handleTicketColor(ticket, id)
{


    let TicketColorBand = ticket.querySelector('.ticket-color');

    TicketColorBand.addEventListener('click', function(){

        let ticketIdx = getIdx(id);

        let currentBandColor = TicketColorBand.classList[1];       //String with the current color.
        // console.log(currentBandColor);

        let currentBandColorIdx = colors.findIndex(function(color){
    
            if(currentBandColor === color)
            {
                return true;
            }
            return false;
        })
   
        currentBandColorIdx++;     
        currentBandColorIdx = currentBandColorIdx % colors.length;
        let newBandColor = colors[currentBandColorIdx];

        TicketColorBand.classList.remove(currentBandColor);
         TicketColorBand.classList.add(newBandColor);

        ticketsArr[ticketIdx].ticketColorClass = newBandColor;
        localStorage.setItem('tickets', JSON.stringify(ticketsArr));
    })
}



function getIdx(id)
{
    let ticketIdx = ticketsArr.findIndex(function(targetObj){
        return targetObj.ticketID === id;
    })
    return ticketIdx;
}