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
            <button class="boton-mas" onclick="botonmas(${key})" id="botonsumar">+</button> 
            <p id="${key}" class="numero">${value[2]}</p>
            <button class="boton-menos" onclick="botonmenos(${key})" id="botonrestar">-</button>
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

  document.getElementById(`${key}subtotal`).innerText = subTotalConPuntos;

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

    document.getElementById(`${key}subtotal`).innerText = subTotalConPuntos;

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

function actualizarTotal() {
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