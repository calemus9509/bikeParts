function registrar() {
    const formData = new FormData();
    const files = document.getElementById("txtImagenes").files;

    for (let i = 0; i < files.length; i++) {
        formData.append("imagenes[]", files[i]);
    }

    formData.append("nombre", txtNombre.value);
    formData.append("cantidad", txtCantidad.value);
    formData.append("descripcion", txtDescripcion.value);
    formData.append("precio", txtPrecio.value);
    formData.append("marca", txtMarca.value);
    formData.append("categoriaF", txtCategoria.value);

    axios
        .post("producto", formData, {})
        .then(function (response) {
            console.log(response);

            clear();
        })
        .catch(function (error) {
            console.log(error);
        });

    alert("Producto Creado!");
}

// function create() {
//     const formData = new FormData();
//     const files = document.getElementById("txtImagenes").files;

//     for (let i = 0; i < files.length; i++) {
//         formData.append("imagenes[]", files[i]);
//     }
//     axios
//         .post("imagenes", formData)
//         .then((res) => {
//             console.log(res);
//         })
//         .catch((err) => {
//             console.error(err);
//         });
// }

// // Función para agregar un archivo al FormData si está presente
// function addFileToFormData(fieldName, fileInput, formData) {
//     if (fileInput && fileInput.files && fileInput.files.length > 0) {
//         formData.append(fieldName, fileInput.files[0]);
//     }
// }

function foraneas() {
    axios
        .get("categorias")
        .then(function (response) {
            const select = document.getElementById("txtCategoria");
            const categoria = response.data;
            select.innerHTML =
                '<option value="" selected disabled>Seleccionar</option>';
            categoria.forEach((element) => {
                const option = document.createElement("option");
                option.value = element.idcategorias;
                option.text = element.nombre;
                select.appendChild(option);
            });
        })

        .catch(function (error) {
            console.log(error);
        });
}
function clear() {}

foraneas();
