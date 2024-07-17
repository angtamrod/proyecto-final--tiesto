// 1. Declaramos variables

//Constantes para el botón de scroll hacia arriba
const botonScroll = document.querySelector(".scroll");
const header = document.querySelector(".header");

//Constantes para hacer que el menú aparezca y desaparezca
const menu = document.querySelector(".header__icon");
const nav = document.querySelector(".nav");
const headerPrincipal = document.querySelector(".header__principal");

//Constantes para la funcionalidad de la confirmación de pago
const compraContenedor = document.querySelector(".confirmacion__div");
const compraTotal = document.querySelector(".confirmacion__total");
const botonVolver = document.querySelector(".confirmacion__button")

//Variable para recoger datos del local storage el cual nos puede devolver algo o un array vacío
let compra = JSON.parse(localStorage.getItem("carrito")) || [];



//2. Construimos nuestas funciones


//Aquí he reutilizado el código del carrito de compras (carrito.js)
function actualizarCompra() {
    compraContenedor.innerHTML = '';
    let total = 0;

    compra.forEach(item => {
        total += item.price * item.quantity;
        const compraCard = document.createElement("div");
        compraCard.innerHTML = `
            <div class="confirmacion__producto">
                <span class="confirmacion__span">${item.name} </span>
                <span class="confirmacion__span">${item.price}€</span>
                <span class="confirmacion__span confirmacion__span--final">${item.quantity}x</span>
            </div>
        `;
        compraContenedor.appendChild(compraCard);
    });

    compraTotal.textContent = total.toFixed(2) + "€";
}


//3. Ejecutamos el código

//Esta funcion o addEventListener sirve para reconocer cuando deja de verse el header para mostrar en su lugar un el botón scroll 
window.addEventListener("scroll", () => {
    const posicionHeader = header.offsetHeight;
    if(window.scrollY > posicionHeader){
        botonScroll.style.display = "block";
    }else{
        botonScroll.style.display = "none";
    }
});

botonScroll.addEventListener("click", () => {
    window.scrollTo({
        top:0,
        behavior: "smooth",
    })
});

menu.addEventListener("click", () => {
    if(nav.style.display === "none"){
        nav.style.display = "block"
    }else{
        nav.style.display = "none";
        headerPrincipal.style.height = "100%";
    }
});

botonVolver.addEventListener("click", () => {
    window.location.href = "index.html";
})


actualizarCompra();
