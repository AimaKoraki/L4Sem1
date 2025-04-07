const btnHambuger = document.getElementById("hamButton"); 
btnHambuger.addEventListener("click", hambuger);

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
