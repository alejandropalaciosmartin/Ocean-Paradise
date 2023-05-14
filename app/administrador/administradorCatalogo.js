var x = document.getElementById("botonusuario");


function apareceusuario(){
    
   
    
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    if(y.style.display === "block"){
        y.style.display = "none"
        x.style.display = "block"
    }
   

}
function aparecemensaje(){
    var y = document.getElementById("botonmensaje");
    if (y.style.display === "none") {
        y.style.display = "block";
    } 
     else {
        y.style.display = "none";
        
    }
    if(x.style.display === "block"){
        x.style.display = "none"
       y.style.display = "block"
    }
    
}


let cantidad = 1;

let local = localStorage.getItem("cantidad");

console.log(local);

/*function botonmas(){
   cantidad= cantidad + 1;

   document.querySelector("#cantidad").innerHTML= cantidad
   if( cantidad < 1){
    cantidad= cantidad + 0;

    document.querySelector("#cantidad").innerHTML= 1
   }


}

function botonmenos(){
    if( cantidad < 1){
        cantidad = cantidad -0;
        document.querySelector("#cantidad").innerHTML= 1
    }else
    cantidad = cantidad -1;

    document.querySelector("#cantidad").innerHTML= cantidad


  
}*/
