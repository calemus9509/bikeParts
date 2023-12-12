function confirmarCambioUsuario() {
    let nuevoUsuario = document.getElementById("nuevoUsuario").value;

    // Realiza la solicitud POST utilizando Axios
    axios
        .post("/cambiar-usuario", {
            nuevoUsuario: nuevoUsuario,
        })
        .then(function (response) {
            // Verifica la respuesta
            if (response.data.success) {
                // Borra los valores del formulario
                document.getElementById("nuevoUsuario").value = "";

                // Mensaje de éxito
                mostrarAlerta("Usuario cambiado con éxito");
                window.location.href = '/indexAdmin';
            } else {
                // Muestra un alert de error si la contraseña no cambió correctamente
                mostrarAlerta2("Error al cambiar la contraseña");
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}

function mostrarAlerta(mensaje) {
    alertify.success(mensaje);
}
function mostrarAlerta2(mensaje) {
    alertify.error(mensaje);
}