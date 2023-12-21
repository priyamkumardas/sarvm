var scrollToTopBtn = document.getElementById("scrollToTopBtn");
var rootElement = document.documentElement;

function scrollToTop() {
  // Scroll to top logic
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

var slide_1 = document.getElementById("slide-1");
var slide_2 = document.getElementById("slide-2");
var slide_3 = document.getElementById("slide-3");
var for_traders_btn = document.getElementById("click-for-traders");
var for_consumers_btn = document.getElementById("click-for-consumers");
var for_producers_btn = document.getElementById("click-for-producers");

var homeEl = document.getElementById("homeNav");
var aboutUs = document.getElementById("aboutNav1");
var contact = document.getElementById("contactNav");
var invest = document.getElementById("investNav");
var pricing = document.getElementById("pricingNav");
var ss = document.getElementById("aboutUsEll");
var k11 = document.getElementById("k1");
homeEl.addEventListener("click", function () {
  homeEl.classList.add("navBarclick");
});

for_traders_btn.addEventListener("click", function () {
  slide_2.classList.add("active");
  slide_3.classList.remove("active");
  slide_1.classList.remove("active");
});

for_consumers_btn.addEventListener("click", function () {
  slide_2.classList.remove("active");
  slide_3.classList.add("active");
  slide_1.classList.remove("active");
});
for_producers_btn.addEventListener("click", function () {
  slide_2.classList.remove("active");
  slide_3.classList.remove("active");
  slide_1.classList.add("active");
});
for_traders_btn.addEventListener("click", function () {
  slide_22.classList.add("active");
  slide_33.classList.remove("active");
  slide_11.classList.remove("active");
});

for_consumers_btn.addEventListener("click", function () {
  slide_22.classList.remove("active");
  slide_33.classList.add("active");
  slide_11.classList.remove("active");
});
for_producers_btn.addEventListener("click", function () {
  slide_22.classList.remove("active");
  slide_33.classList.remove("active");
  slide_11.classList.add("active");
});

function changebtn() {
  document.getElementById("consumer-active").style.display = "none";
  document.getElementById("retailer-active").style.display = "inline";
}
function changebtn2() {
  document.getElementById("consumer-active").style.display = "inline";
  document.getElementById("retailer-active").style.display = "none";
}
function changebtn3() {
  document.getElementById("consumer-active-2").style.display = "none";
  document.getElementById("retailer-active-2").style.display = "inline";
}
function changebtn4() {
  document.getElementById("consumer-active-2").style.display = "inline";
  document.getElementById("retailer-active-2").style.display = "none";
}
function changetogglebtn1() {
  document.getElementById("close").style.display = "block";
  document.getElementById("menu").style.display = "none";
}
function changetogglebtn2() {
  document.getElementById("menu").style.display = "block";
  document.getElementById("close").style.display = "none";
}
function myfunction(x) {
  x.classList.toggle("bi-chevron-up");
}