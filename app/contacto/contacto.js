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
    localStorage.setItem(mensaje.id,mensajeJson); // Los meto al local storage con un id
    
}

//Flecha ir arriba
window.onscroll = function() {
    const myBtn = document.getElementById("botonFlecha");
    myBtn.style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? "block" : "none"; };
    
  function topFunction() {
    document.documentElement.scrollTop = 0; }