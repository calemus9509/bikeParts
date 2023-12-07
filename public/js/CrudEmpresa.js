//funcion para insercion de datos
var id = 0;

function crear() {
    axios.post("/empresas", {
        nombre: txtNombre.value,
        direccion: txtDireccion.value,
        nit: txtNit.value,
        telefono: txtTelefono.value,
        admin_id: txtAdmin.value,
        descripcion: txtDescripcion.value,
        logo: txtLogo.value,
        imagen: txtImagen.value,
        vision: txtVision.value,
        mision: txtMision.value,
        correo: txtcorreo.value,
        instagram: txtinstagram.value,
    })
        .then(res => {
            console.log(res)
            mostrar();
            limpiar();
        })
        .catch(err => {
            console.error(err);
            alert("fallo al crear la empresa")
        })
}


// funcion para mostrar los datos 

function mostrar() {
    axios.get("/empresas")
        .then(res => {
            console.log(res.data)
            table = "";
            res.data.forEach((element, index) => {
                table += `<tr>
                    <th scope="row">${index + 1}</th>
                    <td>${element.nombre}</td>
                    <td>${element.descripcion}</td>
                    <td>${element.nit}</td>
                    <td><img src="${element.imagen}" style="width: 50%;"></td>
                    <td>
                        <a class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modificarModal" onclick='leerModificacion(${JSON.stringify(element)})'>Modificar</a>
                        <a class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#eliminarModal" onclick='leerModificacion(${JSON.stringify(element)})'>Inhabilitar</a>
                    </td>
                </tr>`;
            });
            document.getElementById("EmpresasCarga").innerHTML = table;
        })
        .catch(err => {
            console.error(err);
        });
    axios.get("/personas")
    .then(res => {
        const select = document.getElementById('txtAdmin');
        const admin = res.data;

        select.innerHTML = '<option selected disabled>Seleccionar</option>';

        admin.forEach(res => {
            const option = document.createElement('option');
            option.value = res.id;
            option.text = res.Nombre;
            select.appendChild(option);
        });
    })
    .catch(err => {
        console.error(err); 
    })
}


//funcion para limpiar los campos

function limpiar() {
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtDescripcion").value = "";
    document.getElementById("txtNit").value = "";
    document.getElementById("txtImagen").value = "";
    document.getElementById("txtDireccion").value = "";
    document.getElementById("txtTelefono").value = "";
    document.getElementById("txtLogo").value = "";
    document.getElementById("txtVision").value = "";
    document.getElementById("txtMision").value = "";
    document.getElementById("txtAdmin").value = "";
    document.getElementById("txtcorreo").value = "";
    document.getElementById("txtinstagram").value = "";
}

function leerModificacion(element) {
    console.log(element);
    this.id = element.id;
    txtNombre2.value = element.nombre;
    txtDescripcion2.value = element.descripcion;
    txtNit2.value = element.nit;
    txtImagen2.value = element.imagen;
    txtDireccion2.value = element.direccion;
    txtLogo2.value = element.logo;
    txtVision2.value = element.vision;
    txtMision2.value = element.mision;
    txtTelefono2.value = element.telefono;
    txtcorreo2.value = element.correo;
    txtinstagram2.value = element.instagram;
    axios.get("/personas")
    .then(res => {
        const select = document.getElementById('txtAdmin2');
        const admin = res.data;

        select.innerHTML = '<option selected disabled>Seleccionar</option>';

        admin.forEach(res => {
            const option = document.createElement('option');
            option.value = res.id;
            option.text = res.Nombre;
            select.appendChild(option);
        });
        txtAdmin2.value = element.admin_id;
    })
    .catch(err => {
        console.error(err); 
    })
}


function Modificar() {
    axios.put("/empresas/" + this.id, {
        id: this.id,
        nombre: txtNombre2.value,
        direccion: txtDireccion2.value,
        nit: txtNit2.value,
        telefono: txtTelefono2.value,
        admin_id: txtAdmin2.value,
        descripcion: txtDescripcion2.value,
        logo: txtLogo2.value,
        imagen: txtImagen2.value,
        vision: txtVision2.value,
        mision: txtMision2.value,
        correo: txtcorreo2.value,
        instagram: txtinstagram2.value,
    })
        .then(res => {

            console.log(res)
            alert("modificado")
            mostrar();
        })
        .catch(err => {
            console.error(err);
            alert("error al modificar ")
        })

}


function eliminar() {
    axios.delete("/empresas/" + this.id,)
        .then(res => {
            console.log(res)
            alert("Eliminado")
            mostrar();
        })
        .catch(err => {
            console.error(err);
            alert("error al eliminar");
        })
}
