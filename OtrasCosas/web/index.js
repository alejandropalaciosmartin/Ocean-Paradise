fetch('casas.json')
  .then(response => response.json())
  .then(data => {
    const casas = data.casas; // Acceder al array de casas en el objeto JSON
    casas.forEach(casa => {
      const nombreCasa = casa.nombre; // Acceder al nombre de cada casa
      console.log(nombreCasa); // Mostrar el nombre de cada casa en la consola
    });
  });