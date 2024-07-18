
// 1. DECLARAMOS VARIABLES

//Constantes para el botón de scroll hacia arriba
const botonScroll = document.querySelector(".scroll");
const header = document.querySelector(".header");

//Constantes para hacer que el menú aparezca y desaparezca
const menu = document.querySelector(".header__icon");
const nav = document.querySelector(".nav");
const headerPrincipal = document.querySelector(".header__principal");

//Constantes para hacer que las imágenes de inicio se cambien solas
const imagenes = [
    "url(./imgs/photos/bg_imgs/foto_jardin.webp)",
    "url(./imgs/photos/bg_imgs/foto_invernadero.webp)",
    "url(./imgs/photos/bg_imgs/foto_regaderas.webp)",
    "url(./imgs/photos/bg_imgs/fondo_carrito.webp)"
];
const cajaPresentacion = document.querySelector(".presentacion");


// Constante para las tarjetas de los productos destacados
const plantas = document.querySelectorAll(".tarjeta");

// Constantes para el slider de comentarios
const contenedorComentarios = document.querySelector(".comentarios__contenedor");
const listaComentarios = document.querySelectorAll(".comentarios__fotos");
const botonAnterior = document.querySelector("#botonAnterior");
const botonSiguiente = document.querySelector("#botonSiguiente");
const totalComentarios = listaComentarios.length;    

//Variables que pone en 0 el indice de la lista de fotos
let fondosIndex = 0;

//Variable que pone en 0 el índice de la lista de comentarios
let comentariosIndex = 0;



// 2. DECLARAMOS FUNCIONES


/*Esta función hace que cambie el fondo de cajaPresentación segun la lista de imágenes de creada arriba  y en concreto según elemento indicado por el índice el fotosIndex hará que aumente el índice en 1 y que cuando acabe vuelva al 0.
    - Cambiará la imagen de fondor
    - Configurará el tamaño de la imagen de fondo
    - Configurará la posición de la imagen de fonfo
    - Y ejecutará una transición
*/
function cambiarFondo(){
    cajaPresentacion.style.backgroundImage = imagenes[fondosIndex];
    cajaPresentacion.style.backgroundSize = "cover";
    cajaPresentacion.style.backgroundPosition = "center";
    cajaPresentacion.style.transition = "background-image 1.5s ease-in-out"; 
    fondosIndex = (fondosIndex + 1) % imagenes.length; 
}

/*  Estas funciones son para el SLIDER
    la función imagenSiguiente hace que:
    -  cuando ejecutemos esta función hace que según el indice de la listaComentarios de cambie el display de ese elemento en none
    - incrementa el comentariosIndex
    - Dice que si el indice de comentarios es mayor o igual que el total de comentarios el el indicee volverá a cero
    - La ultima linea hace que haga display block (hacerlo visible) los siguientes elementos de la lista comentarios según el index resultante

*/
    function imagenSiguiente() {
        listaComentarios[comentariosIndex].style.display = "none";
        comentariosIndex++;
        if (comentariosIndex >= totalComentarios) {
            comentariosIndex = 0;
        }
        listaComentarios[comentariosIndex].style.display = "block";
    }
    
    // La función imagenAnterior hace lo mismo que la anterior pero a la inversa reduce el index de la lista de comentarios(listaComentarios) , y especifica que si es menor que 0 vuelva la final
    function imagenAnterior() {
        listaComentarios[comentariosIndex].style.display = "none";
        comentariosIndex--;
        if (comentariosIndex < 0) {
            comentariosIndex = totalComentarios - 1;
        }
        listaComentarios[comentariosIndex].style.display = "block";
    }
    
    /**Hace que se actualice el estado del slider haciendo un forEach para la lista de imágenes (listaComentarios) cual se establecen dos parametros
     * param(img,index)
     * si el index de esta lista decomentarios es igual que el imgIndex extablecido con anterioridad la img estará en display:block
     * si por el contrario no la img estará en display none
     *  */ 

    function actualizarslider() {
        listaComentarios.forEach((img, index) => {
            img.style.display = index === fondosIndex ? "block" : "none";
        });
    }



    //3. EJECUTAMOS FUNCIONES


    /* addEventListeners para módulo SCROLL

    Este tipo de términos los desconocía por ello he recurrido a la IA para ayudarme a inplantar esta funcionalidad

    Esta funcion o addEventListener sirve para reconocer cuando deja de verse el header para mostrar en su lugar un botón que invocará el evento scroll para que una vez hayamos bajado lo suficiente como para poder dejar de visualizar el .header nos muestre un botón al cuál despué le daremos otra funcionalidad. En este caso he seleccionado la posición del header(.posicionHeader) .offsetHeight (para indicar cuando el header se ha dejado de mostrar) esto compara la posición del header (.posicionHeader) con el scroll y de la ventana (window.scrollY), si este es mayor que la posicionHeader, el display del (.botonScroll) cambiará a block para que sea visible
*/


    
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

    /*2. addEventListener para el módulo de menú
Este addEventListener hace que cuando pulsemos el botón menú que en este caso es un icono nos cambie el display de nuestro (.nav) el cuál cambiará cuando pulsemos en la imagen de las tres rayitas. Este código nos indica que al hacer click, si el display está en none lo pondrá en block, y que por el contrario si está en block al hacer click, lo ponenmos en block, y tambíen que el tamaño del headerPrincipal, aumentará hasta ocupar todo el espacio del .header, ya que si no quedaría un espacio en blanco que no tendría sentido estético*/
    menu.addEventListener("click", () => {
        if(nav.style.display === "none"){
            nav.style.display = "block"
        }else{
            nav.style.display = "none";
            headerPrincipal.style.height = "100%";
        }
    });

    //Función explicada en (catalogo.js)
    plantas.forEach(planta => {
    planta.querySelector('.tarjeta__button').addEventListener('click', () => {
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

    //Ejecutamos cambiar fondo para que se ejecute cada 4 segundos
    setInterval(cambiarFondo, 4000);
    cambiarFondo();

    //Asignamos las funciones imagenSiguiente e inamgenAnterior a dos botones antes seleccionados
    botonSiguiente.addEventListener("click", imagenSiguiente);
    botonAnterior.addEventListener("click", imagenAnterior);
    
    //Ejecutamos actualizar slider
    actualizarslider();

    