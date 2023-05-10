let cantidad = 1;
let precio = parseInt(document.getElementById("precio").value);

function botonmas(){
   cantidad= cantidad + 1;

   document.querySelector("#cantidad").innerHTML= cantidad
   if( cantidad < 1){
    cantidad= cantidad + 0;

    document.querySelector("#cantidad").innerHTML= 1
   }

   document.querySelector("#subtotal").innerHTML = precio * cantidad + "€"
}

function botonmenos(){
    if( cantidad < 1){
        cantidad = cantidad -0;
        document.querySelector("#cantidad").innerHTML= 1
    }else
    cantidad = cantidad -1;

    document.querySelector("#cantidad").innerHTML= cantidad
    document.querySelector("#subtotal").innerHTML = precio * cantidad + "€"

  
}

