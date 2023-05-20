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