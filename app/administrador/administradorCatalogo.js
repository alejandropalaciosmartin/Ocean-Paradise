var botonUsuario = document.getElementById("botonusuario");
var botonMensaje = document.getElementById("botonmensaje");


function apareceusuario(){
    if (botonUsuario.classList.contains("desaparecio")) {
        botonUsuario.classList.remove("desaparecio");
        botonMensaje.classList.add("desaparecio");
    } else {
        botonUsuario.classList.add("desaparecio");
    }

}
function aparecemensaje(){
    if (botonMensaje.classList.contains("desaparecio")) {
        botonMensaje.classList.remove("desaparecio");
        botonUsuario.classList.add("desaparecio");
    } 
     else {
        botonMensaje.classList.add("desaparecio");
        
    }

}

//METODO PARA COGER INFORMACION DEL LOCAL Y METERLA EN LOS MENSAJES AL DARLE AL BOTON
 function cogerMensajesUsuarios(){
    const meterDatosHtml = document.getElementById("tablaParaMeterDatos");
    const idNumValue = localStorage.getItem("idNum");
    for(let i =0;i<=idNumValue;i++){   //Esto lee el local store y coge su tamaño para recorrerlo y coger los datos
      
        const datosDeMensajesEnObjeto = JSON.parse(localStorage.getItem(`${i}`));//mete en la variable datosDeMensajes pasando a json pa que siga siendo un objeto y podamos entrar en las propiedades.

        if(datosDeMensajesEnObjeto != null){    //hay que ver que no sea null el objeto en si       
            const nuevaFilaParaDatos = document.createElement("tr");      //creamos un tr para cada dato
            nuevaFilaParaDatos.setAttribute("id",`${datosDeMensajesEnObjeto.id}`);
            nuevaFilaParaDatos.innerHTML=`<td class="idMensaje">${datosDeMensajesEnObjeto.id}</td> 
                                           <td class="correo">${datosDeMensajesEnObjeto.email}</td>
                                           <td>${datosDeMensajesEnObjeto.asunto}</td>
                                           <td class="contenidoMensaje">${datosDeMensajesEnObjeto.contenidoMensaje}</td>
                                           <td><button onmouseout="cambioBasura2Mensaje(${i})" onmouseover="cambioBasuraMensaje(${i})" onclick="borrarMensaje(${i},${datosDeMensajesEnObjeto.id})" ><img id="basuraMensaje${i}"class="imagenBasurita" src="../../Recursos/Imagen/basuraNegra.png" /><button></td>`; //metemos sus propiedades dentro de cada tr creado en el html

            //console.log(datosDeMensajesEnObjeto.id);
            meterDatosHtml.appendChild(nuevaFilaParaDatos); //agregamos los datos a la tabla del html
        }      
    }
}


cogerMensajesUsuarios();


function cambioBasuraMensaje(i){//para poner la img de la basura abierta
    let basura = document.getElementById(`basuraMensaje${i}`);
    
    basura.src = "../../Recursos/Imagen/basuraAbiertaNegra.png";
}
function cambioBasura2Mensaje(i){//para volver a la img de basura normal
    let basura = document.getElementById(`basuraMensaje${i}`);
    
    basura.src = "../../Recursos/Imagen/basuraNegra.png";
}

function cambioBasuraPedido(i){//para poner la img de la basura abierta
    let basura = document.getElementById(`basuraPedido${i}`);
    
    basura.src = "../../Recursos/Imagen/basuraAbiertaNegra.png";
}
function cambioBasura2Pedido(i){//para volver a la img de basura normal
    let basura = document.getElementById(`basuraPedido${i}`);
    
    basura.src = "../../Recursos/Imagen/basuraNegra.png";
}


function borrarMensaje(i, idMensajito){
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
      if (resultado.value){//si confirma que quiere borrar

        const tr = document.getElementById(`${idMensajito}`);
        tr.remove();//borro el tr

        localStorage.removeItem(i);//borro el item
      }})
}




cogerPedidosUsuarios();
//---------------------------Pedidos--------------------------
function cogerPedidosUsuarios(){
    const meterDatosHtml = document.getElementById("tablaParaMeterPedidos");
    const idNumValue = localStorage.getItem("idCompras");
    for(let i =1;i<=idNumValue;i++){   //Esto lee el local store y coge su tamaño para recorrerlo y coger los datos
      
        const datosDePedidoEnObjeto = JSON.parse(localStorage.getItem(`Compra${i}`));//mete en la variable datosDeMensajes pasando a json pa que siga siendo un objeto y podamos entrar en las propiedades.
        
        if(datosDePedidoEnObjeto != null){    //hay que ver que no sea null el objeto en si  
            let ultimoValor = datosDePedidoEnObjeto.length-1;     
            const nuevaFilaPedidos = document.createElement("tr");      //creamos un tr para cada dato
            nuevaFilaPedidos.setAttribute("id",`${datosDePedidoEnObjeto[ultimoValor].idNombre}`);
            nuevaFilaPedidos.innerHTML=`<td class="idMensaje">${datosDePedidoEnObjeto[ultimoValor].idNombre}</td> 
                                           <td>${datosDePedidoEnObjeto[ultimoValor].nombre}</td>
                                           <td class="detallePedido"><ul class="detallePedidoUl">${crearLista(datosDePedidoEnObjeto)}</ul></td>
                                           <td>${datosDePedidoEnObjeto[ultimoValor].totalCompra}</td>
                                           <td class="cuadroBasura"><button onmouseout="cambioBasura2Pedido(${i})" onmouseover="cambioBasuraPedido(${i})" onclick="borrarPedido(${i}, ${datosDePedidoEnObjeto[ultimoValor].idNombre})" ><img id="basuraPedido${i}"class="imagenBasurita" src="../../Recursos/Imagen/basuraNegra.png" /><button></td>`; //metemos sus propiedades dentro de cada tr creado en el html

            //console.log(datosDeMensajesEnObjeto.id);
            meterDatosHtml.appendChild(nuevaFilaPedidos); //agregamos los datos a la tabla del html
        }      
    }
}

function crearLista(datosDePedidoEnObjeto){
    let casas = "";
    datosDePedidoEnObjeto.forEach(element => {
        if(element.casa != null){
            casas += `<li>${element.casa}</li>`
       }});
       return casas;
}

function borrarPedido(i, idPedido){
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
          if (resultado.value){//si confirma que quiere borrar
    
            const tr = document.getElementById(`${idPedido}`);
            tr.remove();//borro el tr
    
            localStorage.removeItem(`Compra${i}`);//borro el item
          }})
    }

    //BARRA DE CARGA

    window.onload = function(){
         var contenedor = document.getElementById(`contenedorCirculoCarga`);
         contenedor.style.visibility ='hidden';
        contenedor.style.opacity= '0';
    
    }