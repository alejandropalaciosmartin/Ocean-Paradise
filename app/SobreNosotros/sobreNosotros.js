//Función para actualizar el número del carrito
function actualizarNumeroCarrito(numero) {
  const elementoNumero = document.getElementById('sumaTotalCarrito');
  elementoNumero.textContent = numero;
}

//Código para calcular la cantidad total guardada en el SessionStorage para poner el numero en el carrito de la compra
  
let sumaTotal = 0; // Inicializar la variable para almacenar la suma total

for (let i = 0; i < sessionStorage.length; i++) { // Recorrer todas las claves en el Session Storage
  const key = sessionStorage.key(i); // Obtener la clave actual
  const value = JSON.parse(sessionStorage.getItem(key)); // Obtener el valor correspondiente a la clave 
  const cantidad = value[2]; // Obtener la cantidad del valor y sumarla a la suma total
  sumaTotal += cantidad;
}
actualizarNumeroCarrito(sumaTotal);

//--------------------------------------------------------------------------------------------------------------------

window.onscroll = function() {
  const myBtn = document.getElementById("myBtn");
  myBtn.style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? "block" : "none"; };
  
function topFunction() {
  document.documentElement.scrollTop = 0; }
  
fetch('https://getpantry.cloud/apiv1/pantry/464bfeaa-daae-4ecd-81c0-3a675193d25e/basket/SobreNosotros')
  .then(response => response.json())
  .then(data => {
    const equipo = data.equipo;
    const contenedor = document.querySelector('.contenedorGrid');
    
    for (const persona in equipo) {
      const divPersona = document.createElement('div');
      divPersona.classList.add('cadaPersona');
      
      const img = document.createElement('img');
      img.classList.add('fotoPersona');
       img.src = "..\\..\\Recursos\\Imagen\\imagenPlaceHolder.jpg";//equipo[persona].imagen;
      
      const nombre = document.createElement('p');
      nombre.id = 'nombre';
      nombre.textContent = equipo[persona].nombre;
      console.log(equipo[persona].nombre)
      
      const posicion = document.createElement('p');
      posicion.id = 'posicion';
      posicion.textContent = equipo[persona].posicion;
      
      const descripcion = document.createElement('p');
      descripcion.id = 'descripcion';
      descripcion.textContent = equipo[persona].descripcion;
      
      divPersona.appendChild(img);
      divPersona.appendChild(nombre);
      divPersona.appendChild(posicion);
      divPersona.appendChild(descripcion);
      
      contenedor.appendChild(divPersona);
    }
  })
  .catch(error => console.error(error));

  //Flecha ir arriba
window.onscroll = function() {
    const myBtn = document.getElementById("botonFlecha");
    myBtn.style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? "block" : "none"; };
    
  function topFunction() {
    document.documentElement.scrollTop = 0; }