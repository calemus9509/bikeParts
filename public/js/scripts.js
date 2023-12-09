/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
// 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

function login() {
    let Usuario = document.getElementById('Usuario').value;
    let Contraseña = document.getElementById('Contraseña').value;

    // Realizar la solicitud POST utilizando Axios
    axios.post('/loginn', {
        Usuario: Usuario,
        Contraseña: Contraseña
    })
    .then(function (response) {
        // Verificar la respuesta y redirigir si es exitosa
        if (response.data.success) {
            window.location.href = '/indexAdmin'; // Ajusta la URL de redirección según tu configuración
        } else {
            alert('Error al iniciar sesión');
        }
    })
    .catch(function (error) {
        console.error(error);
    });
}

function reclamaciones() {
    const empresaId = JSON.parse(localStorage.getItem("userData")) || [];
    id = empresaId.empresa_id;
    axios.get(`/reclamaciones/${id}`)
        .then(res => {
            console.log(res.data);
            const reclamacionesHtml = res.data.map(element => `
                <div class="reclamacion border-top border-bottom py-2 d-flex justify-content-between mb-3" id="reclamacion1">
                    <h5>${element.reclamacion}</h5>
                    <button class="btn btn-danger" onclick="eliminarRecla(${element.id})">Eliminar</button>
                </div>`
            );

            document.getElementById("Reclamaciones").innerHTML = reclamacionesHtml.join('');
        })
        .catch(err => {
            console.error(err);
        });
}
reclamaciones();

function eliminarRecla(id) {
    axios.delete(`/reclamaciones/${id}`)
        .then(res => {
            reclamaciones();
        })
        .catch(err => {
            console.error(err);
            alert("Error al eliminar la reclamación");
        });
}