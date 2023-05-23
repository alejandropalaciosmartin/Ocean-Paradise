const enlace = window.location.search;
const urlparametros = new URLSearchParams(enlace);
const id = urlparametros.get("id");

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

fetch('https://getpantry.cloud/apiv1/pantry/464bfeaa-daae-4ecd-81c0-3a675193d25e/basket/Casas')
  .then(response => response.json())
  .then(data => {
    const div = document.createElement('div');
    document.getElementById("foto").src = data.casas[id].imagenes[0];
    document.getElementById("imagen1").src = data.casas[id].imagenes[1];
    document.getElementById("imagen2").src = data.casas[id].imagenes[2];
    document.getElementById("imagen3").src = data.casas[id].imagenes[3];
    document.getElementById("imagen4").src = data.casas[id].imagenes[4];
    document.getElementById("imagen5").src = data.casas[id].imagenes[0];

    document.getElementById("descripcion").innerHTML = data.casas[id].descripcion;

    const nombreCasa = data.casas[id].nombre;
    const precioCasa = data.casas[id].precio;

    // Actualizar los elementos HTML con los valores obtenidos
    document.getElementById("nombre").innerHTML = nombreCasa;
    document.getElementById("precio").innerHTML = precioCasa;

    // Verificar si hay un valor almacenado en el sessionStorage
    const datosGuardados = sessionStorage.getItem(id);
    let cantidad = 1; // Establecer la cantidad inicial en 1 por defecto

    if (datosGuardados) {
      const datos = JSON.parse(datosGuardados);
      cantidad = datos[2];
      document.getElementById("cantidad").innerHTML = 1;
    } else {
      document.getElementById("cantidad").innerHTML = cantidad;
    }

    
   });

function cambiofotos(event) {
  const imagenSeleccionada = event.target.src;
  document.getElementById("foto").src = imagenSeleccionada;
}


document.getElementById("botonImagen1").addEventListener("click", cambiofotos);
document.getElementById("botonImagen2").addEventListener("click", cambiofotos);
document.getElementById("botonImagen3").addEventListener("click", cambiofotos);
document.getElementById("botonImagen4").addEventListener("click", cambiofotos);
document.getElementById("botonImagen5").addEventListener("click", cambiofotos);

function botonmas() {
  let cantidad = parseInt(document.getElementById("cantidad").innerHTML);
  cantidad++;
  document.getElementById("cantidad").innerHTML = cantidad;
}

function botonmenos() {
  let cantidad = parseInt(document.getElementById("cantidad").innerHTML);
  if (cantidad > 1) {
    cantidad--;
    document.getElementById("cantidad").innerHTML = cantidad;
  }
}

function realizarcompra() {
  window.location.href = "../CarritoCompra/CarritoCompra.html";
}

function añadirCarrito() {
  const contenidoNombre = document.getElementById("nombre").innerHTML;
  const contenidoPrecio = document.getElementById("precio").innerHTML;
  const contenidoCantidad = parseInt(document.getElementById("cantidad").innerHTML);

  if (sessionStorage.getItem(id) == null) {
    const datos = [contenidoNombre, contenidoPrecio, contenidoCantidad];
    sessionStorage.setItem(id, JSON.stringify(datos));

    // Código para calcular la cantidad total guardada en el SessionStorage para poner el número en el carrito de la compra
    sumaTotal += contenidoCantidad;
    if(elementoNumero.style.display == "none"){
      elementoNumero.style.display = "flex";
    }
    // Seepalert2
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Compra realizada',
      showConfirmButton: false,
      timer: 1500
    })
    actualizarNumeroCarrito(sumaTotal);
  } else {
    const datosGuardados = sessionStorage.getItem(id);
    const datos = JSON.parse(datosGuardados);
    const cantidadAnterior = datos[2];
    const cantidadFinal = cantidadAnterior + contenidoCantidad;
    datos[2] = cantidadFinal;
    sessionStorage.setItem(id, JSON.stringify(datos));

    // Código para actualizar la cantidad total en el carrito de la compra
    sumaTotal += contenidoCantidad;
    if(elementoNumero.style.display == "none"){
      elementoNumero.style.display = "flex";
    }
    actualizarNumeroCarrito(sumaTotal);
  }
}
//---------------------------------------------------------------------------------------------------------------------//


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











