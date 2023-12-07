// Función para mostrar los detalles del producto
function mostrarDetalleProducto(id) {
    // Realiza una solicitud Axios para obtener los detalles del producto por ID
    axios
        .get(`/obtener-producto/${id}`)
        .then((res) => {
            var producto = res.data.producto; // Accede al objeto producto
            // Aquí puedes usar la información del producto como desees
            console.log(producto);

            // Actualiza el contenido de "detalle"
            var detalle = `<div class="row">
            <div class="col-md-6 p-3 mt-5 d-flex flex-column align-items-center">
                <h1 class="text-center">${producto.nombre}-${producto.marca}</h1>
                <div class="mt-5">
                    <h5 style="font-weight: 500;">${producto.descripcion}</h5>
                </div>
                <div class="mt-5 mb-3 d-flex justify-content-start">
                    <h5 style="font-weight: 500;">CANTIDAD: ${producto.cantidad}</h5>
                </div>
                <div class="mb-3 d-flex justify-content-start">
                    <h3>Precio: $${producto.precio}</h3>
                </div>
                <div class="mt-5 mb-3 bg-primary text-center rounded">
                    <h2>STOCK DISPONIBLE</h2>
                </div>
                <div class="mt-3 mb-3 text-white">
                    <a class="btn btn-primary" style="width: 100%; font-weight: 600;" onclick="agregaralcarrito(${producto.idproducto})">AGREGAR AL CARRITO</a>
                </div>
            </div>
            <div class="col-md-6">
                <div class="m-3 border border-black border-5 rounded-4" style="height: 500px; background-color: rgb(209, 206, 206); overflow: hidden;">
                    <img src="img/duke.jpg" alt="" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="m-3 bg-primary" style="height: 20px;">
                    <!-- Contenido del div bg-primary -->
                </div>
                <div class="mb-4 d-flex justify-content-around">
                    <div class="border border-black border-5" style="height: 100px; background-color: rgb(209, 206, 206); width: 100px; overflow: hidden;">
                        <img src="img/duke.jpg" alt="" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div class="border border-black border-5" style="height: 100px; background-color: rgb(209, 206, 206); width: 100px; overflow: hidden;">
                        <img src="img/duke.jpg" alt="" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div class="border border-black border-5" style="height: 100px; background-color: rgb(209, 206, 206); width: 100px; overflow: hidden;">
                        <img src="img/duke.jpg" alt="" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                </div>
            </div>
        </div>`;

            // Asigna el contenido de "detalle" al elemento con id "detalles"
            document.getElementById("detalles").innerHTML = detalle;
        })
        .catch((err) => {
            console.error(err);
        });
}

// En tu archivo Detalle.js (o donde tengas tu lógica de la página de detalles)

document.addEventListener("DOMContentLoaded", function () {
    // Recupera el ID del producto almacenado en el localStorage
    var productoId = localStorage.getItem("productoId");

    // Verifica si el ID está presente
    if (productoId) {
        // Llama a la función para mostrar los detalles del producto
        mostrarDetalleProducto(productoId);
    } else {
        console.error("No se encontró el ID del producto en el localStorage");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Obtén el input de búsqueda
    var searchInput = document.getElementById("searchInput");

    // Obtén el contenedor de resultados
    var autocompleteResults = document.getElementById("autocompleteResults");

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

function mostrarcantidadcarrito() {
    const carrito = JSON.parse(localStorage.getItem("productos")) || [];
    tamañocarrito = `${carrito.length}+`;
    document.getElementById("cantidadItems").innerHTML = `${carrito.length}+`;
    console.log(tamañocarrito);
}
setInterval(mostrarcantidadcarrito, 500);
// onclicks del modal
function retirodepagina() {
    window.location.href = "/";
    localStorage.removeItem("productos");
}
function noretiro() {
    window.location.href = "/carrito";
}
function validacioncarrito() {
    const carrito = JSON.parse(localStorage.getItem("productos")) || [];
    if (carrito.length >= 1) {
        $("#exampleModal").modal("show");
    } else {
        window.location.href = "/";
    }
}

// funcion del carrito
function agregaralcarrito(id) {
    // Verificar si el ID ya está en el carrito
    if (!carrito.includes(id)) {
        carrito.push(id);

        mostrarAlerta("Producto agregado al carrito");
        localStorage.productos = JSON.stringify(carrito);
    } else {
        mostrarAlerta2("El producto ya está en el carrito");
    }
    console.log(carrito);
}
carrito = JSON.parse(localStorage.getItem("productos")) || [];

function mostrarAlerta(mensaje) {
    alertify.set("notifier", "position", "top-center");
    alertify.success(mensaje, 3);
}
function mostrarAlerta2(mensaje) {
    alertify.set("notifier", "position", "top-center");
    alertify.error(mensaje, 3); // Duración de 3 segundos
}
