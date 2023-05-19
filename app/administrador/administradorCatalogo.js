var x = document.getElementById("botonusuario");
var y = document.getElementById("botonmensaje");


function apareceusuario(){

    if (x.style.display === "none") {
        x.style.display = "inline-block";
        y.style.display = "none";
    } else {
        x.style.display = "none";
    }
    /*if(y.style.display === "block"){
        
        x.style.display = "block"
    }*/
   

}
function aparecemensaje(){

    if (y.style.display === "none") {
        y.style.display = "inline-block";
        x.style.display = "none";
    } 
     else {
        y.style.display = "none";
        
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
                                           <td> a </td>`; //metemos sus propiedades dentro de cada tr creado en el html

            //console.log(datosDeMensajesEnObjeto.id);
            meterDatosHtml.appendChild(nuevaFilaParaDatos); //agregamos los datos a la tabla del html
        }      
    }
}


cogerMensajesUsuarios();


