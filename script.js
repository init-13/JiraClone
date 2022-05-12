//click to open and close modal containner
const addbtnSelector = document.querySelector(".add-btn");
const modalSelector = document.querySelector(".modal-cont");

addbtnSelector.addEventListener("click",function(){
    if(modalSelector.style.display=='flex')
    modalSelector.style.display="none";
    else
    modalSelector.style.display="flex";


});

const allColorBox = document.querySelectorAll(".priority-color");

// Adding borders to color selected
allColorBox.forEach(function(colorBox){
    colorBox.addEventListener("click",function(){
        allColorBox.forEach(function(remCo){
            remCo.classList.remove("active");

        });
        colorBox.classList.add("active");
    });
});
