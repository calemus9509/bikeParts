function MostrarProductos(pagina = 1) {
    productoFiltro = localStorage.getItem('idCategory');
    const empresaId = localStorage.getItem('empresaSeleccionada');

    if (productoFiltro && productoFiltro >= 0) {
    
    axios.get(`/obtener-productos/${productoFiltro}?empresa=${empresaId}`)
        .then(res => {
            console.log(res.data);
            var productos = res.data;

            // Verificar si hay productos antes de intentar acceder a la propiedad 'data'
            if (productos && productos.length > 0) {
                var card = "";

                productos.forEach(element => {
                    card += `<div class="col-md-4 mb-3">
                    <div class="card" style="max-width: 540px;">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="img/duke.jpg" class="img-fluid rounded-start" alt="..."
                                    style="object-fit: cover; height: 250px;object-position: center center;">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${element.nombre}-${element.marca}</h5>
                                    <p class="card-text text-primary">${element.descripcion}</p>
                                    <h3>Precio: $${element.precio}</h3>
                                    <div class="d-flex" style="flex-direction: row;">
                                        <button class="btn btn-dark" onclick="mostrarDetalle(${element.idproducto})">SABER MÁS</button>
                                        <a class="btn btn-primary" onclick="agregaralcarrito(${element.idproducto})">COMPRAR</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                });

                document.getElementById("productos").innerHTML = card;

                // Eliminar la paginación
                document.getElementById("paginacion").innerHTML = '';

                document.getElementById("productos").scrollIntoView({ behavior: 'smooth' });
            } else {
                // Manejar el caso cuando no hay productos
                console.error('No se encontraron productos para la categoría seleccionada.');
            }
        })
        .catch(err => {
            console.error(err);
        });
    } else {
        // Configurar la URL de la solicitud de productos
    let url = empresaId ? `/obtener-productos?empresa=${empresaId}&page=${pagina}` : `/obtener-productos?page=${pagina}`;

    axios.get(url)
        .then(res => {
            console.log(res);
            var productos = res.data; // Solo la información de paginación
            var card = "";

            productos.data.forEach(element => {
                card += `<div class="col-md-4 mb-3">
                    <div class="card" style="max-width: 540px;">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="img/duke.jpg" class="img-fluid rounded-start" alt="..."
                                    style="object-fit: cover; height: 250px;object-position: center center;">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${element.nombre}-${element.marca}</h5>
                                    <p class="card-text text-primary">${element.descripcion}</p>
                                    <h3>Precio: $${element.precio}</h3>
                                    <div class="d-flex" style="flex-direction: row;">
                                        <button class="btn btn-dark" onclick="mostrarDetalle(${element.idproducto})">SABER MÁS</button>
                                        <button onclick="agregaralcarrito(${element.idproducto})" class="btn btn-primary ms-3">COMPRAR</button>
                                    </div>
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
        .catch(err => {
            console.error(err);
        });
        
    }
    
    axios.get("/categorias")
        .then(res => {
            var card2 = "";
            res.data.forEach(element => {
                card2 += `<div class="card m-2" style="width: 14rem;">
                    <img src="img/llanta.jpg" class="card-img-top custom-image" alt="...">
                    <a class="text-black" style="text-decoration: none;cursor: pointer;" onclick="filtrarPorCategoria(${element.idcategorias})">
        <h3 class="text-center">${element.nombre}</h3>
    </a>
                </div>`;
            });
            document.getElementById("categoriasss").innerHTML = card2;
        })
        .catch(err => {
            console.error(err);
        });
}

function eliminarIdCategory(){
    localStorage.removeItem('idCategory');
}

function filtrarPorCategoria(categoriaId) {
    // Obtener el ID de la empresa desde el localStorage
    const empresaId = localStorage.getItem('empresaSeleccionada');

    axios.get(`/obtener-productos/${categoriaId}?empresa=${empresaId}`)
        .then(res => {
            console.log(res.data);
            var productos = res.data;

            // Verificar si hay productos antes de intentar acceder a la propiedad 'data'
            if (productos && productos.length > 0) {
                var card = "";

                productos.forEach(element => {
                    card += `<div class="col-md-4 mb-3">
                    <div class="card" style="max-width: 540px;">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="img/duke.jpg" class="img-fluid rounded-start" alt="..."
                                    style="object-fit: cover; height: 250px;object-position: center center;">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${element.nombre}-${element.marca}</h5>
                                    <p class="card-text text-primary">${element.descripcion}</p>
                                    <h3>Precio: $${element.precio}</h3>
                                    <div class="d-flex" style="flex-direction: row;">
                                        <button class="btn btn-dark" onclick="mostrarDetalle(${element.idproducto})">SABER MÁS</button>
                                        <button onclick="agregaralcarrito(${element.idproducto})" class="btn btn-primary ms-3">COMPRAR</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                });

                document.getElementById("productos").innerHTML = card;

                // Eliminar la paginación
                document.getElementById("paginacion").innerHTML = '';

                document.getElementById("productos").scrollIntoView({ behavior: 'smooth' });
            } else {
                // Manejar el caso cuando no hay productos
                console.error('No se encontraron productos para la categoría seleccionada.');
            }
        })
        .catch(err => {
            console.error(err);
        });
}






// Modifica la función para mostrar el detalle
function mostrarDetalle(idproducto) {
    // Guarda el ID en el localStorage
    localStorage.setItem('productoId', idproducto);

    // Redirige a la página de detalles
    window.location.href = '/detalle';
}



function actualizarPaginacion(productos) {
    var paginationContainer = document.querySelector('#paginacion');
    paginationContainer.innerHTML = '';

    for (var i = 1; i <= productos.last_page; i++) {
        var pageItem = document.createElement('li');
        pageItem.className = 'page-item';
        var pageLink = document.createElement('a');
        pageLink.className = 'page-link';
        pageLink.href = '';
        pageLink.textContent = i;
        pageItem.appendChild(pageLink);
        paginationContainer.appendChild(pageItem);

        pageLink.addEventListener('click', function (e) {
            e.preventDefault();
            var paginaSeleccionada = parseInt(this.textContent);
            MostrarProductos(paginaSeleccionada);
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
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
    axios.get(`/buscar-autocompletado?termino=${termino}&empresa=${localStorage.getItem('empresaSeleccionada')}`)
        .then(res => {
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
        .catch(err => {
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
        resultados.forEach(resultado => {
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
                localStorage.setItem('productoId', resultado.idproducto);
                window.location.href = '/detalle';
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

function agregaralcarrito(id) {
    // Verificar si el ID ya está en el carrito
    if (!carrito.includes(id)) {
        carrito.push(id);
        console.log("Producto agregado al carrito:", id);
    } else {
        console.log("El producto ya está en el carrito:", id);
    }
    console.log(carrito);
}


carrito = JSON.parse(localStorage.getItem('productos')) || [];


function mostrarcarrito() {
    localStorage.productos = JSON.stringify(carrito)
}


// <- TODO LO RELACIONADO CON EL CARRITO DE COMPRAS EN ESTE BLOQUE