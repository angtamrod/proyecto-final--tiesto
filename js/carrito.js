//1. Declaramos variables

//Constantes para el botón de scroll hacia arriba
const botonScroll = document.querySelector(".scroll");
const header = document.querySelector(".header");

//Constantes para hacer que el menú aparezca y desaparezca
const menu = document.querySelector(".header__icon");
const nav = document.querySelector(".nav");
const headerPrincipal = document.querySelector(".header__principal");
//Constantes para la funcionalidad del carrito
const carritoContenedor = document.querySelector(".carrito__div");
const carritoTotal = document.querySelector(".carrito__total");
const botonVaciar = document.querySelector(".carrito__vaciar");
const botonPago = document.querySelector(".carrito__finalizar");

//Variable para recoger datos del local storage el cual nos puede devolver algo o un array vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//2. Construimos nuestras funciones
 /* Módulo para las funcionalidades del carrito

 Desconocía la funcionalidad del localStorage y por eso consulté a la IA

 Esta primera función actualiza lo que hemos ido añadiendo al carrito desde otros documentos html, de nuestra página y lo hace a través de la variable carrito que hemos declarado arriba:
 - La cual recoge los datos del localStrage, y como vienen en formato JSON, lo convierte en objeto JS
 - Primero seleccionammos el HTML de carritoContenedor y lo hacemos un string vacío
 - Después creamos la variable total y la ponemos en 0
 - Hacemos un forEach para recorrer cada elemento resultante de lo que hemos recibido del localStorage y almacenado en la variable carrito, 
 Primero sumará el valor de .item.price que es el precio de cada producto por .item.quantity que es la cantidad de productos, al total que inicialmente hemos puesto en 0
 y creamos una constante llamada carritoCard, la cual creará un un div. y dentro de ese div, haciendo un .innerHTML, haremos un template string para que genere ese contenido html que vemos abajo. En ese div tendremos 4 elementos: 
    1. Una imagen a la cual le asignaremos en el src la propiedad img del objeto carrito.
    2. Un span que contenga la propiedad name del objeto carrito (que hará referencia la imagen del producto)
    3. Un span que contenga la propiedad price del objeto carrito (que hará referencia la precio del producto)
    4. Un span que contenga la propiedad quantity del objeto carrito (que hará referencia a la cantidad de productos)

- Finalmente haremos con .appendchild que carritoCard sea hijo de carritoContenedor
 
 */
function actualizarCarrito() {
    carritoContenedor.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        total += item.price * item.quantity;
        const carritoCard = document.createElement("div");
        carritoCard.innerHTML = `
            <div class="carrito__producto">
                <img class="carrito__photo" src="${item.img}" alt="foto producto">
                <span class="carrito__caja">${item.name} </span>
                <span class="carrito__caja">${item.price}€</span>
                <span class="carrito__caja">${item.quantity}x</span>
            </div>
        `;
        carritoContenedor.appendChild(carritoCard);
    });

    carritoTotal.textContent = total.toFixed(2) + "€";
}

//Esta funcion crea un array carrito vacío, y después sobreescribe la información almacenada en el LocalStorage. Finalmente vuelve a invocar la función actualizar carrito para que se muestre en pantalla el carrito vacío 
function vaciarCarrito() {
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

//3. Ejecutamos nuestras funciones

/* addEventListeners para módulo SCROLL

Este tipo de términos los desconocía por ello he recurrido a la IA para ayudarme a inplantar esta funcionalidad

Este addEventListener sirve para reconocer cuando deja de verse el header para mostrar en su lugar un botón que invocará el evento scroll para que una vez hayamos bajado lo suficiente como para poder dejar de visualizar el .header nos muestre un botón al cuál despué le daremos otra funcionalidad. En este caso he seleccionado la posición del header(.posicionHeader) .offsetHeight (para indicar cuando el header se ha dejado de mostrar) esto compara la posición del header (.posicionHeader) con el scroll y de la ventana (window.scrollY), si este es mayor que la posicionHeader, el display del (.botonScroll) cambiará a block para que sea visible
*/

window.addEventListener("scroll", () => {
    const posicionHeader = header.offsetHeight;
    if(window.scrollY > posicionHeader){
        botonScroll.style.display = "block";
    }else{
        botonScroll.style.display = "none";
    }
});
//Este addEventListener hace que cuando pulsemos el botón de scroll redirija al usuario a la parte de arriba del todo de la páfina donde se muestra el header
botonScroll.addEventListener("click", () => {
    window.scrollTo({
        top:0,
        behavior: "smooth",
    })
});

//2. addEventListener para el módulo de menú
//Este addEventListener hace que cuando pulsemos el botón menú que en este caso es un icono nos cambie el display de nuestro (.nav) el cuál cambiará cuando pulsemos en la imagen de las tres rayitas. Este código nos indica que al hacer click, si el display está en none lo pondrá en block, y que por el contrario si está en block al hacer click, lo ponenmos en block, y tambíen que el tamaño del headerPrincipal, aumentará hasta ocupar todo el espacio del .header, ya que si no quedaría un espacio en blanco que no tendría sentido estético
menu.addEventListener("click", () => {
    if(nav.style.display === "none"){
        nav.style.display = "block"
    }else{
        nav.style.display = "none";
        headerPrincipal.style.height = "100%";
    }
});

//3, Este addEventListener hace que cuando hagamos click al botón seleccionado como botonPago nos redirija a pago.html
botonPago.addEventListener("click", () => {
    window.location.href = "pago.html";
});

//4, Este addEventListener ejecuta la función vaciarCarrito(antes explicada) al hacer click en el botón seleccionado como 
botonVaciar.addEventListener('click', vaciarCarrito);
//5. Esta es una llamada a la función actualizar carrito para que mueste en pantalla el resultado
actualizarCarrito();
