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

let idNum = parseInt(localStorage.getItem("idNum")) || 0; // Tenemos que poner esto por que necesitamos guardar el numero por el que iba la id en
// nuestro localStorage y si no hay ninguno coge el 0 pa que no de fallo.

function crearID(){//Esto me crea el id de la propiedad id de mensaje ABAJO!!!
    idNum++;
    localStorage.setItem("idNum",idNum); //Me sube el incremento de id
    return idNum;
}

function cogerDatos(){ //cojo los datos mediante su id, el valor!!!

    const valorEmail = document.getElementById("email").value;
    const valorAsunto = document.getElementById("asunto").value;
    const valorContenidoMensaje = document.getElementById("contenidoMensaje").value;
    
    const mensaje = { // Creo un objeto para meter todos los datos despues de golpe!!!
        id : crearID(),
        email : valorEmail,
        asunto : valorAsunto,
        contenidoMensaje :valorContenidoMensaje
    };
    
   
    return mensaje;
}

function enviarDatos(){
    
    const mensaje = cogerDatos(); // Llamo el metodo donde hago lo de agrupar los datos.
    const mensajeJson = JSON.stringify(mensaje); //Los convierto en un archivo Json
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(mensaje.email != "" && mensaje.contenidoMensaje != "" && regex.test(mensaje.email)){
      localStorage.setItem(mensaje.id,mensajeJson); // Los meto al local storage con un id
      
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 9000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'success',
        title: 'Mensaje enviado',
      })
    }
    else{
      let num = localStorage.getItem("idNum");
      --idNum;
      localStorage.setItem("idNum",idNum);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'error',
        title: 'Error de formato/campos no rellenos y no se pudo enviar'
      })
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

//BARRA DE CARGA

window.onload = function(){
  var contenedor = document.getElementById(`contenedorCirculoCarga`);// coge el contedendor del circulo
  contenedor.style.visibility ='hidden'; // oculta todo el contenedor
  contenedor.style.opacity= '0'; // lo opaca
  initMap();
}

