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

//constante de la url de la api
const urlCasa = "https://getpantry.cloud/apiv1/pantry/464bfeaa-daae-4ecd-81c0-3a675193d25e/basket/Casas";
CogerDatos();

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

let precioTotal = 0; //Para meterlo en el LocalStorage, se usa más abajo en enviarDatos()

//metiendo datitos al carrito
async function CogerDatos(){
  let res = await fetch(urlCasa), 
    json = await res.json();
    
    const bodyTable = document.getElementById("tbody")
    let sumaSubtotales = 0;

    for (let i = 0; i < sessionStorage.length; i++) { // Recorrer todas las claves en el Session Storage
      const key = sessionStorage.key(i); // Obtener la clave actual
      const value = JSON.parse(sessionStorage.getItem(key)); // Obtener el valor correspondiente a la clave 
      let subTotal = parseInt(value[2]) * parseInt((json.casas[key].precio).replace(/\./g, ""));
      let subTotalConPuntos = subTotal.toLocaleString();
      sumaSubtotales += subTotal;

      const tr = document.createElement("tr");
      // tr.id = key;
      tr.innerHTML = 
      `<td><img src="${json.casas[key].imagenes[0]}"></td>
      <td>${json.casas[key].nombre}</td>
      <td>
        <div class="contador">
          <button class="boton-menos" onclick="botonmenos(${key})" id="botonrestar">-</button> 
          <p id="${key}" class="numero">${value[2]}</p>
          <button class="boton-mas" onclick="botonmas(${key})" id="botonsumar">+</button> 
        </div>
      </td>
      <td >
        <input class="inputprecio" id="precio" value="${json.casas[key].precio}" readonly>
      </td>
      <td id="${key}subtotal" class="subtotal">${subTotalConPuntos} €</td>`;
      bodyTable.appendChild(tr);
    }

    const precioTotalElement = document.getElementById("precioTotal");
    precioTotalElement.innerText = sumaSubtotales.toLocaleString() + " €";

    precioTotal = sumaSubtotales.toLocaleString() + " €";  //Para meter el precio total en el LocalStorage, se usa más abajo en enviarDatos()

    if(sessionStorage.length == 0){
      const tr = document.createElement("tr");

      tr.innerHTML = 
      `<td colspan="5" id="sinProductos" >NO HAY PRODUCTOS EN LA CESTA</td>`;
      bodyTable.appendChild(tr);
    }
}



//  let precio = parseInt(document.getElementById("precio").value);

function botonmas(key){
  const value = JSON.parse(sessionStorage.getItem(key));
  let cantidad = value[2];
  cantidad += 1;

  document.getElementById(key).innerText = cantidad;
  
  if( cantidad < 1){
    document.getElementById(key).innerText= 1
  }

  let subTotal = parseInt(cantidad) * parseInt((value[1]).replace(/\./g, ""));
  let subTotalConPuntos = subTotal.toLocaleString();

  document.getElementById(`${key}subtotal`).innerText = subTotalConPuntos + " €";

  const datosGuardados = sessionStorage.getItem(key);
  const datos = JSON.parse(datosGuardados);
  datos[2] = cantidad;
  sessionStorage.setItem(key, JSON.stringify(datos));

  //Código para calcular la cantidad total guardada en el SessionStorage para poner el numero en el carrito de la compra
    
  let sumaTotal = 0; // Inicializar la variable para almacenar la suma total
  
  for (let i = 0; i < sessionStorage.length; i++) { // Recorrer todas las claves en el Session Storage
    const key = sessionStorage.key(i); // Obtener la clave actual
    const value = JSON.parse(sessionStorage.getItem(key)); // Obtener el valor correspondiente a la clave 
    const cantidad = value[2]; // Obtener la cantidad del valor y sumarla a la suma total
    sumaTotal += cantidad;
  }
  actualizarNumeroCarrito(sumaTotal);
  actualizarTotal();
}

  
function botonmenos(key){

  const value = JSON.parse(sessionStorage.getItem(key));
  let cantidad = value[2];
  cantidad -= 1;
  
  document.getElementById(key).innerText = cantidad;

  let element = document.getElementById(key);

  if( cantidad < 1){
    sessionStorage.removeItem(key);
    element.remove();
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "";
    CogerDatos();
  }
  else{
    let subTotal = parseInt(cantidad) * parseInt((value[1]).replace(/\./g, ""));
    let subTotalConPuntos = subTotal.toLocaleString();

    document.getElementById(`${key}subtotal`).innerText = subTotalConPuntos + " €";

    const datosGuardados = sessionStorage.getItem(key);
    const datos = JSON.parse(datosGuardados);
    datos[2] = cantidad;
    sessionStorage.setItem(key, JSON.stringify(datos));
  }
  

  //Código para calcular la cantidad total guardada en el SessionStorage para poner el numero en el carrito de la compra
  
  let sumaTotal = 0; // Inicializar la variable para almacenar la suma total

  for (let i = 0; i < sessionStorage.length; i++) { // Recorrer todas las claves en el Session Storage
    const key = sessionStorage.key(i); // Obtener la clave actual
    const value2 = JSON.parse(sessionStorage.getItem(key)); // Obtener el valor correspondiente a la clave 
    const cantidad2 = value2[2]; // Obtener la cantidad del valor y sumarla a la suma total
    sumaTotal += cantidad2;
  }
  if(sumaTotal > 0){
    actualizarNumeroCarrito(sumaTotal);
  }
  else{
    elementoNumero.style.display = "none";
    location.reload(); //Actualizar la página al darle al botón - Reiniciamos solo cuando no vaya haber más unidades y de ese modo se vea que no hay más y salga mensaje e impida seguir
  }
  actualizarTotal();
}

