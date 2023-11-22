function enviarSolicitudRestablecimiento() {
    // Obtener el valor del campo de correo electrónico
    var Correo = document.getElementById('Correo').value;

    // Realizar la solicitud a tu ruta de reseteo de contraseña
    axios.post('/reset-password', {
        Correo: Correo
    })
        .then(function (response) {
            console.log(response);
            // Manejar la respuesta exitosa, por ejemplo, mostrar un mensaje al usuario
            mostrarAlerta('Se ha enviado un enlace de restablecimiento a su correo electrónico.');
        })
        .catch(function (error) {
            // Manejar errores, por ejemplo, mostrar un mensaje de error
            mostrarAlerta2('Hubo un problema al procesar su solicitud. Por favor, inténtelo de nuevo.');
        });
}

function mostrarAlerta(mensaje) {
    alertify.success(mensaje);
}
function mostrarAlerta2(mensaje) {
    alertify.error(mensaje);
}