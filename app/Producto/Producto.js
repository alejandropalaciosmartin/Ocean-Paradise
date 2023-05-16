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

  // Aquí puedes agregar cualquier otra lógica relacionada con añadir al carrito
}



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

