var id = 0;

function obtenerInformacionUsuario() {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
}

function read(url = "producto") {
    axios
        .get(url)
        .then(function (response) {
            console.log(response.data); // Imprime la respuesta en la consola

            let productos = "";
            // Verifica si hay productos en la respuesta
            if (response.data.productos && response.data.productos.length > 0) {
                response.data.productos.forEach((element, index) => {
                    productos += `<tr>`;
                    productos += `<th scope='row'>${index + 1} </th>`;
                    productos += `<td>${element.nombre} </td>`;
                    productos += `<td>${element.cantidad}</td>`;
                    productos += `<td>${element.descripcion}</td>`;
                    productos += `<td>${element.precio}</td>`;
                    productos += `<td>${element.marca}</td>`;
                    productos += `<td>${element.nombreCategoria}</td>`;
                    // Mostrar la primera imagen de manera separada
                    productos += `<td>`;
                    if (element.imagenes) {
                        try {
                            const imagenesArray = JSON.parse(element.imagenes);

                            if (imagenesArray.length > 0) {
                                productos += `<img src="${imagenesArray[0]}" alt="Imagen 1" style="max-width: 100px; max-height: 100px;">`;
                            } else {
                                // Si el array de imágenes está vacío, mostrar la imagen predeterminada
                                productos += `<img src="/storage/img/Producto-sin-imagen.jpg" alt="Producto sin imagen" style="max-width: 100px; max-height: 100px;">`;
                            }
                        } catch (error) {
                            console.error(
                                "Error al parsear las rutas de las imágenes:",
                                error
                            );
                            productos += `Error al cargar imágenes`;
                        }
                    } else {
                        // Si no hay imágenes, mostrar la imagen predeterminada
                        productos += `<img src="/storage/img/Producto-sin-imagen.jpg" alt="Producto sin imagen" style="max-width: 100px; max-height: 100px;">`;
                    }
                    productos += `</td>`;

                    productos += `<td>
                    <a onclick='leerModi(${JSON.stringify(
                        element
                    )})' class='btn btn-outline-warning my-1'  style="width: 100px;"  data-bs-toggle="modal" data-bs-target="#modificarModal">Modificar</a>
                    <a onclick="leerEliminar(${element.idproducto}, '${
                        element.nombre
                    }')" class="btn btn-outline-danger my-1"  style="width: 100px;" data-bs-toggle="modal" data-bs-target="#eliminarModal">Eliminar</a>
                </td>`;
                    productos += `</tr>`;
                });
            } else {
                // Si no hay productos, podrías mostrar un mensaje o realizar alguna otra acción
                productos = `<tr><td colspan="8">No hay productos disponibles.</td></tr>`;
            }
            tableBodyInventario.innerHTML = productos;
        })
        .catch(function (error) {
            console.log(error);
        });
    // Resto de tu función read

    // Función del DataTable
    new DataTable("#tablaSimple", {
        retrieve: true,
        language: {
            url: "./json/es.json",
        },
        dom: "Bfrtip",
        buttons: [
            {
                extend: "colvis",
                text: "<i class='fa-solid fa-filter fa-beat'></i>",
                titleAttr: "Filtrar",
                className: "filtro",
            },
            {
                extend: "excel",
                text: "<i class='fa-solid fa-file-excel fa-bounce'></i>",
                titleAttr: "Excel",
                className: "excel",
                exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6] },
            },
            {
                extend: "print",
                text: "<i class='fa-solid fa-print fa-bounce'></i>",
                titleAttr: "Imprimir",
                className: "imprimir",
                exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6] },
            },
            {
                download: "open",
                extend: "pdf",
                text: "<i class='fa-solid fa-file-pdf fa-bounce'></i>",
                titleAttr: "PDF",
                className: "pdf",
                exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6] },
            },
            {
                extend: "copy",
                text: "<i class='fa-solid fa-copy fa-bounce'></i>",
                titleAttr: "Copiar",
                className: "copy",
                exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6] },
            },
        ],
    });
}
function selCategorias() {
    axios
        .get("categorias")
        .then(function (response) {
            const select = document.getElementById("txtCategoriaMod");
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

//mostrar en el modal lo seleccionado
function leerModi(id) {
    console.log(id);
    this.idproducto = id.idproducto;
    txtNombreMod.value = id.nombre;
    txtCantidadMod.value = id.cantidad;
    txtDescripcionMod.value = id.descripcion;
    txtPrecioMod.value = id.precio;
    txtMarcaMod.value = id.marca;
    axios
        .get("categorias")
        .then(function (response) {
            const select = document.getElementById("txtCategoriaMod");
            const categoria = response.data;
            select.innerHTML =
                '<option value="" selected disabled>Seleccionar</option>';
            categoria.forEach((element) => {
                const option = document.createElement("option");
                option.value = element.idcategorias;
                option.text = element.nombre;
                select.appendChild(option);
            });
            txtCategoriaMod.value = id.categoriaF;
        })

        .catch(function (error) {
            console.log(error);
        });
}

//modificar producto
function modificar() {
    axios
        .put(`/producto/${idproducto}`, {
            idproducto: idproducto,
            nombre: txtNombreMod.value,
            cantidad: txtCantidadMod.value,
            descripcion: txtDescripcionMod.value,
            precio: txtPrecioMod.value,
            marca: txtMarcaMod.value,
            categoriaF: txtCategoriaMod.value,
        })
        .then(function (response) {
            mostrarAlerta("Modificado correctamente");
            read();
        })
        .catch(function (error) {
            console.log(error);
        });
}

//eliminar producto
function eliminar() {
    axios
        .delete(`/producto/${idproducto}`)
        .then(function (response) {
            // console.log(response);
            mostrarAlerta2("Eliminado correctamente");
            read();
        })
        .catch(function (error) {
            console.log(error);
        });
}

function leerEliminar(id, nombre) {
    this.idproducto = id;
    mensaje.innerHTML = `Esta seguro de eliminar el producto  ${nombre} ?`;
}

selCategorias();
read();

function mostrarAlerta(mensaje) {
    alertify.success(mensaje);
}
function mostrarAlerta2(mensaje) {
    alertify.error(mensaje);
}
