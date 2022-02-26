var myNav = document.getElementById('header');
var logo= document.querySelector(".logo-img");
var mobileToggler=document.querySelector('.mobile-menu-toggler');
var navBar=document.querySelector('.nav-bar');
var overlay=document.querySelector(".overlay");
var mobileClose=document.querySelector(".mobile-close");
var body=document.getElementsByTagName('body')[0];
let links=document.querySelectorAll(".nav-link");


window.onscroll = function () { 

    "use strict";

    if (window.scrollY >= 700 && window.innerWidth >700 ) {
        myNav.classList.add("headerScroll");
        myNav.classList.remove("headerTop");
    } 
    else {
        myNav.classList.add("headerTop");
        myNav.classList.remove("headerScroll");
    }
if (window.scrollY > 100 && window.scrollY <= 700){
  myNav.classList.add("moveHeader");
}
  else{
  myNav.classList.remove("moveHeader");

  }

};

mobileToggler.addEventListener('click', addMobileMenu);
function addMobileMenu(){
overlay.classList.add("overlayOn");
navBar.classList.add("moveMobileNav");
body.classList.add("hideScrollBar");
myNav.classList.remove("headerScroll");
addMenuLink();

}


mobileClose.addEventListener("click", closeMobileMenu);
function closeMobileMenu(){
overlay.classList.remove("overlayOn");
navBar.classList.remove("moveMobileNav");
body.classList.remove("hideScrollBar");

removeMenuLink();
}


function addMenuLink(){

}
function removeMenuLink(){

}
