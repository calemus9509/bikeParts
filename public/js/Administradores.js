var id = 0;


document.addEventListener("DOMContentLoaded", function () {
    // Obtén referencias a los campos de entrada
    const nombreInput = document.getElementById("txtNombre");
    const apellidoInput = document.getElementById("txtApellido");
    const usuarioInput = document.getElementById("txtUsuario");

    // Agrega oyentes de eventos de cambio a los campos de nombre y apellido
    nombreInput.addEventListener("input", actualizarUsuario);
    apellidoInput.addEventListener("input", actualizarUsuario);

    function actualizarUsuario() {
        // Obtiene los valores de nombre y apellido y los concatena con "_"
        const nombre = nombreInput.value.trim();
        const apellido = apellidoInput.value.trim();
        const usuario = nombre + "_" + apellido;

        // Actualiza el valor del campo de usuario
        usuarioInput.value = usuario;
    }
});



document.addEventListener("DOMContentLoaded", function () {
    generarContraseña(); // Generar contraseña al cargar la página
});

function generarContraseña() {
    const longitud = 8; // Longitud de la contraseña
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let contraseñaGenerada = "";

    for (let i = 0; i < longitud; i++) {
        const caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        contraseñaGenerada += caracterAleatorio;
    }

    // Actualiza el valor del campo de contraseña
    document.getElementById("txtContraseña").value = contraseñaGenerada;
}







function crear(){
    axios.post("/personas", {
        Nombre: txtNombre.value,
        Apellido: txtApellido.value,
        Documento: txtDocumento.value,
        Telefono: txtTelefono.value,
        rol_id: txtRol.value,
        Usuario: txtUsuario.value,
        Contraseña: txtContraseña.value,
        Correo: txtCorreo.value
    })
    .then(res => {
        console.log(res)
        limpiar();
        mostrar();
        generarContraseña();
        mostrarAlerta("Cliente creado correctamente en su base de datos");
    })
    .catch(err => {
        console.error(err); 
    })
}

function limpiar() {
    const campos = ["txtNombre", "txtApellido", "txtDocumento", "txtTelefono", "txtRol", "txtCorreo","txtUsuario"];

    campos.forEach(campo => {
        if (campo !== "txtContraseña") {
            document.getElementById(campo).value = "";
        }
    });
}


function mostrar(){
    axios.get("/personas")
    .then(res => {
        console.log(res.data)
        table = "";
        res.data.forEach((element,index) => {
           table += `<tr>
           <th scope="row">${index + 1}</th>
           <td>${element.Nombre}</td>
           <td>${element.Apellido}</td>
           <td>${element.Documento}</td>
           <td>${element.Telefono}</td>
           <td>${element.NombreRol}</td>
           <td>${element.Correo}</td>
           <td>${element.Usuario}</td>
           <td>${element.Estado}</td>
           <td>
             <a onclick='readUpdate(${JSON.stringify(element)})' class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#ModificarModal">Modificar</a>
             <a onclick='readUpdate(${JSON.stringify(element)})' class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#EliminarModal">Inhabilitar</a>
           </td>
         </tr>` 
        });
        document.getElementById("clientes").innerHTML = table;
    })
    .catch(err => {
        console.error(err); 
    })

    axios.get("/rols")
        .then(response => {
            const select = document.getElementById('txtRol');
            const roles = response.data;

            select.innerHTML = '<option selected disabled>Seleccionar</option>';

            roles.forEach(role => {
                const option = document.createElement('option');
                option.value = role.id;
                option.text = role.Nombre;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error(error);
        });
}
mostrar();


function readUpdate(id){
    console.log(id);
    this.id = id.id;
    txtNombre2.value = id.Nombre;
    txtApellido2.value = id.Apellido;
    txtDocumento2.value = id.Documento;
    txtTelefono2.value = id.Telefono;
    axios.get("/rols")
    .then(response => {
        const select = document.getElementById('txtRol2');
        const roles = response.data;

        select.innerHTML = '<option selected disabled>Seleccionar</option>';

        roles.forEach(role => {
            const option = document.createElement('option');
            option.value = role.id;
            option.text = role.Nombre;
            select.appendChild(option);
        });

        txtRol2.value = id.rol_id;
    })
    .catch(error => {
        console.error(error);
    });
    txtCorreo2.value = id.Correo;
}

function modificar(){
    axios.put("/personas/" + this.id, {
        id: this.id,
        Nombre: txtNombre2.value,
        Apellido: txtApellido2.value,
        Documento: txtDocumento2.value,
        Telefono: txtTelefono2.value,
        rol_id: txtRol2.value,
        Correo: txtCorreo2.value,
    })
    .then(res => {
        console.log(res)
        mostrar();
        mostrarAlerta("Modificado correctamente");
    })
    .catch(err => {
        console.error(err); 
    })
}

function inhabilitar(){
    axios.delete("/personas/" + this.id)
    .then(res => {
        console.log(res)
        mostrarAlerta('Inhabilitado con éxito');
        mostrar();
    })
    .catch(err => {
        console.error(err); 
    })
}

function mostrarOcultarContraseña() {
    const campoContraseña = document.getElementById("txtContraseña");
    const iconoOjo = document.getElementById("iconoOjo");

    if (campoContraseña.type === "password") {
        campoContraseña.type = "text";
        iconoOjo.classList.remove("bi-eye");
        iconoOjo.classList.add("bi-eye-slash");
    } else {
        campoContraseña.type = "password";
        iconoOjo.classList.remove("bi-eye-slash");
        iconoOjo.classList.add("bi-eye");
    }
}


function mostrarAlerta(mensaje) {
    alertify.success(mensaje);
}
function mostrarAlerta2(mensaje) {
    alertify.error(mensaje);
}