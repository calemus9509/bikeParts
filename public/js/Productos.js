


function MostrarProductos(pagina = 1) {
    axios.get(`/obtener-productos?page=${pagina}`)
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
                                        <a class="btn btn-primary">COMPRAR</a>
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



// function filtrarPorCategoria(categoriaId) {
//     axios.get(`/obtener-productos/${categoriaId}`)
//         .then(res => {
//             console.log(res.data);
//             var productos = res.data; // Solo la información de paginación
//             var card = "";

//             productos.data.forEach(element => {
//                 card += `<div class="col-md-4 mb-3">
//                     <div class="card" style="max-width: 540px;">
//                         <div class="row g-0">
//                             <div class="col-md-4">
//                                 <img src="img/duke.jpg" class="img-fluid rounded-start" alt="..."
//                                     style="object-fit: cover; height: 250px;object-position: center center;">
//                             </div>
//                             <div class="col-md-8">
//                                 <div class="card-body">
//                                     <h5 class="card-title">${element.nombre}-${element.marca}</h5>
//                                     <p class="card-text text-primary">${element.descripcion}</p>
//                                     <h3>Precio: $${element.precio}</h3>
//                                     <div class="d-flex" style="flex-direction: row;">
//                                         <button class="btn btn-dark" onclick="mostrarDetalle(${element.idproducto})">SABER MÁS</button>
//                                         <a class="btn btn-primary">COMPRAR</a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>`;
//             });

//             document.getElementById("productos").innerHTML = card;

//             // Actualizar la paginación solo si hay más de una página
//             if (productos.last_page > 1) {
//                 actualizarPaginacion(productos);
//             } else {
//                 // Si solo hay una página, elimina la paginación
//                 document.getElementById("paginacion").innerHTML = '';
//             }
//         })
//         .catch(err => {
//             console.error(err);
//         });
// }


function filtrarPorCategoria(categoriaId) {
    axios.get(`/obtener-productos/${categoriaId}`)
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
                                        <a class="btn btn-primary">COMPRAR</a>
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
    // Incluye solo la información de paginación
    MostrarProductos();
});