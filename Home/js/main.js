

//Get the button
var mybutton = document.getElementById("back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    // mybutton.classList.add("show")
    mybutton.style.display="block";
  } else {
    // mybutton.classList.remove("show")
    mybutton.style.display="none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

AOS.init({
  easing: 'ease-in-out-sine',
  duration:'1000'
  // easing:'linear'
});
