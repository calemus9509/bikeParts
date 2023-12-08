let detallecarrito = "";
let totalGlobal = 0;
let carrito = [];
let tamañocar = "";

document.addEventListener("DOMContentLoaded", function () {
    // Obtén el input de búsqueda
    var searchInput = document.getElementById("searchInput");

    // Obtén el contenedor de resultados
    var autocompleteResults = document.getElementById("autocompleteResults");

    // recuperamos el array que viene desde otras paginas
    const carrito = JSON.parse(localStorage.getItem("productos")) || [];

    // aqui miramos si el carrito tiene productos o no
    if (carrito.length > 0) {
        // ejecutamos la funcion donde extraeremos los detalles de cada producto
        mostrarcarrito(carrito);
    } else {
        console.error("No hay nada agregado al carrito");
    }

    // Maneja el evento de cambio en el input de búsqueda
    searchInput.addEventListener("keyup", function () {
        var searchTerm = searchInput.value.trim();

        // Si el término de búsqueda no está vacío, realiza la búsqueda
        if (searchTerm !== "") {
            buscarAutocompletado(searchTerm);
        } else {
            // Si el término de búsqueda está vacío, oculta el contenedor de resultados
            autocompleteResults.style.display = "none";
        }
    });
});

// Modifica tu función de autocompletado en JavaScript
function buscarAutocompletado(termino) {
    // Obtén el contenedor de resultados
    var autocompleteResults = document.getElementById("autocompleteResults");

    // Realiza una solicitud al servidor para obtener resultados de autocompletado
    axios
        .get(
            `/buscar-autocompletado?termino=${termino}&empresa=${localStorage.getItem(
                "empresaSeleccionada"
            )}`
        )
        .then((res) => {
            // Muestra los resultados en la consola
            mostrarResultadosAutocompletado(res.data);

            // Controla la visibilidad del contenedor de resultados
            if (res.data.length > 0) {
                autocompleteResults.style.display = "block";
            } else {
                autocompleteResults.style.display = "none";
            }

            console.log("Resultados de la búsqueda:", res.data);
        })
        .catch((err) => {
            console.error(err);
        });
}

function mostrarResultadosAutocompletado(resultados) {
    var autocompleteResults = document.getElementById("autocompleteResults");
    autocompleteResults.innerHTML = ""; // Limpia los resultados anteriores

    // Verifica si hay resultados
    if (resultados.length > 0) {
        // Crea un contenedor para los resultados
        var resultsContainer = document.createElement("div");

        // Crea elementos para cada resultado y agrégales al contenedor
        resultados.forEach((resultado) => {
            var resultItem = document.createElement("div");
            resultItem.className = "card";
            resultItem.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${resultado.nombre}</h5>
                    <p class="card-text">Marca: ${resultado.marca}</p>
                    <p class="card-text">Descripción: ${resultado.descripcion}</p>
                </div>
            `;

            // Agrega un evento de clic al resultado
            resultItem.addEventListener("click", function () {
                // Al hacer clic, guarda el ID en localStorage y redirige a la página de detalles
                localStorage.setItem("productoId", resultado.idproducto);
                window.location.href = "/detalle";
            });

            resultsContainer.appendChild(resultItem);
        });

        autocompleteResults.addEventListener("click", function () {
            // Borra el contenido del input cuando se hace clic en el contenedor de resultados
            searchInput.value = "";
            autocompleteResults.style.display = "none";
        });

        // Agrega el contenedor de resultados al contenedor principal
        autocompleteResults.appendChild(resultsContainer);

        // Muestra el contenedor de resultados
        autocompleteResults.style.display = "block";
    } else {
        // Si no hay resultados, oculta el contenedor
        autocompleteResults.style.display = "none";
    }
}

// funciones de jaime del carrito
// evento que se ejecuta cuando se carga la pagina ademas de una validcion del carrito
// tambien se recupera lo del local storage
//Funcion donde extraemos los datos del array carrito y lo recorremos con la funcion del controlador
// del producto el cual ya tiene una ruta que es la que utilizamos buscando por id

function mostrarcarrito(carrito) {
    // Reiniciar el totalGlobal antes de empezar a mostrar el carrito
    totalGlobal = 0;
    detallecarrito = "";

    // Itera sobre cada ID y realiza una solicitud para cada uno
    carrito.forEach(function (idProducto, index) {
        // Llamada a la función del controlador de producto
        axios
            .get(`/obtener-producto/${idProducto}`)
            .then(function (res) {
                var producto = res.data.producto;
                let tamañocar = `${carrito.length}`;

                detallecarrito += `<div class="card mb-3  border-dark" style="max-width: 750px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="https://tiendaonlinebmw.vtexassets.com/arquivos/ids/158586-800-auto?v=637498647336900000&width=800&height=auto&aspect=true" class="img-fluid rounded-start w-100" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h2 class="card-title">${producto.nombre} - ${
                    producto.marca
                } </h2>
                            <p class="card-text">${producto.descripcion}</p>
                            <h4 class="mb-3 text-primary" id="precio${index}">Precio: $${
                    producto.precio
                }</h4>
        
                            <div class="d-flex justify-content-between align-items-center">
                                <!-- Botón de eliminar y campo de cantidad -->
                                <button class="btn btn-danger" onclick="eliminardelcarrito(${
                                    producto.idproducto
                                })">Eliminar</button>
                                <div class="input-group" style="width: 120px;">
                                    <input type="number" class="form-control border-dark" value="1" min="1" max="${
                                        producto.cantidad
                                    }" id="cantidadporca${index}" oninput='actCantidad(${JSON.stringify(
                    producto
                )}, ${index})'>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

                // sumamos el precio unitario para el primer subtotal
                totalGlobal += producto.precio;

                // Asigna el contenido de "detallecarrito" al elemento con id "detallecarrito"
                document.getElementById("detallecarrito").innerHTML =
                    detallecarrito;
                document.getElementById("total").innerHTML = "$" + totalGlobal;
                document.getElementById("cantidadItems").innerHTML =
                    tamañocar + "+";
                    document.getElementById("totalPRO").innerHTML = tamañocar;
            })
            .catch(function (error) {
                // Manejar errores
                console.error(`Error para el producto ${idProducto}:`, error);
            });
    });
}

