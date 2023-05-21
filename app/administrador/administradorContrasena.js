const claveDeAcceso = "Albertito";/*LA CLAVE DE ACCESO */

const customAlert = document.getElementById('custom-alert');/*coge el elemento de la alerta, se escribe fuera para que se pueda usar en ambos metodos*/

const input = document.getElementById('contrasena');/*Coge el elemento del input para luego crearle un evento(al persionar enter tambien entre)*/

input.addEventListener('keydown', function(event) {/*un evento creado cada vez que pulsas una tecla en el input*/
    if (event.key === 'Enter') {/*Te compara si la tecla q pulsas es el enter */
      entrarAdmin();/*Si es igual al enter llama al metodo de entrarAdmin que o te manda a la pagina o te muestra la alerta */
    }
  });

function entrarAdmin() {
    var valor = document.getElementById("contrasena").value;/*te coge el valor que hay en el input, se pone dentro para coger el valor al pulsar el boton y no antes*/
    if(valor == claveDeAcceso){/*te compara si tu contraseña es la correcta*/
        location.href = `administradorCatalogo.html`;/*Te manda la alerta*/
    }
    else{
        customAlert.style.display = 'block';/*Esto muestra la alerta*/
    }
}

function hideAlert() {/*Para ocultar la alerta*/
    customAlert.style.display = 'none';
  }

function togglePasswordVisibility() {
    let input = document.getElementById('contrasena');
    let botonOjo = document.getElementById("ojo");
  
    if (input.type === 'password') {
      input.type = 'text';
      botonOjo.src = "../../Recursos/Imagen/visible.png";
    } else {
      input.type = 'password';
      botonOjo.src = "../../Recursos/Imagen/visibilidad.png";
    }
  }
  
