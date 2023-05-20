//Función para actualizar el número del carrito
function actualizarNumeroCarrito(numero) {
  const elementoNumero = document.getElementById('sumaTotalCarrito');
  elementoNumero.textContent = numero;
}

//Código para calcular la cantidad total guardada en el SessionStorage para poner el numero en el carrito de la compra
const elementoNumero = document.getElementById('sumaTotalCarrito');  
let sumaTotal = 0; // Inicializar la variable para almacenar la suma total

for (let i = 0; i < sessionStorage.length; i++) { // Recorrer todas las claves en el Session Storage
  const key = sessionStorage.key(i); // Obtener la clave actual
  const value = JSON.parse(sessionStorage.getItem(key)); // Obtener el valor correspondiente a la clave 
  const cantidad = value[2]; // Obtener la cantidad del valor y sumarla a la suma total
  sumaTotal += cantidad;
}

if(sumaTotal > 0){
  actualizarNumeroCarrito(sumaTotal);
}
else{
  elementoNumero.style.display = "none";
}
  
  //--------------------------------------------------------------------------------------------------------------------

const urlCasa = "https://getpantry.cloud/apiv1/pantry/464bfeaa-daae-4ecd-81c0-3a675193d25e/basket/Casas";

let nombre = document.getElementById("nombre"); 
const container = document.querySelector(".gridCatalogo");
const casaNombre = [];
async function cogerCasas(){
    let res = await fetch(urlCasa), 
    json = await res.json();
    for(i = 1; i < 8; i++) //Recorremos 8 porque son los artículos que tenemos actualmente
    {
        // console.log(json.casas[i]);
        const casa = json.casas[i]; //Metemos en una variable para simplificar la escritura
        //Crea un botón
        const card = document.createElement("button");
        //Ponemos efectos al botón que lo coge del Catalogo.css
         card.classList.add("boton");
         //Dibujamos cada casa con sus efectos css que se coge del Catalogo.css
        card.innerHTML = `
            <div id="fotos" class="contenedorFotosYTexto"> 
                <img src="${casa.imagenes[0]}" alt="fotoCasa" class="estiloFotos">
                <div class="texto">
                    <span class="name">${casa.nombre}</span>
                    <p>${casa.precio}</p>
                </div>
            </div>`;
        // Manda id a la otra web
        card.addEventListener('click', () => { window.location.href = `../Producto/Producto.html?id=${casa.id}`; });
        container.appendChild(card);
        casaNombre[i]=casa.nombre.toLowerCase();//Aprovechamos los datos cogidos de la api y lo pasamos el nombre a minusculas todo PARA EL BUSCADOR
        

    }
}
cogerCasas();

 function buscar(){ // Metodo de buscar

    var letrasIntroducidas = document.getElementById('buscador').value.toLowerCase(); //guardamos del input las letras en minusculas
    console.log(letrasIntroducidas);
    const item = document.querySelectorAll(".boton"); //coge los elementos del html que tienen esa clase
    for(let i = 1; i <= item.length; i++) // bucle que recorre los productos 
    {
         if(casaNombre[i].includes(letrasIntroducidas)){ //este if mira si el array de nombres hecho arriba incluye o contiene las letras que voy metiendo
                item[i-1].classList.remove("loBuscado"); /*lo del menos 1 es por que las casas su id empieza desde 1 no desde cero, entonces el bucle
                                                         empieza en 1 pues para acceder al primero es 1-1 =0 POR QUE ITEM ES UN ARRAY!! y el remove elimine 
                                                         lo de que se esconda*/
                
         }
         else{
            item[i-1].classList.add("loBuscado");/*lo del menos 1 es por que las casas su id empieza desde 1 no desde cero, entonces el bucle
            empieza en 1 pues para acceder al primero es 1-1 =0 POR QUE ITEM ES UN ARRAY!! y aqui el add hace que se agregue el esconder de la clase "loBuscado"*/
         }
       
    }
    
    
}

//Flecha ir arriba----------------------------------------------------
  window.onscroll = function() {
    const myBtn = document.getElementById("botonFlecha");
    myBtn.style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? "block" : "none";
  };
  
  function topFunction() {
    scrollToTop(document.documentElement, 0, 500); // Desplaza hasta arriba en 500ms (medio segundo)
  }
  
  function scrollToTop(element, to, duration) {
    if (duration > 0) {
      const difference = to - element.scrollTop;
      const perTick = difference / duration * 10;
  
      requestAnimationFrame(function() {
        element.scrollTop = element.scrollTop + perTick;
  
        if (element.scrollTop !== to) {
          scrollToTop(element, to, duration - 10);
        }
      });
    }
  }