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




/* que la cantidad de los botones sea igual a la cantidad final*/
const enlace = window.location.search;
const urlparametros = new URLSearchParams(enlace);
const id = urlparametros.get("id");

const elementoNombre = document.getElementById("nombre");
const contenidoNombre = elementoNombre.innerHTML;

const elementoPrecio = document.getElementById("precio");
const contenidoPrecio = elementoPrecio.innerHTML;

const elementoCantidad = document.getElementById("cantidad");
let cantidadd = 1;

// Verificar si hay un valor almacenado en el sessionStorage
const datosGuardados = sessionStorage.getItem(id);
if (datosGuardados) {
  const datos = JSON.parse(datosGuardados);
  cantidadd = datos[2];
  elementoCantidad.innerHTML = cantidadd;
}

// // Manejar el evento beforeunload para guardar los datos antes de abandonar la página
// window.addEventListener("beforeunload", function() {
//   const datos = [contenidoNombre, contenidoPrecio, cantidadd];
//   sessionStorage.setItem(id, JSON.stringify(datos));
// });

// Restablecer la cantidad a 1 al volver a la página
document.addEventListener("DOMContentLoaded", function() {
  elementoCantidad.innerHTML = 1;
});

function botonmas() {
  let cantidadd2 = parseInt(elementoCantidad.innerHTML);
  cantidadd2 += 1;
  elementoCantidad.innerHTML = cantidadd2;
}

function botonmenos() {
  let cantidadd2 = parseInt(elementoCantidad.innerHTML);
  if (cantidadd2 > 1) {
    cantidadd2 -= 1;
    elementoCantidad.innerHTML = cantidadd2;
  }
}

function realizarcompra() {
  window.location.href = "../CarritoCompra/CarritoCompra.html";
}

function añadirCarrito() {
  var contenidoCantidad = parseInt(elementoCantidad.innerText);

  if (sessionStorage.getItem(id) == null) {
    const datos = [contenidoNombre, contenidoPrecio, contenidoCantidad];
    sessionStorage.setItem(id, JSON.stringify(datos));
  } else {
    const datosGuardados = sessionStorage.getItem(id);
    const datos = JSON.parse(datosGuardados);
    const cantidadAnterior = datos[2];
    const cantidadFinal = cantidadAnterior + contenidoCantidad;
    datos[2] = cantidadFinal;
    sessionStorage.setItem(id, JSON.stringify(datos));
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

  // Aquí puedes agregar cualquier otra lógica relacionada con añadir al carrito
}

//Flecha ir arriba
window.onscroll = function() {
  const myBtn = document.getElementById("botonFlecha");
  myBtn.style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? "block" : "none"; };
  
function topFunction() {
  document.documentElement.scrollTop = 0; }
  
/*const enlace = window.location.search;
const urlparametros = new URLSearchParams(enlace);
const id = urlparametros.get("id");

const elementoNombre = document.getElementById("nombre");
const contenidoNombre = elementoNombre.innerHTML;

const elementoPrecio = document.getElementById("precio");
const contenidoPrecio = elementoPrecio.innerHTML;

const elementoCantidad = document.getElementById("cantidad");
let cantidadd = 1;

// Verificar si hay un valor almacenado en el sessionStorage
const datosGuardados = sessionStorage.getItem(id);
if (datosGuardados) {
  const datos = JSON.parse(datosGuardados);
  cantidadd = datos[2];
  elementoCantidad.innerHTML = cantidadd;
}

// Manejar el evento beforeunload para guardar los datos antes de abandonar la página
window.addEventListener("beforeunload", function() {
  const datos = [contenidoNombre, contenidoPrecio, cantidadd];
  sessionStorage.setItem(id, JSON.stringify(datos));
});

// Restablecer la cantidad a 1 al volver a la página
document.addEventListener("DOMContentLoaded", function() {
  elementoCantidad.innerHTML = 1;
});

function botonmas() {
  cantidadd += 1;
  elementoCantidad.innerHTML = cantidadd;
}

function botonmenos() {
  if (cantidadd > 1) {
    cantidadd -= 1;
    elementoCantidad.innerHTML = cantidadd;
  }
}

function realizarcompra() {
  window.location.href = "file:///C:/Users/Albertsack/Documents/GitHub/Ocean-Paradise/app/CarritoCompra/CarritoCompra.html";
}

function confirmarcantidad() {
  var contenidoCantidad = parseInt(elementoCantidad.innerText);

  if (sessionStorage.getItem(id) == null) {
    const datos = [contenidoNombre, contenidoPrecio, contenidoCantidad];
    sessionStorage.setItem(id, JSON.stringify(datos));
  } else {
    const datosGuardados = sessionStorage.getItem(id);
    const datos = JSON.parse(datosGuardados);
    const cantidadAnterior = datos[2];
    const cantidadFinal = cantidadAnterior + contenidoCantidad;
    datos[2] = cantidadFinal;
    sessionStorage.setItem(id, JSON.stringify(datos));
  }
}*/

