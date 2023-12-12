// Función para mostrar los detalles del producto
function mostrarDetalleProducto(id) {
    // Realiza una solicitud Axios para obtener los detalles del producto por ID
    axios
        .get(`/obtener-producto/${id}`)
        .then((res) => {
            var producto = res.data.producto; // Accede al objeto producto
            var imagenesArray = JSON.parse(producto.imagenes);
            // Aquí puedes usar la información del producto como desees
            console.log(producto);
            var stock = producto.cantidad;

            // Actualiza el contenido de "detalle"
            var detalle = `<div class="row">
            <div class="col-md-6 p-3 mt-5 d-flex flex-column align-items-center">
                <h1 class="text-center">${producto.nombre}-${producto.marca}</h1>
                <div class="mt-5">
                    <h5 style="font-weight: 500;">${producto.descripcion}</h5>
                </div>
                <div class="mt-5 mb-3 d-flex justify-content-start">
                </div>
                <div class="mb-3 d-flex justify-content-start">
                    <h3>Precio: $${producto.precio}</h3>
                </div>
                <div id="stock">
                  
                </div>
                <div class="mt-3 mb-3 text-white">
                    <a class="btn btn-primary" style="width: 100%; font-weight: 600;" onclick="agregaralcarrito(${producto.idproducto})">AGREGAR AL CARRITO</a>
                </div>
            </div>
            <div class="col-md-6">
                <div class="m-3 border border-black border-5 rounded-4" style="height: 500px; background-color: rgb(209, 206, 206); overflow: hidden;">
                    <img src="${imagenesArray[0]}" alt="" style="width: 100%; height: 100%; object-fit: cover; cursor: pointer;" onclick="abrirImagenModal('${imagenesArray[0]}')">
                </div>
                <div class="m-3 bg-primary" style="height: 20px;">
                    <!-- Contenido del div bg-primary -->
                </div>
                <div class="mb-4 d-flex justify-content-around">
                    <div class="border border-black border-5" style="height: 100px; background-color: rgb(209, 206, 206); width: 100px; overflow: hidden;">
                        <img src="${imagenesArray[1]}" alt="" style="width: 100%; height: 100%; object-fit: cover; cursor: pointer;" onclick="abrirImagenModal('${imagenesArray[1]}')">
                    </div>
                    <div class="border border-black border-5" style="height: 100px; background-color: rgb(209, 206, 206); width: 100px; overflow: hidden;">
                        <img src="${imagenesArray[2]}" alt="" style="width: 100%; height: 100%; object-fit: cover; cursor: pointer;" onclick="abrirImagenModal('${imagenesArray[2]}')">
                    </div>
                    <div class="border border-black border-5" style="height: 100px; background-color: rgb(209, 206, 206); width: 100px; overflow: hidden;">
                        <img src="${imagenesArray[3]}" alt="" style="width: 100%; height: 100%; object-fit: cover; cursor: pointer;" onclick="abrirImagenModal('${imagenesArray[3]}')">
                    </div>
                </div>
            </div>
        </div>`;

            // Asigna el contenido de "detalle" al elemento con id "detalles"
            document.getElementById("detalles").innerHTML = detalle;

            if (stock < 15 && stock > 0) {
                document.getElementById("stock").innerHTML = `
                <div class="mt-5 mb-5 bg-warning text-center rounded" >
                <h2>Stock Bajo</h2>
               </div>`;
            } else if (stock === 0) {
                document.getElementById("stock").innerHTML = `
               <div class="mt-5 mb-5 bg-danger text-center rounded">
               <h2>Stock No Disponible</h2>
              </div>`;
            } else if (stock >= 15) {
                document.getElementById("stock").innerHTML = `
               <div class="mt-5 mb-5 bg-success text-center rounded" >
               <h2>Stock  Disponible</h2>
              </div>`;
            }
        })
        .catch((err) => {
            console.error(err);
        });
}
// Función para abrir la imagen en otra pestaña
function abrirImagenEnOtraPestana(src) {
    window.open(src, "_blank");
}

