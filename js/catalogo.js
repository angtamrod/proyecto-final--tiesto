//1. Declaramos variables

//Constantes para el botón de scroll hacia arriba
const botonScroll = document.querySelector(".scroll");
const header = document.querySelector(".header");

//Constantes para hacer que el menú aparezca y desaparezca
const menu = document.querySelector(".header__icon");
const nav = document.querySelector(".nav");
const headerPrincipal = document.querySelector(".header__principal");

//Constantes para la funcionalidad del catálogo
const plantas = document.querySelectorAll(".card");

//2. Declaramos funciones y en este caso ejecutamos dichas funciones

/* 1 addEventListeners para módulo SCROLL

Este tipo de términos los desconocía por ello he recurrido a la IA para ayudarme a inplantar esta funcionalidad
Esta funcion o addEventListener sirve para reconocer cuando deja de verse el header para mostrar en su lugar un botón que invocará el evento scroll para que una vez hayamos bajado lo suficiente como para poder dejar de visualizar el .header nos muestre un botón al cuál despué le daremos otra funcionalidad. En este caso he seleccionado la posición del header(.posicionHeader) .offsetHeight (para indicar cuando el header se ha dejado de mostrar) esto compara la posición del header (.posicionHeader) con el scroll y de la ventana (window.scrollY), si este es mayor que la posicionHeader, el display del (.botonScroll) cambiará a block para que sea visible
*/
window.addEventListener(`scroll`, () => {
    const posicionHeader = header.offsetHeight;
    if(window.scrollY > posicionHeader){
        botonScroll.style.display = "block";
    }else{
        botonScroll.style.display = "none";
    }
});

botonScroll.addEventListener(`click`, () => {
    window.scrollTo({
        top:0,
        behavior: "smooth",
    })
});

/*2. addEventListener para el módulo de menú
Este addEventListener hace que cuando pulsemos el botón menú que en este caso es un icono nos cambie el display de nuestro (.nav) el cuál cambiará cuando pulsemos en la imagen de las tres rayitas. Este código nos indica que al hacer click, si el display está en none lo pondrá en block, y que por el contrario si está en block al hacer click, lo ponenmos en block, y tambíen que el tamaño del headerPrincipal, aumentará hasta ocupar todo el espacio del .header, ya que si no quedaría un espacio en blanco que no tendría sentido estético*/

menu.addEventListener(`click`, () => {
    if(nav.style.display === "none"){
        nav.style.display = "block"
    }else{
        nav.style.display = "none";
        headerPrincipal.style.height = "100%";
    }
});

/* 1. FOREACH PARA AÑADIR PRODUCTOS AL CARRITO
 Al haber hecho un querySelectorAll hemos generado una lista y para poder ejecutar una función por cada item de esa lista hemos hecho un forEach. Donde estámos asígnando que dentro de ese item planta, seleccionemos el botón (.card__button) y le hagamos un addEventListener de click.

 Cuando hagamos click guardará los atributos guardados en data-id/data-name/data-price/data-img-
 Generará una variable carrito, que leerá lo que está almacenado en el localStorage, y lo convertirá en objeto o nos devolverá un array vacío

 Después haremos una constante llamada plantasIndex, que dirá que el id del item planta será el mismo que el id
 Con esta constantes dice que si el indice es mayor o igual a 0 significa que este item ya está en el carrito y por tanto incrementará en 1 la cantidad de ese item

 si por el contrario no lo está añadirá al carrito los un nuevo array con el id/name/price/img/quantity:1 y la cantidad 1 porque no estaba anteriormente

 Al final almacenará en formato JSON en el localStorage la información obtenida de este click y realizará un alert que te avisará de que ha sido añadido al carrito
*/

plantas.forEach(planta => {
        planta.querySelector('.card__button').addEventListener('click', () => {
            const id = planta.getAttribute('data-id');
            const name = planta.getAttribute('data-name');
            const price = parseFloat(planta.getAttribute('data-price'));
            const img = planta.getAttribute('data-img');

            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

            const plantasIndex = carrito.findIndex(planta => planta.id === id);

            if (plantasIndex >= 0) {
                carrito[plantasIndex].quantity += 1;
            } else {
                carrito.push({ id, name, price, img, quantity: 1 });
            }

            localStorage.setItem('carrito', JSON.stringify(carrito));
            alert('Producto añadido al carrito');
        });
    });