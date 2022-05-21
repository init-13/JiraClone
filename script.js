//click to open and close modal containner
var uid = new ShortUniqueId();
const addbtnSelector = document.querySelector(".add-btn");
const modalSelector = document.querySelector(".modal-cont");
const mainCont = document.querySelector(".main-cont");
let isModalPresent = false;

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
    if (key == "Shift") {
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
    `;
    
    mainCont.appendChild(ticketCont);
}