// Función para abrir el modal con la imagen seleccionada
function abrirImagenModal(src) {
    abrirImagenEnOtraPestana(src);
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

// funcion de la alerta de retiro
function validacioncarrito() {
    const carrito = JSON.parse(localStorage.getItem("productos")) || [];
    if (carrito.length >= 1) {
        Swal.fire({
            title: '¿Estas Seguro?',
            text: 'Si te retiras de esta tienda, el carrito sera vaciado!',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Retirarme',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            // Verifica cuál botón se presionó
            if (result.isConfirmed) {
                window.location.href = "/";
                localStorage.removeItem("productos");
            } 
        });
    } else {
        window.location.href = "/";
    }
}

// Función del carrito
function agregaralcarrito(id) {
    // Realiza una solicitud para obtener los detalles del producto por ID
    axios
        .get(`/obtener-producto/${id}`)
        .then((res) => {
            var producto = res.data.producto;

            // Verifica la cantidad del producto antes de agregarlo al carrito
            if (producto.cantidad > 0) {
                // Verifica si el ID ya está en el carrito
                if (!carrito.includes(id)) {
                    carrito.push(id);

                    alertaggcarrito()
                    localStorage.productos = JSON.stringify(carrito);
                } else {
                    alertaggcarrito2()
                }
            } else {
                alertaggcarrito3()
            }
        })
        .catch((err) => {
            console.error(err);
        });
}

carrito = JSON.parse(localStorage.getItem("productos")) || [];

// funciones de sweetalert2
// agregado al carrito
function alertaggcarrito() {
    Swal.fire({
        title: 'Producto Agregado Correctamente al Carrito',
        icon: 'success',
        confirmButtonText: 'Ok',
        position: 'top-end', // Posiciona la notificación en la esquina superior derecha
        timer: 2000, // Cierra automáticamente después de 3 segundos
        toast: true, // Establece el modo "toast" para notificaciones pequeñas
        showConfirmButton: false // No muestra el botón de confirmación
    });
}
// ya esta agregado al carrito
function alertaggcarrito2() {
    Swal.fire({
        title: 'Producto ya en el Carrito',
        icon: 'warning',
        confirmButtonText: 'Ok',
        position: 'top-end', // Posiciona la notificación en la esquina superior derecha
        timer: 2000, // Cierra automáticamente después de 3 segundos
        toast: true, // Establece el modo "toast" para notificaciones pequeñas
        showConfirmButton: false // No muestra el botón de confirmación
    });
}
// no hay stock del producto
function alertaggcarrito3() {
    Swal.fire({
        title: 'Producto Sin Stock',
        icon: 'error',
        confirmButtonText: 'Ok',
        position: 'top-end', // Posiciona la notificación en la esquina superior derecha
        timer: 2000, // Cierra automáticamente después de 3 segundos
        toast: true, // Establece el modo "toast" para notificaciones pequeñas
        showConfirmButton: false // No muestra el botón de confirmación
    });
}

function enviarRecla() {
    const empresaId = localStorage.getItem("empresaSeleccionada");
    axios
        .post("/reclamaciones", {
            reclamacion: txtRecla.value,
            empre_id: empresaId,
        })
        .then((res) => {
            console.log(res);
            txtRecla.value = "";
            alert("reclamacion o sugerencia enviada");
        })
        .catch((err) => {
            console.error(err);
        });
}
function nosotros() {
    const empresaId = localStorage.getItem("empresaSeleccionada");
    axios
        .get(`/empresas/${empresaId}`)
        .then((res) => {
            console.log(res);
            const logoP = JSON.parse(res.data.logo);
            footer = "";
            log = "";
            log2 = "";

            footer += `<h3>Información de Contacto</h3>
            <p>Teléfono: +57-${res.data.telefono}</p>
            <p>Email: ${res.data.correo}</p>
            <p>Dirección: ${res.data.direccion}</p>
            <a href="${res.data.instagram}" style="text-decoration: none;">Instagram</a>`;
            log += `<img src="${logoP[0]}" alt="" class="img-responsive">`;
            log2 += `<img src="${logoP[0]}" style="width: 30%;" alt="">`;

            document.getElementById("footer").innerHTML = footer;
            document.getElementById("logo").innerHTML = log;
            document.getElementById("logo2").innerHTML = log2;
        })
        .catch((err) => {
            console.error(err);
        });
}
nosotros();
