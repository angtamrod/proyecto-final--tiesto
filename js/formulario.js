//1. declaramos variables

//Constantes para el botón de scroll hacia arriba
const botonScroll = document.querySelector(".scroll");
const header = document.querySelector(".header");

//Constantes para hacer que el menú aparezca y desaparezca
const menu = document.querySelector(".header__icon");
const nav = document.querySelector(".nav");
const headerPrincipal = document.querySelector(".header__principal");

//Constantes para seleccionar el formulario
const formulario = document.querySelector(".pago__form");

//2. Ejecutamos funciones

//Función explicada en carrito.js
window.addEventListener("scroll", () => {
  const posicionHeader = header.offsetHeight;
  if(window.scrollY > posicionHeader){
      botonScroll.style.display = "block";
  }else{
      botonScroll.style.display = "none";
  }
});

//Función explicada en carrito.js
botonScroll.addEventListener("click", () => {
  window.scrollTo({
      top:0,
      behavior: "smooth",
  })
});

//Función explicada en carrito.js
menu.addEventListener("click", () => {
  if(nav.style.display === "none"){
      nav.style.display = "block"
  }else{
      nav.style.display = "none";
      headerPrincipal.style.height = "100%";
  }
});

/* 3. Esta función maneja el evento de de hacer submit en un formulario, y evita con el event.preventDefault que el formulario se envíe y la página se recargue
finalmente con el window.location.href nos redirige a al documento confirmación.html para que nos redirija a la confirmación de pago
*/

formulario.addEventListener("submit", (event) => {
    event.preventDefault(); 
    window.location.href = "confirmacion.html";
  });