/*const enlace = window.location.search;
const urlparametros = new URLSearchParams(enlace);
const id = urlparametros.get("id");

// Función para actualizar el número del carrito
function actualizarNumeroCarrito(numero) {
  const elementoNumero = document.getElementById('sumaTotalCarrito');
  elementoNumero.textContent = numero;
}

// Código para calcular la cantidad total guardada en el SessionStorage para poner el número en el carrito de la compra
let sumaTotal = 0; // Inicializar la variable para almacenar la suma total

for (let i = 0; i < sessionStorage.length; i++) { // Recorrer todas las claves en el Session Storage
  const key = sessionStorage.key(i); // Obtener la clave actual
  const value = JSON.parse(sessionStorage.getItem(key)); // Obtener el valor correspondiente a la clave 
  const cantidad = value[2]; // Obtener la cantidad del valor y sumarla a la suma total
  sumaTotal += cantidad;
}

actualizarNumeroCarrito(sumaTotal);

//--------------------------------------------------------------------------------------------------------------------

fetch('https://getpantry.cloud/apiv1/pantry/464bfeaa-daae-4ecd-81c0-3a675193d25e/basket/Casas')
  .then(response => response.json())
  .then(data => {
    const div = document.createElement('div');
    document.getElementById("foto").src = data.casas[id].imagenes[0];
    document.getElementById("imagen1").src = data.casas[id].imagenes[1];
    document.getElementById("imagen2").src = data.casas[id].imagenes[2];
    document.getElementById("imagen3").src = data.casas[id].imagenes[3];
    document.getElementById("imagen4").src = data.casas[id].imagenes[4];
    document.getElementById("imagen5").src = data.casas[id].imagenes[0];
  


    document.getElementById("descripcion").innerHTML = data.casas[id].descripcion;

    const nombreCasa = data.casas[id].nombre;
    const precioCasa = data.casas[id].precio;

    // Guardar los valores en sessionStorage
    const datos = [nombreCasa, precioCasa, 1]; // La cantidad inicial se establece en 1
    sessionStorage.setItem(id, JSON.stringify(datos));

    // Actualizar los elementos HTML con los valores obtenidos
    document.getElementById("nombre").innerHTML = nombreCasa;
    document.getElementById("precio").innerHTML = precioCasa;
  });
  

  function cambiofotos(event) {
    const imagenSeleccionada = event.target.src;
    document.getElementById("foto").src = imagenSeleccionada;
  }
  
  // Asignar la función cambiofotos() a los botones de imagen
  document.getElementById("botonImagen1").addEventListener("click", cambiofotos);
  document.getElementById("botonImagen2").addEventListener("click", cambiofotos);
  document.getElementById("botonImagen3").addEventListener("click", cambiofotos);
  document.getElementById("botonImagen4").addEventListener("click", cambiofotos);
  document.getElementById("botonImagen5").addEventListener("click", cambiofotos);

 

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
  const contenidoCantidad = parseInt(elementoCantidad.innerText);

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

  // Código para calcular la cantidad total guardada en el SessionStorage para poner el número en el carrito de la compra
  let sumaTotal = 0; // Inicializar la variable para almacenar la suma total

  for (let i = 0; i < sessionStorage.length; i++) { // Recorrer todas las claves en el Session Storage
    const key = sessionStorage.key(i); // Obtener la clave actual
    const value = JSON.parse(sessionStorage.getItem(key)); // Obtener el valor correspondiente a la clave 
    const cantidad = value[2]; // Obtener la cantidad del valor y sumarla a la suma total
    sumaTotal += cantidad;
  }
  actualizarNumeroCarrito(sumaTotal);
}

// Flecha ir arriba
window.onscroll = function() {
  const myBtn = document.getElementById("botonFlecha");
  myBtn.style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? "block" : "none";
};

function topFunction() {
  document.documentElement.scrollTop = 0;
}*/




