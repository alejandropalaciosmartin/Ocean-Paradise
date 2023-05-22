var botonUsuario = document.getElementById("botonusuario");
var botonMensaje = document.getElementById("botonmensaje");


function apareceusuario(){

    if (botonUsuario.classList.contains("desaparecio")) {
        botonUsuario.classList.remove("desaparecio");
        botonMensaje.classList.add("desaparecio");
    } else {
        botonUsuario.classList.add("desaparecio");
    }
    /*if(y.style.display === "block"){
        
        x.style.display = "block"
    }*/
   

}
function aparecemensaje(){

    if (botonMensaje.classList.contains("desaparecio")) {
        botonMensaje.classList.remove("desaparecio");
        botonUsuario.classList.add("desaparecio");
    } 
     else {
        botonMensaje.classList.add("desaparecio");
        
    }
    /*if(x.style.display === "block"){
        
       y.style.display = "block"
    }*/

   

}

//METODO PARA COGER INFORMACION DEL LOCAL Y METERLA EN LOS MENSAJES AL DARLE AL BOTON
 function cogerMensajesUsuarios(){
    const meterDatosHtml = document.getElementById("tablaParaMeterDatos");
    for(let i =0;i<=localStorage.length;i++){   //Esto lee el local store y coge su tamaño para recorrerlo y coger los datos
      
        const datosDeMensajesEnObjeto = JSON.parse(localStorage.getItem(`${i}`));//mete en la variable datosDeMensajes pasando a json pa que siga siendo un objeto y podamos entrar en las propiedades.

        if(datosDeMensajesEnObjeto != null){    //hay que ver que no sea null el objeto en si       
            const nuevaFilaParaDatos = document.createElement("tr");      //creamos un tr para cada dato
            nuevaFilaParaDatos.innerHTML=`<td class="idMensaje">${datosDeMensajesEnObjeto.id}</td> 
                                           <td class="correo">${datosDeMensajesEnObjeto.email}</td>
                                           <td>${datosDeMensajesEnObjeto.asunto}</td>
                                           <td class="contenidoMensaje">${datosDeMensajesEnObjeto.contenidoMensaje}</td>
                                           <td><button onmouseout="cambioBasura2(${i})" onmouseover="cambioBasura(${i})" onclick="borrarMensaje(${i})" ><img id="basura${i}"class="imagenBasurita" src="../../Recursos/Imagen/basuraNegra.png" /><button></td>`; //metemos sus propiedades dentro de cada tr creado en el html

            //console.log(datosDeMensajesEnObjeto.id);
            meterDatosHtml.appendChild(nuevaFilaParaDatos); //agregamos los datos a la tabla del html
        }      
    }
}


cogerMensajesUsuarios();


function cambioBasura(i){//para poner la img de la basura abierta
    let basura = document.getElementById(`basura${i}`);
    
    basura.src = "../../Recursos/Imagen/basuraAbiertaNegra.png";
}
function cambioBasura2(i){//para volver a la img de basura normal
    let basura = document.getElementById(`basura${i}`);
    
    basura.src = "../../Recursos/Imagen/basuraNegra.png";
}


function borrarMensaje(i){
//METER LIBRERIA ADRI, MENSAJE DE SEGURO QUE QUIERES BORRAR??
Swal
  .fire({
      text: "¿Estás seguro de que deseas borrar el mensaje?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
  })
  .then(resultado => {
    //Botón "Sí, comprar"
      if (resultado.value){
        let numMensajes = localStorage.getItem("idNum");//cojo el item idNum para restarle una a la cantidad y lo vuelvo a poner
        numMensajes--;
        localStorage.setItem("idNum", numMensajes);
        localStorage.removeItem(i);//borro el item
        siguiente(i);//esta funcion cambia las ids de las keys para que siempre esten en orden y no haya saltos ni fallos


        location.reload();//recarga la pagina para actualizar los datos
        //CORREGIR poner algo para que se vea la tabla en la que estaba
      }})
}

function siguiente(i){//funcion recursiva para que lo haga hasta que el siguiente sea nulo
var siguienteValor = localStorage.getItem(i+1);
if(siguienteValor != null){
    localStorage.removeItem(i+1);
    localStorage.setItem(i, siguienteValor);
    siguiente(i+1);
}
}