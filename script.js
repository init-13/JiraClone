//click to open and close modal containner
var uid = new ShortUniqueId();
const addbtnSelector = document.querySelector(".add-btn");
const modalSelector = document.querySelector(".modal-cont");
const mainCont = document.querySelector(".main-cont");
let isModalPresent = false;
let allTickets = [];
const delBtn = document.querySelector(".remove-btn");
let isRemovebtnActive = false;
const colorFilter = document.querySelectorAll(".color");

addbtnSelector.addEventListener("click",function(){
    if(isModalPresent)
    modalSelector.style.display="none";
    else
    modalSelector.style.display="flex";

    isModalPresent=!isModalPresent;


});

const allColorBox = document.querySelectorAll(".priority-color");
let activeColor = "black";
// Adding borders to color selected
allColorBox.forEach(function(colorBox){
    colorBox.addEventListener("click",function(){
        allColorBox.forEach(function(remCo){
            remCo.classList.remove("active");

        });
        colorBox.classList.add("active");
        activeColor = colorBox.classList[1];
    });
});

// Adding a new ticket when enter is pressed on textbox
const textAreaCont = document.querySelector(".text-area");
modalSelector.addEventListener("keydown", function (e) {
    let key = e.key;
    if (key == "Enter") {
    //   console.log(modalPriorityColor);
      console.log(textAreaCont.value);
      createTicket(activeColor, textAreaCont.value);
      
      
        modalSelector.style.display = "none";
        isModalPresent = false;
        textAreaCont.value = "";
        allColorBox.forEach(function (colorElem) {
            colorElem.classList.remove("active");
        })
    }
});

// function to create ticket of specified color and data

function createTicket(ticketColor, data, ticketId) {
    let id = ticketId || uid();
    let ticketCont = document.createElement("div"); //<div></div>
    ticketCont.setAttribute("class", "ticket-cont");
    ticketCont.classList.add(ticketColor);
    ticketCont.innerHTML = `
        <div class="ticket-color ${ticketColor} "></div>
        <div class="ticket-id">${id}</div>
        <div class="task-area">${data}</div>
        <div class="lock"><i class="fa-solid fa-lock"></i></div>
    `;
    
    mainCont.appendChild(ticketCont);
    handleRemove(ticketCont,id);
    colorChanger(ticketCont,id);
    lockHandle(ticketCont, id);

    if(!ticketId){
        allTickets.push({
            ticketColor,
            data,
            ticketId:id
        });
    }
    localStorage.setItem("tickets",JSON.stringify(allTickets));
}

// local storage handling

// push everything to tickets arr from localStorage and create them

if (localStorage.getItem("tickets")) {
    allTickets= JSON.parse(localStorage.getItem("tickets"));
    allTickets.forEach(function(ticketObj){
        createTicket(ticketObj.ticketColor, ticketObj.data, ticketObj.ticketId);
    })
}

// filter with color

delBtn.addEventListener("click",function(){
    if(isRemovebtnActive)
    delBtn.style.color = "white";
    else
    delBtn.style.color = "red";

    isRemovebtnActive=!isRemovebtnActive;

    
});

function getIndex(id){
    return allTickets.findIndex(function(ticket){
            return ticket.ticketId==id;
    });
}

function handleRemove(ticket,id){

    ticket.addEventListener("click",function(){

        if(!isRemovebtnActive || isLocked(ticket)) 
            return;

        // remove ticket from frontend
        ticket.remove();

        // remove ticket from ticket array
        let index = getIndex(id);
        console.log(index);
        
        allTickets.splice(index,1);
        
        // update local storage
        localStorage.setItem("tickets",JSON.stringify(allTickets));


    })

}
function removeTickets(){
 const presentTickets = document.querySelectorAll(".ticket-cont");

 presentTickets.forEach(function(ticket){

    ticket.remove();

 });

}

function showTicket(arr){
    arr.forEach(function (ticketObj) {
        createTicket(
          ticketObj.ticketColor,
          ticketObj.data,
          ticketObj.ticketId
        );
    })
}
// filter the color on click
colorFilter.forEach(function(colorBox){
    colorBox.addEventListener("click",function(){

        let currColor = colorBox.classList[0];

        let ticketsToShow = allTickets.filter(function(ticket){
            return ticket.ticketColor == currColor;
        });

        removeTickets();
        showTicket(ticketsToShow);


});

colorBox.addEventListener("dblclick",function(){
    removeTickets();
    showTicket(allTickets);
});

});

function nextColor(color){
    // console.log(colorF+ilter);
    
    let ColorArr =[];
    colorFilter.forEach(function(colorBox){
        ColorArr.push(colorBox.classList[0]);
    });

    console.log(ColorArr);

    let index = ColorArr.findIndex(function(colorT){
        return color==colorT;
    });

    index = (index+1) % ColorArr.length ;

    return ColorArr[index];

}
// change priority colors on clicking colorstrip of ticket
function colorChanger(ticket, id){
    let colorStrip = ticket.querySelector(".ticket-color");

    colorStrip.addEventListener("click",function(){

        if(isLocked(ticket)) return;

        let currColor = colorStrip.classList[1];
        colorStrip.classList.remove(currColor);
        ticket.classList.remove(currColor);
        
        currColor = nextColor(currColor);
        colorStrip.classList.add(currColor);
        ticket.classList.add(currColor);

        let index = getIndex(id);
        console.log(id,index);
        
        allTickets[index].ticketColor = currColor;

        localStorage.setItem("tickets",JSON.stringify(allTickets));

        

    });

}
function isLocked(ticket){
    let lockStatus = ticket.querySelector(".lock").children[0];
    
    return lockStatus.classList.contains("fa-lock");
}

// change lock status on clicking lock of a ticket
function lockHandle(ticket, id){

    let lockStatus = ticket.querySelector(".lock").children[0];
    let taskArea = ticket.querySelector(".task-area");
    lockStatus.addEventListener("click",function(){

        lockStatus.classList.toggle("fa-lock");
        lockStatus.classList.toggle("fa-lock-open");

        
        taskArea.setAttribute("contenteditable",!isLocked(ticket));

        let index = getIndex(id);

        allTickets[index].data = taskArea.innerHTML;
        localStorage.setItem("tickets",JSON.stringify(allTickets)); 

    });

    

 
}



