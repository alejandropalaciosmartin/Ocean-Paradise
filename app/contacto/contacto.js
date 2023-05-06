
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
