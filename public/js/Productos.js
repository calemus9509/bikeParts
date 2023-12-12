function MostrarProductos(pagina = 1) {
    productoFiltro = localStorage.getItem("idCategory");
    const empresaId = localStorage.getItem("empresaSeleccionada");
    const orden = localStorage.getItem("ordenSeleccionado");
    console.log(orden);
    if (productoFiltro && productoFiltro >= 0) {
        axios
            .get(
                `/obtener-productos/${productoFiltro}?empresa=${empresaId}&page=${pagina}&orden=${orden}`
            )
            .then((res) => {
                console.log(res.data);
                var productos = res.data;
                // Encuentra el elemento padre que contiene el fragmento que deseas eliminar
                var padre = document.querySelector(
                    ".col.d-flex.justify-content-end"
                );

                // Verifica si el elemento padre existe antes de intentar eliminar
                if (padre) {
                    // Elimina todos los elementos hijos del padre
                    while (padre.firstChild) {
                        padre.removeChild(padre.firstChild);
                    }
                } else {
                    console.error("No se encontraron elementos para eliminar.");
                }

                // Verificar si hay productos antes de intentar acceder a la propiedad 'data'
                if (productos && productos.length > 0) {
                    var card = "";

                    productos.forEach((element) => {
                        const imagenesArray = JSON.parse(element.imagenes);
                        card += `<div class="col-md-3 mb-4">
                        <div class="card h-100" style="width: 18rem;" onmouseover="hoverCard2(this)" onmouseout="unhoverCard2(this)">
                        <img src="${imagenesArray[0]}" class="card-img-top" alt="..." style="object-fit: cover;  height: 200px;">
                        <div class="card-body">
                            <h5 class="card-title">${element.nombre}-${element.marca}L</h5>
                            <p class="card-text text-primary">${element.descripcion}</p>
                            <h3>Precio: $${element.precio}</h3>
                            <div class="d-flex" style="flex-direction: row;">
                                <button class="btn btn-dark" onclick="mostrarDetalle(${element.idproducto})">SABER MÁS</button>
                                <a class="btn btn-primary ms-3" onclick="agregaralcarrito(${element.idproducto})">COMPRAR</a>
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>`;
                    });

                    document.getElementById("productos").innerHTML = card;

                    // Eliminar la paginación
                    document.getElementById("paginacion").innerHTML = "";

                    document
                        .getElementById("productos")
                        .scrollIntoView({ behavior: "smooth" });
                } else {
                    // Manejar el caso cuando no hay productos
                    console.error(
                        "No se encontraron productos para la categoría seleccionada."
                    );
                }
            })
            .catch((err) => {
                console.error(err);
            });
    } else {
        // Configurar la URL de la solicitud de productos
        let url = empresaId
            ? `/obtener-productos-ordenados/${orden}?empresa=${empresaId}&page=${pagina}`
            : `/obtener-productos?page=${pagina}&orden=${orden}`;

        axios
            .get(url)
            .then((res) => {
                console.log(res);
                var productos = res.data; // Solo la información de paginación
                var card = "";

                productos.data.forEach((element) => {
                    const imagenesArray = JSON.parse(element.imagenes);
                    console.log(imagenesArray);
                    card += `<div class="col-md-3 mb-4">
                    <div class="card h-100" style="width: 18rem;" onmouseover="hoverCard2(this)" onmouseout="unhoverCard2(this)">
                    <img src="${imagenesArray[0]}" class="card-img-top" alt="..." style="object-fit: cover;  height: 200px;">
                    <div class="card-body">
                        <h5 class="card-title">${element.nombre}-${element.marca}L</h5>
                        <p class="card-text text-primary">${element.descripcion}</p>
                        <h3>Precio: $${element.precio}</h3>
                        <div class="d-flex" style="flex-direction: row;">
                            <button class="btn btn-dark" onclick="mostrarDetalle(${element.idproducto})">SABER MÁS</button>
                            <a class="btn btn-primary ms-3" onclick="agregaralcarrito(${element.idproducto})">COMPRAR</a>
                        </div>
                    </div>
                </div>
                </div>
                </div>`;
                });

                document.getElementById("productos").innerHTML = card;

                // Actualizar la paginación si es necesario
                if (productos.total > productos.per_page) {
                    actualizarPaginacion(productos);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    axios
        .get("/categorias")
        .then((res) => {
            var card2 = "";
            res.data.forEach((element) => {
                const imagenesArray = JSON.parse(element.imagenes);
                card2 += `<div class="card m-2" style="width: 14rem; position: relative; overflow: hidden;" onmouseover="hoverCard(this)"
                onmouseout="unhoverCard(this)" >
                <img src="${imagenesArray[0]}" class="card-img-top" alt="..."
                    style="width: 100%; height: 100%; object-fit: cover;">
                <div class="card-overlay" onclick="filtrarPorCategoria(${element.idcategorias})"
    
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease;">
                    <h3 style="color: white; font-size: 1.5rem; transition: transform 0.3s ease;">${element.nombre}</h3>
                </div>
            </div>`;
            });
            document.getElementById("categoriasss").innerHTML = card2;
        })
        .catch((err) => {
            console.error(err);
        });
}

// efectos de la carta de categorias
function hoverCard(card) {
    card.querySelector('.card-overlay').style.opacity = "1";
    card.querySelector('h3').style.transform = "scale(1.1)";
}

function unhoverCard(card) {
    card.querySelector('.card-overlay').style.opacity = "0";
    card.querySelector('h3').style.transform = "scale(1)";
}
// fin de efectos

// efectos de la cartas de productos
function hoverCard2(card) {
    card.style.transform = "scale(1.05)";
    card.style.border = "2px solid blue";
}

function unhoverCard2(card) {
    card.style.transform = "scale(1)";
    card.style.border = "";
}
// fin de efectos de cartas de productos


function handleOrdenSelection(orden) {
    // Guarda la elección del usuario en el localStorage
    localStorage.setItem("ordenSeleccionado", orden);

    // Obtiene la página actual del localStorage
    const paginaActual = localStorage.getItem("paginaActual") || 1;

    // Llama a la función MostrarProductos con la nueva elección del orden y la página actual
    MostrarProductos(paginaActual, orden);
}

function eliminarIdCategory() {
    localStorage.removeItem("idCategory");
    localStorage.removeItem("ordenSeleccionado");
}

function filtrarPorCategoria(categoriaId) {
    // Obtener el ID de la empresa desde el localStorage
    const empresaId = localStorage.getItem("empresaSeleccionada");

    axios
        .get(`/obtener-productos/${categoriaId}?empresa=${empresaId}`)
        .then((res) => {
            console.log(res.data);
            var productos = res.data;
            // Encuentra el elemento padre que contiene el fragmento que deseas eliminar
            var padre = document.querySelector(
                ".col.d-flex.justify-content-end"
            );

            // Verifica si el elemento padre existe antes de intentar eliminar
            if (padre) {
                // Elimina todos los elementos hijos del padre
                while (padre.firstChild) {
                    padre.removeChild(padre.firstChild);
                }
            } else {
                console.error("No se encontraron elementos para eliminar.");
            }

            // Verificar si hay productos antes de intentar acceder a la propiedad 'data'
            if (productos && productos.length > 0) {
                var card = "";

                productos.forEach((element) => {
                    const imagenesArray = JSON.parse(element.imagenes);
                    card += `<div class="col-md-3 mb-4">
                    <div class="card h-100" style="width: 18rem;" onmouseover="hoverCard2(this)" onmouseout="unhoverCard2(this)">
                    <img src="${imagenesArray[0]}" class="card-img-top" alt="..." style="object-fit: cover;  height: 200px;">
                    <div class="card-body">
                        <h5 class="card-title">${element.nombre}-${element.marca}L</h5>
                        <p class="card-text text-primary">${element.descripcion}</p>
                        <h3>Precio: $${element.precio}</h3>
                        <div class="d-flex" style="flex-direction: row;">
                            <button class="btn btn-dark" onclick="mostrarDetalle(${element.idproducto})">SABER MÁS</button>
                            <a class="btn btn-primary ms-3" onclick="agregaralcarrito(${element.idproducto})">COMPRAR</a>
                        </div>
                    </div>
                </div>
                </div>
                </div>`;
                });

                document.getElementById("productos").innerHTML = card;

                // Eliminar la paginación
                document.getElementById("paginacion").innerHTML = "";

                document
                    .getElementById("productos")
                    .scrollIntoView({ behavior: "smooth" });
            } else {
                // Manejar el caso cuando no hay productos
                console.error(
                    "No se encontraron productos para la categoría seleccionada."
                );
            }
        })
        .catch((err) => {
            console.error(err);
        });
}

// Modifica la función para mostrar el detalle
function mostrarDetalle(idproducto) {
    // Guarda el ID en el localStorage
    localStorage.setItem("productoId", idproducto);

    // Redirige a la página de detalles
    window.location.href = "/detalle";
}

function actualizarPaginacion(productos, orden) {
    var paginationContainer = document.querySelector("#paginacion");
    paginationContainer.innerHTML = "";

    for (var i = 1; i <= productos.last_page; i++) {
        var pageItem = document.createElement("li");
        pageItem.className = "page-item";
        var pageLink = document.createElement("a");
        pageLink.className = "page-link";
        pageLink.href = "";
        pageLink.textContent = i;
        pageItem.appendChild(pageLink);
        paginationContainer.appendChild(pageItem);

        pageLink.addEventListener("click", function (e) {
            e.preventDefault();
            var paginaSeleccionada = parseInt(this.textContent);
            MostrarProductos(paginaSeleccionada, orden);
        });
    }
}

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

    // Incluye solo la información de paginación
    MostrarProductos();
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

// TODO LO RELACIONADO CON EL CARRITO DE COMPRAS EN ESTE BLOQUE ->
var carrito = [];

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

// <- TODO LO RELACIONADO CON EL CARRITO DE COMPRAS EN ESTE BLOQUE

function nosotros() {
    const empresaId = localStorage.getItem("empresaSeleccionada");
    axios
        .get(`/empresas/${empresaId}`)
        .then((res) => {
            console.log(res);
            const imagenesArrayss = JSON.parse(res.data.marca_aliada);
            const logoP = JSON.parse(res.data.logo);
            footer = "";
            marca = "";
            log = "";
            log2 = "";

            footer += `<h3>Información de Contacto</h3>
            <p>Teléfono: +57-${res.data.telefono}</p>
            <p>Email: ${res.data.correo}</p>
            <p>Dirección: ${res.data.direccion}</p>
            <a href="${res.data.instagram}" style="text-decoration: none;">Instagram</a>`;

            marca += `<!-- Imagen 1 -->
            <img src="${imagenesArrayss[0]}" alt="" style="width: 100%; max-width: 350px; height: auto; margin-bottom: 15px;">
            
            <!-- Imagen 2 -->
            <img src="${imagenesArrayss[1]}" alt="" style="width: 100%; max-width: 350px; height: auto; margin-bottom: 15px;">
            
            <!-- Imagen 3 -->
            <img src="${imagenesArrayss[2]}" alt="" style="width: 100%; max-width: 350px; height: auto; margin-bottom: 15px;">`

            log += `<img src="${logoP[0]}" alt="" class="img-responsive">`;
            log2 += `<img src="${logoP[0]}" style="width: 30%;" alt="">`;

            document.getElementById("footer").innerHTML = footer;
            document.getElementById("mostrarMarcasAliadas").innerHTML = marca;
            document.getElementById("logo").innerHTML = log;
            document.getElementById("logo2").innerHTML = log2;
        })
        .catch((err) => {
            console.error(err);
        });
}
nosotros();

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
