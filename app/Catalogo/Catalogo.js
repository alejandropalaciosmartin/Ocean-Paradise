const urlCasa = "https://getpantry.cloud/apiv1/pantry/464bfeaa-daae-4ecd-81c0-3a675193d25e/basket/Casas";

let nombre = document.getElementById("nombre"); 
const container = document.querySelector(".gridCatalogo");

async function cogerCasas(){
    let res = await fetch(urlCasa), 
    json = await res.json();
    console.log(json.casas);
    for(i = 1; i < 8; i++) //Recorremos 8 porque son los artículos que tenemos actualmente
    {
        // console.log(json.casas[i]);
        const casa = json.casas[i]; //Metemos en una variable para simplificar la escritura
        //Crea un botón
        const card = document.createElement("button");
        //Ponemos efectos al botón que lo coge del Catalogo.css
         card.classList.add("boton");
         //Dibujamos cada casa con sus efectos css que se coge del Catalogo.css
        card.innerHTML = `
            <div id="fotos" class="contenedorFotosYTexto"> 
                <img src="${casa.imagenes[0]}" alt="fotoCasa" class="estiloFotos">
                <div class="texto">
                    <span class="name">${casa.nombre}</span>
                    <p>${casa.precio}</p>
                </div>
            </div>`;
        // Manda id a la otra web
        card.addEventListener('click', () => { window.location.href = `../Producto/Producto.html?id=${casa.id}`; });
        container.appendChild(card);
    }
}
cogerCasas();