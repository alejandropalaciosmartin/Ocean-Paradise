const urlCasa = "https://getpantry.cloud/apiv1/pantry/464bfeaa-daae-4ecd-81c0-3a675193d25e/basket/Casas";

let nombre = document.getElementById("nombre"); 
const container = document.querySelector(".gridCatalogo");

async function cogerCasas(){
    let res = await fetch(urlCasa), 
    json = await res.json();
    console.log(json.casas);
    for(i = 1; i < 8; i++)
    {
        // console.log(json.casas[i]);
        const casa = json.casas[i];
        const card = document.createElement("button");
         card.classList.add("boton");
        card.innerHTML = `
            <div id="fotos" class="contenedorFotosYTexto"> 
                <img src="${casa.imagenes[0]}" alt="fotoCasa" class="estiloFotos">
                <div class="texto">
                    <span class="name">${casa.nombre}</span>
                    <p>${casa.precio}</p>
                </div>
            </div>`;

        container.appendChild(card);
    }
}
cogerCasas();