// funcion que esta sirviendo
// function actCantidad(producto, index) {
//     let cantidadInput = document.getElementById(`cantidadporca${index}`);
//     let cantidadNueva = parseInt(cantidadInput.value, 10);
//     // Verificar si el campo del input está vacío y establecer cantidadNueva a 1
//     if (!cantidadInput.value || cantidadNueva === 0) {
//         cantidadNueva = 1;
//     }

//     // Obtener la cantidad anterior almacenada en un atributo data-prev-cantidad
//     let cantidadAnterior =
//         parseInt(cantidadInput.getAttribute("data-prev-cantidad"), 10) || 1;

//     // Restar el precio anterior multiplicado por la cantidad anterior al totalGlobal
//     totalGlobal -= cantidadAnterior * producto.precio;

//     // Sumar el nuevo precio multiplicado por la nueva cantidad al totalGlobal
//     totalGlobal += cantidadNueva * producto.precio;

//     // Actualizar el precio en el HTML
//     document.getElementById(`precio${index}`).innerHTML = `Precio: $${
//         cantidadNueva * producto.precio
//     }`;

//     // Actualizar el totalGlobal en el HTML
//     document.getElementById("total").innerHTML = "$" + totalGlobal;

//     // Almacenar la nueva cantidad como cantidad anterior para la próxima iteración
//     cantidadInput.setAttribute("data-prev-cantidad", cantidadNueva);
// }

function actCantidad(producto, index) {
    let cantidadInput = document.getElementById(`cantidadporca${index}`);
    let cantidadNueva = parseInt(cantidadInput.value, 10);

    // Verificar si el campo del input está vacío o la cantidad es menor a 1
    if (!cantidadInput.value || cantidadNueva < 1) {
        cantidadNueva = 1;
    }

    // Verificar si la cantidad nueva supera el stock disponible
    if (cantidadNueva > producto.cantidad) {
        // Si es mayor, establecer la cantidad al stock disponible
        cantidadNueva = producto.cantidad;
    }

    // Obtener la cantidad anterior almacenada en un atributo data-prev-cantidad
    let cantidadAnterior =
        parseInt(cantidadInput.getAttribute("data-prev-cantidad"), 10) || 1;

    // Restar el precio anterior multiplicado por la cantidad anterior al totalGlobal
    totalGlobal -= cantidadAnterior * producto.precio;

    // Sumar el nuevo precio multiplicado por la nueva cantidad al totalGlobal
    totalGlobal += cantidadNueva * producto.precio;

    // Actualizar el precio en el HTML
    document.getElementById(`precio${index}`).innerHTML = `Precio: $${
        cantidadNueva * producto.precio
    }`;

    // Actualizar el totalGlobal en el HTML
    document.getElementById("total").innerHTML = "$" + totalGlobal;

    // Actualizar el valor del input con la cantidad ajustada
    cantidadInput.value = cantidadNueva;

    // Almacenar la nueva cantidad como cantidad anterior para la próxima iteración
    cantidadInput.setAttribute("data-prev-cantidad", cantidadNueva);
}

// funcion que esta sirviendo...
function eliminardelcarrito(id) {
    carrito = JSON.parse(localStorage.getItem("productos")) || [];

    let index = carrito.indexOf(id);

    if (index !== -1) {
        carrito.splice(index, 1);
        mostrarAlerta("El producto se elimino con exito");

        if (carrito.length === 0) {
            // Si el carrito está vacío, establecer contenido y totalGlobal en cero
            detallecarrito = "";
            totalGlobal = 0;
            tamañocar = 0;
            document.getElementById("detallecarrito").innerHTML =
                detallecarrito;
            document.getElementById("total").innerHTML = "$" + totalGlobal;
            localStorage.removeItem("productos");
            document.getElementById("cantidadItems").innerHTML =
                tamañocar + "+";
                document.getElementById("totalPRO").innerHTML = tamañocar;
        } else {
            // Si el carrito no está vacío, actualizar la interfaz de usuario
            localStorage.productos = JSON.stringify(carrito);
            setTimeout(actualizarpagina, 1000);
        }
    } else {
        console.log("El producto no se encontró en el array");
    }
}

