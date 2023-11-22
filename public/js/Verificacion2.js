function verificar() {
    // Verificar si el mensaje ya se mostró en esta sesión
    if (!sessionStorage.getItem('sesionExitosaMostrada')) {
        // Realizar la solicitud GET para verificar la sesión
        axios.get('/check-session')
            .then(function (response) {
                if (response.data.success) {
                    console.log('Sesión activa:', response.data.user);
                    // Marcar que el mensaje ya se mostró
                    sessionStorage.setItem('sesionExitosaMostrada', true);
                } else {
                    console.log('Sesión no activa');
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    }
}

verificar();

function logout() {
    // Realizar la solicitud POST para cerrar sesión
    axios.post('/logout')
        .then(function (response) {
            console.log(response);
            if (response.data.success) {
                console.log('Sesión cerrada correctamente');
                // Borrar la marca cuando cierras sesión
                sessionStorage.removeItem('sesionExitosaMostrada');
                // Redirigir a la página de inicio de sesión
                window.location.href = '/login';
            } else {
                console.log('Error al cerrar sesión');
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}

function mostrarAlerta(mensaje) {
    alertify.success(mensaje);
}