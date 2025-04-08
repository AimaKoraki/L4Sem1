
// Hamburger menu script
// This script is responsible for handling the hamburger menu functionality. It toggles the visibility of the menu when the hamburger button is clicked.
const btnHambuger = document.getElementById("hamButton"); 
btnHambuger.addEventListener("click", hambuger);


// Function to toggle the hamburger menu
// This function checks the current class of the menu and toggles it between "header__ul" and "header__ul responsive". It also handles dropdown menus.
function hambuger() { 
  var x = document.getElementById("header__J"); 
  if (x.className === "header__ul") 
    { x.className += " responsive";    
     } else { 
      x.className = "header__ul";     
    } 
    var dropdowns = document.getElementsByClassName("dropdown-content"); 
    for (var i = 0; i < dropdowns.length; i++) { var openDropdown = dropdowns[i];
       if (openDropdown.classList.contains('responsive')) { openDropdown.classList.remove('responsive'); } 
       else { openDropdown.classList.add('responsive'); } 
      }
     }
