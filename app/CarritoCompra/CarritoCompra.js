//constante de la url de la api
const urlCasa = "https://getpantry.cloud/apiv1/pantry/464bfeaa-daae-4ecd-81c0-3a675193d25e/basket/Casas";
CogerDatos();

//Función para actualizar el número del carrito
function actualizarNumeroCarrito(numero) {
    const elementoNumero = document.getElementById('sumaTotalCarrito');
    elementoNumero.textContent = numero;
  }
  
  //Código para calcular la cantidad total guardada en el SessionStorage para poner el numero en el carrito de la compra
    
  let sumaTotal = 0; // Inicializar la variable para almacenar la suma total

  for (let i = 0; i < sessionStorage.length; i++) { // Recorrer todas las claves en el Session Storage
    const key = sessionStorage.key(i); // Obtener la clave actual
    const value = JSON.parse(sessionStorage.getItem(key)); // Obtener el valor correspondiente a la clave 
    const cantidad = value[2]; // Obtener la cantidad del valor y sumarla a la suma total
    sumaTotal += cantidad;
  }
  actualizarNumeroCarrito(sumaTotal);
  
//--------------------------------------------------------------------------------------------------------------------

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
  actualizarNumeroCarrito(sumaTotal);
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
                    /*localStorage.setItem("value", valueLocal);
                    localStorage.setItem("cantidad", sumaTotal);
                    localStorage.setItem("nombre", resultado.value); //Guardamos en el localStorage el valor introducido con la clave name*/
                  Swal
                  .fire({
                      title: "Compra realizada <br> Gracias por confiar en nosotros",
                      text: "Pronto uno de nuestros vendedores se pondrá en contacto con usted",
                      icon: 'success',
                      confirmButtonText: "Entendido",
                  })
              }
              //Sino se introduce valor/nombre
              else{
                Swal
                .fire({
                    title: "¡¡Oh se le olvidó introducir un nombre!!",
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

  //--------------------------------------------------------------------------------------------------------------------

  let numCompra=0;
  let cont=0;
  let compra;
  let numeroNombre = 0;
  let casitas = "";
  let valueJson;

function enviarDatos(nombreL){
 

    for (let i = 0; i < sessionStorage.length; i++) { // Recorrer todas las claves en el Session Storage
      key = sessionStorage.key(i); // Obtener la clave actual
      value = JSON.parse(sessionStorage.getItem(key)); // Obtener el valor correspondiente a la clave
        // console.log(key);
        // console.log(value);
        compra = { // Creo un objeto para meter todos los datos despues de golpe!!!
          id : key,
          nombre : nombreL,
          numNombre: numeroNombre,
          casa : value[0],
          precio : value[1],
          cantidad: value[2],
          total: sumaTotal,
        };
          valueJson += JSON.stringify(compra); //Los convierto en un archivo Json
        }

      console.log(valueJson); //Se ve todas las casas compradas en JSON
    
      numeroNombre++;

      for (let i = 0; i < cont; i++){
        numCompra = i;
        cont++;
      }
    
      localStorage.setItem(numeroNombre,valueJson); // Los meto al local storage con un id
      valueJson ="";
}






