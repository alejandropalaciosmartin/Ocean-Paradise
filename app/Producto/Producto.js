let cantidad = 1;

function botonmas(){
   cantidad= cantidad + 1;

   document.querySelector("#cantidad").innerHTML= cantidad
   if( cantidad < 1){
    document.querySelector("#cantidad").innerHTML= 1

    document.querySelector("#cantidad").innerHTML= 1
   }
}

function botonmenos(){
    if( cantidad < 1){
      
        document.querySelector("#cantidad").innerHTML= 1
    }else
    cantidad = cantidad -1;

    document.querySelector("#cantidad").innerHTML= cantidad

  
}

function realizarcompra(){

    window.location.href = ".//app/CarritoCompra/CarritoCompra.html";

}


/* LOCALSTORAGE */
var elementoNombre = document.getElementById("nombre");
var contenidoNombre = elementoNombre.innerHTML;
localStorage.setItem("nombre", contenidoNombre);

var elementoPrecio = document.getElementById("precio");
var contenidoPrecio = elementoPrecio.innerHTML;
localStorage.setItem("precio", contenidoPrecio);


var elementoCantidad = document.getElementById("cantidad");
var contenidoCantidad= elementoCantidad.innerHTML;
localStorage.setItem("cantidad", contenidoCantidad);




let datos = [contenidoPrecio, contenidoCantidad, contenidoNombre]





  