function actualizarTotal() { //Esta función lo que hace es actualizar el precio total para cada vez que le doy al boton mas o menos
  let sumaTotal = 0;

  // Recorrer todas las filas de la tabla
  const filas = document.querySelectorAll("#tbody tr");
  filas.forEach((fila) => {
    const subTotalElement = fila.querySelector(".subtotal");
    const subTotal = parseFloat(subTotalElement.innerText.replace(" €", "").replace(/\./g, ""));
    sumaTotal += subTotal;
  });

  // Actualizar el elemento del total
  const precioTotalElement = document.getElementById("precioTotal");
  precioTotalElement.innerText = sumaTotal.toLocaleString() + " €";
}

/*Realizar compra - POPUP */
let nombreGuardado;
function realizarCompra(){
  if(sumaTotal > 0)
  {
  Swal
  .fire({
      text: "¿Desea realizar la compra?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: "Sí, comprar",
      cancelButtonText: "Cancelar",
  })
  .then(resultado => {
    //Botón "Sí, comprar"
      if (resultado.value) { 
          //Preguntamos por el nombre
          Swal
          .fire({
              title: "Introduzca su nombre",
              input: "text",
              showCancelButton: true,
              confirmButtonText: "Guardar",
              cancelButtonText: "Cancelar",
          })
          //Cogemos el resultado de guardar nombre 
          .then(resultado => {
            //Si se introduce valor/nombre
            if (resultado.value) {
              nombreGuardado = resultado.value; //guardamos el nombre
                    enviarDatos(nombreGuardado);
                    Swal
                    .fire({
                      title: "Compra realizada <br> Gracias por confiar en nosotros",
                      text: "Pronto uno de nuestros vendedores se pondrá en contacto con usted",
                      icon: 'success',
                      //Recargamos para borrar de la cesta
                      confirmButtonText: '<a onclick="location.reload()">Entendido</a>',
                    })
                  }
                  //Sino se introduce valor/nombre
                  else{
                    Swal
                    .fire({
                      title: "<p style='color: red;'>¡¡Oh se le olvidó introducir un nombre!!</p>", //Aplicando estilo dentro sweepalert2
                      text: "Sino se introduce nombre no podremos realizar la compra",
                      icon: 'error',
                      confirmButtonText: "Entendido",
                    })
                  }
                });
                //Botón "Cancelar"
              } else {  
        Swal
        .fire({
          title: "¡¡Oh lástima!! <br> Esperamos verle pronto",
          text: "Si necesita asesoramiento, nuestros experto estarán encantados en ayudarle",
          icon: 'info',
          confirmButtonText: "Entendido",
        })
      }
  });
}
else{
  Swal
  .fire({
    title: "¡No has introducido ninguna compra!",
    text: "Si necesita asesoramiento, nuestros experto estarán encantados en ayudarle",
    icon: 'error',
    confirmButtonText: "Entendido",
  })
}

}

//--------------------------------------------------------------------------------------------------------------------
let compra = "";
let idNombre = 0;
let valueJson = "";
let compraTotal = "";
let array = [];

let idCompras = parseInt(localStorage.getItem("idCompras")) || 0; // Tenemos que poner esto por que necesitamos guardar el Comprasero por el que iba la id en
// nuestro localStorage y si no hay ninguno coge el 0 pa que no de fallo.

function crearID(){//Esto me crea el id de la propiedad id de mensaje ABAJO!!!
    idCompras++;
    localStorage.setItem("idCompras",idCompras); //Me sube el incremento de id
    return idCompras;
}


function enviarDatos(nombreL){ //nombre del popup
  
    for (let i = 0; i < sessionStorage.length; i++) { // Recorrer todas las claves en el Session Storage
      key = sessionStorage.key(i); // Obtener la clave actual
      value = JSON.parse(sessionStorage.getItem(key)); // Obtener el valor correspondiente a la clave
      
        // console.log(key);
        // console.log(value);
        compra = { // Creo un objeto para meter todos los datos 
          id : key,
          casa : value[0], //Cogemos cada parte del archivo que nos da el sessionStorage
          precio : value[1],
          cantidad: value[2],
        };
        valueJson += JSON.stringify(compra)+ ","; //Los convierto en un archivo Json, SE AÑADE , AL FINAL PARA QUE LOS JSON SE SEPARE CORRECTAMENTE MENOS EL ÚLTIMO QUE AÑADIMOS
      }
      compraTotal = { //Hacemos otro json para no repetir en cada artículo y hacerlo como artículo diferente con ese dato
        nombre : nombreL, //Cogemos el nombre del popup
        idNombre: crearID(),
        totalCompra: precioTotal, //suma total -> lo cogemos de la funcion cogerDatos() que lo metemos en la variable
      };
      valueJson += JSON.stringify(compraTotal); 

      
      array="["+valueJson+"]"; //Para convertir en array todo el conjunto
      idNombre++; //Sumamos la id para separar las personas
      localStorage.setItem("Compra"+compraTotal.idNombre,array); // Los meto al local storage con un id de la persona
      //valueJson ="";
      
      //Borramos del session después de meterlo en el local
      sessionStorage.clear();

    }






