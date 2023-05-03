//coger los elementos del html por id

console.log(1);
function cogerDatos(){

    const valorEmail = document.getElementById("email").value;
    const valorAsunto = document.getElementById("asunto").value;
    const valorContenidoMensaje = document.getElementById("contenidoMensaje").value;
    
    const mensaje = {
        email : valorEmail,
        asunto : valorAsunto,
        contenidoMensaje :valorContenidoMensaje
    };
    return mensaje;
}

function enviarDatos(){
    
    const mensaje = cogerDatos();
    const mensajeJson = JSON.stringify(mensaje);
    localStorage.setItem(mensaje.email,mensajeJson);
    
}