function completarCompra() {
    // Enviar detalles del carrito por WhatsApp
    enviarCarritoPorWhatsApp(carrito);
}

// Función para enviar el carrito por WhatsApp utilizando Click to Chat
async function enviarCarritoPorWhatsApp(producto, index) {
    // Obtén la información del carrito actualizada (solo los IDs)
    const carritoActualizado =
        JSON.parse(localStorage.getItem("productos")) || [];

    // Verifica si el carrito está vacío
    if (carritoActualizado.length === 0) {
        alert("No hay productos en el carrito.");
        return;
    }

    // Array para almacenar los detalles completos de los productos
    const detallesProductos = [];

    // Itera sobre los IDs del carrito y obtén los detalles de cada producto
    for (const idProducto of carritoActualizado) {
        try {
            // Llamada a la función del controlador para obtener detalles del producto
            const response = await axios.get(`/obtener-producto/${idProducto}`);
            const producto = response.data.producto;

            // Agrega los detalles del producto al array
            detallesProductos.push(producto);
        } catch (error) {
            console.error(
                `Error al obtener detalles del producto ${idProducto}:`,
                error
            );
        }
    }

    // Formatea la información del carrito para enviarla por WhatsApp
    let mensajeWhatsApp =
        "¡Gracias Por Elegir a BIKEPARTS!\nDetalles del carrito:\nTotal Compra:" +
        totalGlobal +
        "\n";

    detallesProductos.forEach((producto, index) => {
        // Obtén la cantidad seleccionada por el usuario
        const cantidadInput = document.getElementById(`cantidadporca${index}`);
        const cantidadElegida = parseInt(cantidadInput.value, 10);

        mensajeWhatsApp += `${index + 1}. ${producto.nombre} - ${
            producto.marca
        }\n`;
        mensajeWhatsApp += `   Precio x unidad: $${producto.precio}\n`;
        mensajeWhatsApp += `   Cantidad: ${cantidadElegida}\n\n`;
    });

    // Número de teléfono al que se enviará el mensaje (incluyendo el prefijo internacional)
    const numeroDestino = "+573217361556";
    //  +573217361556 lemus
    // +573185958871 kevin
    //  +573102445188 Jaime

    // Generar el enlace "Click to Chat" de WhatsApp
    const enlaceWhatsApp = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(
        mensajeWhatsApp
    )}`;
    const confirmacion = window.confirm(
        "Este Pedido se enviará atraves de whatsapp, Si aceptas, los productos se eliminaran del carrito, ¿estas de acuerdo?"
    );

    // Verifica si el usuario confirmó
    if (confirmacion) {
        window.open(enlaceWhatsApp, "_blank");
        localStorage.removeItem("productos");
        location.reload();
    } else {
        // El usuario canceló, puedes agregar un mensaje o hacer algo más si lo deseas
        console.log("Operación cancelada por el usuario");
    }
}

// onclicks del modal
function retirodepagina() {
    window.location.href = "/";
    localStorage.removeItem("productos");
}
function validacioncarrito() {
    const carrito = JSON.parse(localStorage.getItem("productos")) || [];
    if (carrito.length >= 1) {
        $("#exampleModal").modal("show");
    } else {
        window.location.href = "/";
    }
}

function nosotros() {
    const empresaId = localStorage.getItem("empresaSeleccionada");
    axios
        .get(`/empresas/${empresaId}`)
        .then((res) => {
            console.log(res);
            footer = "";

            footer += `<h3>Información de Contacto</h3>
            <p>Teléfono: +57-${res.data.telefono}</p>
            <p>Email: ${res.data.correo}</p>
            <p>Dirección: ${res.data.direccion}</p>
            <a href="${res.data.instagram}" style="text-decoration: none;">Instagram</a>`;

            document.getElementById("footer").innerHTML = footer;
        })
        .catch((err) => {
            console.error(err);
        });
}
nosotros();

// funciones de alertas
function mostrarAlerta(mensaje) {
    alertify.set("notifier", "position", "top-center");
    alertify.error(mensaje, 3);
}

function actualizarpagina() {
    location.reload();
}

function enviarRecla(){
    const empresaId = localStorage.getItem("empresaSeleccionada");
    axios.post("/reclamaciones", {
        reclamacion: txtRecla.value,
        empre_id: empresaId,
    })
    .then(res => {
        console.log(res)
        txtRecla.value = "";
        alert("reclamacion o sugerencia enviada");
    })
    .catch(err => {
        console.error(err); 
    })
}