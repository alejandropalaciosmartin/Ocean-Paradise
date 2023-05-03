const urlCasa = "https://getpantry.cloud/apiv1/pantry/464bfeaa-daae-4ecd-81c0-3a675193d25e/basket/Casas";

let nombre = document.getElementById("nombre"); 

async function cogerCasas(){
    let res = await fetch(urlCasa), 
    json = await res.json();
    console.log(json.casas);
    for(i = 0; i < 9; i++)
    {
        console.log(json.casas[i]);
    }
        // nombre.innerHTML = element.nombre; 
        //  console.log(dato.nombre);
    
}
cogerCasas();