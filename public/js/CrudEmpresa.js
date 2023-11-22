//funcion para insercion de datos
var id = 0;

function crear() {
    axios.post("/empresas", {
        nombre: txtNombre.value,
        descripcion: txtDescripcion.value,
        nit: txtNit.value,
        imagen: txtImagen.value
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
                    <td><img src="${element.imagen}" alt="${element.nombre}" width="50"></td>
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
}


//funcion para limpiar los campos

function limpiar() {
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtDescripcion").value = "";
    document.getElementById("txtNit").value = "";
    document.getElementById("txtImagen").value = "";
}

function leerModificacion(element) {
    console.log(element);
    this.id = element.id;
    txtNombre2.value = element.nombre;
    txtDescripcion2.value = element.descripcion;
    txtNit2.value = element.nit;
    txtImagen2.value = element.imagen;
}


function Modificar() {
    axios.put("/empresas/" + this.id, {
        id: this.id,
        nombre: txtNombre2.value,
        descripcion: txtDescripcion2.value,
        nit: txtNit2.value,
        imagen: txtImagen2.value
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
