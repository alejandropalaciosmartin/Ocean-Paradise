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
