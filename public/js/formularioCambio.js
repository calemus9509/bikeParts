function confirmarCambioContrasena() {
    let nuevaContraseña = document.getElementById("nuevaContraseña").value;
    let confirmarContraseña = document.getElementById(
        "confirmarContraseña"
    ).value;

    // Verifica que las contraseñas coincidan
    if (nuevaContraseña !== confirmarContraseña) {
        mostrarAlerta2("Las contraseñas no coinciden");
        return;
    }

    // Verifica que las contraseñas no estén vacías
    if (nuevaContraseña === "" || confirmarContraseña === "") {
        mostrarAlerta2("Por favor, ingresa las contraseñas");
        return;
    }

    // Validar complejidad de la nueva contraseña
    const regex = /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
    if (!regex.test(nuevaContraseña)) {
        mostrarAlerta2(
            "La contraseña debe tener al menos una letra mayúscula, un número y ser de al menos 6 caracteres"
        );
        return;
    }

    // Realiza la solicitud POST utilizando Axios
    axios
        .post("/cambiar-contrasena", {
            nuevaContraseña: nuevaContraseña,
            confirmarContraseña: confirmarContraseña,
        })
        .then(function (response) {
            // Verifica la respuesta
            if (response.data.success) {
                // Borra los valores del formulario
                document.getElementById("nuevaContraseña").value = "";
                document.getElementById("confirmarContraseña").value = "";

                // Mensaje de éxito
                mostrarAlerta("Contraseña cambiada con éxito");
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
