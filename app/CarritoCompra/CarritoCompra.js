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

let cantidad = 1;
let precio = parseInt(document.getElementById("precio").value);

function botonmas(){
   cantidad= cantidad + 1;

   document.querySelector("#cantidad").innerHTML= cantidad
   if( cantidad < 1){
    cantidad= cantidad + 0;

    document.querySelector("#cantidad").innerHTML= 1
   }

   document.querySelector("#subtotal").innerHTML = precio * cantidad + "€"
}

function botonmenos(){
    if( cantidad < 1){
        cantidad = cantidad -0;
        document.querySelector("#cantidad").innerHTML= 1
    }else
    cantidad = cantidad -1;

    document.querySelector("#cantidad").innerHTML= cantidad
    document.querySelector("#subtotal").innerHTML = precio * cantidad + "€"

  
}

//metiendo datitos al carrito

async function CogerDatos(){
  let res = await fetch(urlCasa), 
    json = await res.json();
    
    const bodyTable = document.getElementById("tbody")

    for (let i = 0; i < sessionStorage.length; i++) { // Recorrer todas las claves en el Session Storage
      const key = sessionStorage.key(i); // Obtener la clave actual
      const value = JSON.parse(sessionStorage.getItem(key)); // Obtener el valor correspondiente a la clave 
      
      const tr = document.createElement("tr");
      tr.innerHTML = 
      `<td><img src="${json.casas[key].imagenes[0]}"></td>
      <td>${json.casas[key].nombre}</td>
      <td>
        <div class="contador">
            <button class="boton-mas" onclick="botonmas(${key})" id="botonsumar">+</button> <!--Para que te obtenga del producto que tengo, le tengo que meter en los parámetros la id del producto-->
            <p id="cantidad" class="numero" min="1">${value[2]}</p>
            <button class="boton-menos" onclick="botonmenos(${key})" id="botonrestar">-</button>
        </div>
      </td>
        <td >
        <input class="inputprecio" id="precio" value="${json.casas[key].precio}" readonly>
        </td>
      <td id="subtotal"></td>`;
      bodyTable.appendChild(tr);
    }
    if(sessionStorage.length == 0){
      const tr = document.createElement("tr");
      tr.innerHTML = 
      `<td colspan="5" id="sinProductos" >NO HAY PRODUCTOS EN LA CESTA</td>`;
      bodyTable.appendChild(tr);
    }

}
