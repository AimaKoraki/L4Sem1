function myFunction() {
    var x = document.getElementById("header__J");
    if (x.className === "header__ul") {
      x.className += " responsive";
    } else {
      x.className = "header__ul";
    }
  }
