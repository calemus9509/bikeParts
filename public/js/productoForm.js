function registrar() {
    const formData = new FormData();
    const files = document.getElementById("txtImagenes").files;

    if (files.length > 4) {
        mostrarAlerta2("Selecciona un máximo de 4 imágenes.");
        return; // Detener la ejecución si hay más de 4 imágenes
    }

    // Agregar imágenes al formulario solo si hay imágenes seleccionadas
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            formData.append("imagenes[]", files[i]);
        }
    }

    formData.append("nombre", txtNombre.value);
    formData.append("cantidad", txtCantidad.value);
    formData.append("descripcion", txtDescripcion.value);
    formData.append("precio", txtPrecio.value);
    formData.append("marca", txtMarca.value);
    formData.append("categoriaF", txtCategoria.value);
    formData.append("empresa_id", txtEmpresa.value);

    axios
        .post("producto", formData, {})
        .then(function (response) {
            mostrarAlerta("Producto Creado")
            txtNombre.value = "";
            txtCantidad.value = "";
            txtDescripcion.value = "";
            txtPrecio.value = "";
            txtMarca.value = "";
            txtCategoria.value = "";
            txtImagenes.value = "";
        })
        .catch(function (error) {
            mostrarAlerta2("Producto no creado exitósamente")
        });
}

function foraneas() {
    // Llamada para obtener las categorías
    axios
        .get("/categorias")
        .then(function (response) {
            const select = document.getElementById("txtCategoria");

            // Agrega las opciones al select
            select.innerHTML =
                '<option value="" selected disabled>Seleccionar</option>';
            response.data.forEach((element) => {
                const option = document.createElement("option");
                option.value = element.idcategorias;
                option.text = element.nombre;
                select.appendChild(option);
            });
        })
        .catch(function (error) {
            console.log(error);
        });

    // Llamada para obtener la información del usuario (incluido el ID de la empresa)
    axios
        .get("/check-session")
        .then(function (response) {
            const empresaInput = document.getElementById("txtEmpresa");

            // Verifica si la sesión está activa
            if (response.data.success) {
                const empresaId = response.data.user.empresa_id;
                // Establece el valor del input de la empresa
                empresaInput.value = empresaId;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

foraneas();

function mostrarAlerta(mensaje) {
    alertify.success(mensaje);
}
function mostrarAlerta2(mensaje) {
    alertify.error(mensaje);
}