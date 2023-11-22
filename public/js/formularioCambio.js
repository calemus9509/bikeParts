function mostrarFormularioCambioContrasena() {
    // Muestra el formulario de cambio de contraseña
    document.getElementById('cambioContrasenaFormulario').style.display = 'block';
}

function confirmarCambioContrasena() {
    let nuevaContraseña = document.getElementById('nuevaContraseña').value;
    let confirmarContraseña = document.getElementById('confirmarContraseña').value;

    // Verifica que las contraseñas coincidan
    if (nuevaContraseña !== confirmarContraseña) {
        mostrarAlerta2('Las contraseñas no coinciden');
        return;
    }

    // Verifica que las contraseñas no estén vacías
    if (nuevaContraseña === '' || confirmarContraseña === '') {
        mostrarAlerta2('Por favor, ingresa las contraseñas');
        return;
    }

    // Realiza la solicitud POST utilizando Axios
    axios.post('/cambiar-contrasena', {
        nuevaContraseña: nuevaContraseña,
        confirmarContraseña: confirmarContraseña
    })
    .then(function (response) {
        // Verifica la respuesta
        if (response.data.success) {
            // Oculta el formulario después de cambiar la contraseña
            document.getElementById('cambioContrasenaFormulario').style.display = 'none';
            // Mensaje de éxito
            mostrarAlerta('Contraseña cambiada con éxito');

            // Borra los valores del formulario
            document.getElementById('nuevaContraseña').value = '';
            document.getElementById('confirmarContraseña').value = '';
        } else {
            // Muestra un alert de error si la contraseña no cambió correctamente
            mostrarAlerta2('Error al cambiar la contraseña');
        }
    })
    .catch(function (error) {
        console.error(error);
    });
}


function cancelarCambioContrasena() {
    // Oculta el formulario sin realizar ningún cambio
    document.getElementById('cambioContrasenaFormulario').style.display = 'none';
}


function mostrarAlerta(mensaje) {
    alertify.success(mensaje);
}
function mostrarAlerta2(mensaje) {
    alertify.error(mensaje);
}